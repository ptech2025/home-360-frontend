"use client";

import { Button } from "@/components/ui/button";
import { ContactFormSchemaType, contactFormSchema } from "@/types/zod-schemas";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data: ContactFormSchemaType) => {
    try {
      setIsSubmitting(true);
      toast.success("Message sent successfully, we will get back to you soon.");
      reset({
        email: "",
        name: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          type: "spring",
          stiffness: 100,
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col  relative z-10 w-full gap-8 p-8 rounded-[1.25rem] border border-[#E6E8EC80] bg-[#FAFAFA] shadow-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="after:-ml-1 after:text-red-500 after:content-['*'] relative ">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your full name"
                  className={cn("w-full h-12  rounded-md  text-base text-main")}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:-ml-1 after:text-red-500 after:content-['*'] relative ">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your email address"
                  className={cn("w-full h-12  rounded-md  text-base text-main")}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:-ml-1 after:text-red-500 after:content-['*'] relative ">
                Your Message
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Leave us a message"
                  className={cn("w-full min-h-[20rem] text-base")}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-4xl h-11 w-full bg-main-green border font-circular-medium font-medium border-transparent text-white hover:border-black hover:bg-transparent hover:text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />{" "}
              <span>Sending...</span>
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </motion.form>
    </Form>
  );
}
export default ContactForm;
