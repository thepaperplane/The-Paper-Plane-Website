import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, PhoneCall, Sparkles, Loader2, ArrowUpRight } from "lucide-react";
import { ChatMessage } from "../types";

export const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "Hello! I am The Paper Plane Advisory AI. How can I assist you with Tax Filings, Scrutiny Defense, Pvt Ltd Incorporation, or Web App Development in Coimbatore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "GSTR-1 & 3B Deadlines",
    "Pvt Ltd Incorporation Steps",
    "Section 148 Notice Defense",
    "Custom Web & SaaS Quote",
  ];

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.response || "I am here to assist you with paper compliance and business takeoff.",
        whatsappLink: data.whatsappLink,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "The Paper Plane AI is currently updating compliance matrices. Please tap 'WhatsApp Us' below or call +91 90255 65526 for immediate assistance.",
        whatsappLink: `https://wa.me/919025565526?text=${encodeURIComponent(`Enquiry regarding: ${query}`)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="open-ai-chat"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat assistant"
          className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-2xl shadow-indigo-500/30 hover:from-cyan-400 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="relative">
            <Bot className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-indigo-600 animate-pulse" />
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase pr-1 hidden sm:inline font-mono">
            PAPER PLANE AI
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-100" />
        </button>
      )}

      {/* Chat Window Popup */}
      {isOpen && (
        <div
          id="ai-chat-window"
          role="dialog"
          aria-label="Paper Plane AI chat assistant"
          className="w-[90vw] sm:w-[380px] h-[520px] liquid-glass border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900/80 border-b border-white/10 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">
                  Compliance Assistant
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 uppercase tracking-wider font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Gemini Powered • Coimbatore
                </span>
              </div>
            </div>

            <button
              id="close-ai-chat"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium rounded-br-none shadow-md shadow-indigo-500/20"
                      : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* WhatsApp Hand-off Link */}
                  {msg.whatsappLink && (
                    <a
                      href={msg.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-500/20 transition-colors"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Takeover on WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70" />
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-500 mt-1 px-1 uppercase tracking-wider font-semibold">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-300 text-xs py-2 font-mono text-[10px] uppercase font-bold">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Consulting Paper Plane Knowledge Engine...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-white/10 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 text-[10px] font-mono uppercase font-bold tracking-wider transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900/60 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about GST, ITR, Incorporation..."
              disabled={loading}
              aria-label="Chat message"
              className="liquid-glass-input flex-1 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 font-sans"
            />
            <button
              id="send-chat-btn"
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              aria-label="Send message"
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
