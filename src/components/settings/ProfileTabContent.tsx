"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUserType } from "@/types";
import {
  personalInfoSchema,
  PersonalInfoSchemaType,
} from "@/types/zod-schemas";
import { userMutations } from "@/queries/user";
import { useMutation } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import { DeleteAccountSection } from "./DeleteAccountSection";

function getNameParts(name: string) {
  const parts = name.split(" ");
  const firstName = parts[0] ?? "";
  const lastName = parts[1] ?? "";

  return { firstName, lastName };
}

type UpdateProfileFormProps = {
  user: AuthUserType;
};

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const { firstName, lastName } = getNameParts(user.name);
  const [preview, setPreview] = useState<string | null>(user.image ?? null);
  const previewUrlRef = useRef<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      firstName,
      lastName,
    },
  });
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: userMutations.updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onSettled: (_data, _error, _vars, _result, context) => {
      context.client.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const onSubmit = async (values: PersonalInfoSchemaType) => {
    updateProfile(values);
  };

  return (
    <div className="p-4 min-h-full flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-base font-medium font-circular-medium text-black">
          Profile Settings
        </h3>
        <p className="text-xs text-gray">Manage your personal information</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white  grid gap-6 "
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-black font-circular-medium">
                  Profile photo
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar className="size-20 rounded-full ">
                      {preview ? (
                        <AvatarImage
                          src={preview}
                          alt={`Profile picture of ${user.name}`}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-main-green/10 text-main-green text-lg font-circular-medium uppercase">
                          {firstName[0].toUpperCase()}
                          {lastName[0].toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadIcon className="w-4 h-4" />
                      <span>Upload new photo</span>
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files.length > 0
                            ? event.target.files[0]
                            : undefined;
                        if (file) {
                          field.onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          if (previewUrlRef.current) {
                            URL.revokeObjectURL(previewUrlRef.current);
                          }
                          previewUrlRef.current = objectUrl;
                          setPreview(objectUrl);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-gray">
                  PNG, JPG, or WebP formats up to 2&nbsp;MB.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black font-circular-medium">
                    First name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your first name"
                      className="h-11"
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
                  <FormLabel className="text-black font-circular-medium">
                    Last name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your last name"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label
                className="text-black font-circular-medium"
                htmlFor="profile-email"
              >
                Email
              </Label>
              <Input
                id="profile-email"
                value={user.email ?? ""}
                readOnly
                disabled
                className="h-11"
              />
              <p className="text-xs text-gray">
                Email changes are managed by the Home360 team. Contact support
                if you need to update it.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-11 w-full rounded-md bg-main-green text-white transition-all duration-200 hover:border-black hover:bg-transparent hover:text-black hover:ring-[3px] ring-black/50 sm:w-max"
            >
              <span>{isUpdating ? "Saving..." : "Save changes"}</span>
            </Button>
          </div>
        </form>
      </Form>
      <DeleteAccountSection className="rounded-md border border-destructive/20 bg-white p-4" />
    </div>
  );
}
