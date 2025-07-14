import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  thinkingContent: string;
  isLoadingThinking: boolean;
}

export const ThinkingDisplay = ({
  thinkingContent,
  isLoadingThinking,
}: Props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thinkingContent.trim()) return null;

  return (
    <div className="mb-3 border-2 border-base-300 rounded-lg overflow-hidden bg-base-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 p-3 hover:bg-base-200/40 transition-colors text-left cursor-pointer"
      >
        {isLoadingThinking ? (
          <>
            <span className="loading loading-sm"></span>
            <span className="text-sm font-medium text-base-content/80 flex-grow">
              {t("chat.message.thinking.loading.title")}
            </span>
          </>
        ) : (
          <>
            <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <span className="text-sm font-medium text-base-content/80 flex-grow">
              {t("chat.message.thinking.title")}
            </span>
          </>
        )}
        {isExpanded ? (
          <ChevronUpIcon className="w-4 h-4 text-base-content/60" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-base-content/60" />
        )}
      </button>
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-base-300 bg-base-50">
          <div className="text-sm text-base-content/50 italic leading-relaxed whitespace-pre-wrap">
            {thinkingContent}
          </div>
        </div>
      )}
    </div>
  );
};
