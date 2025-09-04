import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CommandLoading } from "cmdk";
import { MapPin, Map, Ban, Loader2 } from "lucide-react";

import { fetchPlaces } from "@/services/user";
import { PlaceSuggestion } from "@/types";

type AddressItemProps = {
  address: string;
  handleClose: (value: string) => void;
  matched: boolean;
};

type LocationCommandProps = {
  handleClose: (value: string) => void;
  currentAddress: string | undefined;
  usOnly: boolean;
};

function AddressItem({ address, handleClose, matched }: AddressItemProps) {
  return (
    <CommandItem
      value={address}
      onSelect={() => handleClose(address)}
      className={`cursor-pointer hover:bg-main-blue/20 flex text-sm items-center gap-2 ${
        matched ? "bg-main-blue/20" : "bg-transparent"
      }`}
    >
      <div className="size-8 flex items-center justify-center shrink-0  bg-input rounded-full p-2">
        <MapPin className="size-4 text-main-blue" />
      </div>
      <span>{address}</span>
    </CommandItem>
  );
}

function LocationCommand({
  handleClose,
  currentAddress,
  usOnly,
}: LocationCommandProps) {
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal] = useDebounce(searchVal, 300);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["placeSuggestions", debouncedSearchVal],
    queryFn: () => fetchPlaces({
      query: debouncedSearchVal,
      usOnly,
    }),
  });

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);
  return (
    <Command className="w-full">
      {/* 🔹 Replace CommandInput with custom input */}
      <div className="p-1 border-b">
        <Input
          type="search"
          placeholder="Search address..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full border px-2 py-1 text-sm rounded-md"
        />
      </div>

      <CommandList>
        {/* 🔹 Custom loading state */}
        {isLoading && (
          <CommandLoading>
            <div className="p-2 text-sm justify-center items-center flex text-muted-foreground">
              <Loader2 className="animate-spin text-dark-orange" />
            </div>
          </CommandLoading>
        )}

        {!isLoading && suggestions.length === 0 && (
          <CommandEmpty className="flex py-4 text-main-blue flex-col gap-2 items-center justify-center">
            {searchVal.trim().length === 0 ? (
              <Map className={"size-4"} />
            ) : (
              <Ban className={"size-4"} />
            )}
            <span className="text-xs text-main-blue">
              {searchVal.trim().length === 0
                ? "Add where the work is happening."
                : "No results found"}
            </span>
          </CommandEmpty>
        )}

        {!isLoading && suggestions.length > 0 && (
          <CommandGroup>
            {suggestions.map((sug) => (
              <AddressItem
                key={sug.placeId}
                address={sug.description}
                matched={
                  currentAddress
                    ? currentAddress.toLowerCase() ===
                      sug.description.toLowerCase()
                    : false
                }
                handleClose={handleClose}
              />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

export default LocationCommand;
