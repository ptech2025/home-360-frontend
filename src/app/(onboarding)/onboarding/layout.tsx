import OnboardingLayoutContent from "@/components/onboarding/OnboardingLayoutContent";

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh">{children}</main>
    //  <main className="min-h-dvh grid grid-cols-1 md:grid-cols-[1fr_0.4fr]">
    //   <section className="min-h-dvh">{children}</section>
    //   <OnboardingLayoutContent />
    // </main>
  );
}
export default OnboardingLayout;
