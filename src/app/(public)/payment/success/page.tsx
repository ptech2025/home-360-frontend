import FAQs from "@/components/global/FAQs";
import { SuccessCheckIcon } from "@/components/global/Icons";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function PaymentSuccessfulPage() {
  return (
    <>
      <section className="w-full p-4">
        <div className="custom-container rounded-3xl p-3 pt-4 bg-[#FAFAFB] mt-20">
          <div className="rounded-2xl  min-h-[500px] gap-6 p-4 bg-white flex flex-col justify-center items-center">
            <SuccessCheckIcon />
            <h1 className="text-2xl md:text-3xl text-center font-bold font-broke-bold text-main-blue">
              Payment Successful
            </h1>
            <p className="text-sm max-w-xs md:text-base font-dm text-main-blue/80 font-medium text-center">
              Thank you for subscribing. A copy of your invoice receipt has been
              sent to your email.
            </p>
            <Button
              asChild
              className="font-medium font-dm text-base h-11 rounded-4xl text-main-blue w-full max-w-md  px-6! bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
            >
              <Link prefetch={true} href={"/dashboard/projects"}>
                <span>Go to dashboard</span>
                <ArrowUpRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>{" "}
          </div>
        </div>
      </section>
      <FAQs isHome={false} />
    </>
  );
}
export default PaymentSuccessfulPage;
