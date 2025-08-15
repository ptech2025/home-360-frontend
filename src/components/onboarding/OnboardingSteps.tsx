import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";

const steps = [
  {
    label: "Create your organization",
    number: 1,
  },
  {
    label: "Select your trade",
    number: 2,
  },
  {
    label: "Location",
    number: 3,
  },
  {
    label: "How it works",
    number: 4,
  },
];

function OnboardingSteps({ currentStep }: { currentStep: number }) {
  const getStatus = (step: number) => {
    return currentStep === step || currentStep > step ? "complete" : "pending";
  };
  return (
    <div>
      <div className="lg:hidden  flex flex-wrap items-center justify-center gap-4 max-w-[17rem]">
        {steps.map((step, index) => {
          return (
            <div
              data-state={getStatus(step.number)}
              className="flex group  data-[state=pending]:text-main-blue/80 data-[state=complete]:text-dark-orange gap-4 items-center"
              key={index}
            >
              <div className="flex gap-1 items-center">
                <Badge
                  className={cn(
                    "border rounded-full size-5",
                    getStatus(step.number) === "complete"
                      ? "bg-dark-orange/10 text-dark-orange border-dark-orange/10"
                      : "bg-main-blue/10 text-main-blue/80 border-main-blue/10"
                  )}
                >
                  {step.number}
                </Badge>

                <span
                  className={cn(
                    " text-xs md:text-sm transition-colors duration-200",
                    getStatus(step.number) === "complete"
                      ? "text-dark-orange font-semibold"
                      : "text-main-blue/80 font-medium"
                  )}
                >
                  {step.label}
                </span>
              </div>
              <ChevronRight className="text-main-blue/80 size-4" />
            </div>
          );
        })}
      </div>

      <div className="hidden lg:flex flex-col max-w-[17rem]">
        {steps.map((step, index) => {
          return (
            <div
              data-state={getStatus(step.number)}
              className="flex before:content-[''] before:z-10  before:absolute data-[state=pending]:before:-left-1 data-[state=complete]:before:-left-1.5 before:top-1/2 before:-translate-y-1/2 data-[state=pending]:before:size-2 data-[state=complete]:before:size-3  data-[state=complete]:before:bg-dark-orange data-[state=pending]:before:bg-main-blue before:rounded-full pl-3 relative border-l data-[state=pending]:border-main-blue/80 data-[state=complete]:border-dark-orange h-15 w-full font-dm justify-between gap-2 items-center"
              key={index}
            >
              <span
                className={cn(
                  " text-xs md:text-sm transition-colors duration-200",
                  getStatus(step.number) === "complete"
                    ? "text-dark-orange font-semibold"
                    : "text-main-blue/80 font-medium"
                )}
              >
                {step.label}
              </span>
              {currentStep === step.number && (
                <Badge className="text-dark-orange bg-dark-orange/10">
                  {step.number} out of {steps.length}
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default OnboardingSteps;
