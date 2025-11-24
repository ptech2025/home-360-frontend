
import { CheckMarkIcon, FeatureStackIcon } from "../global/Icons";
import Image from "next/image";
import feature1Image from "../../../public/images/feature-one.svg";
import feature2Image from "../../../public/images/feature-two.svg";
import feature3Image from "../../../public/images/feature-three.svg";
import feature4Image from "../../../public/images/feature-four.svg";
import feature5Image from "../../../public/images/feature-five.svg";

function FeaturesSection() {
  return (
    <section
      id="features"
      className="custom-container flex flex-col gap-6 items-center justify-between bg-white  scroll-mt-6"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-main-green size-2"></span>
          <span className="text-sm font-circular-medium text-black">
            Features
          </span>
        </div>
        <h2 className="text-3xl text-center max-w-md lg:text-4xl text-black font-medium font-circular-medium">
          {" "}
          All Your Home Essentials, One Smart Platform
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full max-w-[1200px]">
        <div className="col-start-1 bg-new-gray w-full h-full rounded-3xl border border-lighter-gray">
          <div className="flex gap-2 items-start p-4">
            <div className="rounded-xl shrink-0 bg-main-green size-10.5 items-center justify-center flex">
              <CheckMarkIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-lg font-circular-medium text-black">
                Home Profiles
              </h3>
              <p className="text-sm font-circular-light text-black">
                Manage all your homes, switch instantly from your profile page.
              </p>
            </div>
          </div>

          {/* //Image goes here */}
          <div className="w-full h-[300px] relative">
            <Image
              src={feature1Image}
              alt="Home Profile"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>
        <div className="col-start-2 col-span-2 bg-new-gray w-full h-full rounded-3xl border border-lighter-gray">
          <div className="flex gap-2 items-center p-4">
            <div className="rounded-xl shrink-0 bg-main-green size-10.5 items-center justify-center flex">
              <FeatureStackIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-lg font-circular-medium text-black">
                Maintenance & Reminders
              </h3>
              <p className="text-sm font-circular-light text-black">
                Automated schedules + custom task creation.
              </p>
            </div>
          </div>

          {/* //Image goes here */}
          <div className="w-full h-[350px] relative">
            <Image
              src={feature2Image}
              alt="Maintenance & Reminders"
              className="w-full h-full object-cover object-top"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>

        <div className="bg-new-gray w-full h-full rounded-3xl border border-lighter-gray">
          <div className="flex flex-col gap-0.5 p-4">
            <h3 className="text-lg font-circular-medium text-black">
              Document Vault
            </h3>
            <p className="text-sm font-circular-light text-black">
              Organize tasks with labels for better Secure Cloudinary storage
              for receipts, insurance, ownership papers.
            </p>
          </div>

          {/* //Image goes here */}
          <div className="w-full h-[300px] relative">
            <Image
              src={feature3Image}
              alt="Document Vault"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>

        <div className="bg-new-gray w-full h-full rounded-3xl border border-lighter-gray">
          <div className="flex flex-col gap-0.5 p-4">
            <h3 className="text-lg font-circular-medium text-black">
              Public Records Integration
            </h3>
            <p className="text-sm font-circular-light text-black">
              Automatically pulled from address input.
            </p>
          </div>

          {/* //Image goes here */}
          <div className="w-full h-[300px] relative">
            <Image
              src={feature4Image}
              alt="Public Records Integration"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>

        <div className="bg-new-gray w-full h-full rounded-3xl border border-lighter-gray">
          <div className="flex flex-col gap-0.5 p-4">
            <h3 className="text-lg font-circular-medium text-black">
              Service Providers Management
            </h3>
            <p className="text-sm font-circular-light text-black">
              Easily track all your home’s service contacts with enhanced
              provider search available
            </p>
          </div>

          {/* //Image goes here */}
          <div className="w-full h-[300px] relative">
            <Image
              src={feature5Image}
              alt="Service Providers Management"
              className="w-full h-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;
