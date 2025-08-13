import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { LogoWithText } from "@/components/global/Logo";
import Link from "next/link";
    
function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Link href="/">
      <LogoWithText />
      </Link>

      <ForgotPasswordForm />
    </div>
  );
}
export default ForgotPasswordPage;
