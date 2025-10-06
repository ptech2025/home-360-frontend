import ContactUsForm from "@/components/forms/ContactUsForm";
import FAQs from "@/components/global/FAQs";

function ContactUsPage() {
  return (
    <>
      <div className="custom-container flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm text-center uppercase text-[#9E9E9E] font-circular-medium">
            Contact
          </h1>
          <h2 className="text-3xl text-center md:text-[2.5rem] font-bold font-broke-bold text-black">
            Contact us
          </h2>
          <span className="text-sm text-center text-[#9E9E9E] ">
            We’d love to hear from you. Please fill out this form.
          </span>
        </div>

        <section className="w-full max-w-[33rem]">
          <ContactUsForm />
        </section>
      </div>
      <FAQs isHome={false} />
    </>
  );
}
export default ContactUsPage;
