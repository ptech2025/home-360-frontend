import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Quick Estimate - Home",
  description:
    "Quick Estimate is a platform for estimating the cost of a project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <Providers>
          <NextTopLoader color="#000000" showSpinner={false} />
          {children}

          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className: "md:min-w-[500px] justify-center  rounded-3xl! py-6!",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
