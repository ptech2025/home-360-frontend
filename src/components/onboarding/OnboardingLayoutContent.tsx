import { LogoWithText } from "@/components/global/Logo";
import { BigHouseIcon } from "../global/Icons";

function OnboardingLayoutContent() {
  return (
    <div className="bg-[#FAFBFA] overflow-x-clip  pt-6 flex flex-col gap-8">
      <LogoWithText className="px-6" />
      <div className="flex-1 flex-col gap-4 flex relative z-10"></div>
      <div className="mt-auto relative w-full">
        <BigHouseIcon className="absolute right-0 bottom-3 w-[20rem] opacity-20" />
      </div>
    </div>
  );
}
export default OnboardingLayoutContent;
