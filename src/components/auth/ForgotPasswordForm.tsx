"use client";

import * as motion from "motion/react-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";

import PasswordResetLinkSent from "./PasswordResetLinkSent";

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordResetLinkSent, setShowPasswordResetLinkSent] =
    useState(false);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordSchemaType) => {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/reset-password`,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          toast.success("Password Reset Link Sent.");
          setShowPasswordResetLinkSent(true);
        },
        onError: (ctx) => {
          console.log(ctx);

          toast.error(
            ctx.error.message ?? "Something went wrong, try again later."
          );
        },
      }
    );
    setIsLoading(false);
  };

  if (showPasswordResetLinkSent)
    return (
      <PasswordResetLinkSent
        setShowPasswordResetLinkSent={setShowPasswordResetLinkSent}
      />
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      className="w-full max-w-[500px] flex gap-8 flex-col "
    >
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-main-blue font-dm font-bold text-2xl">
          {" "}
          Forgot Password
        </h1>
        <p className="text-sm text-main-blue/80">
          {" "}
          Enter your email address and we will send you a link to reset your
          password
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full  justify-center  flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            size={"lg"}
            disabled={isLoading}
            className="gap-2 group text-white h-12 w-full font-medium font-dm rounded-4xl text-base bg-dark-orange hover:bg-main-blue"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <span>Send Reset Link</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
export default ForgotPasswordForm;
