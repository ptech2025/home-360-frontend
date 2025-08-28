"use client";

import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useDebounce } from "use-debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { CommandLoading } from "cmdk";
import { Ban, Loader2 } from "lucide-react";
import { Project } from "@/types/project";
import { fetchAllProjects } from "@/services/project";
import { AddNewProjectDialog } from "../projects/ProjectsDialogs";
import { saveEstimateToProject } from "@/services/estimate";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";

type ProjectItemProps = {
  title: string;
  handleClose: (state: boolean) => void;
  projectId: string;
  estimateId: string;
};

function ProjectItem({
  title,
  handleClose,
  projectId,
  estimateId,
}: ProjectItemProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return saveEstimateToProject(estimateId, projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["estimate", estimateId] });

      toast.success("Estimate assigned to project successfully.");
      handleClose(false);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });
  return (
    <CommandItem
      disabled={isPending}
      onSelect={() => mutate()}
      className={`cursor-pointer hover:bg-main-blue/20  bg-transparent flex text-sm items-center gap-2`}
    >
      <span>{title}</span>
    </CommandItem>
  );
}

function SavedToProjectDropdownMenu({ estimateId }: { estimateId: string }) {
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal] = useDebounce(searchVal, 300);
  const [projects, setProjects] = useState<Project[]>([]);

  // fetch clients with debounced value
  const { data, isLoading } = useQuery({
    queryKey: ["projects", { title: debouncedSearchVal, page: 1 }],
    queryFn: () =>
      fetchAllProjects({ title: debouncedSearchVal, size: 5, page: 1 }),
  });

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 text-white bg-dark-orange rounded-4xl w-max hover:bg-dark-orange/10 hover:text-dark-orange border hover:border-dark-orange border-transparent">
          <FolderPlus className="size-4" />
          <span className="hidden md:inline-block">Add To Project</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"start"}
        side="bottom"
        className="min-w-[15rem]"
      >
        <Command className="w-full">
          {/* 🔹 Replace CommandInput with custom input */}
          <div className="p-1 border-b">
            <Input
              type="search"
              placeholder="Search project..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full border px-2 py-1 text-sm rounded-md"
            />
          </div>

          <CommandList>
            {/* 🔹 Custom loading state */}
            {isLoading && (
              <CommandLoading>
                <div className="p-2 text-sm justify-center items-center flex text-muted-foreground">
                  <Loader2 className="animate-spin text-dark-orange" />
                </div>
              </CommandLoading>
            )}

            {!isLoading && projects.length === 0 && (
              <CommandEmpty className="flex py-4 text-main-blue flex-col gap-2 items-center justify-center">
                <Ban className={"size-4"} />
                <span className="text-xs text-main-blue">No results found</span>
              </CommandEmpty>
            )}

            {!isLoading && projects.length > 0 && (
              <CommandGroup>
                {projects.map((sug) => (
                  <ProjectItem
                    key={sug.id}
                    title={sug.title}
                    handleClose={setOpen}
                    projectId={sug.id}
                    estimateId={estimateId}
                  />
                ))}
              </CommandGroup>
            )}
            <CommandGroup className="items-center justify-center flex my-2">
              <AddNewProjectDialog />
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default SavedToProjectDropdownMenu;
