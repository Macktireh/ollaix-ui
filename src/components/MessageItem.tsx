import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { createMarkdownComponents } from "@/components/markdownComponents";
import { ChatHeader } from "@/components/MessageHeader";
import { MessageSkeleton } from "@/components/MessageSkeleton";
import { MessageActionsButton } from "@/components/MessageActionsButton";
import { ThinkingDisplay } from "@/components/ThinkingDisplay";
import type { Message } from "@/utils/types";

interface Props {
  message: Message;
  isDarkMode?: boolean;
  messages: Message[];
  handleSendUpdateMessage: (
    userMessage: Message,
    conversation: Message[]
  ) => Promise<void>;
}

export function MessageItem({
  message,
  isDarkMode = true,
  messages,
  handleSendUpdateMessage,
}: Props) {
  const { t } = useTranslation();
  const [IsEditing, setEditing] = useState<boolean>(false);
  const [updatedMessage, setUpdatedMessage] = useState<string>();

  const isUser = message.role === "user";
  const bubbleClasses = isUser
    ? isDarkMode
      ? "bg-base-content/4"
      : "bg-base-content/8"
    : `bg-base-100 w-full`;

  const components = createMarkdownComponents({ isDarkMode, isUser });

  const modify = () => {
    if (isUser && !IsEditing) {
      setUpdatedMessage(message.content);
    }
    setEditing((prev) => !prev);
  };

  const handleUpdateMessage = () => {
    if (!updatedMessage) return;
    const index = messages.findIndex((msg) => msg.id === message.id);
    if (index !== -1) {
      const conversation = messages.slice(0, index);
      const updatedMsg = { ...messages[index], content: updatedMessage };
      // setMessages(conversation);
      setEditing(false);
      handleSendUpdateMessage(updatedMsg, conversation);
    }
  };

  return (
    <div className={`chat ${isUser ? "chat-end ml-4" : "chat-start"}`}>
      <ChatHeader message={message} isUser={isUser} />

      <div
        style={{
          maxWidth: IsEditing ? "100%" : !isUser ? "100%" : "80%",
          width: IsEditing ? "100%" : "",
          borderRadius: 10,
        }}
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
          <>
            {isUser && IsEditing ? (
              <>
                <textarea
                  value={updatedMessage}
                  onChange={(e) => setUpdatedMessage(e.target.value)}
                  rows={6}
                  className="textarea textarea-md w-full min-h-[10px] bg-transparent max-h-42 resize-none border outline-none focus:ring-0 focus:ring-offset-0 focus:border-base-content/50 focus:outline-none disabled:bg-base-100"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setEditing((prev) => !prev)}
                  >
                    {t("chat.message.edit.cancel")}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleUpdateMessage}
                  >
                    {t("chat.message.edit.send")}
                  </button>
                </div>
              </>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </>
        )}
      </div>

      {!IsEditing ? (
        <MessageActionsButton
          message={message}
          isUser={isUser}
          modify={modify}
        />
      ) : null}
    </div>
  );
}
