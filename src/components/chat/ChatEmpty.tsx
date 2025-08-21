import { StarIcon } from "@/components/global/Icons";
import { Badge } from "@/components/ui/badge";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

import { samplePrompts } from "@/utils/options";

type Props = {
  setPrompt: (prompt: string) => void;
};

function ChatEmpty({ setPrompt }: Props) {
  return (
    <div className="flex max-w-[500px] mx-auto flex-col gap-6 items-center justify-center">
      <div className="flex flex-col gap-6 items-center">
        <StarIcon className="text-dark-orange" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-base md:text-lg text-main-blue font-medium ">
          How can I help you?
        </h1>
        <p className="md:text-sm text-xs text-center text-main-blue">
          Describe the work you’d like done, and I’ll help you build a clear,
          professional estimate in just a few seconds.
        </p>
      </div>{" "}
      <div className="flex flex-col items-center gap-2 overflow-x-auto ">
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
              }}
            />
          ))}
        </Suggestions>
      </div>
    </div>
  );
}
export default ChatEmpty;
