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

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createHomeSchema, CreateHomeSchemaType } from "@/types/zod-schemas";

import { useMutation } from "@tanstack/react-query";
import { userMutations } from "@/queries/user";
import AutoCompleteLocation from "./AutoCompleteLocation";
import { DynamicLocationStatus } from "@/types";
import { Home } from "@/types/prisma-schema-types";
function CreateHomeOnboarding({
  setFirstHome,
}: {
  setFirstHome: (home: Home) => void;
}) {
  const form = useForm<CreateHomeSchemaType>({
    resolver: zodResolver(createHomeSchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      city: "",
      state: "",
    },
  });

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: userMutations.addHome,
    onSuccess(data) {
      if (data.home) {
        setFirstHome(data.home);
        toast.success("Home Added Successfully.");
      } else {
        toast.error(data.message || "Something went wrong, try again later.");
      }
    },
  });

  const onSubmit = async (values: CreateHomeSchemaType) => {
    const fullAddress = `${values.address.trim()}, ${values.city.trim()}, ${values.state.trim()}, USA`;
    mutate(fullAddress);
  };
  return (
    <div className="flex relative z-20 flex-col   w-full items-center justify-center gap-6">
      <div className="flex flex-col gap-3 items-center w-full">
        <h1 className="text-black font-circular-bold text-2xl md:text-3xl lg:text-4xl font-bold">
          Property Registration
        </h1>
        <p className="text-base text-center md:text-lg font-circular-regular font-normal text-light-gray">
          We currently only support US residential properties. Add your property
          details to get started
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
        className="w-full flex items-center justify-center gap-8 flex-col"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  justify-center  flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <AutoCompleteLocation
                      value={field.value}
                      onChange={field.onChange}
                      mode={DynamicLocationStatus.street}
                      isFormLoading={isLoading}
                      placeholder="123 Main Street"
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 w-full md:grid-cols-2 justify-between items-center gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                      City
                    </FormLabel>
                    <FormControl>
                      <AutoCompleteLocation
                        value={field.value}
                        onChange={field.onChange}
                        mode={DynamicLocationStatus.city}
                        isFormLoading={isLoading}
                        placeholder="Miami"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel className="text-black after:-ml-1 after:text-red-500 after:content-['*'] relative">
                      State
                    </FormLabel>
                    <FormControl>
                      <AutoCompleteLocation
                        value={field.value}
                        onChange={field.onChange}
                        mode={DynamicLocationStatus.state}
                        isFormLoading={isLoading}
                        placeholder="Florida"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              size={"lg"}
              disabled={isLoading}
              className="gap-2 group text-white h-12 w-full font-medium font-circular-medium  text-base bg-main-green border border-transparent hover:border-main-green hover:bg-transparent hover:text-main-green "
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
export default CreateHomeOnboarding;
