import { useRef, useEffect } from "react";
import { ChatMessage } from "@/features/guest/components/ChatWindow";
import { motion, AnimatePresence } from "framer-motion";
import { AiOrb } from "./AiOrb";
import { MessageResponse } from "@/components/ui/ai/message";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  userName?: string;
}

export const AiMessagesList = ({ messages, isLoading }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] md:max-w-[70%] gap-3 ${
                msg.sender === "user" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Avatar Bubble */}

              {/* Message Bubble */}
              <div
                className={`relative px-5 py-3 rounded-2xl shadow-sm border text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-50 border-blue-100 text-blue-600 rounded-tl-none"
                    : "bg-white border-slate-100 text-slate-700 rounded-tr-none"
                }`}
              >
                <MessageResponse>{msg.text}</MessageResponse>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-transparent"
                    : " text-blue-500 border-none shadow-none"
                }`}
              >
                {msg.sender === "user" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ) : (
                  <AiOrb className="size-12" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3 justify-start"
        >
          <AiOrb className="size-12" />
          <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tr-none flex items-center gap-1 shadow-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
          </div>
        </motion.div>
      )}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
};
