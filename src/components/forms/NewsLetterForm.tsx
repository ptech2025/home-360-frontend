"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { waitListSchema, WaitListSchemaType } from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { saveToNewsLetter } from "@/services/waitlist";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import Link from "next/link";

function NewsLetterForm() {
  const form = useForm<WaitListSchemaType>({
    resolver: zodResolver(waitListSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      trade: "",
    },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: WaitListSchemaType) => {
      return saveToNewsLetter({
        email: data.email,
      });
    },
    onSuccess: () => {
      form.reset();
      toast.success("Thanks for joining our newsletter!");
    },
    onError: (error) => {
      console.log(error);
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const onSubmit = (values: WaitListSchemaType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px]  flex gap-4 flex-col "
      >
        <div className="flex flex-col gap-2 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    className="h-11 bg-white border-[#E9EAEB] text-main-blue"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />{" "}
          <span className="text-xs text-main-blue">
            We protect your data in our{" "}
            <Link href={`/privacy-policy`} className="italic underline">
              privacy policy
            </Link>
          </span>
        </div>
        <Button
          size={"lg"}
          disabled={isLoading}
          className="gap-2 group h-10   border hover:border-main-blue hover:bg-transparent hover:text-main-blue bg-main-blue transition-colors rounded-4xl text-white  w-full font-bold text-sm"
        >
          {isLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <span>Subscribe Now</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
export default NewsLetterForm;
