import SearchBar from "../global/SearchBar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  count: number;
};

import { AddHomeAddressDialog } from "./HomeDialogs";

function HomesPageHeader({ count }: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex gap-1 items-center">
        <h2 className="text-lg text-black font-circular-bold font-bold capitalize">
          Homes
        </h2>{" "}
        <span className="text-base font-circular-bold font-bold text-light-gray">
          ({count})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <SearchBar searchKey="search" placeHolder="Search by address" />

        <AddHomeAddressDialog>
          <Button className="green-btn">
            <Plus />
            <span>Add Home</span>
          </Button>
        </AddHomeAddressDialog>
      </div>
    </div>
  );
}
export default HomesPageHeader;
