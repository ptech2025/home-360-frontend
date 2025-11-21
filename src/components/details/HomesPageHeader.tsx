import SearchBar from "../global/SearchBar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import UpgradePrompt from "../global/UpgradePrompt";

import { AddHomeAddressDialog } from "./HomeDialogs";
import { AuthUserType } from "@/types";
import { canAddHome } from "@/utils/funcs";
type Props = {
  count: number;
  user: AuthUserType;
};

function HomesPageHeader({ count, user }: Props) {
  const homePermission = canAddHome(user, user.homes.length);

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
      <div className="flex items-center gap-2 relative">
        <SearchBar searchKey="search" placeHolder="Search by address" />

        <AddHomeAddressDialog>
          <Button disabled={!homePermission.allowed} className="green-btn">
            <Plus />
            <span>Add Home</span>
          </Button>
        </AddHomeAddressDialog>

        {!homePermission.allowed && (
          <UpgradePrompt
            reason={homePermission.reason}
            upgradeMessage={homePermission.upgradeMessage}
          />
        )}
      </div>
    </div>
  );
}
export default HomesPageHeader;
