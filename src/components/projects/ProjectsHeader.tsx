import SearchBar from "../global/SearchBar";
import { AddNewProjectDialog } from "./ProjectsDialogs";
import ProjectsFilter from "./ProjectsFilter";

type ProjectsHeaderProps = {
  hasProjects: boolean;
};

function ProjectsHeader({ hasProjects }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="md:text-lg lg:text-xl text-base text-main-blue font-broke-semi font-semibold">
        Projects
      </h1>
      <div className="w-full md:max-w-[35rem] flex gap-4 items-center h-11">
        <SearchBar searchKey="title" placeHolder="Search by title" />
        <ProjectsFilter />
        {hasProjects && <AddNewProjectDialog />}
      </div>
    </div>
  );
}
export default ProjectsHeader;
