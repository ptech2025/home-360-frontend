"use client";

import Link from "next/link";
import  { motion} from "framer-motion";
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
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { signUpSchema, SignUpSchemaType } from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { GoogleIcon } from "../global/Icons";
import EmailVerificationSent from "./EmailVerificationSent";
import { getDefaultImage } from "@/utils/funcs";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
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

  const onSubmit = async (values: SignUpSchemaType) => {
    await authClient.signUp.email(
      {
        email: values.email,
        name: `${values.firstName} ${values.lastName}`,
        password: values.password,
        image: getDefaultImage(values.firstName + " " + values.lastName),

        callbackURL: `${process.env.NEXT_PUBLIC_URL}/onboarding`,
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
    <div className="flex flex-col max-w-[500px] w-full items-center justify-center gap-6">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-black font-circular-medium text-2xl font-bold">
          Create Your HOME360 Account
        </h1>
        <p className="text-base md:text-lg font-circular-light font-normal text-light-gray">
          All your home documents, bills, and reminders — organized in one
          secure place.
        </p>
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
        className="w-full  flex gap-8 flex-col items-center  justify-center"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full justify-center  flex-col gap-4"
          >
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-black">First Name</FormLabel>
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
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-black">Last Name</FormLabel>
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black">Email</FormLabel>
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
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <div className="w-full m-0! aria-invalid:border-destructive focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring aria-invalid:ring-destructive/20 flex items-center justify-between   rounded-md h-11 px-3 py-1  outline-0 border border-input ">
                      <input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="flex-grow focus-visible:outline-offset-none border-none focus-visible:ring-none  shadow-none outline-none rounded-none focus-visible:ring-0 pl-0 py-0  text-base md:text-sm  outline-0 border-0  h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="shrink-0 flex items-center justify-center"
                      >
                        {showPassword ? (
                          <EyeOff className="size-[1rem] text-black" />
                        ) : (
                          <Eye className="size-[1rem] text-black" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start w-full gap-2">
                  <FormLabel className="text-black">Re-type Password</FormLabel>
                  <FormControl>
                    <div className="w-full m-0! aria-invalid:border-destructive focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring aria-invalid:ring-destructive/20 flex items-center justify-between   rounded-md h-11 px-3 py-1  outline-0 border border-input ">
                      <input
                        placeholder="Re-type Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="flex-grow focus-visible:outline-offset-none border-none focus-visible:ring-none  shadow-none outline-none rounded-none focus-visible:ring-0 pl-0 py-0  text-base md:text-sm  outline-0 border-0  h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="shrink-0 flex items-center justify-center"
                      >
                        {showPassword ? (
                          <EyeOff className="size-[1rem] text-black" />
                        ) : (
                          <Eye className="size-[1rem] text-black" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs " />
                </FormItem>
              )}
            />
            <Button
              size={"lg"}
              disabled={isLoading || isGoogleLoading}
              className="gap-2 group text-white h-12 w-full font-medium font-circular-medium  text-base bg-main-green border border-transparent hover:border-main-green hover:bg-transparent hover:text-main-green "
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <span>Sign Up</span>
                </>
              )}
            </Button>
            <div className="flex items-center gap-4 justify-between w-full text-black/80 text-base">
              <span className="h-px bg-light-gray flex-grow"></span>
              <span>OR</span>
              <span className="h-px bg-light-gray flex-grow"></span>
            </div>
            <Button
              type="button"
              size={"lg"}
              onClick={signInWithGoogle}
              disabled={isLoading || isGoogleLoading}
              className="gap-2 group text-black hover:bg-transparent h-12 w-full font-medium font-circular-regular text-base border border-light-gray bg-white hover:shadow-sm "
            >
              {isGoogleLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <span>Continue with Google</span>
                  <GoogleIcon className="size-5" />
                </>
              )}
            </Button>
          </form>
        </Form>
        <p className="text-xs max-w-[300px] text-center text-balance text-light-gray">
          Already have an account?
          <Link href="/sign-in" className="underline text-main-green">
            {" "}
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
export default SignUpForm;
