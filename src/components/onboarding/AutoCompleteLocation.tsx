"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { DynamicLocationStatus, PlaceSuggestion } from "@/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandLoading,
} from "../ui/command";

interface AutoCompleteLocationProps {
  isFormLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  mode: DynamicLocationStatus;
  className?: string;
  placeholder?: string;
}

export default function AutoCompleteLocation({
  value,
  isFormLoading,
  onChange,
  mode,
  placeholder,
  className,
}: AutoCompleteLocationProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const { isLoading, data } = useQuery(
    userQueries.fetchLocation({
      query: debouncedQuery,
      mode,
    })
  );

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
      onChange(chosen.description);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onChange(suggestion);
    setIsFocused(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);
  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <Command className={cn("w-full ")}>
        <Input
          type="text"
          disabled={isFormLoading}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={className}
          aria-label="Search input"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={isFocused}
        />

        {isFocused && (
          <div
            className={cn(
              "absolute z-50 top-full left-0 w-full mt-2 bg-white rounded-md",
              {
                "border border-input shadow-xs":
                  isLoading || suggestions.length > 0,
              }
            )}
          >
            <CommandList>
              {/* Loading */}
              {isLoading && (
                <CommandLoading className="rounded-md min-h-16 flex items-center justify-center">
                  <Loader2 className="animate-spin text-main-yellow" />
                </CommandLoading>
              )}

              {/* Suggestions */}
              {!isLoading && suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((s) => (
                    <CommandItem
                      key={s.placeId}
                      value={s.description}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(s.description);
                      }}
                      className="flex hover:bg-main-green/20 cursor-pointer items-center gap-2 text-sm font-circular-light hover:font-circular-medium"
                    >
                      <span>{s.description}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
