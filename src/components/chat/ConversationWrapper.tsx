import { MyUIMessage } from "@/types/message-schema";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "../ai-elements/message";
import { Response } from "@/components/ai-elements/response";
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
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.text}
                      </Response>
                    );
                  case "data-response":
                    return (
                      <Response key={`${message.id}-${i}`}>
                        {part.data}
                      </Response>
                    );
                  case "data-estimate":
                    return (
                      <>
                        {part.data.notes && (
                          <div
                            key={`${message.id}-${i}-notes`}
                            className="pt-4"
                          >
                            <Response>{part.data.notes}</Response>
                          </div>
                        )}
                      </>
                    );

                  default:
                    return null;
                }
              })}
            </MessageContent>
            {message.parts.some(
              (part) => part.type === "data-estimate"
            ) && (
              <ChatEstimate
                sessionId={sessionId}
                key={`${message.id}-estimate`}
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
