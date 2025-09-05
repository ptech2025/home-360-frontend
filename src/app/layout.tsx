import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});
const dmMono = DM_Mono({
  variable: "--font-mon",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Estimate AI - Instant Job Estimates",
  description:
    "Quick Estimate AI helps US jobbers and construction workers generate fast, accurate project estimates via text or voice. Save time, improve accuracy, and win more jobs.",
  keywords:
    "Quick Estimate AI, construction estimate software, jobber estimates, AI estimates, US contractors, quick construction quotes, voice estimates, text estimates, fast job quotes, AI contractor tool",
  metadataBase: new URL("https://www.quickestimate.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quick Estimate AI - Accurate Job Estimates in Seconds",
    description:
      "AI-powered tool for US jobbers and construction workers. Create precise project estimates in seconds using text or voice.",
    url: "https://www.quickestimate.ai",
    siteName: "Quick Estimate AI",
    images: [
      {
        url: "https://www.quickestimate.ai/logo.svg",
        width: 1200,
        height: 630,
        alt: "Quick Estimate AI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Estimate AI - Accurate Job Estimates in Seconds",
    description:
      "Generate fast, accurate estimates via text or voice with Quick Estimate AI — built for US jobbers and construction workers.",
    images: ["https://www.quickestimate.ai/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased font-dm`}
      >
        <Providers>
          <NextTopLoader color="#E48B59" showSpinner={false} />
          {children}

          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className: "md:min-w-[500px] justify-center  py-4!",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
