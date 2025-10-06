import Newsletter from "@/components/global/Newsletter";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/navbar/NavbarWrapper";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-dvh">{children}</main>
      {/* <Newsletter />
      <Footer /> */}
    </>
  );
}
