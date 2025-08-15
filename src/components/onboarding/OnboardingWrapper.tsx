"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import OrgOnboarding from "./OrgOnboarding";
import { AuthUserType } from "@/types";
import { useEffect } from "react";
import PricingOnboarding from "./PricingOnboarding";
import TradeOnboarding from "./TradeOnboarding";

type Props = {
  profile: AuthUserType["profile"];
};
function OnboardingWrapper({ profile }: Props) {
  const { currentPage, setCurrentPage } = useOnboardingStore();
  useEffect(() => {
    if (!profile) {
      setCurrentPage(1);
    } else if (profile.companyTrade.length === 0) {
      setCurrentPage(2);
    } else {
      setCurrentPage(3);
    }
  }, [profile]);
  return (
    <section className="custom-container min-h-dvh">
      {currentPage === 1 && <OrgOnboarding />}
      {currentPage === 2 && <TradeOnboarding />}
      {currentPage === 3 && <PricingOnboarding />}
    </section>
  );
}
export default OnboardingWrapper;
