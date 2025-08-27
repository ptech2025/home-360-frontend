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
  orgInfoSchema,
  OrgInfoSchemaType,
  companyTradeSchema,
  CompanyTradeSchemaType,
  PricingSchemaType,
  pricingSchema,
} from "@/types/zod-schemas";
import { Input } from "@/components/ui/input";
import {
  AutoLocationSelectionInput,
  ManualLocationSelectionInput,
  MarkupPercentInput,
  UploadCompanyLogoInput,
} from "./OnboardingInputs";
import PhoneInput from "../global/PhoneInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveOrgOnboardingInfo,
  savePricingOnboardingInfo,
  saveTradeOnboardingInfo,
} from "@/services/user";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useOnboardingStore } from "@/store/onboardingStore";
import { nanoid } from "nanoid";
import { Checkbox } from "../ui/checkbox";
import { CubeIcon, ElectricIcon, PipeIcon, ScrewIcon } from "../global/Icons";
import { TagsInput } from "../ui/tags-input";


const tradeArr = [
  {
    id: nanoid(),
    text: "Plumbing",
    description:
      "Create fast, detailed proposals for repairs, installations, and remodels. Includes pre-loaded materials, fixtures, and labor rates",
    icon: PipeIcon,
  },
  {
    id: nanoid(),
    text: "Electrical",
    description:
      "Build accurate quotes for wiring, lighting, and system installs. Covers parts lists, timelines, and compliance notes.",
    icon: ElectricIcon,
  },
  {
    id: nanoid(),
    text: "Framing",
    description:
      "Generate scope and cost breakdowns for framing jobs — from single rooms to full builds. Includes lumber and fastener estimates.",
    icon: CubeIcon,
  },
  {
    id: nanoid(),
    text: "HVAC",
    description:
      "Quote installs, repairs, and maintenance with pre-filled equipment and seasonal labor rates. Supports multiple system types.",
    icon: ScrewIcon,
  },
];

