import SignUpForm from "@/components/auth/SignupForm";
import { LogoWithText } from "@/components/global/Logo";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-between  ">
      <Link href="/" className="self-start">
        <LogoWithText />
      </Link>

      <SignUpForm />
    </div>
  );
}
export default SignUpPage;
