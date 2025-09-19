import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Home360",
    template: "%s | Home360",
  },
  description:
    "Home360 helps you manage your homes, documents, appliances, maintenance reminders, and service providers in one place.",
  keywords: [
    "home management",
    "property documents",
    "appliance maintenance",
    "home reminders",
    "service providers",
  ],
  metadataBase: new URL("https://myhomethreesixty.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home360",
    description:
      "Easily manage your property details, documents, appliances, and home maintenance with Home360.",
    url: "https://myhomethreesixty.com",
    siteName: "Home360",
    images: [
      {
        url: "https://myhomethreesixty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Home360 Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@myhomethreesixty",
    title: "Home360",
    description:
      "Smart home management made simple — documents, appliances, reminders, and more.",
    images: ["https://myhomethreesixty.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <NextTopLoader color="#2d6a4f" showSpinner={false} />
          {children}

          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
