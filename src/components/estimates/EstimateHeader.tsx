import { Estimate } from "@/types/estimate";
import { Button } from "../ui/button";
import { formatEstimateId } from "@/utils/funcs";
import SavedToProjectDropdownMenu from "./SavedToProjectDropdownMenu";
import { FolderEdit } from "lucide-react";
import Link from "next/link";

type Props = {
  estimate: Estimate;
};

function EstimateHeader({ estimate }: Props) {
  const { id, title, projectId } = estimate;
  return (
    <div className="flex justify-between items-center gap-4 pr-4 pb-4">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-sm text-dark-orange">{formatEstimateId(id)}</span>
        <h4 className="text-main-blue text-base lg:text-lg font-semibold">
          {title}
        </h4>
      </div>
      {projectId ? (
        <Button
          asChild
          className="h-10 text-white bg-main-blue rounded-4xl w-max hover:bg-main-blue/10 hover:text-main-blue border hover:border-main-blue border-transparent"
        >
          <Link href={`/dashboard/estimates/${id}`}>
            <FolderEdit className="size-4" />
            <span className="hidden md:inline-block">Edit Estimate</span>
          </Link>
        </Button>
      ) : (
        <SavedToProjectDropdownMenu estimateId={id}  />
      )}
    </div>
  );
}
export default EstimateHeader;
