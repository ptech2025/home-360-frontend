import ChatEmpty from "./ChatEmpty";
import ChatPanelHeader from "./ChatPanelHeader";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

import { Loader } from "@/components/ai-elements/loader";
import { MicIcon } from "lucide-react";
import { useState } from "react";

import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useChat } from "@/hooks/use-chat";
import ConversationWrapper from "./ConversationWrapper";
import DisplayRecording from "./DisplayRecording";

type ChatPanelProps = {
  sessionId: string;
};
export default function ChatPanel({ sessionId }: ChatPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [promptMode, setPromptMode] = useState<"text" | "audio">("text");
  const { messages, sendMessage, isFetchLoading, isSendLoading } =
    useChat(sessionId);
  const {
    isRecording,
    startRecording,
    stopRecording,
    isTranscribing,
    timer,
    error,
  } = useAudioRecorder({
    eventId: sessionId,
    onTranscriptionComplete: (final) => {
      setPrompt((prev) => prev + "\n" + final);
      setPromptMode("text");
    },
  });

  return (
    <div className="bg-sidebar grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 p-4 pr-0 rounded-lg  shadow-sm border border-sidebar-border h-full">
      <ChatPanelHeader firstMessage={messages ? messages[0] : null} />
      <div className="flex w-full items-start justify-center overflow-y-auto pb-16 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-orange scrollbar-track-dark-orange/20">
        {messages && messages.length > 0 ? (
          <ConversationWrapper messages={messages} sessionId={sessionId} />
        ) : (
          <ChatEmpty setPrompt={setPrompt} />
        )}
      </div>
      <div className="pr-4 w-full">
        {(promptMode === "audio" && isRecording) || isTranscribing ? (
          <DisplayRecording
            stopRecording={stopRecording}
            isTranscribing={isTranscribing}
            timer={timer}
          />
        ) : (
          <PromptInput
            onSubmit={(e) => {
              e.preventDefault();
              if (prompt.trim().length === 0) return;
              sendMessage(prompt);
              setPrompt("");
            }}
            className="w-full relative"
          >
            <PromptInputTextarea
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              value={prompt}
              placeholder="Describe your project — QuickEstimate’s got you!"
            />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton
                  type="button"
                  disabled={isSendLoading || isRecording || isTranscribing}
                  onClick={() => {
                    startRecording();
                    setPromptMode("audio");
                  }}
                  className="text-main-blue"
                >
                  <MicIcon />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit
                disabled={
                  prompt.length === 0 ||
                  isSendLoading ||
                  isRecording ||
                  isTranscribing
                }
                className="absolute bg-main-blue/10 hover:bg-dark-orange/20 text-black right-1 bottom-1"
                status={isSendLoading ? "submitted" : "ready"}
              />
            </PromptInputToolbar>
          </PromptInput>
        )}
      </div>
    </div>
  );
}
