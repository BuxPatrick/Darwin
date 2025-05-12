
import { MessageType } from "@/context/ChatContext";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.sender === "user";
  
  return (
    <div
      className={cn(
        "flex mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser ? "message-user rounded-tr-none" : "message-ai rounded-tl-none"
        )}
      >
        <div className="flex justify-between items-start mb-1">
          <span className="font-semibold text-sm">
            {isUser ? "You" : "Darwin"}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
