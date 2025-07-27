import { useRef } from "react";

import { ChatForm } from "@/components/ChatForm";
import {
  ChatContainer,
  type ChatContainerRef,
} from "@/components/ChatContainer";
import { ModelContextProvider } from "@/context/ModelContext";
import { useChatStream } from "@/hooks/useChatStream";

export function Home() {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    selectedModel,
    setSelectedModel,
    isLoading,
    error,
    handleSendMessage,
    handleSendUpdateMessage,
    handleStopGeneration,
  } = useChatStream();

  const chatContainerRef = useRef<ChatContainerRef>(null);

  // Wrapper for handleSendMessage that scrolls it down when a new message is sent
  const handleSendMessageWithScroll = () => {
    handleSendMessage();
    chatContainerRef.current?.forceScrollToBottom();
  };

  return (
    <ModelContextProvider>
      <div className="flex flex-col items-center justify-center h-full">
        <ChatContainer
          messages={messages}
          handleSendUpdateMessage={handleSendUpdateMessage}
          isLoading={isLoading}
          error={error}
          ref={chatContainerRef}
        />
        <ChatForm
          currentMessage={currentMessage}
          onInputChange={setCurrentMessage}
          selectedModel={selectedModel!}
          onModelChange={setSelectedModel}
          onSendMessage={handleSendMessageWithScroll}
          onStopGeneration={handleStopGeneration}
          isLoading={isLoading}
        />
      </div>
    </ModelContextProvider>
  );
}
