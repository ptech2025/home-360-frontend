import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqsArr = [
  {
    question: "What is Home360?",
    answer:
      "Home360 is an all-in-one digital platform designed to help you organize, manage, and understand every aspect of your home from important documents and maintenance tasks to finances, appliances, and service providers all in one secure dashboard. ",
  },
  {
    question: "Who is Home360 for?",
    answer:
      "Home360 is built for homeowners, landlords, and property managers who want a simple, centralized way to stay on top of their home’s needs. Whether you own one property or several, Home360 helps you manage it all effortlessly.",
  },
  {
    question: "Can I manage more than one home?",
    answer:
      "Yes, you can! The ability to add and manage multiple properties is available to premium subscribers. Upgrade to a paid plan to easily organize all your homes ideal for landlords, investors, or anyone managing more than one property.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We take your privacy seriously. Home360 uses bank-level encryption, secure cloud storage, and strict privacy controls to keep your personal and property information safe at all times.",
  },
  {
    question: "What can I store on Home360?",
    answer:
      "You can securely store all your home-related documents including deeds, inspection reports, warranties, renovation permits, mortgage files, and receipts. Everything is organized, searchable, and accessible whenever you need it.",
  },
];

function FAQs() {
  return (
    <div
      className={cn(
        "  w-full flex-col flex gap-10 justify-between items-center p-6  md:p-8 lg:p-12 "
      )}
    >
      <div className="w-full max-w-[770px] flex flex-col items-center gap-8">
        <div
          className={cn("flex max-w-md flex-col items-center gap-1 text-black")}
        >
          <h4 className="text-3xl font-circular-medium font-regular text-center md:text-4xl lg:text-[3rem]">
            Frequently asked questions
          </h4>
          <span className="text-base text-center">
            Everything you need to know about the home360. Find answers to the
            most common questions below.
          </span>
        </div>
        <Accordion type="single" collapsible className="w-full ">
          {faqsArr.map((item, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={`accordion-${item.question}`}
              className="mb-4 last:mb-0 border-none"
            >
              <AccordionTrigger
                className={cn(
                  "rounded-3xl w-full justify-between items-center bg-lighter-gray text-black text-xl font-circular-medium p-5 border-none data-[state=open]:rounded-b-none"
                )}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "px-5 pb-5 pt-4 font-circular-light text-base rounded-b-3xl text-black bg-lighter-gray"
                )}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* <div
          className={cn(
            "rounded-xl flex  p-5.5  items-center border gap-4 justify-between w-full max-w-[770px]",
          )}
        >
          <div className="flex flex-col">
            <h5 className="text-sm font-bold">
              Still have a question in mind?
            </h5>

            <span
              className={cn(
                "text-sm",
                isHome ? "text-[#808080]" : "text-white"
              )}
            >
              Contact us if you have any other questions.
            </span>
          </div>
          <Link
            href="/contact"
            className={cn(
              "px-5 py-3  hover:shadow-black hover:shadow h-10 items-center justify-center  flex rounded-4xl border border-transparent cursor-pointer text-base font-bold",
              isHome
                ? "bg-main-green text-white hover:border-black hover:text-black hover:bg-transparent"
                : "bg-white text-black hover:border-white hover:text-white hover:bg-transparent"
            )}
          >
            <span>Contact</span>
          </Link>
        </div> */}
    </div>
  );
}
export default FAQs;
