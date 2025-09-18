import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function LayoutScreen() {
  return (
    <div className="hidden lg:flex relative overflow-clip flex-1  bg-cover bg-center items-center max-h-[750px] h-full  justify-center rounded-[1.25rem]">
      <Carousel className="w-full bg-[#1B1B1B] h-full">
        <CarouselContent>
          {Array.from({ length: 3 }).map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="relative w-full h-[950px] inline-flex items-center justify-center">
                <Image
                  src={"/images/auth-layout.svg"}
                  alt={"auth-layout"}
                  className="object-cover object-top-left w-full h-full"
                  // placeholder="blur"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="bg-gradient-to-b p-4 from-[#1B1B1B]/0 flex flex-col justify-center  items-start gap-4 via-[#1B1B1B]/85 to-[#1B1B1B] z-10 absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2">
                  <p className="text-lg text-white font-circular-light">
                    &quot;Having a single dashboard for things like maintenance
                    reminders, bookings (if relevant), payments, document
                    storage, and so on makes home-management less fragmented. No
                    more scattered calendar entries, paper files, or
                    sticky-notes.&quot;
                  </p>

                  <div className="flex flex-col  gap-0.5">
                    <h4 className="text-main-green font-medium font-circular-medium text-lg">
                      Mark Edwards
                    </h4>
                    <span className="text-sm text-white font-circular-light">
                      Homeowner
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="[&_svg]:size-6! shadow-none text-white bg-transparent border-transparent translate-0 size-10 absolute left-auto top-auto right-18 bottom-40" />
        <CarouselNext className="[&_svg]:size-6! text-white bg-transparent shadow-none translate-0 border-transparent size-10 absolute top-auto right-5 bottom-40" />
      </Carousel>
    </div>
  );
}
export default LayoutScreen;
