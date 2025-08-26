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
import { formatNameWithDot } from "@/utils/funcs";
import { fetchAllClients } from "@/services/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CommandLoading } from "cmdk";
import { Client } from "@/types/client";
import { Button } from "../ui/button";
import { Check, Mail, MapPin, Phone, Plus } from "lucide-react";
import { AddClientDialog } from "./ClientsDialogs";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { addClientToProject } from "@/services/project";
import Link from "next/link";

type ClientItemProps = {
  client: Client;
  projectId: string;
  setOpen: (open: boolean) => void;
  assignedId: boolean;
};
type ClientProjectPopoverProps = {
  client: Client | null;
  projectId: string;
};

type AssignedClientProjectPopoverProps = {
  client: Client;
  projectId: string;
};

function ClientItem({
  client,
  setOpen,
  projectId,
  assignedId,
}: ClientItemProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (clientId: string) => {
      return addClientToProject(projectId, clientId);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      toast.success("Client assigned to project successfully.");
      setOpen(false);
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
      onSelect={() => mutate(client.id)}
      className="cursor-pointer hover:bg-main-blue/20 flex justify-between items-center gap-2"
    >
      <span>{client.name}</span>
      {assignedId && <Check className="text-green-500 size-4" />}
    </CommandItem>
  );
}

export function ClientProjectPopover({ projectId }: ClientProjectPopoverProps) {
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

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);

  return (
    <DropdownMenu open={allClientsOpen} onOpenChange={setAllClientsOpen}>
      <DropdownMenuTrigger className="rounded-3xl py-1 px-3 text-xs capitalize border border-sidebar-border">
        <span>Add Client</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0.5">
        <Command>
          {/* 🔹 Replace CommandInput with custom input */}
          <div className="p-1 border-b">
            <Input
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
                <div className="p-2 text-sm text-muted-foreground">
                  Loading clients...
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
                    client={c}
                    assignedId={false}
                    setOpen={setAllClientsOpen}
                    projectId={projectId}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AssignedClientProjectPopover({
  client,
  projectId,
}: AssignedClientProjectPopoverProps) {
  const [clientOpen, setClientOpen] = useState(false);
  const [clientMode, setClientMode] = useState<"add" | "assign">("assign");
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

  useEffect(() => {
    if (data) {
      setClients(data.clients);
    }
  }, [data]);

  return (
    <DropdownMenu open={clientOpen} onOpenChange={setClientOpen}>
      <DropdownMenuTrigger className="rounded-3xl py-1 px-3 text-xs capitalize border border-sidebar-border">
        <span>{formatNameWithDot(client.name)}</span>
      </DropdownMenuTrigger>
      {clientMode === "assign" ? (
        <DropdownMenuContent className="p-4  grid grid-cols-1 gap-4 ">
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
        <DropdownMenuContent className="p-0.5">
          <Command>
            {/* 🔹 Replace CommandInput with custom input */}
            <div className="p-1 border-b">
              <Input
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
                  <div className="p-2 text-sm text-muted-foreground">
                    Loading clients...
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
                      assignedId={client.id === c.id}
                      client={c}
                      setOpen={setClientOpen}
                      projectId={projectId}
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
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
