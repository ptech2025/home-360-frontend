import { TriangleAlert } from "lucide-react";
import * as motion from "motion/react-client";
import { Button } from "../ui/button";
import Link from "next/link";

function ExpiredLink() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full max-w-[400px] flex gap-4 flex-col p-6 rounded-[1.25rem] border border-[#E6E8EC80] bg-white shadow-sm shadow-darker-grey/10"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <TriangleAlert className="size-14 text-red-500" />

        <h1 className="text-center text-black font-circular-medium text-2xl font-bold">
          Link Expired or Invalid
        </h1>
      </div>
      <p className="text-light-grey text-center text-base ">
        The password reset link is no longer valid. It may have expired or
        already been used. Please request a new link to reset your password.
      </p>

      <div className="justify-center items-center gap-4 flex">
        <Button
          type="button"
          variant={"link"}
          asChild
          className="text-black underline"
        >
          <Link href="/forgot-password">Request New Link</Link>
        </Button>{" "}
      </div>
    </motion.div>
  );
}
export default ExpiredLink;
