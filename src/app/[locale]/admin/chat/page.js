"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { supabase } from "@/helper/supabase";
import { IoSend, IoPerson, IoChatbubbles, IoTime, IoDocumentText, IoArrowBack, IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminChatPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "id";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);
  const searchParams = useSearchParams();
  const targetSession = searchParams.get("session");

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Auth Guard
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace(`/${locale}/admin/login`);
      } else {
        setIsAuthenticated(true);
        setAuthLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace(`/${locale}/admin/login`);
      } else {
        setIsAuthenticated(true);
        setAuthLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, locale]);

  // 1. Fetch Conversations
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) console.error("Fetch Conversations Error:", error);
      else {
        setConversations(data);
        
        // Only perform auto-selection/deep-link on initial load
        if (isInitialLoad) {
          if (targetSession) {
            const target = data.find(c => c.session_id === targetSession);
            if (target) setSelectedChat(target);
            else if (data.length > 0) setSelectedChat(data[0]);
          } else if (data.length > 0) {
            setSelectedChat(data[0]);
          }
          setIsInitialLoad(false);
        }
      }
      setIsLoading(false);
    };

    fetchConversations();

    // Subscribe to new conversations
    const convChannel = supabase
      .channel("admin-convs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        () => fetchConversations()
      )
      .subscribe();

    return () => supabase.removeChannel(convChannel);
  }, [selectedChat, authLoading, isAuthenticated, isInitialLoad, targetSession]);

  // 2. Fetch Messages for Selected Chat
  useEffect(() => {
    if (!selectedChat || authLoading || !isAuthenticated) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedChat.id)
        .order("created_at", { ascending: true });

      if (error) console.error("Fetch Messages Error:", error);
      else setMessages(data);
    };

    fetchMessages();

    // Subscribe to new messages for THIS conversation
    const msgChannel = supabase
      .channel(`admin-msgs-${selectedChat.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedChat.id}`,
        },
        (payload) => {
          setMessages((prev) => {
            if (prev.find((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(msgChannel);
  }, [selectedChat, authLoading, isAuthenticated]);

  // 3. Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: selectedChat.id,
        text: replyText,
        sender: "admin",
      });

      if (error) throw error;

      // Update conversation's last message time
      await supabase
        .from("conversations")
        .update({ last_message: replyText, updated_at: new Date() })
        .eq("id", selectedChat.id);

      setReplyText("");
    } catch (err) {
      console.error("Reply Error:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace(`/${locale}/admin/login`);
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-950 overflow-hidden text-neutral-900 dark:text-neutral-100 z-[50]">
      {/* Sidebar - Conversations List */}
      <div className={`flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 h-full min-h-0
        ${selectedChat ? 'hidden md:flex md:w-80' : 'flex w-full md:w-80'}`}>
        <div className="p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <IoChatbubbles className="text-primary-600" />
              Chat Admin
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Manage visitor inquiries</p>
          </div>
          <button
            onClick={handleLogout}
            title={locale === "en" ? "Sign Out" : "Keluar"}
            className="p-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-600 dark:text-neutral-300 transition-all shadow-sm"
          >
            <IoLogOutOutline size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto" data-lenis-prevent>
          {conversations.length === 0 ? (
            <div className="p-10 text-center opacity-50">
              <IoPerson size={48} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`w-full p-4 text-left border-b border-neutral-100 dark:border-neutral-800 transition-colors flex gap-3 ${
                  selectedChat?.id === conv.id
                    ? "bg-primary-50 dark:bg-primary-900/20 border-l-4 border-l-primary-600"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                  <IoPerson className="text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm truncate">
                      {conv.user_name || "Visitor " + conv.session_id.slice(-4)}
                    </span>
                    <span className="text-[10px] opacity-60">
                      {new Date(conv.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs truncate opacity-70 mt-0.5">{conv.last_message || "Started a chat"}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-col relative transition-all duration-300 h-full min-h-0
        ${!selectedChat ? 'hidden md:flex' : 'flex flex-1 w-full'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Back button for mobile */}
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <IoArrowBack size={20} />
                </button>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <IoPerson className="text-primary-600" />
                </div>
                <div>
                  <h2 className="font-bold text-sm md:text-base">{selectedChat.user_name || "Visitor " + selectedChat.session_id.slice(-6)}</h2>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Active Session
                  </p>
                </div>
              </div>
              <div className="text-[10px] md:text-xs opacity-50 flex items-center gap-1">
                 <IoTime />
                 <span className="hidden sm:inline">Started</span> {new Date(selectedChat.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-neutral-50 dark:bg-neutral-950/20 min-h-0"
              data-lenis-prevent
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl shadow-sm text-sm ${
                      msg.sender === "admin"
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : msg.sender === "bot" 
                          ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none italic"
                          : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    {/* Attachment Display in Admin */}
                    {msg.attachment && (
                      <div className="mb-2">
                        {msg.attachment.type?.startsWith("image/") ? (
                          <div className="rounded-lg overflow-hidden border border-neutral-300 dark:border-white/10">
                             <img src={msg.attachment.data} alt="Attachment" className="max-w-full h-auto max-h-60" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                            <IoDocumentText className="text-xl text-primary-500" />
                            <span className="text-xs truncate">{msg.attachment.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="prose prose-sm dark:prose-invert">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    </div>
                    <div className={`text-[10px] mt-1 opacity-50 ${msg.sender === "admin" ? "text-white text-right" : ""}`}>
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Sending..."}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-3 md:p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-lg pb-safe">
              <form onSubmit={handleSendReply} className="flex gap-2 md:gap-4">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Balas..."
                  className="flex-1 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary-500 outline-none text-sm md:text-base transition-all"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 md:px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2"
                >
                  <IoSend />
                  <span className="hidden md:inline">Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center p-10">
            <IoChatbubbles size={100} className="mb-4" />
            <h2 className="text-2xl font-bold">Pilih percakapan</h2>
            <p>Silakan pilih chat dari sidebar untuk mulai membalas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
