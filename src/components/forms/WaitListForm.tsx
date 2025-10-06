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
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { userMutations } from "@/queries/user";

function WaitListForm() {
  // const { data: count } = useQuery({
  //   queryKey: ["waitListCount"],
  //   queryFn: fetchWaitListCount,
  // });

  const form = useForm<WaitListSchemaType>({
    resolver: zodResolver(waitListSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: userMutations.addToWaitList,
    onSuccess: () => {
      form.reset();
      toast.success("Thanks for joining our waitlist!");
    },
  });

  const onSubmit = (values: WaitListSchemaType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md relative z-20  flex flex-col gap-2 md:flex-row items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="md:rounded-[4.5rem] md:focus-within:border-ring md:shadow-sm md:focus-within:ring-ring/50 md:focus-within:ring-[3px] md:border md:border-input p-2 pl-3 flex items-center gap-2">
                <FormControl>
                  <Input
                    placeholder="Your email address"
                    className="h-12 rounded-[4.5rem] md:p-0 md:rounded-none md:border-none md:ring-0 md:shadow-none md:focus-visible:ring-0 text-black"
                    {...field}
                  />
                </FormControl>
                <Button
                  size={"lg"}
                  disabled={isLoading}
                  className="gap-2 shrink-0 hidden md:flex group hover:bg-black transition-colors rounded-[4.5rem] text-white h-12 w-[145px] font-bold text-base bg-main-green"
                >
                  {isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                    </>
                  )}
                </Button>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />{" "}
        <Button
          size={"lg"}
          disabled={isLoading}
          className="gap-2 md:hidden group hover:bg-black transition-colors rounded-[4.5rem] text-white h-12 w-full md:w-[145px] font-bold text-base bg-main-green"
        >
          {isLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <span>Join Waitlist</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
export default WaitListForm;
