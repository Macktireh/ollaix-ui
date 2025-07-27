import { useCallback, useEffect, useRef, useState } from "react";

import { ApiService } from "@/services/apiService";
import type { Message, ModelType } from "@/utils/types";

/**
 * Main hook to manage chat with streaming
 */
export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<ModelType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiServiceRef = useRef<ApiService | null>(null);

  // API service initialization
  useEffect(() => {
    apiServiceRef.current = new ApiService();

    return () => {
      apiServiceRef.current?.cleanup();
    };
  }, []);

  /**
   * Updates a specific message in the list
   */
  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
      );
    },
    []
  );

  /**
   * Create a new user message
   */
  const createUserMessage = useCallback(
    (content: string, model: string): Message => ({
      id: crypto.randomUUID(),
      content: content.trim(),
      role: "user",
      model,
    }),
    []
  );

  /**
   * Creates an AI placeholder message
   */
  const createAiMessagePlaceholder = useCallback(
    (model: string): Message => ({
      id: crypto.randomUUID(),
      content: "",
      role: "assistant",
      model,
      thinkingContent: "",
      isThinkingLoading: false,
      loaded: false,
    }),
    []
  );

  /**
   * Get conversation history (excluding the AI message being generated)
   */
  const getConversationHistory = useCallback((conversation: Message[]): Message[] => {
    // Only include messages that are fully loaded/completed
    return conversation.filter((msg) => {
      // Include user messages (they're always complete)
      if (msg.role === "user") return true;
      // Include assistant messages only if they're loaded
      if (msg.role === "assistant") return msg.loaded === true;
      return true;
    });
  }, []);

  /**
   * Manages message sending
   */
  const handleSendMessage = useCallback(async () => {
    if (!currentMessage.trim() || !apiServiceRef.current) return;

    setError(null);
    setIsLoading(true);

    // Create messages
    const userMessage = createUserMessage(currentMessage, selectedModel?.id!);
    const aiMessage = createAiMessagePlaceholder(selectedModel?.id!);

    // Get conversation history before adding new messages
    const conversationHistory = getConversationHistory(messages);

    // Adds messages to the list
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setCurrentMessage("");

    // Callbacks for the API service
    const onMessageUpdate = (updates: Partial<Message>) => {
      updateMessage(aiMessage.id, updates);
    };

    const onComplete = (finalMessage: Partial<Message>) => {
      updateMessage(aiMessage.id, finalMessage);
      setIsLoading(false);
    };

    const onError = (errorMessage: string) => {
      setError(errorMessage);
      updateMessage(aiMessage.id, {
        content: errorMessage,
        model: selectedModel?.id,
        isError: true,
        isThinkingLoading: false,
      });
      setIsLoading(false);
    };

    // Sends the message via the API service with conversation history
    await apiServiceRef.current.sendMessage(
      userMessage.content,
      selectedModel?.id!,
      conversationHistory,
      onMessageUpdate,
      onComplete,
      onError
    );
  }, [
    currentMessage,
    selectedModel,
    createUserMessage,
    createAiMessagePlaceholder,
    updateMessage,
    getConversationHistory,
  ]);

  /**
   * Manages update message sending
   */
  const handleSendUpdateMessage = useCallback(async (userMessage: Message, conversation: Message[]) => {
    if (!apiServiceRef.current) return;

    setError(null);
    setIsLoading(true);

    // Create messages
    const aiMessage = createAiMessagePlaceholder(userMessage.model!);

    // Get conversation history before adding new messages
    const conversationHistory = getConversationHistory(conversation);

    // Adds messages to the list
    setMessages([...conversation, userMessage, aiMessage]);

    // Callbacks for the API service
    const onMessageUpdate = (updates: Partial<Message>) => {
      updateMessage(aiMessage.id, updates);
    };

    const onComplete = (finalMessage: Partial<Message>) => {
      updateMessage(aiMessage.id, finalMessage);
      setIsLoading(false);
    };

    const onError = (errorMessage: string) => {
      setError(errorMessage);
      updateMessage(aiMessage.id, {
        content: errorMessage,
        model: userMessage.model!,
        isError: true,
        isThinkingLoading: false,
      });
      setIsLoading(false);
    };

    // Sends the message via the API service with conversation history
    await apiServiceRef.current.sendMessage(
      userMessage.content,
      userMessage.model!,
      conversationHistory,
      onMessageUpdate,
      onComplete,
      onError
    );
  }, [
    createAiMessagePlaceholder,
    updateMessage,
    getConversationHistory,
  ]);

  /**
   * Stop the current generation
   */
  const handleStopGeneration = useCallback(() => {
    if (apiServiceRef.current?.isRequesting) {
      apiServiceRef.current.abort();
      setIsLoading(false);

      // Marks the last message as interrupted
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "assistant") {
        updateMessage(lastMessage.id, {
          isError: true,
          isThinkingLoading: false,
          loaded: lastMessage.content.length > 0 ? true : false,
        });
      }
    }
  }, [messages]);

  return {
    // State
    messages,
    currentMessage,
    selectedModel,
    isLoading,
    error,

    // Setters
    setCurrentMessage,
    setSelectedModel,

    // Actions
    handleSendMessage,
    handleSendUpdateMessage,
    handleStopGeneration,
  };
};
