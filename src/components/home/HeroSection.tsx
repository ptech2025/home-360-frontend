"use client";

import Link from "next/link";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SignedOut } from "../auth/AuthStatusComponent";
import heroImage from "../../../public/images/dashboard-preview.svg";
import { motion } from "motion/react";

function HeroSection() {
  return (
    <section className="relative pt-6 h-[800px] bg-[linear-gradient(to_bottom,rgba(45,106,79,0)_3%,rgba(45,106,79,0.3)_45%,rgba(45,106,79,0)_100%)] overflow-x-clip flex flex-col  gap-6 justify-between  items-center  mx-auto w-full max-w-[1800px]">
      <div className="flex flex-col gap-4 items-center">
        <div className="rounded-3xl py-1 px-3 border border-main-yellow flex items-center justify-center bg-main-yellow/10 text-main-yellow text-base fonto-circular-medium">
          <span> Best Home Management </span>
        </div>

        <h1 className="text-4xl text-center lg:text-5xl text-black font-medium font-circular-medium">
          {" "}
          Your Home, All in <span className="text-main-green">One</span> Place
        </h1>
        <SignedOut>
          <Button asChild className="green-btn rounded-lg group h-11">
            <Link prefetch={true} href={"/sign-in"}>
              <span>Get Started For Free</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </SignedOut>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        }}
        className="relative w-full h-full flex items-center justify-center "
      >
        <Image
          src={heroImage}
          alt="hero"
          className="object-contain"
          sizes="100vw"
          fill
          priority
          unoptimized
        />
      </motion.div>
    </section>
  );
}
export default HeroSection;
