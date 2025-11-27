import TermsOfServicePageWrapper from "@/components/legal/TermsOfServicePageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Home360's Terms of Service to understand the rules and guidelines for using our home management platform.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Home360",
    description:
      "Read Home360's Terms of Service to understand the rules and guidelines for using our home management platform.",
    url: "https://myhomethreesixty.com/terms-of-service",
  },
};

function TermsOfServicePage() {
  return (
    <>
      <TermsOfServicePageWrapper />;
    </>
  );
}
export default TermsOfServicePage;
