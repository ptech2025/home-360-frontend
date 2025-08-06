"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { useRouter } from "nextjs-toploader/app";
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
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { signInSchema, SignInSchemaType } from "@/utils/zod-schemas";
import { Input } from "../ui/input";
import EmailVerificationSent from "./EmailVerificationSent";

function SignInForm() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (values: SignInSchemaType) => {
    // await authClient.signIn.email(
    //   {
    //     email: values.email,
    //     password: values.password,
    //   },
    //   {
    //     onRequest: () => {
    //       setIsLoading(true);
    //     },
    //     onSuccess: async () => {
    //       toast.success("Successfully signed in.");
    //       push("/dashboard/my-orders");
    //     },
    //     onError: (ctx) => {
    //       console.log(ctx);
    //       if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
    //         handleManualVerifyEmailSend(values.email);
    //       } else {
    //         toast.error(
    //           ctx.error.message ?? "Something went wrong, try again later."
    //         );
    //       }
    //     },
    //   }
    // );
    setIsLoading(false);
  };

  const handleManualVerifyEmailSend = async (email: string) => {
    // await authClient.sendVerificationEmail(
    //   {
    //     email,
    //   },
    //   {
    //     onRequest: () => {
    //       setIsLoading(true);
    //     },
    //     onSuccess: async () => {
    //       toast.success("Email Verification Link Sent.");
    //       setShowVerifyEmail(true);
    //     },
    //     onError: (ctx) => {
    //       console.log(ctx);
    //       toast.error(
    //         ctx.error.message ?? "Something went wrong, try again later."
    //       );
    //     },
    //   }
    // );
    setIsLoading(false);
  };

  if (showVerifyEmail)
    return <EmailVerificationSent setShowVerifyEmail={setShowVerifyEmail} />;

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
      className="w-full max-w-[500px] flex gap-8 flex-col p-6 rounded-[1.25rem] border border-[#E6E8EC80] bg-white shadow-sm shadow-darker-grey/10"
    >
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
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    className="h-12"
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
                  <div className="w-full m-0! aria-invalid:border-destructive focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring aria-invalid:ring-destructive/20 flex items-center justify-between   rounded-md h-12 px-3 py-1  outline-0 border border-input ">
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
                        <EyeOff className="size-[1.125rem] text-black" />
                      ) : (
                        <Eye className="size-[1.125rem] text-black" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <div className="flex justify-between items-center w-full">
                  <FormMessage className="text-xs " />
                  <Link
                    className=" capitalize ml-auto text-black hover:underline text-xs underline-offset-2"
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
            disabled={isLoading}
            className="gap-2 group text-white h-12 w-full font-bold text-base bg-black"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="size-5 group-hover:translate-x-4 transition-transform duration-200" />
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col items-center justify-center ">
        <p className="text-sm text-center text-balance text-light-grey">
          Don’t have an account?{" "}
          <Link
            className=" text-black hover:underline underline-offset-2"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
export default SignInForm;
