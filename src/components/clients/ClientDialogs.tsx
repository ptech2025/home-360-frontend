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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PiUserCirclePlus } from "react-icons/pi";
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
import { createClient } from "@/services/client";
import PhoneInput from "../global/PhoneInput";

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
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      queryClient.invalidateQueries({
        queryKey: ["clients", { page: 1, size: 5 }],
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
            <PiUserCirclePlus className="text-main-blue size-6" />
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
