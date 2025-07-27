import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { InitialMessage } from "@/components/InitialMessage";
import { MessageList } from "@/components/MessageList";
import { type Message } from "@/utils/types";

interface Props {
  messages: Message[];
  handleSendUpdateMessage: (
    userMessage: Message,
    conversation: Message[]
  ) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export type ChatContainerRef = {
  forceScrollToBottom: () => void;
};

export const ChatContainer = forwardRef<ChatContainerRef, Props>(
  ({ messages, handleSendUpdateMessage, isLoading, error }, ref) => {
    const { t } = useTranslation();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const shouldAutoScrollRef = useRef<boolean>(true);

    // Checks if the user is near the bottom of the page
    const isNearBottom = (
      element: HTMLDivElement,
      threshold: number = 80
    ): boolean => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      return scrollHeight - scrollTop - clientHeight < threshold;
    };

    // Force scroll down function
    const forceScrollToBottom = () => {
      shouldAutoScrollRef.current = true;
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };

    // Expose function via ref
    useImperativeHandle(ref, () => ({
      forceScrollToBottom,
    }));

    // Manages user scroll
    const handleScroll = () => {
      if (chatContainerRef.current) {
        shouldAutoScrollRef.current = isNearBottom(chatContainerRef.current);
      }
    };

    // Auto-scroll down only if necessary
    useEffect(() => {
      if (chatContainerRef.current && shouldAutoScrollRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, [messages]);

    // Resets auto-scroll when a new conversation starts
    useEffect(() => {
      if (messages.length === 0) {
        shouldAutoScrollRef.current = true;
      }
    }, [messages.length]);

    return (
      <div
        className="flex-grow w-full overflow-y-auto p-2 md:p-6 relative"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <div className="mx-auto w-[100%] max-w-[768px]">
          {messages.length === 0 && !isLoading && !error && <InitialMessage />}
          <MessageList
            messages={messages}
            handleSendUpdateMessage={handleSendUpdateMessage}
          />
          {error && messages.length === 0 && (
            <div className="text-center p-4">
              <p className="text-error font-semibold">{t("chat.error")}</p>
              <p className="text-error-content text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);
