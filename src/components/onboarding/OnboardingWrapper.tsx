"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import OrgOnboarding from "./OrgOnboarding";
import { AuthUserType } from "@/types";
import { useEffect } from "react";
import PricingOnboarding from "./PricingOnboarding";
import TradeOnboarding from "./TradeOnboarding";
import InitProject from "./InitProject";

type Props = {
  profile: AuthUserType["profile"];
  name: string;
  userId: string;
};
function OnboardingWrapper({ profile, name, userId }: Props) {
  const { currentPage, setCurrentPage } = useOnboardingStore();
  useEffect(() => {
    if (!profile) {
      setCurrentPage(1);
    } else if (profile.companyTrade.length === 0) {
      setCurrentPage(2);
    } else if (profile.companyTrade.length > 0 && !profile.location) {
      setCurrentPage(3);
    } else {
      setCurrentPage(4);
    }
  }, [profile]);
  return (
    <section className="custom-container min-h-dvh">
      {currentPage === 1 && <OrgOnboarding />}
      {currentPage === 2 && <TradeOnboarding />}
      {currentPage === 3 && <PricingOnboarding />}
      {currentPage === 4 && <InitProject name={name} userId={userId} />}
    </section>
  );
}
export default OnboardingWrapper;
