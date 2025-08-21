import { fetchMessages, sendChatMessage } from "@/services/chat-session";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useEffect, useRef, useCallback, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "@/utils/constants";
import { ChatSSEMessage } from "@/types/chat";
import { MyUIMessage } from "@/types/message-schema";
import { createIdGenerator } from "ai";

const messageId = createIdGenerator({
  prefix: "msgc",
  size: 16,
});
export const useChat = (sessionId: string) => {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const [shouldConnectSSE, setShouldConnectSSE] = useState(false);

  const {
    data: messages,
    isPending: isFetchLoading,
    error,
  } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => fetchMessages(sessionId),
  });

  const { mutate: sendMessage, isPending: isSendLoading } = useMutation({
    mutationFn: async (prompt: string) => {
      setShouldConnectSSE(true)
      return sendChatMessage(sessionId, prompt);
    },
    onMutate(prompt) {
      const temporaryMessage: MyUIMessage = {
        id: messageId(),
        role: "user",
        parts: [{ type: "text", text: prompt }],
        metadata: {
          sessionId,
          createdAt: new Date(),
          confidence: "medium",
        },
      };

      queryClient.setQueryData<MyUIMessage[]>(
        ["messages", sessionId],
        (oldMessages) => {
          if (oldMessages) {
            return [...oldMessages, temporaryMessage];
          }
          return [temporaryMessage];
        }
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["messages", sessionId] });
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
      setShouldConnectSSE(false)

    },
  });

  const handleSSEMessage = useCallback(
    (event: MessageEvent) => {
      console.log("SSE message:", event.data);
      try {
        const data: ChatSSEMessage = JSON.parse(event.data);

        switch (data.type) {
          case "generating":
            break;

          case "message_error":
            const errorMsg = data.data as string;
            toast.error(errorMsg);
            break;

          case "message_result":
            const message = data.data as MyUIMessage;
            queryClient.setQueryData<MyUIMessage[]>(
              ["messages", sessionId],
              (oldMessages) => {
                if (oldMessages) {
                  const exists = oldMessages.some(
                    (msg) => msg.id === message.id
                  );
                  if (exists) return oldMessages;
                  return [...oldMessages, message];
                }
                return [message];
              }
            );
            break;

          default:
            console.warn("Unknown SSE message type:", data.type);
        }
      } catch (err) {
        console.error("Failed to parse SSE message:", err);
        toast.error("Failed to process message");
      }
    },
    [sessionId, queryClient]
  );

  useEffect(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `${API_URL}/chat-session/${sessionId}/stream`
    );
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = handleSSEMessage;

    eventSource.onerror = (err) => {
      console.error("Chat SSE error:", err);
      toast.error("Chat Connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [sessionId, handleSSEMessage]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return {
    error,
    messages,
    isFetchLoading,
    sendMessage,
    isSendLoading,
  };
};
