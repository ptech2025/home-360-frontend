"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createExpenseSchema,
  CreateExpenseSchemaType,
} from "@/types/zod-schemas";
import { ExpenseCategory } from "@/types/prisma-schema-types";
import { expenseMutations } from "@/queries/expense";

function AddExpenseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { homeId } = useParams<{ homeId: string }>();

  const form = useForm({
    resolver: zodResolver(createExpenseSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      amount: undefined,
      category: undefined,
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
      file: undefined,
    },
  });

  const { mutate: createExpense, isPending: isCreating } = useMutation({
    mutationFn: expenseMutations.create,
    onSuccess: () => {
      form.reset();
      toast.success("Expense added successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-expenses", homeId],
      });
      context.client.invalidateQueries({
        queryKey: ["expense-metrics", homeId],
      });
    },
  });

  const onSubmit = (values: CreateExpenseSchemaType) => {
    createExpense({
      homeId,
      data: values,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="green-btn">
          <Plus />
          <span>Add Expense</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Add New Expense
          </DialogTitle>
          <DialogDescription>
            Track and manage your home expenses here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="expense-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 justify-center flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter expense title"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="md:grid-cols-2 grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount (in USD)"
                          className="h-10"
                          value={field.value as number | undefined}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
                            className="w-full capitalize h-10!"
                          >
                            <SelectValue
                              placeholder="Select category"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ExpenseCategory).map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                                className="capitalize"
                              >
                                {cat.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-10"
                        value={field.value as string | undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Description{" "}
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter expense description"
                        className="max-h-[6rem] resize-none scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green scrollbar-track-lighter-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Receipt{" "}
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="h-11"
                        accept=".pdf, image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Only support PDF and image files (max 3 MB)
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            onClick={() => form.reset()}
            disabled={isCreating}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="expense-form"
            className="text-white text-base min-w-[90px] grid grid-cols-1 grid-rows-1 place-items-center bg-main-green border border-transparent h-11 rounded-md px-4 transition-colors"
            disabled={isCreating}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isCreating ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full",
                isCreating ? "invisible" : "visible"
              )}
            >
              Add Expense
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseDialog;
