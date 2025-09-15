import { TradeOnboardingForm } from "./OnboardingForms";
import OnboardingSteps from "./OnboardingSteps";
import WhyAsk from "./WhyAsk";

function TradeOnboarding() {
  return (
    <div className="flex flex-col gap-6xh-full">
      <div className="grid grid-cols-1  lg:grid-cols-[auto_1fr_auto] h-full w-full gap-y-10 gap-x-4 justify-between justify-items-center items-center">
        <OnboardingSteps currentStep={2} />
        <div className="w-full pt-4 border-t border-main-blue/10 lg:pt-0 lg:border-t-0 max-w-[38rem] flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl  text-centers md:text-3xl lg:md:text-4xl font-broke-bold text-main-blue font-bold">
              Select Your Trade
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-circular text-main-blue/80 font-medium text-center">
              Choose all that apply to get estimates, pricing, and
              recommendations tailored to your trade.
            </p>
          </div>
          <TradeOnboardingForm />
        </div>
        <div className="hidden lg:block">
          <WhyAsk />
        </div>
      </div>
    </div>
  );
}
export default TradeOnboarding;
