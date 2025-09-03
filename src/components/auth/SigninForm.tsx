"use client";

import Link from "next/link";
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
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signInSchema, SignInSchemaType } from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { GoogleIcon } from "../global/Icons";
import EmailVerificationSent from "./EmailVerificationSent";

function SignInForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        newUserCallbackURL: `${process.env.NEXT_PUBLIC_URL}/onboarding`,
        callbackURL: `${process.env.NEXT_PUBLIC_URL}/onboarding`,
      },
      {
        onRequest: () => {
          setIsGoogleLoading(true);
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(
            ctx.error.message ?? "Something went wrong, try again later."
          );
        },
      }
    );
    setIsGoogleLoading(false);
  };

  const onSubmit = async (values: SignInSchemaType) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: `${process.env.NEXT_PUBLIC_URL}/onboarding`,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          toast.success("Signed in successfully.");
        },
        onError: (ctx) => {
          console.log(ctx);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            handleManualVerifyEmailSend(values.email);
          } else {
            toast.error(
              ctx.error.message ?? "Something went wrong, try again later."
            );
          }
        },
      }
    );
    setIsLoading(false);
  };

  const handleManualVerifyEmailSend = async (email: string) => {
    await authClient.sendVerificationEmail(
      {
        email,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          toast.success("Email Verification Link Sent.");
          setShowVerifyEmail(true);
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

  if (showVerifyEmail)
    return <EmailVerificationSent setShowVerifyEmail={setShowVerifyEmail} />;

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <div className="w-full grid grid-cols-2 max-w-[360px] h-12  items-center justify-center bg-main-blue/20 p-1 rounded-md">
        <Button
          type="button"
          data-state="inactive"
          asChild
          className="h-full w-full data-[state=inactive]:border-0 data-[state=inactive]:shadow-none data-[state=inactive]:bg-transparent data-[state=inactive]:text-main-blue/80 data-[state=active]:bg-main-blue data-[state=active]:text-white"
        >
          <Link href={"/sign-up"}>Create an Account</Link>
        </Button>{" "}
        <Button
          type="button"
          data-state="active"
          asChild
          className="h-full w-full data-[state=inactive]:border-0 data-[state=inactive]:shadow-none data-[state=inactive]:bg-transparent data-[state=inactive]:text-main-blue/80 data-[state=active]:bg-main-blue data-[state=active]:text-white"
        >
          <Link href={"/sign-in"}>Sign in</Link>
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        className="w-full max-w-[500px] flex items-center justify-center gap-8 flex-col"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  justify-center  flex-col gap-6"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start w-full gap-2">
                  <FormLabel className="text-main-blue">Password</FormLabel>
                  <FormControl>
                    <div className="w-full m-0! aria-invalid:border-destructive focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring aria-invalid:ring-destructive/20 flex items-center justify-between   rounded-md h-11 px-3 py-1  outline-0 border border-input ">
                      <input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="flex-grow focus-visible:outline-offset-none border-none focus-visible:ring-none  shadow-none outline-none rounded-none focus-visible:ring-0 pl-0 py-0 placeholder:text-sm  text-sm  outline-0 border-0  h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="shrink-0 flex items-center justify-center"
                      >
                        {showPassword ? (
                          <EyeOff className="size-[1rem] text-main-blue" />
                        ) : (
                          <Eye className="size-[1rem] text-main-blue" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div className="flex justify-between items-center w-full">
                    <FormMessage className="text-xs " />
                    <Link
                      className=" capitalize ml-auto text-main-blue/80 hover:underline text-xs underline-offset-2"
                      href="/forgot-password"
                    >
                      forgot password?
                    </Link>
                  </div>
                </FormItem>
              )}
            />

            <Button
              size={"lg"}
              disabled={isLoading || isGoogleLoading}
              className="gap-2 group text-white h-12 w-full font-medium font-dm rounded-4xl text-base bg-dark-orange hover:bg-main-blue"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </Button>
            <div className="flex items-center gap-4 justify-between w-full text-main-blue/80 text-base">
              <span className="h-px bg-main-blue/50 flex-grow"></span>
              <span>OR</span>
              <span className="h-px bg-main-blue/50 flex-grow"></span>
            </div>
            <Button
              type="button"
              size={"lg"}
              onClick={signInWithGoogle}
              disabled={isLoading || isGoogleLoading}
              className="gap-2 group text-black h-12 w-full font-medium font-dm text-base bg-white hover:bg-main-blue/20 border border-main-blues"
            >
              {isGoogleLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <GoogleIcon className="size-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
export default SignInForm;
