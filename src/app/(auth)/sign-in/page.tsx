import SignInForm from "@/components/auth/SigninForm";
import { LogoWithText } from "@/components/global/Logo";
import Link from "next/link";

function SignInPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Link href="/">
        <LogoWithText />
      </Link>

      <SignInForm />
    </div>
  );
}
export default SignInPage;
