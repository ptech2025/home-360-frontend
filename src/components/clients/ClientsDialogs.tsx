import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  UserRoundPlus,
  UserRoundPen,
  Loader2,
  EllipsisVertical,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createClientSchema,
  CreateClientSchemaType,
} from "@/types/zod-schemas";
import { createClient, deleteClient, updateClient } from "@/services/client";
import PhoneInput from "../global/PhoneInput";
import { Client } from "@/types/client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "nextjs-toploader/app";

export function AddClientDialog({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateClientSchemaType) => {
      return createClient(data);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["projects", { page: 1, title: "" }],
      });
      queryClient.invalidateQueries({
        queryKey: ["clients", { page: 1 }],
      });
      toast.success("Client created successfully.");
      form.reset({
        email: "",
        name: "",
        phone: "",
        address: "",
      });
      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: CreateClientSchemaType) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <UserRoundPlus className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Clients can be assigned to projects
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  justify-center  flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Client Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Email Address"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-main-blue ">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <PhoneInput setPhoneNumber={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Address"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <Button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="w-full h-11 bg-transparent text-main-blue rounded-md border border-main-blue hover:bg-sidebar-border"
              >
                <span>Cancel</span>
              </Button>{" "}
              <Button
                disabled={isPending}
                className="w-full max-sm:order-first h-11 rounded-md bg-main-blue text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteClientDialog({
  children,
  clientId,
}: {
  children: React.ReactNode;
  clientId: string;
}) {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return deleteClient(clientId);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["clients", { page: 1 }],
      });
      toast.success("Client deleted successfully.");
      replace("/dashboard/clients", { scroll: false });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete This Client</DialogTitle>
          <DialogDescription>
            you cannot undo this action, are you sure you want to delete this
            client?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Button
            disabled={isPending}
            onClick={() => setIsDialogOpen(false)}
            variant={"outline"}
            className="w-full"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={() => mutate()}
            className="bg-destructive w-full max-sm:order-first"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateClientDialog({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Client;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    mode: "onChange",
    defaultValues: {
      email: client.email,
      name: client.name,
      phone: client.phone,
      address: client.address,
    },
  });
  const clientId = client.id;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateClientSchemaType) => {
      return updateClient(clientId, data);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["clients", { page: 1 }],
      });
      queryClient.invalidateQueries({
        queryKey: ["single_client", clientId],
      });
      toast.success("Client updated successfully.");
      form.reset({
        email: "",
        name: "",
        phone: "",
        address: "",
      });
      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: CreateClientSchemaType) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <UserRoundPen className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Clients can be assigned to projects
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  justify-center  flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Client Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Email Address"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-main-blue ">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      setPhoneNumber={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Client Address"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <Button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="w-full h-11 bg-transparent text-main-blue rounded-md border border-main-blue hover:bg-sidebar-border"
              >
                <span>Cancel</span>
              </Button>{" "}
              <Button
                disabled={isPending}
                className="w-full max-sm:order-first h-11 rounded-md bg-main-blue text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function ClientsActions({
  client,
  showView,
}: {
  client: Client;
  showView: boolean;
}) {
  const { push } = useRouter();
  const handleViewClientProject = () => {
    push(`/dashboard/clients/${client.id}`);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical className="size-5 text-main-blue" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y "
      >
        {showView && (
          <Button
            onClick={handleViewClientProject}
            className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md   text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
          >
            View Client Projects
          </Button>
        )}
        <UpdateClientDialog client={client}>
          <Button className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md    text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
            Edit Client
          </Button>
        </UpdateClientDialog>
        <DeleteClientDialog clientId={client.id}>
          <Button className="rounded-none  px-4 py-2.5 justify-start last:rounded-b-md  first:rounded-t-md  text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 ">
            Delete
          </Button>
        </DeleteClientDialog>
      </PopoverContent>
    </Popover>
  );
}
