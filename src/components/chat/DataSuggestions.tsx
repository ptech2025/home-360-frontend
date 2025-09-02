import { MessageCircleDashed } from "lucide-react";
import { Suggestion } from "../ai-elements/suggestion";

type Props = {
  suggestions: string[] | undefined;
  setPrompt: (str: string) => void;
};

function DataSuggestions({ suggestions, setPrompt }: Props) {
  if (suggestions && suggestions.length > 0) {
    return (
      <div className="flex  flex-col items-start gap-2">
        {suggestions.map((suggestion, idx) => (
          <Suggestion
            suggestion={suggestion}
            key={idx}
            onClick={setPrompt}
            className="text-dark-orange h-10 justify-between items-center gap-1 w-full  "
          >
            <span className="text-xs text-start truncate">{suggestion}</span>
            <MessageCircleDashed className="size-4" />
          </Suggestion>
        ))}
      </div>
    );
  }
}
export default DataSuggestions;
