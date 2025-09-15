import { CheckCircle2 } from "lucide-react";
import * as motion from "motion/react-client";
import { Button } from "../ui/button";

function PasswordResetLinkSent({
  setShowPasswordResetLinkSent,
}: {
  setShowPasswordResetLinkSent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full max-w-[400px] flex gap-4 flex-col "
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <CheckCircle2 className="size-14 text-green-500" />

        <h1 className="text-center text-main-blue font-circular text-2xl font-bold">
          Password Reset Link Sent
        </h1>
      </div>
      <p className="text-main-blue/80 text-center text-base ">
        {" "}
        We&apos;ve sent a password reset link to your inbox. Please check your
        email and click the link to complete your sign-up.
      </p>
      <div className="text-center text-xs text-main-blue/80">
        Didn’t receive the email? Be sure to check your spam or junk folder.
        <br />
        <div className="justify-center items-center gap-4 fle">
          <Button
            type="button"
            variant={"link"}
            onClick={() => setShowPasswordResetLinkSent(false)}
            className="text-main-blue underline"
          >
            Request New Link
          </Button>{" "}
        </div>
      </div>
    </motion.div>
  );
}
export default PasswordResetLinkSent;
