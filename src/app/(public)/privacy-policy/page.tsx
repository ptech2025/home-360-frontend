import PrivacyPolicyPageWrapper from "@/components/legal/PrivacyPolicyPageWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Home360's Privacy Policy to understand how we collect, use, and protect your personal information and data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Home360",
    description:
      "Read Home360's Privacy Policy to understand how we collect, use, and protect your personal information and data.",
    url: "https://myhomethreesixty.com/privacy-policy",
  },
};

function PrivacyPolicyPage() {
  return <PrivacyPolicyPageWrapper />;
}
export default PrivacyPolicyPage;
