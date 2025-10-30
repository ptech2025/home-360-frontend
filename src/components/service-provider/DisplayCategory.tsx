import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ProviderType } from "@/types/prisma-schema-types";

type Props = { type: ProviderType };
export const renderProviderStyle = (type: ProviderType) => {
  switch (type) {
    case ProviderType.plumbing:
      return "bg-blue-100 text-blue-700"; // water / pipes

    case ProviderType.electrical:
      return "bg-yellow-100 text-yellow-700"; // electricity / power

    case ProviderType.hvac:
      return "bg-cyan-100 text-cyan-700"; // air & cooling systems

    case ProviderType.roofing:
      return "bg-amber-100 text-amber-700"; // construction / roofing

    case ProviderType.landscaping:
      return "bg-green-100 text-green-700"; // plants / outdoors

    case ProviderType.cleaning:
      return "bg-sky-100 text-sky-700"; // freshness / hygiene

    case ProviderType.pest_control:
      return "bg-red-100 text-red-700"; // caution / danger

    case ProviderType.painting:
      return "bg-purple-100 text-purple-700"; // creative / color

    case ProviderType.general:
      return "bg-gray-100 text-gray-700"; // neutral general services

    case ProviderType.other:
      return "bg-slate-100 text-slate-700"; // fallback / undefined

    default:
      throw new Error("Invalid Provider Type");
  }
};

function DisplayCategory({ type }: Props) {
  return (
    <Badge className={cn("capitalize  text-sm", renderProviderStyle(type))}>
      <span>{String(type).replace("_", " ")} </span>
    </Badge>
  );
}
export default DisplayCategory;
