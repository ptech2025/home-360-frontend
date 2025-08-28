"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import {
  companyInfoSchema,
  CompanyInfoSchemaType,
  personalInfoSchema,
  PersonalInfoSchemaType,
} from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { ProfileType } from "@/types";
import Image from "next/image";
import PhoneInput from "../global/PhoneInput";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import LocationCommand from "../global/LocationCommand";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { TagsInput } from "../ui/tags-input";
import { Slider } from "../ui/slider";
import { useMutation } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import {
  updateUserPersonalInfoServer,
  updateUserCompanyInfoServer,
} from "@/lib/actions";

type PersonalInfoProps = {
  name: string;
  image: string | null | undefined;
  email: string;
};
type CompanyInfoProps = {
  profile: ProfileType;
};

export function PersonalInfo({ name, email, image }: PersonalInfoProps) {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  const defaultImage = image
    ? image
    : `https://ui-avatars.com/api/?size=60&background=d1d6dc&color=000&rounded=true&name=${firstName}+${lastName}`;

  const form = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PersonalInfoSchemaType) => {
      return updateUserPersonalInfoServer(data);
    },

    onSuccess() {
      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: PersonalInfoSchemaType) => {
    mutate(values);
  };
  return (
    <div className="rounded-4xl bg-main-blue/5 p-3 pt-4 flex-col flex gap-6">
      <h3 className="text-sm text-main-blue">Personal Information</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white grid-cols-1 grid gap-6 rounded-2xl p-4 lg:p-6 xl:p-8"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 items-center">
                      {field.value ? (
                        <Image
                          src={URL.createObjectURL(field.value)}
                          alt={name}
                          width={50}
                          height={50}
                          className="rounded-full size-[50px] object-center object-cover"
                        />
                      ) : (
                        <Image
                          src={defaultImage}
                          alt={name}
                          width={50}
                          height={50}
                          className="rounded-full  size-[50px] object-center object-cover"
                        />
                      )}
                      <span className="text-main-blue text-sm">
                        Your Profile Image
                      </span>
                    </div>
                    <FormLabel
                      className="bg-main-blue/10 h-11 rounded-3xl px-3 py-1 w-max hover:shadow-sm transition-colors duration-200 flex gap-1 items-center text-main-blue font-medium text-sm"
                      htmlFor="image"
                    >
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            field.onChange(files[0]);
                          }
                        }}
                        accept="image/*"
                        hidden
                      />
                      <Upload className="size-4" />
                      <span>Upload</span>
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormItem className="w-full">
            <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
              Email
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Email Address"
                className="h-11"
                readOnly
                value={email}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 ml-auto hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4  w-full md:w-max rounded-md md:rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange"
          >
            <span>{isPending ? "Saving..." : "Save Changes"}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function CompanyInfo({ profile }: CompanyInfoProps) {
  const {
    companyLogo,
    companyName,
    license,
    phoneNumber,
    location,
    companyTrade,
    markupPercentage,
  } = profile;
  const defaultImage = companyLogo
    ? companyLogo
    : `https://ui-avatars.com/api/?size=60&background=d1d6dc&color=000&rounded=true&name=${companyName}`;

  const [open, setOpen] = useState(false);

  const form = useForm<CompanyInfoSchemaType>({
    resolver: zodResolver(companyInfoSchema),
    mode: "onChange",
    defaultValues: {
      companyName,
      license: license || "",
      phoneNumber,
      location,
      companyTrade,
      markupPercentage,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CompanyInfoSchemaType) => {
      return updateUserCompanyInfoServer(data);
    },

    onSuccess() {
      toast.success("Company info updated successfully.");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleSetLocation = (val: string) => {
    form.setValue("location", val, { shouldValidate: true });
    setOpen(false);
  };

  const onSubmit = (values: CompanyInfoSchemaType) => {
    mutate(values);
  };

  return (
    <div className="rounded-4xl bg-main-blue/5 p-3 pt-4 flex-col flex gap-6">
      <h3 className="text-sm text-main-blue">Company Information</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white grid-cols-1 grid gap-6 rounded-2xl p-4 lg:p-6 xl:p-8"
        >
          <FormField
            control={form.control}
            name="companyLogo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 items-center">
                      {field.value ? (
                        <Image
                          src={URL.createObjectURL(field.value)}
                          alt={companyName}
                          width={50}
                          height={50}
                          className="rounded-full size-[50px] object-center object-cover"
                        />
                      ) : (
                        <Image
                          src={defaultImage}
                          alt={companyName}
                          width={50}
                          height={50}
                          className="rounded-full  size-[50px] object-center object-cover"
                        />
                      )}
                      <span className="text-main-blue text-sm">
                        Your Company Logo
                      </span>
                    </div>
                    <FormLabel
                      className="bg-main-blue/10 h-11 rounded-3xl px-3 py-1 w-max hover:shadow-sm transition-colors duration-200 flex gap-1 items-center text-main-blue font-medium text-sm"
                      htmlFor="logo"
                    >
                      <Input
                        id="logo"
                        name="logo"
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            field.onChange(files[0]);
                          }
                        }}
                        accept="image/*"
                        hidden
                      />
                      <Upload className="size-4" />
                      <span>Upload</span>
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Company Name
                  </FormLabel>
                  <FormDescription className="text-xs">
                    This is the name clients will see on estimates and
                    proposals.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Company Name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Company Phone Number
                  </FormLabel>
                  <FormDescription className="text-xs">
                    This is the phone number clients can use to reach your
                    company.
                  </FormDescription>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Company Address
                  </FormLabel>
                  <FormDescription className="text-xs">
                    Your company’s address or primary work area. Estimates are
                    based on this location.
                  </FormDescription>
                  <FormControl>
                    <DropdownMenu onOpenChange={setOpen} open={open}>
                      <DropdownMenuTrigger asChild>
                        <Input
                          value={field.value}
                          readOnly
                          className="h-11 text-start"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align={"start"}
                        side="bottom"
                        className="min-w-[15rem]"
                      >
                        <LocationCommand
                          currentAddress={field.value}
                          handleClose={handleSetLocation}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue ">
                    Company License
                  </FormLabel>
                  <FormDescription className="text-xs">
                    (Optional) Your company’s license or registration number.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="License" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="companyTrade"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                  Company Trades
                </FormLabel>
                <FormDescription className="text-xs">
                  List the trades or services your company provides.
                </FormDescription>
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                    placeholder="Type a trade or service and press Enter"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="markupPercentage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue ">
                  Markup Percentage
                </FormLabel>
                <FormDescription className="text-xs">
                  (Optional) A percentage added to the estimate total. This will
                  not be visible to your clients.
                </FormDescription>
                <FormControl>
                  <div className="border border-input rounded-lg p-4 gap-5 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <span className="text-xs font-medium text-main-blue/80">
                        Markup
                      </span>
                      <span className="text-xl font-medium text-main-blue">
                        {field.value} %
                      </span>
                    </div>

                    <Slider
                      value={[field.value]}
                      step={1}
                      max={100}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 ml-auto hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4  w-full md:w-max rounded-md md:rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange"
          >
            <span>{isPending ? "Saving..." : "Save Changes"}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
