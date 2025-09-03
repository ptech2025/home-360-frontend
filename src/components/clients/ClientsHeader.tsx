import { Plus } from "lucide-react";
import SearchBar from "../global/SearchBar";
import { Button } from "../ui/button";
import { AddClientDialog } from "./ClientsDialogs";

type ClientsHeaderProps = {
  hasClients: boolean;
};

function ClientsHeader({ hasClients }: ClientsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="md:text-lg lg:text-xl text-base text-main-blue font-broke-semi font-semibold">
        Clients
      </h1>
      <div className="w-full md:max-w-[35rem] flex gap-4 items-center h-11">
        <SearchBar searchKey="client" placeHolder="Search by name" />
        {hasClients && (
          <AddClientDialog>
            <Button className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-max rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange">
              <Plus className="size-4" />
              <span className="hidden md:inline-block">New Client</span>
            </Button>
          </AddClientDialog>
        )}
      </div>
    </div>
  );
}
export default ClientsHeader;
