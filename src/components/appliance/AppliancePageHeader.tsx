import { Grid2X2, List, Plus } from "lucide-react";
import { Button } from "../ui/button";
import SearchBar from "../global/SearchBar";
import { ApplianceFilter } from "./ApplianceFilters";
import { AddOrEditApplianceDialog } from "./ApplianceDialogs";

type Props = {
  title: string;
  count: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
};

function AppliancePageHeader({ title, count, viewMode, setViewMode }: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex gap-1 items-center">
        <h2 className="text-lg text-black font-circular-bold font-bold capitalize">
          {title.replace("_", " ")}
        </h2>{" "}
        <span className="text-base font-circular-bold font-bold text-light-gray">
          ({count})
        </span>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <ApplianceFilter />
        <SearchBar searchKey="search" placeHolder="Search by name" />

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            data-state={viewMode}
            className="data-[state=grid]:bg-main-green data-[state=list]:shadow-none data-[state=grid]:text-white data-[state=list]:bg-white data-[state=list]:text-light-gray"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="size-5" />
          </Button>{" "}
          <Button
            size="icon"
            data-state={viewMode}
            className="data-[state=list]:bg-main-green data-[state=grid]:shadow-none data-[state=list]:text-white data-[state=grid]:bg-white data-[state=grid]:text-light-gray"
            onClick={() => setViewMode("list")}
          >
            <List className="size-5" />
          </Button>
        </div>

        <AddOrEditApplianceDialog type="create">
          <Button className="green-btn">
            <Plus />
            <span>Add Appliance</span>
          </Button>
        </AddOrEditApplianceDialog>
      </div>
    </div>
  );
}

export default AppliancePageHeader;
