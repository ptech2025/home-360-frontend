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
import { fetchAllClients } from "@/services/client";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CommandLoading } from "cmdk";
import { Client } from "@/types/client";
import { Button } from "../ui/button";
import { Check, Mail, MapPin, Phone, Plus, Loader2 } from "lucide-react";
import { AddClientDialog } from "./ClientsDialogs";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { addClientToProject } from "@/services/project";
import Link from "next/link";
import { PiUser } from "react-icons/pi";

type ClientItemProps = {
  client: Client;
  projectId: string;
  handleClose: () => void;
  matched: boolean;
  clientId: string;
};
type ClientProjectPopoverProps = {
  client: Client | null;
  projectId: string;
};

type AssignedClientProjectDropdownMenuProps = {
  client: Client;
  projectId: string;
};

type ClientCommandProps = {
  isLoading: boolean;
  setSearchVal: (search: string) => void;
  clients: Client[];
  searchVal: string;
  handleClose: () => void;
  projectId: string;
  currentClient: Client | null;
};

function ClientItem({
  client,
  handleClose,
  projectId,
  matched,
  clientId,
}: ClientItemProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return addClientToProject(projectId, client.id);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      queryClient.invalidateQueries({
        queryKey: ["single_project", { projectId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["single_client", clientId],
      });

      toast.success("Client assigned to project successfully.");
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
      value={client.id}
      onSelect={() => mutate()}
      className="cursor-pointer hover:bg-main-blue/20 flex justify-between items-center gap-2"
    >
      <span>{client.name}</span>
      {matched && <Check className="text-green-500 size-4 shrink-0" />}
    </CommandItem>
  );
}

function ClientCommand({
  clients,
  setSearchVal,
  searchVal,
  isLoading,
  handleClose,
  projectId,
  currentClient,
}: ClientCommandProps) {
  return (
    <Command className="w-full">
      {/* 🔹 Replace CommandInput with custom input */}
      <div className="p-1 border-b">
        <Input
          type="search"
          placeholder="Search clients..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full border px-2 py-1 text-sm rounded-md"
        />
      </div>

      <CommandList>
        {/* 🔹 Custom loading state */}
        {isLoading && (
          <CommandLoading>
            <div className="p-2 text-sm flex items-center justify-center text-muted-foreground">
              <Loader2 className="animate-spin text-dark-orange" />
            </div>
          </CommandLoading>
        )}

        {!isLoading && clients.length === 0 && (
          <CommandEmpty>No clients found.</CommandEmpty>
        )}

        {!isLoading && clients.length > 0 && (
          <CommandGroup heading="Clients">
            {clients.map((c) => (
              <ClientItem
                key={c.id}
                matched={currentClient ? currentClient.id === c.id : false}
                client={c}
                handleClose={handleClose}
                projectId={projectId}
                clientId={currentClient ? currentClient.id : ""}
              />
            ))}
          </CommandGroup>
        )}

        <CommandGroup>
          <AddClientDialog>
            <Button className="w-full bg-transparent text-main-blue shadow-none hover:bg-main-blue/20">
              <Plus />
              <span>Add Client</span>
            </Button>
          </AddClientDialog>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function ClientProjectPopover({
  projectId,
  client,
}: ClientProjectPopoverProps) {
  const [allClientsOpen, setAllClientsOpen] = useState(false);
  const searchParams = useSearchParams();

  // controlled search state
  const [searchVal, setSearchVal] = useState(searchParams?.get("client") || "");
  const [clients, setClients] = useState<Client[]>([]);
  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["clients", { page: 1, client: debouncedSearchVal, size: 5 }],
    queryFn: () =>
      fetchAllClients({ page: 1, client: debouncedSearchVal, size: 5 }),
  });

  const handleClose = () => {
    setAllClientsOpen(false);
  };

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);

  return (
    <DropdownMenu open={allClientsOpen} onOpenChange={setAllClientsOpen}>
      <DropdownMenuTrigger className="rounded-3xl gap-1 hover:shadow-sm text-main-blue flex items-center py-1 px-3 text-xs capitalize border border-sidebar-border">
        <Plus className="size-4" />
        <span>Add Client</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0.5 min-w-[15rem]">
        <ClientCommand
          isLoading={isLoading}
          projectId={projectId}
          clients={clients}
          handleClose={handleClose}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          currentClient={client}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AssignedClientProjectDropdownMenu({
  client,
  projectId,
}: AssignedClientProjectDropdownMenuProps) {
  const [clientOpen, setClientOpen] = useState(false);
  const [clientMode, setClientMode] = useState<"add" | "assigned">("assigned");

  // controlled search state
  const [searchVal, setSearchVal] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["clients", { page: 1, client: debouncedSearchVal, size: 5 }],
    queryFn: () =>
      fetchAllClients({ page: 1, client: debouncedSearchVal, size: 5 }),
  });
  const handleClose = () => {
    setClientOpen(false);
    setClientMode("assigned");
  };

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);

  return (
    <DropdownMenu open={clientOpen} onOpenChange={setClientOpen}>
      <DropdownMenuTrigger className="rounded-3xl flex items-center gap-1 py-1 px-3 text-xs capitalize border-0 bg-green-100 shadow-green-200 text-green-500 hover:shadow-sm">
        <PiUser className="size-4" />
        <span>{client.name}</span>
      </DropdownMenuTrigger>
      {clientMode === "assigned" ? (
        <DropdownMenuContent className="p-4  grid grid-cols-1 gap-4 min-w-[15rem]">
          <h4>{client.name}</h4>
          <div className="grid grid-cols-1 w-full gap-2">
            <div className="flex items-center justify-start gap-2 w-full">
              <Mail className="size-4 text-dark-orange" />
              <span className="truncate text-main-blue text-xs">
                {client.email}
              </span>
            </div>{" "}
            <div className="flex items-center justify-start gap-2 w-full">
              <Phone className="size-4 text-dark-orange" />
              <span className="truncate text-main-blue text-xs">
                {client.phone ? client.phone : "No Phone Number"}
              </span>
            </div>{" "}
            <div className="flex items-center justify-start gap-2 w-full">
              <MapPin className="size-4 text-dark-orange" />
              <span className="truncate text-main-blue text-xs">
                {client.address ? client.address : "No Address"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 w-full gap-2">
            <Button
              className="bg-dark-orange hover:bg-dark-orange/80 rounded-3xl text-white"
              asChild
            >
              <Link href={`/dashboard/clients/${client.id}`}>
                <span>See client projects</span>
              </Link>
            </Button>{" "}
            <Button
              onClick={() => {
                setClientMode("add");
              }}
              className="w-full h-10 rounded-3xl hover:text-white bg-main-blue/20 text-main-blue"
            >
              <span>Assign different client</span>
            </Button>
          </div>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="p-0.5 min-w-[15rem]">
          <ClientCommand
            isLoading={isLoading}
            projectId={projectId}
            clients={clients}
            handleClose={handleClose}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            currentClient={client}
          />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
