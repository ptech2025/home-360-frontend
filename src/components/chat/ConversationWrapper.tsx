import { MyUIMessage } from "@/types/message-schema";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "../ai-elements/message";
import ChatEstimate from "./ChatEstimate";
import { StarIcon } from "../global/Icons";
import DataSuggestions from "./DataSuggestions";

type Props = {
  messages: MyUIMessage[];
  sessionId: string;
  isGenerating: boolean;
  setPrompt: (message: string) => void;
};

function ConversationWrapper({
  messages,
  sessionId,
  isGenerating,
  setPrompt,
}: Props) {
  return (
    <Conversation>
      <ConversationContent className="p-2.5">
        {messages.map((message) => (
          <Message
            from={message.role}
            key={message.id}
            className="flex-col data-[state=assistant]:items-start gap-4"
          >
            <MessageContent>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text": // we don't use any reasoning or tool calls in this example
                    return <p key={`${message.id}-${i}`}>{part.text}</p>;
                  case "data-response":
                    return <p key={`${message.id}-${i}`}>{part.data}</p>;

                  default:
                    return null;
                }
              })}
            </MessageContent>
            {message.parts.some((part) => part.type === "data-estimate") && (
              <>
                {message.parts.find((part) => part.type === "data-estimate")
                  ?.data ? (
                  <ChatEstimate
                    sessionId={sessionId}
                    key={`${message.id}-${message.metadata?.estimatedId}`}
                    estimate={
                      message.parts.find(
                        (part) => part.type === "data-estimate"
                      )?.data
                    }
                    metadata={message.metadata}
                  />
                ) : (
                  <DataSuggestions
                    key={`${message.id}-suggestions`}
                    setPrompt={setPrompt}
                    suggestions={
                      message.parts.find(
                        (part) => part.type === "data-suggestions"
                      )?.data
                    }
                  />
                )}
              </>
            )}
          </Message>
        ))}
      </ConversationContent>
      {isGenerating && (
        <StarIcon className="w-6 h-6 animate-bounce text-dark-orange" />
      )}
    </Conversation>
  );
}
export default ConversationWrapper;
