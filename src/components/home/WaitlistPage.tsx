import Image from "next/image";
import WaitListForm from "../forms/WaitListForm";
import { Countdown } from "../global/Countdown";
import { LogoSvg } from "../global/Logo";
import dashboardImage from "../../../public/images/dashboard-preview.png";
import green from "../../../public/images/gradient-green.svg";
import white from "../../../public/images/gradient-white.svg";
import FAQs from "../global/FAQs";

function WaitlistPage() {
  return (
    <section className="w-full min-h-dvh flex flex-col justify-center items-center">
      <div className="custom-container flex flex-col items-center gap-8">
        <div className="flex items-end">
          <LogoSvg className="w-[70px] h-[80px]" />
          <span className="bg-main-yellow rounded-full size-3.5"></span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl text-center font-regular font-circular-medium text-black">
            Get early access
          </h1>
          <p className="text-base max-w-sm text-center font-circular-light text-light-gray">
            We’re getting close. Sign up to get early access to home360
          </p>
        </div>
        <WaitListForm />
        <Countdown targetDate="2025-11-01T23:59:59Z" />
      </div>
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full h-full absolute -top-[100px] lg:-top-[270px] left-1/2 -translate-x-1/2 ">
          <Image src={green} fill alt="gradient" className="object-top" />{" "}
        </div>
        <Image
          src={dashboardImage.src}
          width={dashboardImage.width}
          height={dashboardImage.height}
          alt="dashboard preview"
          className="object-center object-contain relative z-10"
          priority
          placeholder="blur"
          blurDataURL={dashboardImage.blurDataURL}
        />
        <div className="w-full h-[220px] md:h-[300px] lg:h-[560px] absolute bottom-0 left-1/2 z-15 -translate-x-1/2 ">
          <Image src={white} fill alt="gradient" className="object-top" />{" "}
        </div>
      </div>
      <FAQs />
      <div className="custom-container">
        <p className="text-sm text-center font-circular-light text-light-gray">
          © {new Date().getFullYear()} Home360. All rights reserved.
        </p>
      </div>
    </section>
  );
}
export default WaitlistPage;
