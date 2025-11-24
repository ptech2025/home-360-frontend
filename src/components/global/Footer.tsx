"use client";

import { SignedOut } from "../auth/AuthStatusComponent";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoWithText } from "./Logo";
import { Route } from "next";
const quickLinks = [
  {
    title: "Quick Links",
    links: [
      {
        label: "Home",
        href: "/",
        external: false,
      },
      {
        label: "Features",
        href: "/#features",
        external: false,
      },
      {
        label: "FAQs",
        href: "/#faqs",
        external: false,
      },
      {
        label: "Pricing",
        href: "/pricing",
        external: false,
      },
    ],
  },
];

const contactLinks = [
  {
    title: "Contact",
    links: [
      {
        label: "support@myhomethreesixty.com",
        href: "mailto:support@myhomethreesixty.com",
        external: true,
      },
    ],
  },
];

const socialLinks = [
  {
    title: "Social",
    links: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/myhomethreesixty",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/myhomethreesixty",
        external: true,
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="custom-container flex flex-col gap-10 items-center justify-center">
      <div className="max-w-lg flex flex-col gap-3 items-center justify-center">
        <h6 className="text-4xl md:text-5xl text-center font-circular-medium text-black">
          Ready to simplify your home{" "}
          <span className="text-main-green">management?</span>
        </h6>
        <p className="text-base font-circular-light text-black text-center">
          Start your journey and see why homeowners love Home360.
        </p>

        <SignedOut>
          <Button asChild className="green-btn rounded-lg group h-11">
            <Link prefetch={true} href={"/sign-in"}>
              <span>Get Started For Free</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </SignedOut>
      </div>
      <div className="flex items-center justify-between gap-2 border border-lighter-gray p-6 rounded-3xl w-full">
        <div className="flex flex-col gap-4">
          <LogoWithText />
          <h6 className="text-sm font-circular-medium text-black">
            Your Home, All in <span className="text-main-green">One</span> Place
          </h6>
        </div>
        <div className="flex w-max gap-6">
          {quickLinks.map((link) => (
            <div key={link.title} className="flex w-max flex-col gap-4">
              <h6 className="text-sm font-circular-medium text-black">
                {link.title}
              </h6>
              <ul className="grid grid-cols-2 gap-2">
                {link.links.map((link) => (
                  <li
                    key={link.label}
                    className="text-sm font-circular-light text-black hover:text-main-green transition-colors"
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href as Route}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {contactLinks.map((link) => (
            <div key={link.title} className="flex w-max flex-col gap-4">
              <h6 className="text-sm font-circular-medium text-black">
                {link.title}
              </h6>
              <ul className="grid grid-cols-1 gap-2">
                {link.links.map((link) => (
                  <li
                    key={link.label}
                    className="text-sm font-circular-light text-black hover:text-main-green transition-colors"
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href as Route}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {socialLinks.map((link) => (
            <div key={link.title} className="flex w-max flex-col gap-4">
              <h6 className="text-sm font-circular-medium text-black">
                {link.title}
              </h6>
              <ul className="grid grid-cols-1 gap-2">
                {link.links.map((link) => (
                  <li
                    key={link.label}
                    className="text-sm font-circular-light text-black hover:text-main-green transition-colors"
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href as Route}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-end items-center w-full">
        <span className="text-sm font-circular-light text-black">
          &copy; {new Date().getFullYear()} Home360.
        </span>
        <span className="text-sm font-circular-light text-black">
          Privacy Policy
        </span>{" "}
        <span className="text-sm font-circular-light text-black">
          Terms of Service
        </span>
      </div>
    </footer>
  );
}
export default Footer;
