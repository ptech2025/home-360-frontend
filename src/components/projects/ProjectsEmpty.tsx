import { PiToolbox } from "react-icons/pi";
import { AddNewProjectDialog } from "./ProjectsDialogs";

function ProjectsEmpty() {
  return (
    <div className="flex gap-4 min-h-[300px] items-center justify-center flex-col">
      <div className="flex justify-center flex-col gap-1 items-center">
        <PiToolbox className="size-6 text-main-blue" />
        <h3 className="text-lg text-center font-medium text-main-blue">
          No Projects Found
        </h3>
      </div>
      <p className="text-center text-sm text-main-blue">
        Your recent projects will appear here{" "}
      </p>
      <AddNewProjectDialog />
    </div>
  );
}
export default ProjectsEmpty;
