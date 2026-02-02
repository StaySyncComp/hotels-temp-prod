import { memo } from "react";

interface SuggestedPromptsProps {
  prompts: string[];
  onPromptClick?: (prompt: string) => void;
}

/**
 * SuggestedPrompts Component
 *
 * Displays a grid of suggested prompt buttons for quick interactions.
 * Each button triggers the onPromptClick callback when clicked.
 */
export const SuggestedPrompts = memo<SuggestedPromptsProps>(
  ({ prompts, onPromptClick }) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-8 px-4">
        {prompts.map((text, i) => (
          <button
            key={i}
            onClick={() => onPromptClick?.(text)}
            className="px-5 py-3 rounded-2xl bg-white border border-slate-100 
                     text-sm text-slate-600 font-medium shadow-sm hover:shadow-md hover:border-blue-200 hover:text-blue-600
                     transition-all duration-200 hover:-translate-y-0.5"
          >
            {text}
          </button>
        ))}
      </div>
    );
  },
);

SuggestedPrompts.displayName = "SuggestedPrompts";
