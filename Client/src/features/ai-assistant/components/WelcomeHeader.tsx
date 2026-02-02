import { memo } from "react";

interface WelcomeHeaderProps {
  userName: string;
  statusText: string;
}

/**
 * WelcomeHeader Component
 *
 * Displays a personalized greeting and status message for the AI assistant.
 * Supports internationalization through prop-based text.
 */
export const WelcomeHeader = memo<WelcomeHeaderProps>(
  ({ userName, statusText }) => {
    return (
      <div className="text-center space-y-2">
        <h1 className="text-5xl text-foreground tracking-tight">{userName}</h1>
        <h2 className="text-[54px] bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent tracking-wide pb-2">
          <span className="">{statusText}</span>
        </h2>
      </div>
    );
  },
);

WelcomeHeader.displayName = "WelcomeHeader";
