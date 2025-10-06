import { PlayCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FeatureShapeIcon } from "../global/Icons";
import Image from "next/image";
import voiceInputImage from "../../../public/images/voice-input.svg";
import estimateCardImage from "../../../public/images/estimate-card.svg";
import estimateSendImage from "../../../public/images/estimate-send.svg";

function FeaturesSection() {
  return (
    <section
      id="features"
      className="custom-container bg-main-green  md:bg-transparent scroll-mt-6"
    >
      <div
        className={
          " md:rounded-4xl bg-main-green w-full flex-col flex gap-10 justify-between items-center p-6  md:p-8 lg:p-12 "
        }
      >
        <div className="flex flex-col items-center gap-4">
          <Button
            asChild
            className="font-medium  font-circular-medium text-base h-11 rounded-4xl text-black w-max  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-black group"
          >
            <a href="#features">
              <PlayCircleIcon className="size-5 text-main-yellow" />

              <span>Watch Video</span>
            </a>
          </Button>
          <h3 className="text-3xl font-broke-bold text-white font-bold text-center md:text-4xl lg:text-[2.5rem]">
            How QuickEstimate Works
          </h3>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-3 w-full gap-6">
          <article className="flex flex-col gap-10">
            <div className="rounded-4xl flex items-start justify-center relative overflow-clip h-[460px] bg-[#e8e9ee]">
              <Image
                alt={"voice input preview"}
                src={voiceInputImage.src}
                height={450}
                width={347}
                sizes={"50vw"}
                className="object-cover h-[450px] md:h-[350px] xl:h-[300px] w-full relative -top-8  md:-top-10  z-10"
              />
              <FeatureShapeIcon className="absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
            <p className="text-white text-base md:text-lg lg:text-xl font-broke-bold font-bold text-center">
              You either type in your job details or use your voice to input
              your details.{" "}
            </p>
          </article>{" "}
          <article className="flex flex-col gap-10">
            <div className="rounded-4xl flex justify-center items-center relative overflow-clip h-[460px] bg-[#e8e9ee]">
              <Image
                alt={"estimate card preview"}
                src={estimateCardImage.src}
                height={400}
                width={347}
                sizes={"50vw"}
                className="object-cover h-[400px]  relative z-10"
              />
              <FeatureShapeIcon className="absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
            <p className="text-white text-base md:text-lg lg:text-xl font-broke-bold font-bold text-center">
              AI drafts the estimate, taking in the scope, costs and location of
              the project.
            </p>
          </article>{" "}
          <article className="flex flex-col gap-10">
            <div className="rounded-4xl flex lg:justify-center items-end relative overflow-clip h-[460px] bg-[#e8e9ee]">
              <Image
                alt={"estimate send preview"}
                src={estimateSendImage.src}
                height={480}
                width={380}
                sizes={"50vw"}
                className="object-cover h-[480px]  relative z-10"
              />
              <FeatureShapeIcon className="absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
            <p className="text-white text-base md:text-lg lg:text-xl font-broke-bold font-bold text-center">
              Edit the estimate if necessary and forward to your client.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;
