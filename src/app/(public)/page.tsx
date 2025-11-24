import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

import TestimontialSection from "@/components/home/TestimontialSection";
import FAQs from "@/components/global/FAQs";
import Footer from "@/components/global/Footer";
function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimontialSection />
      <FAQs />
      <Footer />
    </>
  );
}
export default HomePage;
