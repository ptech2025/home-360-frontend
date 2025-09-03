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
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/types/zod-schemas";
import { Input } from "../ui/input";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "nextjs-toploader/app";

export function UpdatePassword() {
  const [isPending, setIsPending] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { replace } = useRouter();
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleForgotPassword = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsSigningOut(true);
        },
        onSuccess: () => {
          replace("/forgot-password");
        },
      },
    });
    setIsSigningOut(false);
  };

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    await authClient.changePassword(
      {
        newPassword: values.newPassword,
        currentPassword: values.oldPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: async () => {
          toast.success("Password Updated Successfully.");
          form.reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
        onError: (ctx) => {
          console.log(ctx);
          if (ctx.error.code === "CREDENTIAL_ACCOUNT_NOT_FOUND") {
            toast.error(
              "Your account was created with Google so you can't update password"
            );
            form.reset({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          } else {
            toast.error(
              ctx.error.message ?? "Something went wrong, try again later."
            );
          }
        },
      }
    );
    setIsPending(false);
  };
  return (
    <div className="rounded-[1.75rem] bg-[#FAFAFB]  p-3 pt-4 flex-col flex gap-3">
      <h3 className=" pl-2 text-base font-medium font-broke-medium text-main-blue">
        Update Password
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-xs grid-cols-1 grid gap-6 rounded-2xl p-4 lg:p-6 xl:p-8"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                  Old Password
                </FormLabel>
                <FormDescription className="text-xs ">
                  Type your current password
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Old password"
                    className="h-11"
                  />
                </FormControl>
                <div className="flex gap-0.5 flex-col">
                  <FormMessage className="text-xs " />
                  <div className="flex gap-1 items-center text-main-blue/80 text-xs">
                    <span>Forgot password? click</span>
                    <Button
                      type="button"
                      variant={"link"}
                      onClick={handleForgotPassword}
                      disabled={isPending || isSigningOut}
                      className="p-0 text-xs underline italic text-main-blue h-max"
                    >
                      Here
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    New Password
                  </FormLabel>
                  <FormDescription className="text-xs ">
                    Type your new password
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New password"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Re-type New Password
                  </FormLabel>
                  <FormDescription className="text-xs ">
                    Repeat your new password
                  </FormDescription>
                  <FormControl>
                    <Input {...field} className="h-11" />
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || isSigningOut}
            className="h-11 ml-auto hover:ring-[3px]  ring-main-blue/50  transition-all duration-200 py-1 px-4  w-full md:w-max rounded-md md:rounded-4xl bg-main-blue text-white flex gap-1 items-center text-sm border hover:border-main hover:bg-transparent hover:text-main-blue"
          >
            <span>{isPending ? "Saving..." : "Save Changes"}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
