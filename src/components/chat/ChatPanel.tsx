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

import { MicIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { toast } from "sonner";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useChat } from "@/hooks/use-chat";
import ConversationWrapper from "./ConversationWrapper";
import DisplayRecording from "./DisplayRecording";
import { useRouter } from "nextjs-toploader/app";

type ChatPanelProps = {
  sessionId: string;
};
export default function ChatPanel({ sessionId }: ChatPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [promptMode, setPromptMode] = useState<"text" | "audio">("text");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { replace } = useRouter();

  const { messages, sendMessage, isSendLoading, isFetchLoading, isGenerating } =
    useChat(sessionId);
  const { isRecording, startRecording, stopRecording, isTranscribing, timer } =
    useAudioRecorder({
      eventId: sessionId,
      onTranscriptionComplete: (final) => {
        setPrompt((prev) => prev + "\n" + final);
        setPromptMode("text");
      },
    });

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth", // use "auto" if you don't want animation
    });

    if (!messages) {
      toast.error(`Unable to load messages for ${sessionId}`);
    }
  }, [messages, sessionId]);

  useEffect(() => {
    if (!isFetchLoading && !messages) {
      toast.error(`Unable to load messages for ${sessionId}`);
      replace("/dashboard/projects");
    }
  }, [isFetchLoading, sessionId, replace, messages]);

  return (
    <div className="bg-sidebar grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 p-4 pr-0 rounded-t-lg rounded-b-4xl  border border-sidebar-border h-full">
      <ChatPanelHeader firstMessage={messages?.[0] ?? null} />
      <div
        ref={scrollContainerRef}
        className="flex w-full items-start justify-center overflow-y-auto pb-16 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-orange scrollbar-track-dark-orange/20"
      >
        {messages && messages.length > 0 ? (
          <ConversationWrapper
            messages={messages}
            sessionId={sessionId}
            isGenerating={isSendLoading || isGenerating}
            setPrompt={setPrompt}
          />
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
                status={isSendLoading ? "streaming" : "ready"}
              />
            </PromptInputToolbar>
          </PromptInput>
        )}
      </div>
    </div>
  );
}
