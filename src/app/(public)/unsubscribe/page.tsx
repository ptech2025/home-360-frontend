import UnsubscribeButtons from "@/components/global/UnsubscribeButtons";
import { redirect } from "next/navigation";

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
