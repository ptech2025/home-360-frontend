import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "use-debounce";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CommandLoading } from "cmdk";
import { Button } from "../ui/button";
import { MapPin, Map, Ban, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

import { fetchPlaces } from "@/services/user";
import { PlaceSuggestion } from "@/types";
import { updateProjectAddress, updateProjectStatus } from "@/services/project";
import { ProjectStatus } from "@/types/project";
import { renderStatusIcon, renderStatusStyle } from "./DisplayProjectStatus";
import { cn } from "@/lib/utils";

type AddressProjectDropdownMenuProps = {
  address: string;
  projectId: string;
};
type NoAddressProjectDropdownMenuProps = {
  projectId: string;
};

type ProjectStatusDropdownMenuProps = {
  projectId: string;
  status: ProjectStatus;
};

type AddressItemProps = {
  address: string;
  handleClose: () => void;
  projectId: string;
  matched: boolean;
};

type AddressCommandProps = {
  isLoading: boolean;
  setSearchVal: (search: string) => void;
  suggestions: PlaceSuggestion[];
  searchVal: string;
  handleClose: () => void;
  projectId: string;
  currentAddress?: string;
};

function AddressItem({
  address,
  handleClose,
  projectId,
  matched,
}: AddressItemProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return updateProjectAddress(address, projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["single_project", { projectId }],
      });
      toast.success("Project updated successfully.");
      handleClose();
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <CommandItem
      disabled={isPending}
      value={address}
      onSelect={() => mutate()}
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

function AddressCommand({
  searchVal,
  setSearchVal,
  isLoading,
  suggestions,
  handleClose,
  projectId,
  currentAddress,
}: AddressCommandProps) {
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
          <CommandGroup heading="Address">
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
                projectId={projectId}
              />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

export function NoAddressProjectDropdownMenu({
  projectId,
}: NoAddressProjectDropdownMenuProps) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);

  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["placeSuggestions", debouncedSearchVal],
    queryFn: () => fetchPlaces(debouncedSearchVal),
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-xl gap-1 hover:shadow-sm  border-sidebar-border bg-transparent text-main-blue transition-colors duration-200  flex items-center py-1.5 px-4 text-sm capitalize border border-dashed">
        <MapPin className="size-4" />
        <span className="truncate">No Address</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"end"}
        side="bottom"
        className="min-w-[15rem]"
      >
        <AddressCommand
          isLoading={isLoading}
          projectId={projectId}
          suggestions={suggestions}
          handleClose={handleClose}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AddressProjectDropdownMenu({
  address,
  projectId,
}: AddressProjectDropdownMenuProps) {
  const [addressMode, setAddressMode] = useState<"add" | "assigned">(
    "assigned"
  );
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["placeSuggestions", debouncedSearchVal],
    queryFn: () => fetchPlaces(debouncedSearchVal),
  });

  const handleClose = () => {
    setOpen(false);
    setAddressMode("assigned");
  };

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-xl py-1.5 px-4 gap-1 hover:shadow-sm shadow-dark-orange/20 border-transparent bg-dark-orange/10 text-dark-orange transition-colors duration-200  flex items-center  text-sm capitalize border">
        <MapPin className="size-4" />
        <span className="truncate">{address}</span>
      </DropdownMenuTrigger>

      {addressMode === "assigned" ? (
        <DropdownMenuContent
          align={"end"}
          side="bottom"
          className="p-4 grid grid-cols-1 gap-4 min-w-[15rem]"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs text-main-blue">Project Address</span>
            <span className="text-sm font-medium text-main-blue">
              {address}
            </span>
          </div>
          <Button
            onClick={() => {
              setAddressMode("add");
            }}
            className="w-full h-10 rounded-3xl hover:text-white bg-main-blue/20 text-main-blue"
          >
            <span>Change address</span>
          </Button>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          align={"end"}
          side="bottom"
          className="min-w-[15rem]"
        >
          <AddressCommand
            isLoading={isLoading}
            projectId={projectId}
            suggestions={suggestions}
            handleClose={handleClose}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            currentAddress={address}
          />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export function ProjectStatusDropdownMenu({
  status,
  projectId,
}: ProjectStatusDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const statusOptions = Object.values(ProjectStatus).filter(
    (v): v is ProjectStatus => typeof v === "string"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (stat: ProjectStatus) => {
      return updateProjectStatus(stat, projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["single_project", { projectId }],
      });
      toast.success("Project updated successfully.");
      setOpen(false);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "capitalize hover:shadow-sm rounded-xl py-1.5 px-4 gap-1 [&_svg]:size-4    transition-colors duration-200  flex items-center text-sm ",
          renderStatusStyle(status)
        )}
      >
        {renderStatusIcon(status)}
        <span>{status.toString().replace("_", " ")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={"bottom"}
        align="end"
        className="flex flex-col w-max p-0 divide-y-muted divide-y"
      >
        {statusOptions.map((stat) => (
          <Button
            key={stat}
            disabled={isPending}
            onClick={() => mutate(stat)}
            className={cn(
              "rounded-none [&_svg]:size-4 last:rounded-b-md justify-between items-center gap-2 first:rounded-t-md   text-xs   capitalize w-full",
              renderStatusStyle(stat),
              "bg-transparent hover:bg-main-blue/10"
            )}
          >
            <div className="flex items-center gap-1">
              {renderStatusIcon(stat)}
              <span>{stat.toString().replace("_", " ")}</span>
            </div>
            {
              <Check
                className={cn(
                  "size-4  text-green-500",
                  stat === status ? "visible" : "invisible"
                )}
              />
            }
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