export function OrgOnboardingForm() {
  const { setCurrentPage } = useOnboardingStore();
  const queryClient = useQueryClient();

  const defaultValues: OrgInfoSchemaType = {
    companyName: "",
    phoneNumber: "",
    license: undefined,
    companyLogo: undefined,
  };

  const form = useForm<OrgInfoSchemaType>({
    resolver: zodResolver(orgInfoSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: OrgInfoSchemaType) => {
      return saveOrgOnboardingInfo(data);
    },
    onSuccess: () => {
      form.reset(defaultValues);
      setCurrentPage(2);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.log(error);
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const setLogo = async (logo: File) => {
    form.setValue("companyLogo", logo, { shouldValidate: true });
    const isValid = await form.trigger("companyLogo");
    if (!isValid) {
      form.setValue("companyLogo", undefined);
    }
  };

  const onSubmit = (values: OrgInfoSchemaType) => {
    mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
      }}
      className="w-full max-w-[450px] flex gap-8 flex-col items-center  justify-center"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-center  flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="companyLogo"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-main-blue">
                  Logo (optional)
                </FormLabel>
                <FormControl>
                  <UploadCompanyLogoInput
                    setLogo={setLogo}
                    logo={field.value}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                  Business Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Business Name"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput setPhoneNumber={field.onChange} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="license"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-main-blue">
                  License (optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="" className="h-11" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            size={"lg"}
            disabled={isLoading}
            className="gap-2 group text-white h-12 w-full font-medium font-dms text-base bg-dark-orange hover:bg-main-blue"
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
  );
}
export function TradeOnboardingForm() {
  const { setCurrentPage } = useOnboardingStore();
  const queryClient = useQueryClient();

  const defaultValues: CompanyTradeSchemaType = {
    companyTrade: [],
  };

  const [showTagsInput, setShowTagsInput] = useState(false);

  const form = useForm<CompanyTradeSchemaType>({
    resolver: zodResolver(companyTradeSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: CompanyTradeSchemaType) => {
      return saveTradeOnboardingInfo(data);
    },
    onSuccess: () => {
      form.reset(defaultValues);
      setCurrentPage(3);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.log(error);
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const setCompanyTrade = (
    newTradeArr: CompanyTradeSchemaType["companyTrade"]
  ) => {
    form.setValue("companyTrade", newTradeArr, { shouldValidate: true });
  };

  const onSubmit = (values: CompanyTradeSchemaType) => {
    mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
      }}
      className="w-full max-w-[450px] flex gap-8 flex-col items-center  justify-center"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-center  flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="companyTrade"
            render={({ field }) => (
              <FormItem className="w-full grid-cols-1 gap-6">
                {tradeArr.map((trade) => {
                  const Icon = trade.icon;

                  return (
                    <label
                      htmlFor={trade.id}
                      key={trade.id}
                      className="w-full has-checked:bg-main-blue/10 has-checked:border-main-blue border border-input shadow-input cursor-pointer hover:shadow-sm p-4 rounded-xl flex items-center gap-4 "
                    >
                      <Checkbox
                        id={trade.id}
                        hidden
                        checked={field.value.some((t) => t === trade.text)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            const newTradeArr = [...field.value, trade.text];
                            setCompanyTrade(newTradeArr);
                          } else {
                            const newTradeArr = field.value.filter(
                              (t) => t !== trade.text
                            );
                            setCompanyTrade(newTradeArr);
                          }
                        }}
                      />
                      <div className="size-14 flex items-center justify-center shrink-0 border border-input rounded-lg p-2">
                        {<Icon />}
                      </div>
                      <div className="flex items-start flex-col gap-1">
                        <span className="text-lg font-medium text-main-blue">
                          {trade.text}
                        </span>
                        <p className="text-sm text-main-blue/80">
                          {trade.description}
                        </p>
                      </div>
                    </label>
                  );
                })}

                {showTagsInput ? (
                  <div className="w-full flex flex-col gap-1.5">
                    <FormLabel className="text-main-blue text-xs after:ml-[-5px] after:text-red-500 after:content-['*'] ">
                      Other
                    </FormLabel>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                      placeholder="Type a trade or service and press Enter"
                    />
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className="text-dark-orange h-11!"
                    onClick={() => setShowTagsInput(true)}
                  >
                    Other
                  </Button>
                )}

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            size={"lg"}
            disabled={isLoading}
            className="gap-2 group text-white h-12 w-full font-medium font-dms text-base bg-dark-orange hover:bg-main-blue"
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
  );
}

export function PricingOnboardingForm() {
  const queryClient = useQueryClient();
  const { setCurrentPage } = useOnboardingStore();
  const [locationSelectionMode, setLocationSelectionMode] = useState<
    "auto" | "manual"
  >("auto");

  const defaultValues: PricingSchemaType = {
    location: "",
    markupPercentage: 0,
  };

  const form = useForm<PricingSchemaType>({
    resolver: zodResolver(pricingSchema),
    mode: "onChange",
    defaultValues,
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: PricingSchemaType) => {
      return savePricingOnboardingInfo(data);
    },
    onSuccess: () => {
      setCurrentPage(4);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.log(error);
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleLocationSelection = ({
    address,
    mode,
  }: {
    address: string;
    mode: "auto" | "manual";
  }) => {
    form.setValue("location", address, { shouldValidate: true });
    setLocationSelectionMode(mode);
  };

  const handleMarkupChange = (value: number) => {
    form.setValue("markupPercentage", value, { shouldValidate: true });
  };

  const onSubmit = (values: PricingSchemaType) => {
    mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
      }}
      className="w-full max-w-[450px] flex gap-8 flex-col items-center  justify-center"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-center  flex-col gap-4"
        >
          {locationSelectionMode === "auto" ? (
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full grid-cols-1 gap-1">
                  <AutoLocationSelectionInput
                    handleLocationSelect={handleLocationSelection}
                    value={field.value}
                  />
                </FormItem>
              )}
            />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full grid-cols-1 gap-1">
                      <ManualLocationSelectionInput
                        value={field.value}
                        handleLocationSelect={handleLocationSelection}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="markupPercentage"
                  render={({ field }) => (
                    <FormItem className="w-full grid-cols-1 gap-1">
                      <MarkupPercentInput
                        markupPercent={field.value}
                        setMarkupPercent={handleMarkupChange}
                      />
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <Button
                size={"lg"}
                disabled={isLoading}
                className="gap-2 group text-white h-12 w-full font-medium font-dms text-base bg-dark-orange hover:bg-main-blue"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                  </>
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </motion.div>
  );
}
