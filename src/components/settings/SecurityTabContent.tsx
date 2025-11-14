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
          toast.success("Password updated successfully.");
          form.reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
        onError: (ctx) => {
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
    <div className="min-h-full w-full p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-base font-medium font-circular-medium text-black">
          Password & Security
        </h3>
        <p className="text-xs text-gray">
          Update your password and keep your Home360 account secure.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white grid gap-6 "
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black font-circular-medium after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Current password
                  </FormLabel>
                  <FormDescription className="text-xs text-gray">
                    Enter your existing password.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter current password"
                      type="password"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                  <div className="flex flex-wrap gap-1 text-xs text-gray">
                    <span>Forgot password?</span>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleForgotPassword}
                      disabled={isPending || isSigningOut}
                      className="h-max p-0 text-xs underline text-black"
                    >
                      Reset it here
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black font-circular-medium after:ml-[-5px] after:text-red-500 after:content-['*']">
                    New password
                  </FormLabel>
                  <FormDescription className="text-xs text-gray">
                    Use at least 8 characters and avoid old passwords.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Create a new password"
                      type="password"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black font-circular-medium after:ml-[-5px] after:text-red-500 after:content-['*']">
                    Confirm new password
                  </FormLabel>
                  <FormDescription className="text-xs text-gray">
                    Re-enter the new password for confirmation.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Re-type new password"
                      type="password"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              disabled={isPending || isSigningOut}
              className="h-11 w-full rounded-md bg-main-green text-white transition-all duration-200 hover:border-black hover:bg-transparent hover:text-black hover:ring-[3px] ring-black/50 sm:w-max"
            >
              <span>{isPending ? "Saving..." : "Save changes"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
