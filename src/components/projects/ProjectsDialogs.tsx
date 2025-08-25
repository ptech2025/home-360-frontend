import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import {
  createProject,
  deleteProject,
  updateProjectTitle,
} from "@/services/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FolderPlus,
  Loader2,
  Plus,
  EllipsisVertical,
  FolderPen,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "nextjs-toploader/app";
import { Project } from "@/types/project";

export function AddNewProjectDialog() {
  const queryClient = useQueryClient();
  const [projectTitle, setProjectTitle] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (title: string) => {
      return createProject(title);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      toast.success("Project created successfully.");
      setProjectTitle("");
      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleCreateProject = () => {
    if (projectTitle.trim().length === 0) {
      toast.error("Project Title is required.");
    } else {
      mutate(projectTitle);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-max rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange">
        <Plus className="size-4" />
        <span className="hidden md:inline-block">New Project</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <FolderPlus className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Projects help organize estimates, invoices, proposals.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="my-4 flex flex-col gap-2 w-full">
          <Label
            htmlFor="title"
            className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']"
          >
            Project Title
          </Label>
          <Input
            name="title"
            id="title"
            type="text"
            placeholder="Enter your project title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="h-11  w-full border-sidebar-border!"
          />
        </div>
        <DialogFooter className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Button
            disabled={isPending}
            onClick={() => setOpen(false)}
            className="w-full h-11 bg-transparent text-main-blue rounded-md border border-main-blue hover:bg-sidebar-border"
          >
            <span>Cancel</span>
          </Button>{" "}
          <Button
            disabled={isPending}
            onClick={handleCreateProject}
            className="w-full h-11 max-sm:order-first rounded-md bg-main-blue text-white"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateProjectTitleDialog({
  children,
  projectId,
  title,
}: {
  children: React.ReactNode;
  projectId: string;
  title: string;
}) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState(title);

  const { mutate, isPending } = useMutation({
    mutationFn: (title: string) => {
      return updateProjectTitle(title, projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      toast.success("Project updated successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleUpdateProject = () => {
    if (projectTitle.trim().length === 0) {
      toast.error("Project Title is required.");
    } else {
      mutate(projectTitle);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row gap-2 items-center">
          <div className="rounded-lg flex items-center justify-center shrink-0 p-1 size-12  border border-sidebar-border">
            <FolderPen className="text-main-blue size-6" />
          </div>
          <div className="flex gap-1 flex-col justify-center">
            <DialogTitle>Edit Project Title</DialogTitle>
            <DialogDescription>
              Projects help organize estimates, invoices, proposals.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="my-4 flex flex-col gap-2 w-full">
          <Label
            htmlFor="title"
            className="text-main-blue after:ml-[-5px] after:text-red-500 after:content-['*']"
          >
            Project Title
          </Label>
          <Input
            name="title"
            id="title"
            type="text"
            placeholder="Enter your project title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="h-11  w-full border-sidebar-border!"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => setIsDialogOpen(false)}
            variant={"outline"}
            className="text-xs"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={handleUpdateProject}
            className="bg-destructive text-xs"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteProjectDialog({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return deleteProject(projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects", { page: 1 }] });
      toast.success("Project deleted successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete This Project</DialogTitle>
          <DialogDescription>
            you cannot undo this action, are you sure you want to delete this
            order?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => setIsDialogOpen(false)}
            variant={"outline"}
            className="text-xs"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={() => mutate()}
            className="bg-destructive text-xs"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectActions({ project }: { project: Project }) {
  const { push } = useRouter();
  const handleViewProject = () => {
    push(`/dashboard/projects/${project.id}`);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical className="size-5 text-main-blue" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y "
      >
        <Button
          onClick={handleViewProject}
          className="rounded-b-none  rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
        >
          View Project
        </Button>
        <UpdateProjectTitleDialog title={project.title} projectId={project.id}>
          <Button className="rounded-none   text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted ">
            Edit Title
          </Button>
        </UpdateProjectTitleDialog>
        <DeleteProjectDialog projectId={project.id}>
          <Button className="rounded-t-none  rounded-b-md  text-xs data-[state=active]:bg-black data-[state=active]:text-destructive  bg-transparent w-full text-black hover:bg-destructive/20 ">
            Delete
          </Button>
        </DeleteProjectDialog>
      </PopoverContent>
    </Popover>
  );
}
