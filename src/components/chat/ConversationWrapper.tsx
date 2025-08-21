import { MyUIMessage } from "@/types/message-schema";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "../ai-elements/message";
import ChatEstimate from "./ChatEstimate";

type Props = {
  messages: MyUIMessage[];
  sessionId: string;
};

function ConversationWrapper({ messages, sessionId }: Props) {
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
                  case "data-estimate":
                    return (
                      <>
                        {part.data.notes && (
                          <p key={`${message.id}-${i}-notes`} className="pt-4">
                            {part.data.notes}
                          </p>
                        )}
                      </>
                    );

                  default:
                    return null;
                }
              })}
            </MessageContent>
            {message.parts.some((part) => part.type === "data-estimate") && (
              <ChatEstimate
                sessionId={sessionId}
                key={`${message.id}-${message.metadata?.estimatedId}`}
                estimate={
                  message.parts.find((part) => part.type === "data-estimate")
                    ?.data
                }
                metadata={message.metadata}
              />
            )}
          </Message>
        ))}
      </ConversationContent>
    </Conversation>
  );
}
export default ConversationWrapper;
