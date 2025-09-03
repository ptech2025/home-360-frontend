import { Project } from "@/types/project";
import { format } from "date-fns";
import {
  AssignedClientProjectDropdownMenu,
  ClientProjectPopover,
} from "../clients/ClientProjectDropdownMenus";
import { ProjectsActions } from "./ProjectsDialogs";
import {
  AddressProjectDropdownMenu,
  NoAddressProjectDropdownMenu,
  ProjectStatusDropdownMenu,
} from "./ProjectsDropdownMenus";

type Props = {
  project: Project;
};

function SingleProjectHeader({ project }: Props) {
  const { id, status, client, title, createdAt, address } = project;
  return (
    <div className="flex md:flex-row flex-col justify-between md:items-center w-full gap-3 lg:gap-6">
      <div className="flex items-start gap-4">
        <div className="flex gap-1 flex-col flex-1">
          <h1 className="md:text-xl lg:text-2xl text-lg text-main-blue font-bold font-broke-bold">
            {title}
          </h1>
          <span className="text-sm text-main-blue/80">
            {format(new Date(createdAt), "MMM dd, yyyy")}
          </span>
        </div>
        <div className="md:hidden flex items-center justify-center">
          <ProjectsActions showView={false} project={project} />
        </div>
      </div>
      <div className="flex max-md:flex-wrap items-center gap-3">
        {client ? (
          <AssignedClientProjectDropdownMenu client={client} projectId={id} />
        ) : (
          <ClientProjectPopover projectId={id} client={client} />
        )}
        {address ? (
          <AddressProjectDropdownMenu address={address} projectId={id} />
        ) : (
          <NoAddressProjectDropdownMenu projectId={id} />
        )}

        <ProjectStatusDropdownMenu status={status} projectId={id} />

        <div className="md:flex items-center justify-center hidden">
          <ProjectsActions showView={false} project={project} />
        </div>
      </div>
    </div>
  );
}
export default SingleProjectHeader;
