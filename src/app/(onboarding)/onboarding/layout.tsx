import OnboardingLayoutContent from "@/components/onboarding/OnboardingLayoutContent";

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-dvh">
        {children}
        <OnboardingLayoutContent />
      </main>
    </>
  );
}
export default OnboardingLayout;
