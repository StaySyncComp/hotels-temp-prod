import { ArrowUpIcon } from "lucide-react";
import { useState, KeyboardEvent, memo } from "react";
import { AiOrb } from "./AiOrb";

interface ChatInputProps {
  onSend?: (message: string) => void;
  onAttach?: () => void;
  placeholder?: string;
}

/**
 * ChatInput Component
 *
 * A controlled input component with attachment and send functionality.
 * Light Theme: Clean white card with soft shadows.
 */
export const ChatInput = memo<ChatInputProps>(
  ({ onSend, onAttach, placeholder = "שאל הכל או בקש שיעורים..." }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
      if (inputValue.trim()) {
        onSend?.(inputValue);
        setInputValue("");
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div className="relative w-full px-4">
        <div
          className="bg-white rounded-[24px] border border-slate-100 
                      shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] 
                      transition-shadow duration-300 p-3 flex flex-col gap-2 relative z-10"
        >
          <div className="flex items-center gap-2 min-h-[50px] px-2">
            {/* <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-80" /> */}
            <AiOrb className="size-8" />
            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-base"
            />

            {/* Orb/Icon at end of input? The image showed a small blue orb/icon inside. */}
          </div>

          <div className="flex items-center justify-between px-1 pt-2 border-t border-slate-50 border-opacity-50">
            {/* Footer / Helper Text */}
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
              <span className="w-4 h-4 flex items-center justify-center border border-slate-300 rounded-full text-[10px] font-bold">
                ?
              </span>
              <span>מה העוזר החכם יכול לעשות?</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Attachment Button */}
              <button
                onClick={onAttach}
                className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors"
                aria-label="Attach file"
              >
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              {/* Send Button */}
              <button
                onClick={handleSend}
                className={`p-2 rounded-full transition-all duration-300 ${
                  inputValue.trim()
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 scale-100"
                    : "bg-slate-100 text-slate-400 scale-95"
                }`}
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <ArrowUpIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
