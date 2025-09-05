import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";

function PlanCard() {
  return (
    <article className="w-full rounded-[20px] bg-[#FAFAFB] px-5 py-6 flex flex-col justify-between items-center gap-5 h-full">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-2xl font-medium font-dm text-main-blue">
          Business
        </h3>
        <span className="text-2xl text-main-blue font-broke-bold ">$33</span>
      </div>
      <div className="flex flex-col w-full gap-5">
        <h5 className="text-lg font-medium font-dm text-main-blue">
          All core benefits in one unified platform
        </h5>
        <ul className="flex flex-col w-full gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="flex items-center gap-2">
              <CircleCheck className="text-white fill-black" />
              <span className="text-base text-[#7C7C7C]">
                Lorem ipsum dolor sit amet
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Button className="rounded-4xl h-11 w-full bg-main-blue border font-dm font-medium border-transparent text-white hover:border-main-blue hover:bg-transparent hover:text-main-blue">
        Subscribe
      </Button>
    </article>
  );
}
export default PlanCard;
