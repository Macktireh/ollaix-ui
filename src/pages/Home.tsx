import { ChatForm } from "@/components/ChatForm";
import { useChatStream } from "@/hooks/useChatStream";
import {
  ChatContainer,
  type ChatContainerRef,
} from "@/components/ChatContainer";
import { useRef } from "react";

export function Home() {
  const {
    messages,
    models,
    currentMessage,
    setCurrentMessage,
    selectedModel,
    setSelectedModel,
    isLoading,
    error,
    handleSendMessage,
    handleStopGeneration,
  } = useChatStream();

  const chatContainerRef = useRef<ChatContainerRef>(null);

  // Wrapper for handleSendMessage that scrolls it down when a new message is sent
  const handleSendMessageWithScroll = () => {
    handleSendMessage();
    chatContainerRef.current?.forceScrollToBottom();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        error={error}
        ref={chatContainerRef}
      />
      <ChatForm
        currentMessage={currentMessage}
        onInputChange={setCurrentMessage}
        models={models}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSendMessage={handleSendMessageWithScroll}
        onStopGeneration={handleStopGeneration}
        isLoading={isLoading}
      />
    </div>
  );
}
