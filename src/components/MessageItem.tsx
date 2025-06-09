import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { createMarkdownComponents } from "@/components/markdownComponents";
import { ChatHeader } from "@/components/MessageHeader";
import { MessageActionsButton } from "@/components/MessageActionsButton";
import { MessageSkeleton } from "@/components/MessageSkeleton";
import { ThinkingDisplay } from "@/components/ThinkingDisplay";
import type { Message } from "@/utils/types";

interface Props {
  message: Message;
  isDarkMode?: boolean;
}

export function MessageItem({ message, isDarkMode = true }: Props) {
  const isUser = message.role === "user";
  const bubbleClasses = isUser
    ? isDarkMode
      ? "bg-base-content/4"
      : "bg-base-content/8"
    : `bg-base-100 w-full`;

  const components = createMarkdownComponents({ isDarkMode, isUser });

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <ChatHeader message={message} isUser={isUser} />

      <div
        style={{ maxWidth: "80%", borderRadius: 10 }}
        className={`chat-bubble ${bubbleClasses} prose prose-sm max-w-none break-words before:hidden rounded-none`}
      >
        {!isUser && message.thinkingContent && (
          <ThinkingDisplay
            thinkingContent={message.thinkingContent}
            isLoadingThinking={message.isThinkingLoading || false}
          />
        )}

        {message.content === "" &&
        !isUser &&
        !message.isError &&
        !message.isThinkingLoading ? (
          <MessageSkeleton />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {message.content}
          </ReactMarkdown>
        )}
      </div>

      <div className="chat-footer text-xs opacity-70 pb-1">
        {!isUser && message.loaded && (
          <MessageActionsButton text={message.content} />
        )}
      </div>
    </div>
  );
}
