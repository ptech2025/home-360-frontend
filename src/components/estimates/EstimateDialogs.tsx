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
  categoryValues,
  createClientSchema,
  CreateClientSchemaType,
  createEstimateLineItemSchema,
  CreateEstimateLineItemType,
  unitTypeValues,
} from "@/types/zod-schemas";
import { createClient, deleteClient, updateClient } from "@/services/client";
import PhoneInput from "../global/PhoneInput";
import { Client } from "@/types/client";

import { Loader2, EllipsisVertical, Pen, UserRoundPlus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "nextjs-toploader/app";
import { EstimateLineItem } from "@/types/estimate";
import { updateLineItem } from "@/services/estimate";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import {
  EstimateLineItemCategory,
  EstimateLineItemUnitType,
} from "@/types/message-schema";

export function AddLineItemDialog({ children }: { children: React.ReactNode }) {
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

export function UpdateLineItemDialog({
  lineItem,
  estimateId,
  isLoading,
}: {
  lineItem: EstimateLineItem;
  estimateId: string;
  isLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateEstimateLineItemType>({
    resolver: zodResolver(createEstimateLineItemSchema),
    mode: "onChange",
    defaultValues: {
      title: lineItem.title,
      quantity: lineItem.quantity,
      cost: lineItem.cost,
      unitType: lineItem.unitType,
      category: lineItem.category,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateEstimateLineItemType) => {
      return updateLineItem(lineItem.id, estimateId, data);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["estimate", estimateId],
      });
      toast.success("Line Item updated successfully.");

      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: CreateEstimateLineItemType) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending || isLoading}
          className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <Pen className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Edit Line Item</DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  justify-center  flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Item Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Item Description"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Quantity"
                        className="h-11"
                        value={field.value}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          field.onChange(qty);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-main-blue ">Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Cost"
                        min={1}
                        className="h-11"
                        value={field.value}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          field.onChange(qty);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                      Unit Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="capitalize w-full h-11!">
                          <SelectValue placeholder="Unit Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitTypeValues.map((unit) => (
                          <SelectItem
                            key={unit}
                            value={unit}
                            className="capitalize"
                          >
                            {unit.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                      Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="capitalize w-full h-11!">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryValues.map((unit) => (
                          <SelectItem
                            key={unit}
                            value={unit}
                            className="capitalize"
                          >
                            {unit.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
            </div>
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
