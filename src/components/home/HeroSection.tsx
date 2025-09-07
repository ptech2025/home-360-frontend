import Link from "next/link";
import { HeroEllipseIcon, TextLineIcon, StarIcon } from "../global/Icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import heroImg from "../../../public/images/hero-tab.svg";
import heroImag from "../../../public/images/hero-tab.png";

function HeroSection() {
  return (
    <section className="relative h-[850px] overflow-x-clip flex flex-col-reverse lg:flex-row gap-6 justify-between  items-center lg:items-start mx-auto w-full max-w-[1800px]">
      <Image
        src={heroImg.src}
        alt="chat image"
        className="lg:w-1/2 w-full object-cover flex-1 h-full relative z-10 "
        placeholder="blur"
        blurDataURL={heroImag.blurDataURL}
        priority
        width={heroImag.width}
        height={heroImag.height}
      />
      <div className="flex flex-col relative z-10 gap-6 max-w-[600px] lg:items-start items-center py-4 sm:py-6  md:py-10 lg:py-14  px-4 sm:px-6  md:px-10 lg:pr-14 lg:pl-0">
        <Badge className="bg-[#E7E9EE] text-main-blue">
          <StarIcon className="text-main-blue" />
          <span>AI chat</span>
        </Badge>
        <div className="flex flex-col items-center lg:items-start gap-4">
          <h1 className="bg-[linear-gradient(93deg,#FF9A6C_4.45%,#172B85_47.16%)] relative text-center lg:text-start text-4xl md:text-5xl font-broke-bold font-bold lg:text-6xl bg-clip-text text-transparent">
            <span>Talk Your bid.</span>
            <TextLineIcon className="absolute -bottom-5 -right-3" />
          </h1>
          <h2 className="text-main-blue text-center lg:text-start text-4xl md:text-5xl font-broke-bold font-bold lg:text-6xl">
            Close the Job.
          </h2>
        </div>
        <p className="text-base text-center lg:text-start lg:text-lg font-dm text-main-blue">
          QuickEstimate turns your voice notes into professional job proposals
          in seconds. Save time, win more jobs, and get paid faster.
        </p>
        <div className="flex flex-col sm:flex-row w-full lg:justify-start justify-center items-center gap-2">
          <Button
            asChild
            className="font-medium font-dm text-base text-white h-11 rounded-4xl px-6 w-max bg-main-blue hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
          >
            <Link prefetch={true} href={"/sign-up"}>
              <span>Start Free Today</span>
            </Link>
          </Button>
          <Button
            asChild
            className="font-medium font-dm text-base h-11 rounded-4xl text-main-blue w-max  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
          >
            <Link prefetch={true} href={"/#features"}>
              <span>See how it works</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>{" "}
        </div>
      </div>
      <HeroEllipseIcon className="absolute bottom-0 left-1/2 -translate-x-1/2" />
    </section>
  );
}
export default HeroSection;
