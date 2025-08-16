"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Map } from "lucide-react";
import { fetchPlaces } from "@/services/user";

import { PlaceSuggestion } from "@/types";

interface AutoCompleteProps {
  isAllowAccessLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  handleAutoSelect: () => void;
}

export default function Autocomplete({
  value = "",
  isAllowAccessLoading,
  handleAutoSelect,
  onChange,
}: AutoCompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSuggestionsCallback = useCallback(async (q: string) => {
    if (q.trim() === "") {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    const results = await fetchPlaces(q);
    setSuggestions(results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery && isFocused) {
      fetchSuggestionsCallback(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, fetchSuggestionsCallback, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const chosen = suggestions[selectedIndex];
      setQuery(chosen.description);
      onChange?.(chosen.description);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    setQuery(suggestion.description);
    onChange(suggestion.description);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <>
      <div className="w-full relative">
        <div className="relative">
          <Input
            type="text"
            disabled={isAllowAccessLoading}
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pr-10 h-11"
            aria-label="Search input"
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={suggestions.length > 0}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Loading */}
        {isLoading && isFocused && (
          <div className="mt-2 p-2 bg-background border rounded-md shadow-sm absolute z-10 w-full">
            Loading...
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && !isLoading && isFocused && (
          <ul
            id="suggestions-list"
            className="mt-2 bg-background border rounded-md shadow-sm absolute z-10 w-full"
            role="listbox"
          >
            {suggestions.map((s, index) => (
              <li
                key={s.placeId}
                className={`px-4 py-2 cursor-pointer hover:bg-muted ${
                  index === selectedIndex ? "bg-muted" : ""
                }`}
                onClick={() => handleSuggestionClick(s)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {s.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {suggestions.length === 0 &&
        !isLoading &&
        debouncedQuery.length > 2 &&
        isFocused && (
          <div>
            <Button
              type="button"
              className="h-12 w-full hover:bg-main-blue bg-dark-orange"
              onClick={handleAutoSelect}
              disabled={isAllowAccessLoading}
              size="lg"
            >
              {isAllowAccessLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Allow location access</span>
              )}
            </Button>
          </div>
        )}
    </>
  );
}
