import ExpiredLink from "@/components/auth/ExpiredLink";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { LogoWithText } from "@/components/global/Logo";
import Link from "next/link";
type Props = {
  searchParams: Promise<{ token: string | undefined }>;
};
async function ResetPassword({ searchParams }: Props) {
  const { token } = await searchParams;
  return (
    <div className="flex flex-col gap-6 items-center justify-between">
      <Link href="/" className="self-start">
        <LogoWithText />
      </Link>

      {token ? <ResetPasswordForm token={token} /> : <ExpiredLink />}
    </div>
  );
}
export default ResetPassword;
