"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  IoClose,
  IoSend,
  IoChatbubbleEllipses,
  IoAttach,
  IoDocumentText,
  IoTrash,
} from "react-icons/io5";
import { sendTelegramNotification } from "@/helper/sendTelegram";
import {
  getAllMessages,
  saveMessage,
  clearMessages as clearDB,
} from "@/helper/db";
import { supabase } from "@/helper/supabase"; // Import Supabase client
import { toast } from "sonner";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForHuman, setIsWaitingForHuman] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const t = useTranslations("chatbot");
  const locale = useLocale();
  const pathname = usePathname();

  // Skip on admin pages
  const isAdminPage = pathname?.includes("/admin");


  // Initialize Session ID
  useEffect(() => {
    let sid = localStorage.getItem("chat_session_id");
    if (!sid) {
      sid = "session-" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("chat_session_id", sid);
    }
    setSessionId(sid);
  }, []);

  // Load from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMessages = await getAllMessages();
        if (storedMessages && storedMessages.length > 0) {
          setMessages(storedMessages);
        }
      } catch (error) {
        console.error("DB Load Error:", error);
      }
    };
    loadData();
  }, []);

  // Subscribe to Admin replies via Supabase Realtime
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`chat-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          if (payload.new.sender === "admin") {
            const adminMsg = {
              id: payload.new.id,
              text: payload.new.text,
              sender: "bot",
              timestamp: payload.new.created_at,
              isAdmin: true,
            };
            setMessages((prev) => {
              if (prev.find((m) => m.id === adminMsg.id)) return prev;
              return [...prev, adminMsg];
            });
            saveMessage(adminMsg);
            setIsWaitingForHuman(false);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Initial greeting if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        id: "greeting-" + Date.now(),
        text: t("welcome"),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greeting]);
      saveMessage(greeting);
    }
  }, [isOpen, messages.length, t]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const syncToSupabase = async (msg) => {
    if (!sessionId) return;

    try {
      const { data: conv, error: convErr } = await supabase
        .from("conversations")
        .upsert(
          {
            session_id: sessionId,
            last_message: msg.text,
            updated_at: new Date(),
          },
          { onConflict: "session_id" },
        )
        .select()
        .single();

      if (convErr) throw convErr;

      await supabase.from("messages").insert({
        conversation_id: conv.id,
        text: msg.text,
        sender: msg.sender,
        attachment: msg.attachment || null,
      });
    } catch (err) {
      console.error("Supabase Sync Error:", err);
    }
  };

  const fetchAIResponse = async (
    userMsg,
    history,
    currentAttachment = null,
  ) => {
    setIsTyping(true);

    const lowerInput = userMsg.toLowerCase();
    if (
      lowerInput.includes("human") ||
      lowerInput.includes("orang") ||
      lowerInput.includes("admin") ||
      lowerInput.includes("konsultasi")
    ) {
      handleTalkToHuman();
      setIsTyping(false);
      return;
    }

    try {
      const formattedHistory = history.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
        attachment: m.attachment || null,
      }));

      const currentUserMsg = {
        role: "user",
        content: userMsg,
        attachment: currentAttachment,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...formattedHistory, currentUserMsg],
        }),
      });

      const data = await response.json();

      if (data.error) {
        if (data.error.includes("rate-limited")) {
          toast.warning("Server busy. Falling back...");
        }
        throw new Error(data.error);
      }

      const botMessage = {
        id: "msg-" + Date.now(),
        text: data.text,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      saveMessage(botMessage);
      syncToSupabase(botMessage);

      const handoffKeywords = [
        "belum dapat saya baca",
        "tidak dapat melihat",
        "keterbatasan tampilan",
        "unggah kembali",
        "format yang tidak didukung",
        "tanda navigasi",
      ];

      const shouldHandoff = handoffKeywords.some((keyword) =>
        data.text.toLowerCase().includes(keyword.toLowerCase()),
      );

      if (
        shouldHandoff &&
        (currentAttachment || history.some((m) => m.attachment))
      ) {
        console.info("Auto-triggering human handoff due to AI confusion...");
        handleTalkToHuman();
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      toast.error("Assistant encountered an error.");
      const errorMsg = {
        id: "msg-err-" + Date.now(),
        text: t("responses.default"),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      saveMessage(errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!inputValue.trim() && !selectedFile) || isTyping) return;

    const userMsgText = inputValue;
    const userAttachment = selectedFile
      ? {
          name: selectedFile.name,
          type: selectedFile.type,
          data: selectedFile.data,
        }
      : null;

    const userMessage = {
      id: "msg-" + Date.now(),
      text: userMsgText,
      sender: "user",
      timestamp: new Date(),
      attachment: userAttachment,
    };

    const currentHistory = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    saveMessage(userMessage);
    syncToSupabase(userMessage);

    setInputValue("");
    setSelectedFile(null);

    // STRICT AI BLOCKING:
    // 1. Check if we are currently in "waiting" state
    // 2. Check if the LAST message was a "waiting for human" message
    // 3. Check if there are any ADMIN messages in history
    const isHumanMode =
      isWaitingForHuman ||
      messages.some((m) => m.isAdmin) ||
      messages.slice(-1)[0]?.text === t("responses.waitingForHuman");

    if (!isHumanMode) {
      await fetchAIResponse(
        userMsgText || "(Attachment)",
        currentHistory,
        userAttachment,
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (max 2MB for browser local storage health)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size is too large (max 2MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedFile({
        name: file.name,
        type: file.type,
        data: event.target.result, // Data URL (Base64)
      });
    };
    reader.readAsDataURL(file);
    // Reset input
    e.target.value = null;
  };

  const handleTalkToHuman = async () => {
    if (isConnecting || isWaitingForHuman) return;

    setIsConnecting(true);

    // Add "Connecting" message
    const connectingMsgId = "connecting-" + Date.now();
    const connectingMsg = {
      id: connectingMsgId,
      text: t("responses.isConnecting"),
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, connectingMsg]);

    try {
      // Prepare summary for Telegram with basic HTML escaping
      const escapeHTML = (text) =>
        text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const summary = messages
        .slice(-5)
        .map((m) => {
          const sender = m.sender === "user" ? "User" : "Bot";
          const content = escapeHTML(m.text);
          const attachment = m.attachment
            ? ` [Attachment: ${escapeHTML(m.attachment.name)}]`
            : "";
          return `<b>${sender}</b>: ${content}${attachment}`;
        })
        .join("\n");

      // Automatically generate professional admin link
      const adminLink = `${window.location.origin}/${locale}/admin/chat?session=${sessionId}`;

      // Simplified professional template (No complex HTML tags for maximum reliability)
      const fullMessage =
        `<b>🔔 Permintaan Bantuan Manusia</b>\n\n` +
        `Seorang pengguna membutuhkan bantuan langsung dari website Prambanan Digital.\n\n` +
        `<b>Ringkasan Chat:</b>\n` +
        `<i>${summary || "No previous messages."}</i>\n\n` +
        `👉 <b>Balas di Dashboard Admin:</b>\n${adminLink}`;

      await sendTelegramNotification(fullMessage);

      setIsWaitingForHuman(true);

      // Update connecting message
      const waitingMsg = {
        ...connectingMsg,
        text: t("responses.waitingForHuman"),
      };
      setMessages((prev) =>
        prev.map((m) => (m.id === connectingMsgId ? waitingMsg : m)),
      );
      saveMessage(waitingMsg);

      toast.success("Notification sent to our team!");
    } catch (error) {
      console.error("Failed to notify human:", error);
      toast.error("Failed to connect to human.");
      setMessages((prev) => prev.filter((m) => m.id !== connectingMsgId));
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOptionClick = async (option) => {
    if (isTyping) return;

    const userMessage = {
      id: "msg-" + Date.now(),
      text: option,
      sender: "user",
      timestamp: new Date(),
    };

    const currentHistory = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    saveMessage(userMessage);

    await fetchAIResponse(option, currentHistory);
  };

  const handleClearChat = async () => {
    if (window.confirm("Hapus semua riwayat percakapan dan mulai sesi baru?")) {
      await clearDB();
      localStorage.removeItem("chat_session_id"); // Force new session id
      setMessages([]);
      setIsWaitingForHuman(false);
      toast.info("Sesi chat direset. Memulai ulang...");
      window.location.reload(); // Quickest way to reset all states
    }
  };

  const initialOptions = t.raw("initialOptions") || [];

  if (isAdminPage) return null;

  return (

    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="group relative flex items-center justify-center p-0 border-none bg-transparent"
          aria-label={t("title")}
        >
          <span className="absolute w-14 h-14 rounded-full bg-primary-400/30 animate-pulse-ring" />
          <span
            className="absolute w-14 h-14 rounded-full bg-primary-400/20 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          <div className="relative w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-500/40">
            {isOpen ? (
              <IoClose className="text-3xl text-white" />
            ) : (
              <div className="flex items-center justify-center">
                <IoChatbubbleEllipses className="text-2xl text-white" />
                {isWaitingForHuman && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-1.5 sm:right-6 z-50 w-[calc(100vw-0.75rem)] sm:w-[380px] h-[620px] max-h-[85vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/30 overflow-hidden relative">
                  <Image
                    src="/logo/logo.png"
                    alt="Logo"
                    fill
                    className="p-1 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white leading-tight">
                    {t("title")}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${isWaitingForHuman ? "bg-orange-400" : "bg-green-400"}`}
                    />
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
                      {isWaitingForHuman ? "Waiting for response" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Clear Chat"
                  >
                    <IoTrash className="text-lg" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close Chat"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950/20 scroll-smooth custom-scrollbar touch-auto"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-100 dark:border-neutral-700"
                    }`}
                  >
                    {/* Attachment Display */}
                    {msg.attachment && (
                      <div className="mb-2">
                        {msg.attachment.type.startsWith("image/") ? (
                          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900/50">
                            <img
                              src={msg.attachment.data}
                              alt={msg.attachment.name}
                              className="w-full h-auto max-h-48 object-cover"
                            />
                            <div className="p-2 text-[10px] truncate opacity-80">
                              {msg.attachment.name}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-white/10">
                            <IoDocumentText className="text-2xl text-primary-500" />
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-medium text-[11px]">
                                {msg.attachment.name}
                              </div>
                              <div className="text-[9px] opacity-60 uppercase">
                                {msg.attachment.type.split("/")[1] || "file"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-0 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <div
                      className={`text-[10px] mt-1.5 ${msg.sender === "user" ? "text-white/70" : "text-neutral-400"}`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-neutral-800 p-3.5 rounded-2xl rounded-tl-none border border-neutral-100 dark:border-neutral-700 shadow-sm flex gap-1.5 items-center">
                    <span
                      className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {/* Initial Options */}
              {messages.length === 1 &&
                !isTyping &&
                initialOptions.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {initialOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="self-start px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs text-primary-600 dark:text-primary-400 transition-all text-left max-w-full"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex flex-col gap-3">
                {/* File Preview before sending */}
                {selectedFile && (
                  <div className="flex items-center gap-2 p-2 bg-primary-50 dark:bg-primary-950/20 rounded-xl border border-primary-100 dark:border-primary-900/30 relative">
                    {selectedFile.type.startsWith("image/") ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0">
                        <img
                          src={selectedFile.data}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <IoDocumentText className="text-2xl text-primary-500" />
                    )}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="truncate text-[11px] font-medium text-primary-700 dark:text-primary-300">
                        {selectedFile.name}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="absolute right-2 p-1 hover:bg-primary-200/50 dark:hover:bg-primary-800/50 rounded-full text-primary-600"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <div className="flex-1 flex gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-2 items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-neutral-500 hover:text-primary-600 transition-colors"
                      title="Attach File"
                    >
                      <IoAttach className="text-2xl rotate-45" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t("placeholder")}
                      className="flex-1 py-3 bg-transparent border-none text-sm focus:ring-0 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={
                      (!inputValue.trim() && !selectedFile) ||
                      isTyping ||
                      isConnecting
                    }
                    className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-lg shadow-primary-600/20"
                    aria-label="Send Message"
                  >
                    <IoSend className="text-xl" />
                  </button>
                </form>

                {!(isWaitingForHuman || messages.some((m) => m.isAdmin)) && (
                  <button
                    onClick={handleTalkToHuman}
                    disabled={isConnecting}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-950/50 transition-colors border border-primary-100 dark:border-primary-900/50 disabled:opacity-50"
                  >
                    <IoChatbubbleEllipses className="text-lg" />
                    {isConnecting
                      ? t("responses.isConnecting")
                      : t("talkToHuman")}
                  </button>
                )}

                {isWaitingForHuman && (
                  <div className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-50 dark:bg-neutral-800/50 py-3 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700 px-4">
                    Our team has been notified. We will reply here shortly.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
