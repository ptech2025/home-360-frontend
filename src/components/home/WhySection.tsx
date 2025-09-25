import Image from "next/image";

import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import chatImage from "../../../public/images/chat-image.png";
import chatImageSvg from "../../../public/images/chat-image.svg";
import chatRes from "../../../public/images/chat-res.png";
import chatResSvg from "../../../public/images/chat-res.svg";
import estimatePreview from "../../../public/images/estimate-preview.png";
import estimatePreviewSvg from "../../../public/images/estimate-preview.svg";

function WhySection() {
  return (
    <section className="flex custom-container gap-8 flex-col w-full items-center">
      <h2 className="text-base font-bold text-main-yellow">
        Why QuickEstimate?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
        {/* //first card */}
        <article className="min-h-[470px] max-md:order-2 overflow-clip relative w-full rounded-[16px] rounded-bl-[40px] bg-[#F5F5F5]">
          <Image
            alt="chat interface"
            src={chatImageSvg}
            width={chatImage.width}
            height={chatImage.height}
            className="object-cover absolute top-0 right-0 h-full w-full"
          />
        </article>
        <article className="flex max-md:order-1 flex-col items-start gap-5">
          <h3 className="text-sm text-start uppercase text-[#9E9E9E] font-circular-medium">
            Speed — Proposals in 30 Seconds
          </h3>
          <h4 className="text-3xl text-start md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
            More Jobs, Less Waiting
          </h4>
          <p className="text-sm text-start text-[#9E9E9E] ">
            Every minute you spend typing proposals is time you could be on the
            job. With QuickEstimate, just talk or type the details and our AI
            instantly creates a detailed, ready-to-send estimate.{" "}
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base text-white h-11 rounded-4xl px-6 w-max bg-main-green hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/sign-up"}>
                <span>Get started</span>
              </Link>
            </Button>
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base h-11 rounded-4xl text-main-blue w-max  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/#features"}>
                <span>Learn more</span>
                <ArrowUpRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>{" "}
          </div>
        </article>
        {/* //second card */}
        <article className="flex max-md:order-3 flex-col items-start gap-4">
          <h3 className="text-sm text-start uppercase text-[#9E9E9E] font-circular-medium">
            Professionalism — Win More Jobs
          </h3>
          <h4 className="text-3xl text-start md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
            Look Like the Pro You Are{" "}
          </h4>
          <p className="text-sm text-start text-[#9E9E9E] ">
            Clients judge estimates the same way they judge workmanship: neat,
            clear, and professional. QuickEstimate automatically formats your
            bids with your logo, clean layouts, and clear language that builds
            trust.
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base text-white h-11 rounded-4xl px-6 w-max bg-main-green hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/sign-up"}>
                <span>Get started</span>
              </Link>
            </Button>
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base h-11 rounded-4xl text-main-blue w-max  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/#features"}>
                <span>Learn more</span>
                <ArrowUpRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>{" "}
          </div>
        </article>

        <article className="min-h-[470px] max-md:order-4 overflow-clip relative w-full rounded-[16px] rounded-bl-[40px] bg-[#F5F5F5]">
          <Image
            alt="chat interface"
            src={estimatePreviewSvg}
            width={estimatePreview.width}
            height={estimatePreview.height}
            className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-full"
          />
        </article>

        <article className="min-h-[470px] max-md:order-6 overflow-clip relative w-full rounded-[16px] rounded-bl-[40px] bg-[#F5F5F5]">
          <Image
            alt="chat interface"
            src={chatResSvg}
            width={chatRes.width}
            height={chatRes.height}
            className="object-cover absolute bottom-0 -right-0  h-full w-full"
          />
        </article>
        <article className="flex  max-md:order-5 flex-col items-start gap-4">
          <h3 className="text-sm text-start uppercase text-[#9E9E9E] font-circular-medium">
            Accuracy — Local Pricing Built In
          </h3>
          <h4 className="text-3xl text-start md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
            Stay Competitive and Profitable
          </h4>
          <p className="text-sm text-start text-[#9E9E9E] ">
            Bidding too low cuts your profits. Bidding too high loses you the
            job. QuickEstimate uses current labor rates and material costs in
            your ZIP code so your estimates are accurate and competitive every
            time. No more guesswork, no more endless math, just pricing you can
            stand behind.
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base text-white h-11 rounded-4xl px-6 w-max bg-main-green hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/sign-up"}>
                <span>Get started</span>
              </Link>
            </Button>
            <Button
              asChild
              className="font-medium font-circular-medium text-sm sm:text-base h-11 rounded-4xl text-main-blue w-max  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/#features"}>
                <span>Learn more</span>
                <ArrowUpRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>{" "}
          </div>
        </article>
      </div>
    </section>
  );
}
export default WhySection;
