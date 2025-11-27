import UnsubscribeButtons from "@/components/global/UnsubscribeButtons";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description:
    "Manage your email preferences and unsubscribe from Home360 newsletters and updates.",
  alternates: {
    canonical: "/unsubscribe",
  },
  robots: {
    index: false,
    follow: false,
  },
};

async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email: string | null }>;
}) {
  const { email } = await searchParams;
  if (!email) {
    return redirect("/");
  }
  return (
    <div className="grid min-h-full custom-container place-items-center">
      <UnsubscribeButtons email={email} />
    </div>
  );
}
export default UnsubscribePage;
