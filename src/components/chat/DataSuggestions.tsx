import { Suggestion } from "../ai-elements/suggestion";
import { PromptStarIcon } from "../global/Icons";

type Props = {
  suggestions: string[] | undefined;
  setPrompt: (str: string) => void;
};

function DataSuggestions({ suggestions, setPrompt }: Props) {
  if (suggestions && suggestions.length > 0) {
    return (
      <div className="flex w-full flex-col items-start gap-1.5 overflow-x-hidden">
        <span className="text-xs text-black italic">
          {" "}
          Try one of these example prompts:
        </span>
        <div className="flex overflow-x-hidden w-full flex-col items-start gap-1">
          {suggestions.map((suggestion, idx) => (
            <Suggestion
              suggestion={suggestion}
              key={idx}
              onClick={setPrompt}
              className="text-dark-orange flex justify-start overflow-x-hidden! items-center w-full "
            >
              <PromptStarIcon className="shrink-0" />
              <span className="text-xs block text-start truncate">
                {suggestion}
              </span>
            </Suggestion>
          ))}
        </div>
      </div>
    );
  }
}
export default DataSuggestions;
