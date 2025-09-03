import { MyDataParts, MyUIMessage } from "@/types/message-schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency, formatEstimateId } from "@/utils/funcs";
import { Button } from "../ui/button";
import Link from "next/link";
import LinkLoading from "../global/LinkLoading";
import { useIsTablet } from "@/hooks/use-media-query";
import { useEstimatePanelStore } from "@/store/estimateStore";

type Props = {
  estimate: MyDataParts["estimate"] | undefined;
  metadata: MyUIMessage["metadata"];
  estimateNumber?: number | string;
  sessionId: string; // Optional prop for estimate number
};

function ChatEstimate({ estimate, metadata, sessionId }: Props) {
  const isTablet = useIsTablet();
  const { setEstimateMode } = useEstimatePanelStore();
  if (!estimate) return null;

  const viewEstimateUrl = isTablet
    ? `/dashboard/estimates/${metadata?.estimatedId}`
    : `/dashboard/c/${sessionId}?estimateId=${metadata?.estimatedId}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <span className="uppercase text-xs lg:text-sm text-dark-orange">
          {formatEstimateId(metadata?.estimatedId)}
        </span>
        <CardTitle className="text-main-blue">
          {estimate.estimateTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className=" text-xs lg:text-sm font-medium text-dark-orange">
          {estimate.lineItems.length} Items
        </span>
        <h4 className="font-semibold text-main-blue text-base lg:text-lg">
          {formatCurrency(estimate.totalEstimate)}
        </h4>
      </CardContent>
      <CardFooter className="border-t">
        <Button
          className="rounded-4xl h-10 bg-transparent text-main-blue w-full border border-sidebar-border hover:bg-main-blue/10"
          asChild
        >
          <Link
            href={viewEstimateUrl}
            prefetch={false}
            scroll={false}
            onClick={() => setEstimateMode("edit")}
          >
            <LinkLoading text="View Estimate" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default ChatEstimate;
