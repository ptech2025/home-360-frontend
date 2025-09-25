import OnboardingLayoutContent from "@/components/onboarding/OnboardingLayoutContent";

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className="min-h-dvh">{children}</section>
      <OnboardingLayoutContent />
    </main>
  );
}
export default OnboardingLayout;
