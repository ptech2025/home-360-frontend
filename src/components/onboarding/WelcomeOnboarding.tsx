"use client";

import * as motion from "motion/react-client";
import { Home } from "@/types/prisma-schema-types";
import { Home as HomeIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { userMutations } from "@/queries/user";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  home: Home;
  showHeader?: boolean;
};

function WelcomeOnboarding({ home, showHeader = true }: Props) {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: userMutations.triggerOnboarding,
    onSuccess: () => {
      push(`/dashboard/${home.id}`);
    },
  });

  return (
    <div className="flex relative z-20 flex-col   w-full items-center justify-center gap-6">
      {showHeader && (
        <div className="flex flex-col gap-3 items-center w-full">
          <div className="relative">
            <h1 className="text-black font-circular-bold text-2xl md:text-3xl lg:text-4xl font-bold">
              <span>Welcome To</span>{" "}
              <span className="text-main-green">Home</span>
              <span className="text-main-yellow">360</span>
            </h1>
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              className="absolute top-1 -right-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="4.5"
                cy="4.5"
                r="3.25"
                stroke="#f8be5c"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <p className="text-base text-center  font-circular-medium text-black">
            Your home has been added. You&apos;re now ready to track
            maintenance, finances, and documents — all in one place.
          </p>
        </div>
      )}
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
        <div className="p-6 flex rounded-xl bg-lime w-full flex-col gap-4 justify-center">
          <div className="flex gap-2 text-base text-black font-circular-medium font-medium">
            <HomeIcon strokeWidth={1.5} className="text-gray size-5" />
            <span>Your Property</span>
          </div>
          <h2 className="font-circular-bold font-bold text-2xl md:text-3xl lg:text-4xl">
            {home.address || ""}
          </h2>
          <div className="grid grid-cols-2 sm:flex  items-center gap-2">
            {home.homeType && (
              <div className="flex gap-2 items-center  flex-row-reverse justify-end sm:flex-row">
                <span className="text-black capitalize text-sm font-circular-medium font-medium">
                  {home.homeType.replace("_", " ")}
                </span>
                <span className="bg-light-gray size-1.5  rounded-full"></span>
              </div>
            )}{" "}
            {home.bedrooms && (
              <div className="flex gap-2 items-center flex-row-reverse justify-end sm:flex-row">
                <span className="text-black capitalize text-sm font-circular-medium font-medium">
                  {home.bedrooms} Bedrooms
                </span>
                <span className="bg-light-gray size-1.5  rounded-full"></span>
              </div>
            )}{" "}
            {home.bathrooms && (
              <div className="flex gap-2 items-center flex-row-reverse justify-end sm:flex-row">
                <span className="text-black capitalize text-sm font-circular-medium font-medium">
                  {home.bathrooms} Bathrooms
                </span>
                <span className="bg-light-gray size-1.5  rounded-full"></span>
              </div>
            )}{" "}
            {home.yearBuilt && (
              <div className="flex gap-2 items-center flex-row-reverse justify-end sm:flex-row">
                <span className="text-black capitalize text-sm font-circular-medium font-medium">
                  Year Built: {home.yearBuilt}
                </span>
                <span className="bg-light-gray size-1.5 sm:hidden rounded-full"></span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button
            size={"lg"}
            onClick={() => mutate({})}
            disabled={isPending}
            className="gap-2 group text-white h-12 w-full font-medium font-circular-medium  text-base bg-main-green border border-transparent hover:border-main-green hover:bg-transparent hover:text-main-green "
          >
            {isPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <span>Explore Your Dashboard</span>
            )}
          </Button>{" "}
        </div>
      </motion.div>
    </div>
  );
}
export default WelcomeOnboarding;
