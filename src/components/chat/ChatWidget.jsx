"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { IoClose, IoSend, IoChatbubbleEllipses } from "react-icons/io5";
import { sendTelegramNotification } from "@/helper/sendTelegram";
import { toast } from "sonner";
import Image from "next/image";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForHuman, setIsWaitingForHuman] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const scrollRef = useRef(null);
  const t = useTranslations("chatbot");

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: t("welcome"),
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length, t]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response logic
    setIsTyping(true);
    setTimeout(() => {
      let responseText = t("responses.default");
      const lowerInput = inputValue.toLowerCase();

      if (lowerInput.includes("build") || lowerInput.includes("website") || lowerInput.includes("app") || lowerInput.includes("buat")) {
        responseText = t("responses.build");
      } else if (lowerInput.includes("demo")) {
        responseText = t("responses.demo");
      } else if (lowerInput.includes("service") || lowerInput.includes("layanan")) {
        responseText = t("responses.services");
      } else if (lowerInput.includes("human") || lowerInput.includes("orang") || lowerInput.includes("admin") || lowerInput.includes("konsultasi")) {
        handleTalkToHuman();
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTalkToHuman = async () => {
    if (isConnecting || isWaitingForHuman) return;

    setIsConnecting(true);

    // Add "Connecting" message
    const connectingMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: connectingMsgId,
        text: t("responses.isConnecting"),
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    try {
      // Prepare summary for Telegram
      const summary = messages
        .slice(-5)
        .map((m) => `${m.sender === "user" ? "User" : "Bot"}: ${m.text}`)
        .join("\n");

      const fullMessage = t("responses.telegramMessage").replace("{{summary}}", summary || "No previous messages.");

      await sendTelegramNotification(fullMessage);

      setIsWaitingForHuman(true);

      // Replace "Connecting" message with "Waiting" message
      setMessages((prev) =>
        prev.map(m => m.id === connectingMsgId ? {
          ...m,
          text: t("responses.waitingForHuman")
        } : m)
      );

      toast.success("Notification sent to our team!");
    } catch (error) {
      console.error("Failed to notify human:", error);
      toast.error("Failed to connect to human. Please try again later.");
      // Remove connecting message on failure
      setMessages((prev) => prev.filter(m => m.id !== connectingMsgId));
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    // Submit immediately
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let responseText = t("responses.default");
      if (option.toLowerCase().includes("build")) responseText = t("responses.build");
      else if (option.toLowerCase().includes("demo")) responseText = t("responses.demo");
      else if (option.toLowerCase().includes("service")) responseText = t("responses.services");
      else if (option.toLowerCase().includes("consultant") || option.toLowerCase().includes("human")) {
        handleTalkToHuman();
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  }

  const initialOptions = t.raw("initialOptions") || [];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="group relative flex items-center justify-center p-0 border-none bg-transparent"
          aria-label={t("title")}
        >
          {/* Pulse Rings */}
          <span className="absolute w-14 h-14 rounded-full bg-primary-400/30 animate-pulse-ring" />
          <span
            className="absolute w-14 h-14 rounded-full bg-primary-400/20 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Button Icon */}
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
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[80vh] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/30 overflow-hidden relative">
                  <Image
                    src="/logo/prambanan_logo2.png"
                    alt="Logo"
                    fill
                    className="p-1 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white leading-tight">{t("title")}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isWaitingForHuman ? "bg-orange-400" : "bg-green-400"}`} />
                    <span className="text-[10px] text-white/80 uppercase tracking-wider font-medium">
                      {isWaitingForHuman ? "Waiting for response" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950/20 scroll-smooth"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                      ? "bg-primary-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-100 dark:border-neutral-700"
                      }`}
                  >
                    {msg.text}
                    <div className={`text-[10px] mt-1.5 ${msg.sender === "user" ? "text-white/70" : "text-neutral-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-neutral-800 p-3.5 rounded-2xl rounded-tl-none border border-neutral-100 dark:border-neutral-700 shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Initial Options */}
              {messages.length === 1 && !isTyping && initialOptions.length > 0 && (
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
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t("placeholder")}
                    className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-400/50 outline-none transition-all dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isConnecting}
                    className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-lg shadow-primary-600/20"
                  >
                    <IoSend className="text-xl" />
                  </button>
                </form>

                {/* Talk to Human Shortcut */}
                {!isWaitingForHuman && (
                  <button
                    onClick={handleTalkToHuman}
                    disabled={isConnecting}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-950/50 transition-colors border border-primary-100 dark:border-primary-900/50 disabled:opacity-50"
                  >
                    <IoChatbubbleEllipses className="text-lg" />
                    {isConnecting ? t("responses.isConnecting") : t("talkToHuman")}
                  </button>
                )}

                {isWaitingForHuman && (
                  <div className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-50 dark:bg-neutral-800/50 py-2 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-700">
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
