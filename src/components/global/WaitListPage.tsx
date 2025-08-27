import Image from "next/image";
import WaitListForm from "../forms/WaitListForm";
import { BlurShadow, OrangeCircleRight, OrangeCircleLeft } from "./Icons";

import LaborImg from "../../../public/images/laborer.png";
import Invoice from "../../../public/images/Invoice.png";
import Bubbles from "../../../public/images/chat-bubbles.png";
import Worker from "../../../public/images/character-1.png";
import Bubbles2 from "../../../public/images/chat-bubble2.png";
import MobileInv from "../../../public/images/mobile-inv.png";
import MobileBubble from "../../../public/images/mobile-chat.png";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchWaitListCount } from "@/services/waitlist";

import { cn } from "@/lib/utils";
import { ClockPlus, TabletSmartphone, Database, Bot } from "lucide-react";

const featuresArr = [
  {
    title: "Save Time",
    content: "No more hours spent creating quotes manually",
    icon: ClockPlus,
  },

  {
    title: "Stay Organized",
    content: "Keep track of client details and quotes in one place",
    icon: Database,
  },
  {
    title: "Mobile-Friendly Access",
    content: "Use it easily on your phone, tablet, or desktop.",
    icon: TabletSmartphone,
  },
  {
    title: "Smart Estimate Generator",
    content: "Enter job details and get an instant, AI-generated quote.",
    icon: Bot,
  },
];

async function WaitListPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["waitListCount"],
    queryFn: fetchWaitListCount,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="w-full min-h-dvh pb-10 gap-10 lg:gap-0 flex flex-col">
        <div className="custom-container lg:pr-0  overflow-x-clip relative lg:h-[928px]  pt-10 flex flex-col lg:flex-row items-center justify-between [&>div]:w-full lg:[&>div]:w-1/2">
          <BlurShadow className="absolute -top-23 -left-4" />
          <div className="flex relative  items-center  justify-center lg:items-start lg:justify-between z-10 flex-col gap-8">
            <div className="flex w-full max-w-[40rem] gap-4 flex-col items-center  justify-center lg:items-start lg:justify-between">
              <h1 className="text-[2rem] md:text-[2.8rem]  lg:text-[4rem] lg:leading-20 font-dm text-main-blue font-bold text-center lg:text-start">
                Looking to close more deals and stay ahead of the competition?
              </h1>
              <p className="text-sm md:text-base lg:text-lg max-w-[30rem] text-main-blue font-dm text-center lg:text-start">
                QuickEstimate helps contractors, builders, and service
                professionals create precise, professional estimates in minutes.
              </p>
            </div>
            <WaitListForm />
          </div>
          <div className="relative  flex flex-col justify-end items-end z-10">
            <Image
              src={LaborImg.src}
              alt={"Construction Worker"}
              width={LaborImg.width}
              height={LaborImg.height}
              className="max-md:translate-x-15"
            />{" "}
            <Image
              className="absolute hidden md:block top-1/2 -translate-y-1/2 left-0"
              src={Bubbles.src}
              alt={"Chat Bubbles"}
              width={Bubbles.width}
              height={Bubbles.height}
            />{" "}
            <Image
              className="absolute hidden md:block -bottom-4 -right-8"
              src={Invoice.src}
              alt={"Invoice"}
              width={Invoice.width}
              height={Invoice.height}
            />
            <Image
              className="absolute  md:hidden top-1/2 -translate-y-1/2 left-0"
              src={MobileBubble.src}
              alt={"Chat Bubbles"}
              width={MobileBubble.width}
              height={MobileBubble.height}
            />{" "}
            <Image
              className="absolute  md:hidden -bottom-10 -right-4"
              src={MobileInv.src}
              alt={"Invoice"}
              width={MobileInv.width}
              height={MobileInv.height}
            />
          </div>
        </div>
        <div className="custom-container relative grid lg:grid-cols-2 items-center gap-10 justify-between">
          <OrangeCircleLeft className="absolute top-0 left-0" />
          <OrangeCircleRight className="absolute bottom-0 right-0" />
          <div className="relative z-10  flex flex-col items-start  justify-between md:justify-center">
            <div className="flex justify-start items-start">
              <Image
                src={Worker.src}
                alt={"Worker"}
                width={Worker.width}
                height={Worker.height}
              />{" "}
              <Image
                src={Bubbles2.src}
                alt={"Chat"}
                width={Bubbles2.width}
                height={Bubbles2.height}
              />
            </div>

            <div className="gap-6 flex flex-col items-end -translate-y-12 md:-translate-y-20 self-end md:self-center">
              <h2 className="font-bold text-main-blue text-[1.8rem] md:text-[2.5rem] lg:text-[3.5rem]">
                What to Expect
              </h2>
              <p className="text-main-blue max-w-md lg:max-w-xl text-end text-sm md:text-base">
                Our AI-powered platform eliminates guesswork, speeds up bidding,
                and ensures clients get clear, competitive pricing – every time.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {featuresArr.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "gap-5 relative z-10 p-6 flex flex-col justify-center items-center md:items-start md:justify-start rounded-xl",
                    index === 3 &&
                      "bg-white shadow-sm shadow-[#061C3D1F] md:translate-y-16",
                    index === 0 && "bg-[#FAFAFA]",

                    index === 1 &&
                      "shadow-lg shadow-[#061C3D1F] bg-white md:translate-y-16"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center w-max justify-center rounded-md p-4",
                      index === 1
                        ? "bg-[#263442] text-white"
                        : "bg-light-blue text-[#263442]"
                    )}
                  >
                    <Icon className="size-6 md:size-8" />
                  </div>
                  <h3 className="text-main-blue font-medium text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-main-blue text-sm text-center md:text-start">
                    {feature.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </HydrationBoundary>
  );
}
export default WaitListPage;
