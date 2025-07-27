import { MessageItem } from "@/components/MessageItem";
import { useTheme } from "@/hooks/useTheme";
import type { Message } from "@/utils/types";

type Props = {
  messages: Message[];
  handleSendUpdateMessage: (userMessage: Message, conversation: Message[]) => Promise<void>;
};

export function MessageList({ messages, handleSendUpdateMessage }: Props) {
  const isDarkMode = useTheme();

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 p-1">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isDarkMode={isDarkMode}
          messages={messages}
          handleSendUpdateMessage={handleSendUpdateMessage}
        />
      ))}
    </div>
  );
}
