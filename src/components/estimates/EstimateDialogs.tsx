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
  createEstimateLineItemSchema,
  CreateEstimateLineItemType,
  estimateSchema,
  EstimateSchemaType,
  unitTypeValues,
} from "@/types/zod-schemas";

import { Loader2, Pen, Plus, Rows4 } from "lucide-react";

import { EstimateLineItem } from "@/types/estimate";
import {
  addLineItemToEstimate,
  updateEstimateTitle,
  updateLineItem,
} from "@/services/estimate";
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

export function AddLineItemDialog({ estimateId }: { estimateId: string }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateEstimateLineItemType>({
    resolver: zodResolver(createEstimateLineItemSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      quantity: 1,
      cost: 1,
      unitType: EstimateLineItemUnitType.piece,
      category: EstimateLineItemCategory.material,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateEstimateLineItemType) => {
      return addLineItemToEstimate(estimateId, data);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["estimate", estimateId],
      });
      toast.success("Line Item added successfully.");

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
          disabled={isPending}
          className="bg-transparent text-dark-orange w-max  hover:bg-dark-orange/20"
        >
          <Plus />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <Rows4 className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Add Line Item</DialogTitle>
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
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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
                    <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                      Cost
                    </FormLabel>
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
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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
                          <SelectValue placeholder="Select Unit Type" />
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
                          <SelectValue placeholder="Select Category" />
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
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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
                    <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                      Cost
                    </FormLabel>
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
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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
                          <SelectValue placeholder="Select Unit Type" />
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
                          <SelectValue placeholder="Select Category" />
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

export function UpdateEstimateTitleDialog({
  title,
  estimateId,
  isLoading,
}: {
  title: string;
  estimateId: string;
  isLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<EstimateSchemaType>({
    resolver: zodResolver(estimateSchema),
    mode: "onChange",
    defaultValues: {
      title,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EstimateSchemaType) => {
      return updateEstimateTitle(estimateId, data);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["estimate", estimateId],
      });
      toast.success("Estimate title updated successfully.");

      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: EstimateSchemaType) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending || isLoading}
          className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
        >
          Edit Title
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <Pen className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Edit Estimate Title</DialogTitle>
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
                    Estimate Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Estimate Title"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />{" "}
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
