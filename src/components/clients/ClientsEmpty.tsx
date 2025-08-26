import { PiUsers } from "react-icons/pi";
import { AddClientDialog } from "./ClientsDialogs";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function ProjectsEmpty() {
  return (
    <div className="flex gap-4 min-h-[300px] items-center justify-center flex-col">
      <div className="flex justify-center flex-col gap-1 items-center">
        <PiUsers className="size-6 text-main-blue" />
        <h3 className="text-lg text-center font-medium text-main-blue">
          No Clients Found
        </h3>
      </div>
      <p className="text-center text-sm text-main-blue">
        Your recent clients will appear here{" "}
      </p>
      <AddClientDialog>
        <Button className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-max rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange">
          <Plus className="size-4" />
          <span className="hidden md:inline-block">New Client</span>
        </Button>
      </AddClientDialog>
    </div>
  );
}
export default ProjectsEmpty;
