"use client";

import { StarIcon } from "@/components/global/Icons";
import { Badge } from "../ui/badge";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
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
import { samplePrompts } from "@/utils/options";
import { initiateProjectServer } from "@/lib/actions";
import DisplayRecording from "../chat/DisplayRecording";

type Props = {
  name: string;
  userId: string;
};

function InitProject({ name, userId }: Props) {
  const [prompt, setPrompt] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [promptMode, setPromptMode] = useState<"text" | "audio">("text");
  const firstName = name.split(" ")[0];

  const { isRecording, startRecording, stopRecording, isTranscribing, timer } =
    useAudioRecorder({
      eventId: userId,
      onTranscriptionComplete: (final) => {
        setPrompt((prev) => prev + "\n" + final);
        setPromptMode("text");
      },
    });

  const { mutate, isPending: isSendLoading } = useMutation({
    mutationFn: async (data: { prompt: string; projectTitle: string }) => {
      return initiateProjectServer(data);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      if (msg !== "NEXT_REDIRECT") {
        toast.error(msg);
      }
    },
  });

  return (
    <div className="flex flex-col max-w-[500px] w-full mx-auto gap-24 items-center justify-end">
      <div className="flex w-full flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          <StarIcon className="text-dark-orange" />
          <Badge className="bg-dark-orange/10 p-1 px-2 gap-2 rounded-2xl text-dark-orange">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dark-orange opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-dark-orange"></span>
            </span>

            <span>Get Started</span>
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl text-center text-wrap text-main-blue font-semibold ">
            Welcome {firstName}, ready to create your estimate?
          </h1>
          <p className="text-base text-center text-main-blue">
            Describe the work you’d like done, and I’ll help you build a clear,
            professional estimate in just a few seconds.
          </p>
        </div>{" "}
        <div className="flex flex-col items-center w-full gap-2">
          <span className="text-xs text-black italic">
            {" "}
            Try one of these example prompts:
          </span>
          <Suggestions className="flex w-full justify-center flex-wrap items-center">
            {samplePrompts.map((prompt) => (
              <Suggestion
                key={prompt.text}
                suggestion={prompt.text}
                className="text-dark-orange bg-main-blue/10"
                onClick={() => {
                  setPrompt(prompt.text);
                  setProjectTitle(prompt.projectTitle);
                }}
              />
            ))}
          </Suggestions>
        </div>
      </div>
      {isSendLoading && (
        <div className="flex flex-col items-center gap-2">
          <Loader />
        </div>
      )}

      <div className="w-full max-w-[600px]">
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
              mutate({ prompt, projectTitle });
              setPrompt("");
              setProjectTitle("");
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
export default InitProject;
