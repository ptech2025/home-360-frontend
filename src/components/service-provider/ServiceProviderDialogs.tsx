import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { providerMutations } from "@/queries/provider";
import {
  Home,
  ProviderType,
  ServiceProvider,
} from "@/types/prisma-schema-types";
import { useMutation } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createServiceJobSchema,
  CreateServiceJobSchemaType,
  createServiceProviderSchema,
  CreateServiceProviderSchemaType,
} from "@/types/zod-schemas";
import { cn } from "@/lib/utils";
import { SavedProviderSheet } from "./ServiceProviderSheets";
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
import PhoneInput from "../global/PhoneInput";
import AutoCompleteAddress from "../onboarding/AutoCompleteAddress";
import { format } from "date-fns";
import { useServiceProviderStore } from "@/store/serviceProviderStore";
import { useParams } from "next/navigation";

export function SavedProviderCardAction({
  data,
  homes,
}: {
  data: ServiceProvider;
  homes: Home[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="text-black border-none shadow-none"
        >
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y "
      >
        <SavedProviderSheet data={data} homes={homes}>
          <Button className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md   text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
            View
          </Button>
        </SavedProviderSheet>
        <AddOrEditProviderDialog type="update" data={data}>
          <Button className="rounded-none justify-start  px-4 py-2.5 last:rounded-b-md  first:rounded-t-md    text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
            Edit
          </Button>
        </AddOrEditProviderDialog>
        <DeleteProviderDialog provId={data.id}>
          <Button className="rounded-none  px-4 py-2.5 justify-start last:rounded-b-md  first:rounded-t-md  text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 ">
            Delete
          </Button>
        </DeleteProviderDialog>
      </PopoverContent>
    </Popover>
  );
}

export function DeleteProviderDialog({
  children,
  provId,
}: {
  children: React.ReactNode;
  provId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: providerMutations.delete,
    onSuccess: () => {
      toast.success("Service Provider deleted successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-providers-saved", { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["all-providers-hired", { page: 1 }],
      });
    },
  });

  const handleDelete = () => {
    mutate(provId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Confirm Service Provider Deletion
          </DialogTitle>
          <DialogDescription>
            This action will permanently remove the selected provider. Are you
            sure you want to continue?
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
export function AddOrEditProviderDialog({
  children,
  type,
  data,
}: {
  children: React.ReactNode;
  type: "create" | "update";
  data?: ServiceProvider;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createProvider, isPending: isCreating } = useMutation({
    mutationFn: providerMutations.create,
    onSuccess: () => {
      toast.success("Service Provider added successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-providers-saved", { page: 1 }],
      });
    },
  });
  const { mutate: updateProvider, isPending: isUpdating } = useMutation({
    mutationFn: providerMutations.update,
    onSuccess: () => {
      toast.success("Service Provider updated successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-providers-saved", { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["all-providers-hired", { page: 1 }],
      });
    },
  });

  const form = useForm<CreateServiceProviderSchemaType>({
    resolver: zodResolver(createServiceProviderSchema),
    defaultValues: {
      name: data?.name || "",
      email: data && data.email ? data.email : undefined,
      phone: data && data.phone ? data.phone : undefined,
      website: data && data.website ? data.website : undefined,
      address: data && data.address ? data.address : undefined,
      type: data?.type || ProviderType.plumbing,
      notes: data && data.notes ? data.notes : undefined,
    },
  });

  const onSubmit = (values: CreateServiceProviderSchemaType) => {
    if (type === "create") {
      createProvider(values);
    } else {
      const provId = data?.id as string;
      updateProvider({ provId, data: values });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            {type === "create"
              ? "Add New Service Provider"
              : "Edit Service Provider"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Enter the details to add a trusted professional to your list."
              : "Update the details of a trusted professional on your list."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="provider-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1   justify-center  flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter provider name"
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
                  name="type"
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
                            className="w-full capitalize h-11!"
                          >
                            <SelectValue
                              placeholder="Select"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ProviderType).map((cat) => (
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
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter provider email"
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
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Phone
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
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Address
                    </FormLabel>
                    <FormControl>
                      <AutoCompleteAddress
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="Enter provider address"
                        isFormLoading={isCreating || isUpdating}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Website URL
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter provider website URL"
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
                name="notes"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Notes
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write some notes about this provider"
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
            disabled={isCreating || isUpdating}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="provider-form"
            className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4  transition-colors"
            disabled={isCreating || isUpdating}
          >
            <Loader2
              className={cn(
                "size-5 animate-spin col-span-full row-span-full",
                isCreating || isUpdating ? "visible" : "invisible"
              )}
            />

            <span
              className={cn(
                "col-span-full row-span-full ",
                isCreating || isUpdating ? "invisible" : "visible"
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

export function HireProviderDialog({
  children,
  data,
  provId,
}: {
  children: React.ReactNode;
  data: Home[];
  provId: string;
}) {
  const { homeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { setMode } = useServiceProviderStore();

  const { mutate, isPending } = useMutation({
    mutationFn: providerMutations.createJob,
    onSuccess: () => {
      toast.success("Job added to Service Provider successfully.");
      setIsOpen(false);
      setMode("hired");
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-providers-saved", { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["all-providers-hired", { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["single-provider-history", homeId, provId],
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(createServiceJobSchema),
  });

  const onSubmit = (values: CreateServiceJobSchemaType) => {
    mutate({
      data: {
        ...values,
        date: values.date.toISOString(),
      },
      provId,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Add Job to Service Provider
          </DialogTitle>
          <DialogDescription>
            Fill in the details of the job or service completed by this
            provider.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="job-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1   justify-center  flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Amount
                      </FormLabel>
                      <FormDescription>
                        Enter the amount you paid for the job (in USD).
                      </FormDescription>
                      <FormControl>
                        <Input
                          className="h-11"
                          value={field.value as number | undefined}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          placeholder="300"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Date
                      </FormLabel>
                      <FormDescription>
                        Select the date the job or service was completed.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="h-11"
                          value={
                            field.value
                              ? format(
                                  field.value as Date,
                                  "yyyy-MM-dd'T'HH:mm"
                                )
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
                />{" "}
              </div>{" "}
              <div className="md:grid-cols-2 grid grid-cols gap-5">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Rating
                      </FormLabel>
                      <FormDescription>
                        Rate the service provider on a scale from 1 to 5.
                      </FormDescription>
                      <FormControl>
                        <Select
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="rating"
                            className="w-full capitalize h-11!"
                          >
                            <SelectValue
                              placeholder="Select"
                              className="capitalize"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 5 }, (_, i) => i + 1).map(
                              (rate) => (
                                <SelectItem
                                  key={rate}
                                  value={rate.toString()}
                                  className="capitalize"
                                >
                                  {rate}
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
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        File
                      </FormLabel>
                      <FormDescription>
                        Upload any related file or receipt for this job
                      </FormDescription>
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <FormField
                control={form.control}
                name="homeId"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Home
                    </FormLabel>
                    <FormDescription>
                      Select the home where the job or service was completed.
                    </FormDescription>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="homeId"
                          className="w-full capitalize h-11!"
                        >
                          <SelectValue
                            placeholder="Select"
                            className="capitalize"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((home) => (
                            <SelectItem
                              key={home.id}
                              value={home.id}
                              className="capitalize"
                            >
                              {home.name}
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
                name="jobDescription"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Job Description
                    </FormLabel>
                    <FormDescription>
                      Provide a brief description of the job or service
                      performed.
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
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="job-form"
            className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4  transition-colors"
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
                "col-span-full row-span-full ",
                isPending ? "invisible" : "visible"
              )}
            >
              Save
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
