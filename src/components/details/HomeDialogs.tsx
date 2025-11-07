import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import {
  createHomeSchema,
  CreateHomeSchemaType,
  updateHomeDetailsSchema,
  UpdateHomeDetailsSchemaType,
} from "@/types/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { userMutations } from "@/queries/user";
import { Loader2 } from "lucide-react";
import { Form } from "../ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import AutoCompleteLocation from "../onboarding/AutoCompleteLocation";
import { useState } from "react";
import { DynamicLocationStatus } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HomeType } from "@/types/prisma-schema-types";
type UpdateHomeDetailsProps = {
    homeId: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    yearBuilt?: number | null;
    squareFeet?: number | null;
    lotSizeSqFt?: number | null;
    homeType: HomeType;
    children: React.ReactNode;
  };
type UpdateHomeAddressProps = {
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  homeId: string;
  children: React.ReactNode;
};
export const UpdateHomeAddressDialog = ({
  homeId,
  address,
  city,
  state,
  children,
}: UpdateHomeAddressProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateHomeSchemaType>({
    resolver: zodResolver(createHomeSchema),
    mode: "onChange",
    defaultValues: {
      address: address || "",
      city: city || "",
      state: state || "",
    },
  });

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: userMutations.updateHome,
    onSuccess(data) {
      if (data.home) {
        toast.success("Home address updated successfully.");
        setOpen(false);
      } else {
        form.reset({
          address: address || "",
          city: city || "",
          state: state || "",
        });
        toast.error(data.message || "Something went wrong, try again later.");
      }
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["single-home", homeId],
      });
      context.client.invalidateQueries({
        queryKey: ["all-homes"],
      });
    },
  });
  const onSubmit = (values: CreateHomeSchemaType) => {
    console.log(values);
    const fullAddress = `${values.address.trim()}, ${values.city.trim()}, ${values.state.trim()}, USA`;
    mutate({
      address: fullAddress,
      homeId,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0  flex flex-col">
        <DialogHeader className="px-4">
          <DialogTitle>Edit Property Address</DialogTitle>
          <DialogDescription>
            We currently only support US residential properties. Editing your
            property address will also update your property details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="update-home-address-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full px-4 justify-center  flex-col gap-6 "
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <AutoCompleteLocation
                      value={field.value}
                      onChange={field.onChange}
                      mode={DynamicLocationStatus.street}
                      isFormLoading={isLoading}
                      placeholder="123 Main Street"
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 w-full md:grid-cols-2 justify-between items-center gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                      City
                    </FormLabel>
                    <FormControl>
                      <AutoCompleteLocation
                        value={field.value}
                        onChange={field.onChange}
                        mode={DynamicLocationStatus.city}
                        isFormLoading={isLoading}
                        placeholder="Miami"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                      State
                    </FormLabel>
                    <FormControl>
                      <AutoCompleteLocation
                        value={field.value}
                        onChange={field.onChange}
                        mode={DynamicLocationStatus.state}
                        isFormLoading={isLoading}
                        placeholder="Florida"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </form>
          <DialogFooter className="px-4 border-t border-lighter-gray pt-4">
            <DialogClose
              type="button"
              disabled={isLoading}
              className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
            >
              Close
            </DialogClose>

            <Button
              type="submit"
              form="update-home-address-form"
              disabled={isLoading}
              className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4  transition-colors"
            >
              <Loader2
                className={cn(
                  "size-5 animate-spin col-span-full row-span-full",
                  isLoading ? "visible" : "invisible"
                )}
              />

              <span
                className={cn(
                  "col-span-full row-span-full ",
                  isLoading ? "invisible" : "visible"
                )}
              >
                Change Address
              </span>
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};



export const UpdateHomeDetailsDialog = ({
  homeId,
  bedrooms,
  bathrooms,
  yearBuilt,
  squareFeet,
  lotSizeSqFt,
  homeType,
  children,
}: UpdateHomeDetailsProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(updateHomeDetailsSchema),
    mode: "onChange",
    defaultValues: {
      bedrooms: bedrooms ?? undefined,
      bathrooms: bathrooms ?? undefined,
      yearBuilt: yearBuilt ?? undefined,
      squareFeet: squareFeet ?? undefined,
      lotSizeSqFt: lotSizeSqFt ?? undefined,
      homeType: homeType,
    },
  });

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: userMutations.updateHomeDetails,
    onSuccess: () => {
      toast.success("Home details updated successfully.");
      setOpen(false);
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["single-home", homeId],
      });
      context.client.invalidateQueries({
        queryKey: ["all-homes"],
      });
    },
  });

  const onSubmit = (values: UpdateHomeDetailsSchemaType) => {
    mutate({
      homeId,
      data: values,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0 flex flex-col max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-4">
          <DialogTitle>Edit Property Details</DialogTitle>
          <DialogDescription>
            Update your property details and specifications
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="update-home-details-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full px-4 justify-center flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Bedrooms
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10"
                        placeholder="Enter number of bedrooms"
                   
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
                name="bathrooms"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Bathrooms
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10"
                        placeholder="Enter number of bathrooms"
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
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Year Built
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-10"
                        placeholder="Enter year built"
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
                name="squareFeet"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Square Feet
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-10"
                        placeholder="Enter square feet"
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
                name="lotSizeSqFt"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black font-circular-medium">
                      Lot Size (sq ft)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-10"
                        placeholder="Enter lot size"
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
                name="homeType"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative font-circular-medium">
                      Property Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="homeType"
                          className="w-full capitalize h-10"
                        >
                          <SelectValue
                            placeholder="Select property type"
                            className="capitalize"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(HomeType).map((type) => (
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
            </div>
          </form>
          <DialogFooter className="px-4 border-t border-lighter-gray pt-4">
            <DialogClose
              type="button"
              disabled={isLoading}
              className="text-black min-w-[90px] border border-black h-11 rounded-md px-4 hover:text-main-green hover:border-main-green transition-colors"
            >
              Close
            </DialogClose>

            <Button
              type="submit"
              form="update-home-details-form"
              disabled={isLoading}
              className="green-btn min-w-[90px] text-base grid grid-cols-1 grid-rows-1 place-items-center border border-transparent h-11 rounded-md px-4 transition-colors"
            >
              <Loader2
                className={cn(
                  "size-5 animate-spin col-span-full row-span-full",
                  isLoading ? "visible" : "invisible"
                )}
              />

              <span
                className={cn(
                  "col-span-full row-span-full ",
                  isLoading ? "invisible" : "visible"
                )}
              >
                Update Details
              </span>
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
