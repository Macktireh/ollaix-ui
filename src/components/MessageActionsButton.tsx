import { CopyButton } from "@/components/CopyButton";
import { EditButton } from "@/components/EdidButton";
import { LikeDislikeButton } from "@/components/LikeDislikeButton";
import type { Message } from "@/utils/types";

type Props = {
  message: Message;
  isUser: boolean;
  modify: () => void;
};

export function MessageActionsButton({ message, isUser, modify }: Props) {
  return (
    <div
      className={`chat-footer text-xs opacity-70 pb-1 ${isUser && "invisible"}`}
    >
      <div className="flex items-center mt-1">
        {isUser ? (
          <>
            <CopyButton text={message.content} />
            <EditButton setEditing={modify} />
          </>
        ) : (
          message.loaded && (
            <>
              <CopyButton text={message.content} />
              <LikeDislikeButton />
            </>
          )
        )}
      </div>
    </div>
  );
}
