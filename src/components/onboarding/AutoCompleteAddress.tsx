"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Map, MapPin } from "lucide-react";

import { DynamicLocationStatus, PlaceSuggestion } from "@/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user";

interface AutoCompleteAddressProps {
  isFormLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  citiesOnly?: boolean;
  usOnly?: boolean;
}

export default function AutoCompleteAddress({
  value,
  isFormLoading,
  onChange,
  citiesOnly,
  usOnly = true,
}: AutoCompleteAddressProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 400);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
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

  const { isLoading, data } = useQuery(
    userQueries.fetchPlaces({
      query: debouncedQuery,
      citiesOnly,
      usOnly,
    })
  );

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  return (
    <>
      <div className={cn("w-full relative min-h-40")}>
        <div className="relative">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute left-0 top-0 h-full"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Input
            type="search"
            disabled={isFormLoading}
            placeholder={`Search for a location...`}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pl-10 h-11"
            aria-label="Search input"
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={suggestions.length > 0}
          />
        </div>

        {/* Loading */}
        {isLoading && isFocused && (
          <div className="mt-2 p-2 bg-background border rounded-md min-h-35 flex items-center justify-center shadow-sm absolute z-10 w-full">
            <Loader2 className="animate-spin text-main-yellow" />
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
                <div className="flex items-center gap-2 justify-start">
                  <div className="size-10 flex items-center justify-center shrink-0  bg-input rounded-full p-2">
                    <MapPin className="size-5 text-black" />
                  </div>
                  <span>{s.description}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && suggestions.length === 0 && (
          <div className="flex flex-col items-center p-2 gap-2 mt-2">
            <div className="size-10 flex items-center justify-center shrink-0 border border-input rounded-lg p-2">
              <Map className="size-5 text-black" />
            </div>
            <p className="text-sm capitalize text-black text-center">
              No results found
            </p>
          </div>
        )}
      </div>
    </>
  );
}
