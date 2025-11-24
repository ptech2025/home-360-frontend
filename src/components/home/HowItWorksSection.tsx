import Image from "next/image";

import howItWorks1Image from "../../../public/images/how-it-works-one.svg";
import howItWorks2Image from "../../../public/images/how-it-works-two.svg";
import howItWorks3Image from "../../../public/images/how-it-works-three.svg";
import howItWorks4Image from "../../../public/images/how-it-works-four.svg";
import howItWorks5Image from "../../../public/images/how-it-works-five.svg";

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="custom-container flex flex-col gap-6 items-center justify-between bg-white  scroll-mt-6"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-main-green size-2"></span>
          <span className="text-sm font-circular-medium text-black">
            How It Works
          </span>
        </div>
      </div>
      <div className="grid gap-4 w-full h-full max-w-[1200px]">
        <div className="bg-new-gray p-4 grid grid-cols-2 gap-4 items-center justify-center w-full h-full rounded-3xl">
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-main-yellow size-2"></span>
              <span className="text-sm font-circular-medium text-black">
                Create
              </span>
            </div>

            <h3 className="text-3xl md:text-[2.5rem] font-circular-medium text-black">
              Add Your Home
            </h3>
            <p className="text-sm font-circular-light text-black">
              Home360 automatically retrieves verified public records including
              property data, building info, and lot details to pre-populate your
              dashboard instantly. No manual setup. No confusion. Just plug in
              and go.s
            </p>
          </div>

          <div className="flex flex-col relative h-[480px] w-full items-center gap-4">
            <Image
              src={howItWorks2Image}
              alt="Add Your Home"
              className="w-full h-full object-cover object-top"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        </div>
        <div className="bg-new-gray p-4 grid grid-cols-2 gap-4 items-center justify-center w-full h-full rounded-3xl">
          <div className="flex flex-col relative h-[480px] w-full items-center gap-4">
            <Image
              src={howItWorks3Image}
              alt="Customize Your Dashboard"
              className="w-full h-full object-cover object-top"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-main-yellow size-2"></span>
              <span className="text-sm font-circular-medium text-black">
                Edit
              </span>
            </div>

            <h3 className="text-3xl md:text-[2.5rem] font-circular-medium text-black">
              Customize Your Dashboard
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Add appliances and their warranties.
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Upload documents, receipts, and insurance files
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Set maintenance tasks or import prebuilt schedules
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Track expenses and budgets
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-new-gray p-4 grid grid-cols-2 gap-4 items-center justify-center w-full h-full rounded-3xl">
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-main-yellow size-2"></span>
              <span className="text-sm font-circular-medium text-black">
                Reminders
              </span>
            </div>

            <h3 className="text-3xl md:text-[2.5rem] font-circular-medium text-black">
              Get Automated Insights{" "}
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Maintenance reminders
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Warranty expiration alerts
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Expense insights & monthly summaries
                </span>
              </li>{" "}
              <li className="flex items-center gap-2">
                <span className="rounded-full bg-main-green size-3"></span>
                <span className="text-sm font-circular-light text-black">
                  Conditions-based recommendations
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col relative h-[480px] w-full items-center gap-4">
            <Image
              src={howItWorks1Image}
              alt="Get Automated Insights"
              className="w-full h-full object-cover object-top"
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
export default HowItWorksSection;
