import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp, CircleStop } from "lucide-react";

import { useModels } from "@/hooks/useModels";
import { defaultModelId, type ModelType } from "@/utils/types";

type Props = {
  currentMessage: string;
  onInputChange: (value: string) => void;
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onSendMessage: () => void;
  onStopGeneration: () => void;
  isLoading: boolean;
};

export const ChatForm = ({
  currentMessage,
  onInputChange,
  selectedModel,
  onModelChange,
  onSendMessage,
  onStopGeneration,
  isLoading,
}: Props) => {
  const { t } = useTranslation();
  const models = useModels();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (models.length !== 0) onModelChange(models.find((m) => m.id === defaultModelId) || models[0]);
  }, [models]);

  const getModelById = (id: string) => {
    onModelChange(models.find((m) => m.id === id)!);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    onInputChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (!isLoading && selectedModel && currentMessage.trim()) {
      resizeTextarea();
      onSendMessage();
    }
  };

  const resizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-[100%] max-w-[768px] px-2 pt-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-between gap-0.5 p-3 border-2 border-base-content/20 rounded-2xl shadow-sm"
      >
        <textarea
          ref={inputRef}
          placeholder={t("chatform.placeholder")}
          value={currentMessage}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading || models.length === 0 || !selectedModel}
          aria-label="Message to send"
          rows={1}
          className="textarea textarea-md w-full min-h-[10px] max-h-30 resize-none border-none outline-none focus:ring-0 focus:ring-offset-0 focus:border-none focus:outline-none disabled:bg-base-100"
        />
        <div className="flex w-full justify-between">
          {models.length === 0 || !selectedModel ? (
            <div className="skeleton h-6 w-35"></div>
          ) : (
            <select
              id="model"
              value={selectedModel.id}
              onChange={(e) => getModelById(e.target.value)}
              className="select w-35 border-none h-8 pl-2  disabled:bg-base-100"
              disabled={isLoading}
              aria-label="Select a model"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          )}
          <button
            type={`${isLoading ? "button" : "submit"}`}
            onClick={onStopGeneration}
            className={`btn p-1 size-8 rounded-lg${
              isLoading ? " btn-error" : " btn-secondary"
            }`}
            aria-label={`${isLoading ? "Stop generation" : "Send message"}`}
            disabled={isLoading ? false : !currentMessage.trim()}
          >
            {isLoading ? <CircleStop color="#333" /> : <ArrowUp />}
          </button>
        </div>
      </form>
    </div>
  );
};
