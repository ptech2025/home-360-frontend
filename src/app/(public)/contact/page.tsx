import ContactUsForm from "@/components/forms/ContactUsForm";
import FAQs from "@/components/global/FAQs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Home360. We'd love to hear from you. Fill out our contact form and we'll get back to you soon.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Home360",
    description:
      "Get in touch with Home360. We'd love to hear from you. Fill out our contact form and we'll get back to you soon.",
    url: "https://myhomethreesixty.com/contact",
  },
};

function ContactUsPage() {
  return (
    <>
      <div className="custom-container flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl text-center md:text-[2.5rem] font-circular-bold font-bold text-black">
            Contact us
          </h1>
          <span className="text-sm text-center font-circular-medium text-black">
            We’d love to hear from you. Please fill out this form.
          </span>
        </div>

        <section className="w-full max-w-[33rem]">
          <ContactUsForm />
        </section>
      </div>
      <FAQs />
    </>
  );
}
export default ContactUsPage;
