"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { waitListSchema, WaitListSchemaType } from "@/types/zod-schemas";
import { Input } from "../ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWaitListCount, saveToWaitList } from "@/services/waitlist";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

const supportedTrades = [
  "General Contractor",
  "Electrician",
  "Plumber",
  "HVAC Technician",
  "Painter",
  "Carpenter",
  "Landscaper",
  "Roofer",
  "Other",
];

function WaitListForm() {
  const queryClient = useQueryClient();
  const { data: count } = useQuery({
    queryKey: ["waitListCount"],
    queryFn: fetchWaitListCount,
  });

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
      return saveToWaitList({
        email: data.email,
        jobTitle: data.trade,
      });
    },
    onSuccess: () => {
      form.reset();
      toast.success("Thanks for joining our waitlist!");
      queryClient.invalidateQueries({ queryKey: ["waitListCount"] });
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
        className="w-full  flex gap-6 flex-col p-8 rounded-t-[1.5rem] bg-white shadow-sm shadow-[#061C3D14]"
      >
        <div className="flex flex-col gap-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue/90 after:ml-0.5 after:text-red-500 after:content-['*']">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    className="h-11 text-main-blue"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="trade"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue/90">
                  Trade (optional)
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11! w-full text-main-blue">
                        <SelectValue placeholder="Select your trade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {supportedTrades.map((trade) => (
                        <SelectItem key={trade} value={trade}>
                          {trade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4 justify-center">
          <Button
            size={"lg"}
            disabled={isLoading}
            className="gap-2 group outline-solid outline-1  outline-offset-5 outline-[#D7E3ED] hover:bg-main-green transition-colors rounded-[4.5rem] text-white h-12 w-full font-bold text-base bg-main-yellow"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <span>Join Waitlist</span>
              </>
            )}
          </Button>

          {count !== undefined && count >= 10 && (
            <p className="text-sm text-main-blue text-center lg:text-start">
              {count} people are already on the waitlist — don&apos;t miss out!
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
export default WaitListForm;
