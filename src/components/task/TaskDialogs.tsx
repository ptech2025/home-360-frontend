import {
  MaintenanceFrequency,
  Priority,
  MaintenanceInstance,
  ReminderType,
  ReminderStatus,
} from "@/types/prisma-schema-types";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Ellipsis, EllipsisVertical, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createHomeTaskSchema,
  CreateHomeTaskSchemaType,
} from "@/types/zod-schemas";
import { taskMutations } from "@/queries/task";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { SavedProviderSheet } from "../service-provider/ServiceProviderSheets";
import { DeleteProviderDialog } from "../service-provider/ServiceProviderDialogs";

export function AddOrEditCustomTaskDialog({
  children,
  data,
  homeId,
  type,
}: {
  children: React.ReactNode;
  data?: MaintenanceInstance;
  homeId: string;
  type: "create" | "update";
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: addTask, isPending: isAdding } = useMutation({
    mutationFn: taskMutations.create,
    onSuccess: () => {
      toast.success("Task added successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-tasks", homeId, { page: 1 }],
      });
    },
  });
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: taskMutations.update,
    onSuccess: () => {
      toast.success("Task updated successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-tasks", homeId, { page: 1 }],
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(createHomeTaskSchema),
    defaultValues: {
      category: data?.category ?? undefined,
      frequency: data?.frequency ?? undefined,
      dueDate: data?.dueDate ?? undefined,
      description: data?.description ?? undefined,
      title: data?.title ?? undefined,
      status: data?.status ?? undefined,
    },
  });

  const onSubmit = (values: CreateHomeTaskSchemaType) => {
    if (type === "create") {
      addTask({ homeId, data: values });
    } else {
      updateTask({ homeId, taskId: data?.id as string, data: values });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            {type === "create" ? "Add Custom Task" : "Edit Custom Task"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Create a new maintenance task with custom schedule and reminders."
              : "Edit the details of a maintenance task."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="task-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1   justify-center  flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Task Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="h-11"
                        {...field}
                        placeholder="Enter task name"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Task Category
                      </FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="type"
                            className="w-full capitalize h-11!"
                          >
                            <SelectValue
                              placeholder="Select"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ReminderType).map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="capitalize"
                              >
                                {type.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Frequency
                      </FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="frequency"
                            className="w-full capitalize h-11!"
                          >
                            <SelectValue
                              placeholder="Select"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(MaintenanceFrequency).map(
                              (frequency) => (
                                <SelectItem
                                  key={frequency}
                                  value={frequency}
                                  className="capitalize"
                                >
                                  {frequency.replace("_", " ")}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>{" "}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Due Date
                    </FormLabel>
                    <FormDescription>
                      Select the due date of the task.
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        className="h-11"
                        value={
                          field.value
                            ? format(field.value as Date, "yyyy-MM-dd'T'HH:mm")
                            : ""
                        }
                        onChange={(e) => {
                          const dateValue = e.target.value;
                          if (!dateValue) {
                            field.onChange(undefined);
                            return;
                          }
                          const parsedDate = new Date(dateValue);
                          field.onChange(parsedDate);
                        }}
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
                      Description
                    </FormLabel>
                    <FormDescription>
                      Provide a brief description of the task.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short description..."
                        className=" max-h-[6rem] resize-none scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
            </div>
          </form>
        </Form>

        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            disabled={isAdding || isUpdating}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="task-form"
            className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4  transition-colors"
            disabled={isAdding || isUpdating}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isAdding || isUpdating ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full ",
                isAdding || isUpdating ? "invisible" : "visible"
              )}
            >
              {type === "create" ? "Add" : "Update"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteTaskDialog({
  children,
  taskId,
  homeId,
}: {
  children: React.ReactNode;
  taskId: string;
  homeId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: taskMutations.delete,
    onSuccess: () => {
      toast.success("Task deleted successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-tasks", homeId, { page: 1 }],
      });
    },
  });

  const handleDelete = () => {
    deleteTask({ homeId, taskId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Confirm Task Deletion
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete the task. Are you sure you want
            to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="button"
            onClick={handleDelete}
            className="text-white min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center bg-red-500 border border-transparent h-11 rounded-md px-4  transition-colors"
            disabled={isPending}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isPending ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full",
                isPending ? "invisible" : "visible"
              )}
            >
              Delete
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ViewTaskDialog({
  children,
  task,
}: {
  children: React.ReactNode;
  task: MaintenanceInstance;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: taskMutations.markAsCompleted,
    onSuccess: () => {
      toast.success("Task marked as completed successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-tasks", task.homeId, { page: 1 }],
      });
    },
  });
  const handleMarkAsCompleted = () => {
    mutate({ taskId: task.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Task Details
          </DialogTitle>
          <DialogDescription className="text-gray">
            View and manage maintenance task information.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-black text-base font-circular-medium">
              {task.title}
            </h3>
            <p className="text-sm text-light-gray font-circular-light">
              {task.description}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray font-circular-light">
              Due Date
            </span>
            <h5 className="text-black text-base font-circular-medium">
              {format(task.dueDate, "MMM d, yyyy")}
            </h5>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col  gap-1">
              <span className="text-sm text-gray font-circular-light">
                Frequency
              </span>
              <h5 className="text-black capitalize text-base font-circular-medium">
                {task.frequency.replace("_", " ")}
              </h5>
            </div>{" "}
            <div className="flex gap-1 flex-col">
              <span className="text-sm text-gray font-circular-light">
                Category
              </span>
              <h5 className="text-black capitalize text-base font-circular-medium">
                {/* {task.category.replace("_", " ")} */}
              </h5>
            </div>
          </div>
        </div>
        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Close
          </DialogClose>

          <Button
            type="button"
            onClick={handleMarkAsCompleted}
            disabled={isPending || task.status === ReminderStatus.completed}
            className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4  transition-colors"
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isPending ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full ",
                isPending ? "invisible" : "visible"
              )}
            >
              {task.status === ReminderStatus.completed
                ? "Completed"
                : "Mark as Completed"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TaskActions({ data }: { data: MaintenanceInstance }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="text-black border-none shadow-none"
        >
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y "
      >
        <ViewTaskDialog task={data}>
          <Button className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md   text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
            View
          </Button>
        </ViewTaskDialog>

        {data.isCustom && (
          <>
            <AddOrEditCustomTaskDialog
              type="update"
              data={data}
              homeId={data.homeId}
            >
              <Button className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md    text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
                Edit
              </Button>
            </AddOrEditCustomTaskDialog>
            <DeleteTaskDialog taskId={data.id} homeId={data.homeId}>
              <Button className="rounded-none  px-4 py-2.5 justify-start last:rounded-b-md  first:rounded-t-md  text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 ">
                Delete
              </Button>
            </DeleteTaskDialog>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
