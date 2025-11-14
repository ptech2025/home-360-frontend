"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
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
import { useRouter } from "nextjs-toploader/app";

type DeleteAccountFormProps = {
  className?: string;
};

const deleteAccountSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

export function DeleteAccountSection({ className }: DeleteAccountFormProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const handleDeleteAccount = async (
    values: z.infer<typeof deleteAccountSchema>
  ) => {
    await authClient.deleteUser(
      {
        password: values.password,
      },
      {
        onRequest: () => {
          setIsDeleting(true);
        },
        onSuccess: () => {
         router.replace("/");
        },
        onError: (ctx) => {
          const message =
            ctx.error?.message ?? "Unable to delete account. Please try again.";
          toast.error(message);
          setIsDeleting(false);
        },
      }
    );
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-circular-medium text-destructive">
          Danger zone
        </h4>
        <p className="text-xs text-gray">
          Permanently remove your account and all associated data. This action
          cannot be undone.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleDeleteAccount)}
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full sm:flex-1">
                <FormLabel className="text-black font-circular-medium">
                  Confirm with password
                </FormLabel>
                <FormDescription className="text-xs text-gray">
                  Enter your password to verify ownership before deletion.
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="destructive"
            disabled={isDeleting || !form.formState.isValid}
            className="h-11 w-full sm:w-max"
          >
            <span>{isDeleting ? "Deleting..." : "Delete account"}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
