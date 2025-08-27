import { Client } from "@/types/client";
import { Mail, Phone, MapPin } from "lucide-react";
import { ClientsActions } from "./ClientsDialogs";

function SingleClientHeader({ client }: { client: Client }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {" "}
      <div className="flex gap-2 items-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-main-blue">
          {client.name}
        </h1>
        <ClientsActions client={client} showView={false} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2">
        <div className="flex items-center justify-start gap-2 w-full">
          <Mail className="size-4 text-dark-orange" />
          <span className="truncate text-main-blue text-xs">
            {client.email}
          </span>
        </div>{" "}
        <div className="flex items-center justify-start gap-2 w-full">
          <Phone className="size-4 text-dark-orange" />
          <span className="truncate text-main-blue text-xs">
            {client.phone ? client.phone : "No Phone Number"}
          </span>
        </div>{" "}
        <div className="flex items-center justify-start gap-2 w-full">
          <MapPin className="size-4 text-dark-orange" />
          <span className="truncate text-main-blue text-xs">
            {client.address ? client.address : "No Address"}
          </span>
        </div>
      </div>
    </div>
  );
}
export default SingleClientHeader;
