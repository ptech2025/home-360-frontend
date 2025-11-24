import NavbarWrapper from "@/components/navbar/NavbarWrapper"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-dvh">{children}</main>
    
    </>
  );
}
