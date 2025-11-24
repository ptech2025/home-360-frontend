import Image from "next/image";

const testimonialsArr = [
  {
    name: "Daniel Brooks",
    title: "Homeowner",
    testimonial:
      "I used to track everything in spreadsheets. Now I get renewal reminders, maintenance alerts, and expense summaries all from one dashboard. It’s a game changer.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=Daniel+Brooks}`,
  },
  {
    name: "Emily Johnson",
    title: "Landlord",
    testimonial:
      "I used to spend hours managing tenants and paperwork. Now I can keep track of everything in one place—it’s so much easier.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=Emily+Johnson}`,
  },
  {
    name: "Michael Brown",
    title: "Property Manager",
    testimonial:
      "The Pro plan is perfect for managing multiple homes. Each one has its own dashboard with custom schedules and documents.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=Michael+Brown}`,
  },
  {
    name: "Olivia Davis",
    title: "Homeowner",
    testimonial:
      "I used to manage everything manually. Now I can see my home’s condition, maintenance history, and expenses all in one place.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=Olivia+Davis}`,
  },
  {
    name: "William Wilson",
    title: "Landlord",
    testimonial:
      "Insurance papers, appliance receipts, everything is safely stored and easy to find. No stress when my landlord asks for anything.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=William+Wilson}`,
  },
  {
    name: "James Martinez",
    title: "Property Manager",
    testimonial:
      "Having a single dashboard for things like maintenance reminders, payments, and document storage makes home-management less fragmented. No more scattered calendar entries, paper files, or sticky-notes.",
    image: `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=James+Martinez}`,
  },
];

function TestimontialSection() {
  return (
    <section
      id="testimontials"
      className="custom-container flex flex-col gap-6 items-center justify-between bg-white  scroll-mt-6"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-main-green size-2"></span>
          <span className="text-sm font-circular-medium text-black">
            Testimonials
          </span>
        </div>
        <h2 className="text-3xl text-center max-w-md lg:text-4xl text-black font-medium font-circular-medium">
          {" "}
          What our user say about their experiences
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full max-w-[1200px]">
        {testimonialsArr.map((testimonial) => (
          <div
            key={testimonial.name}
            className="bg-white w-full h-full rounded-3xl border border-lighter-gray p-4 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl shrink-0 object-cover"
              />
              <div className="flex flex-col gap-0.5">
                <h6 className="text-sm font-circular-medium text-black">
                  {testimonial.name}
                </h6>
                <span className="text-sm font-circular-light text-black">
                  {testimonial.title}
                </span>
              </div>
            </div>
            <p className="text-sm font-circular-medium text-black">
              {testimonial.testimonial}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default TestimontialSection;
