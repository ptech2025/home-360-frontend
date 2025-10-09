import { Grid2X2, List, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {AddOrEditDocumentDialog} from "./DocumentDialogs";
import { DialogTrigger } from "../ui/dialog";

type Props = {
  title: string;
  count: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
};
function DocumentPageHeader({ title, count, viewMode, setViewMode }: Props) {
  return (
    <div className="py-2 px-3 w-full flex flex-col">
      <div className="border-b border-lighter-gray flex justify-between items-center py-4">
        <div className="flex gap-1 items-center">
          <h2 className="text-lg text-black font-circular-bold font-bold capitalize">
            {title.replace("_", " ")}
          </h2>{" "}
          <span className="text-base  font-circular-bold font-bold text-light-gray">
            ({count})
          </span>
        </div>
        <AddOrEditDocumentDialog type="create">
          <DialogTrigger className="h-8  flex items-center gap-2  py-2 px-3 rounded-md text-white font-medium text-base bg-main-green hover:bg-white hover:border-main-green hover:text-main-green border border-transparent transition-colors">
            <Plus className="size-4" />
            <span>Upload Document</span>
          </DialogTrigger>
        </AddOrEditDocumentDialog>
      </div>{" "}
      <div className="flex justify-end items-center py-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            data-state={viewMode}
            className={
              "data-[state=grid]:bg-main-green data-[state=list]:shadow-none data-[state=grid]:text-white data-[state=list]:bg-white data-[state=list]:text-light-gray "
            }
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="size-5" />
          </Button>{" "}
          <Button
            size="icon"
            data-state={viewMode}
            className={
              "data-[state=list]:bg-main-green  data-[state=grid]:shadow-none data-[state=list]:text-white data-[state=grid]:bg-white data-[state=grid]:text-light-gray "
            }
            onClick={() => setViewMode("list")}
          >
            <List className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DocumentPageHeader;
