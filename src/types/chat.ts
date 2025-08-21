import { MyUIMessage } from "./message-schema";

export interface ChatSession {
  userId: string;
  id: string;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  createdAt: Date;
  messages: MyUIMessage[];
}

export type EventType =
  | "message"
  | "generating"
  | "message_result"
  | "message_error"
  | "heartbeat"
  | "transcribing"
  | "transcript_result"
  | "transcript_error";

export interface ChatSSEMessage {
  type: EventType;
  data: MyUIMessage | string;
}

export interface TranscriptionSSEMessage {
  type: EventType;
  data: string; // the actual payload
}
