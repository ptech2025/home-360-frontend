"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
  createApplianceSchema,
  CreateApplianceSchemaType,
  createApplianceMaintenanceSchema,
  CreateApplianceMaintenanceSchemaType,
} from "@/types/zod-schemas";
import { Appliance, ApplianceCategory } from "@/types/prisma-schema-types";
import { applianceMutations } from "@/queries/appliance";
import { useRouter } from "next/navigation";
import { ApplianceHistory } from "@/types";
import DisplayWarrantyStatus from "./DisplayWarrantyStatus";
import { ReminderStatus } from "@/types/prisma-schema-types";

type AddOrEditApplianceDialogProps = {
  type: "create" | "update";
  data?: Appliance;
  children: React.ReactNode;
};
type DeleteApplianceDialogProps = {
  children: React.ReactNode;
  applianceId: string;
};

type AddApplianceMaintenanceDialogProps = {
  applianceId: string;
  children: React.ReactNode;
};

type ViewApplianceMaintenanceDialogProps = {
  children: React.ReactNode;
  maintenance: ApplianceHistory;
};
export function AddOrEditApplianceDialog({
  type,
  data,
  children,
}: AddOrEditApplianceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { homeId } = useParams<{ homeId: string }>();

  const form = useForm({
    resolver: zodResolver(createApplianceSchema),
    mode: "onChange",
    defaultValues: {
      name: data?.name || "",
      brand: data?.brand || undefined,
      model: data?.model || undefined,
      serialNumber: data?.serialNumber || undefined,
      category: data?.category || undefined,
      purchaseDate: data?.purchaseDate
        ? format(new Date(data.purchaseDate), "yyyy-MM-dd")
        : undefined,
      purchasePrice: data?.purchasePrice || undefined,
      warrantyExpiry: data?.warrantyExpiry
        ? format(new Date(data.warrantyExpiry), "yyyy-MM-dd")
        : undefined,
      installationDate: data?.installationDate
        ? format(new Date(data.installationDate), "yyyy-MM-dd")
        : undefined,
    },
  });

  const { mutate: createAppliance, isPending: isCreating } = useMutation({
    mutationFn: applianceMutations.create,
    onSuccess: () => {
      form.reset();
      toast.success("Appliance added successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-appliances", homeId, { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["appliance-metrics", homeId],
      });
    },
  });

  const { mutate: updateAppliance, isPending: isUpdating } = useMutation({
    mutationFn: applianceMutations.update,
    onSuccess: () => {
      toast.success("Appliance updated successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-appliances", homeId, { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["single-appliance", homeId, vars.applianceId],
      });
      context.client.invalidateQueries({
        queryKey: ["appliance-metrics", homeId],
      });
    },
  });

  const onSubmit = (values: CreateApplianceSchemaType) => {
    if (type === "create") {
      createAppliance({
        homeId,
        data: values,
      });
    } else if (type === "update" && data) {
      updateAppliance({
        homeId,
        applianceId: data.id,
        data: values,
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            {type === "create" ? "Add New Appliance" : "Edit Appliance"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Track and manage your home appliances and equipment here."
              : "Update your appliance information."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="appliance-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 justify-center flex-col gap-6"
          >
            <div className="px-6 py-4 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      {type === "create" ? "Upload Image" : "Update Image"}
                      <span className="text-light-gray font-circular-light">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="h-11"
                        accept="image/*"
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
              />
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
                        placeholder="Enter appliance name"
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
                            {Object.values(ApplianceCategory).map((cat) => (
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
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Brand{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter brand"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:grid-cols-2 grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Model{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter model"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Serial Number{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter serial number"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:grid-cols-2 grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Purchase Date{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
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
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Purchase Price{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter  price (in USD)"
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
              </div>

              <div className="md:grid-cols-2 grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="warrantyExpiry"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Warranty Expiry{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
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
                  name="installationDate"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Installation Date{" "}
                        <span className="text-light-gray font-circular-light">
                          (optional)
                        </span>
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
              </div>

              <FormField
                control={form.control}
                name="receipt"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Receipt/Document{" "}
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
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="appliance-form"
            className="text-white text-base min-w-[90px] grid grid-cols-1 grid-rows-1 place-items-center bg-main-green border border-transparent h-11 rounded-md px-4 transition-colors"
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
              {type === "create" ? "Add Appliance" : "Update Appliance"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteApplianceDialog({
  children,
  applianceId,
}: DeleteApplianceDialogProps) {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { homeId } = useParams<{ homeId: string }>();

  const { mutate: deleteAppliance, isPending } = useMutation({
    mutationFn: applianceMutations.delete,
    onSuccess: () => {
      toast.success("Appliance deleted successfully.");
      setIsOpen(false);
      push(`/dashboard/${homeId}/appliances`);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["all-appliances", homeId, { page: 1 }],
      });
      context.client.invalidateQueries({
        queryKey: ["appliance-metrics", homeId],
      });
    },
  });

  const handleDelete = () => {
    deleteAppliance({ applianceId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Confirm Appliance Deletion
          </DialogTitle>
          <DialogDescription>
            This action will permanently remove the selected appliance. Are you
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
            className="text-white min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center bg-red-500 border border-transparent h-11 rounded-md px-4 transition-colors"
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

export function AddApplianceMaintenanceDialog({
  applianceId,
  children,
}: AddApplianceMaintenanceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { homeId } = useParams<{ homeId: string }>();

  const form = useForm({
    resolver: zodResolver(createApplianceMaintenanceSchema),
    mode: "onChange",
  });

  const { mutate: createMaintenance, isPending } = useMutation({
    mutationFn: applianceMutations.createMaintenance,
    onSuccess: () => {
      form.reset();
      toast.success("Maintenance record added successfully.");
      setIsOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["single-appliance-history", applianceId],
      });
      context.client.invalidateQueries({
        queryKey: ["single-appliance", homeId, applianceId],
      });
      context.client.invalidateQueries({
        queryKey: ["appliance-metrics", homeId],
      });
    },
  });

  const onSubmit = (values: CreateApplianceMaintenanceSchemaType) => {
    createMaintenance({
      applianceId,
      data: values,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Add Maintenance Record
          </DialogTitle>
          <DialogDescription>
            Record maintenance to be performed on this appliance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="maintenance-form"
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
                      Title{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter maintenance title"
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
                  name="maintenanceDate"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Next Maintenance Date{" "}
                      </FormLabel>
                      <FormDescription className="text-xs">
                        This date will be used to start a reminder schedule for
                        the appliance.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-10"
                          value={
                            typeof field.value === "string" ? field.value : ""
                          }
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="intervalMonths"
                  render={({ field }) => (
                    <FormItem className="w-full relative">
                      <FormLabel className="text-black font-circular-medium">
                        Frequency (Months)
                      </FormLabel>
                      <FormDescription className="text-xs">
                        This frequency will be used to calculate the next
                        maintenance date.
                      </FormDescription>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full h-10!">
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <SelectItem key={month} value={String(month)}>
                                  {month === 1
                                    ? "Every Month"
                                    : "Every " + month + " Months"}
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
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter className="py-4 sticky bottom-0 left-0 bg-white z-10 px-6 w-full border-t border-lighter-gray">
          <DialogClose
            type="button"
            onClick={() => form.reset()}
            disabled={isPending}
            className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            form="maintenance-form"
            className="text-white text-base min-w-[90px] grid grid-cols-1 grid-rows-1 place-items-center bg-main-green border border-transparent h-11 rounded-md px-4 transition-colors"
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
              Add Maintenance
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ViewApplianceMaintenanceDialog({
  children,
  maintenance,
}: ViewApplianceMaintenanceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: markAsCompleted, isPending } = useMutation({
    mutationFn: applianceMutations.markApplianceMaintenanceAsCompleted,
    onSuccess: () => {
      toast.success("Maintenance record marked as completed successfully.");
      setIsOpen(false);
    },
  });
  const handleMarkAsCompleted = () => {
    if (!maintenance.maintenanceId || !maintenance.applianceId) return;

    markAsCompleted({
      applianceId: maintenance.applianceId,
      maintenanceId: maintenance.maintenanceId,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-h-[95vh] sm:max-w-2xl overflow-y-auto  flex flex-col">
        <DialogHeader className="p-6 pb-3 sticky z-10 bg-white top-0 left-0">
          <DialogTitle className="font-circular-bold font-bold">
            Reminder Details
          </DialogTitle>
          <DialogDescription className="text-gray">
            View and manage reminder information.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-black text-base font-circular-medium">
              {maintenance.title}
            </h3>
            <p className="text-sm text-light-gray font-circular-light">
              {maintenance.details ?? ""}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray font-circular-light">
              Due Date
            </span>
            <h5 className="text-black text-base font-circular-medium">
              {format(maintenance.date, "MMM d, yyyy")}
            </h5>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray font-circular-light">
                Status
              </span>
              <h5 className="text-black text-base font-circular-medium capitalize">
                {maintenance.status ?? "Pending"}
              </h5>
            </div>
            <DisplayWarrantyStatus status={maintenance.type} />
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
            disabled={
              isPending || maintenance.status === ReminderStatus.completed
            }
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
              {maintenance.status === "completed"
                ? "Completed"
                : "Mark as Completed"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
