import NavbarWrapper from "@/components/navbar/NavbarWrapper"
import Footer from "@/components/global/Footer";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-dvh">{children}</main>
    <Footer />
    </>
  );
}
