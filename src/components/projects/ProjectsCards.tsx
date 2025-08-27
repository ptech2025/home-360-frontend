"use client";

import { Estimate } from "@/types/estimate";
import { formatCurrency, formatEstimateId } from "@/utils/funcs";

import { Button } from "../ui/button";
import Link from "next/link";
import {  ChevronRight, Loader2, Plus } from "lucide-react";
import {  useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { createSession } from "@/services/chat-session";
import { formatDate } from "date-fns";
import { Badge } from "../ui/badge";
import { renderStatusIcon, renderStatusStyle } from "./DisplayProjectStatus";
import { ProjectStatus } from "@/types/project";

export function TotalProjectValueCard({
  projectTotalValue,
}: {
  projectTotalValue: number;
}) {
  return (
    <div className="rounded-lg  shadow-sm border border-sidebar-border px-2.5 py-4 flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-main-blue text-xs">Project Value</span>
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-dark-orange">
          {formatCurrency(projectTotalValue)}
        </h3>
      </div>
      <div className="rounded-md h-full px-4 py-8 bg-main-blue/10 flex flex-col justify-center items-center gap-2">
        {" "}
        <span className="text-xs text-main-blue">Coming Soon...</span>
      </div>
    </div>
  );
}

export function ProjectEstimatesCard({
  estimates,
  projectId,
}: {
  estimates: Estimate[];
  projectId: string;
}) {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createSession();
    },

    onSuccess(data) {
      push(`/dashboard/c/${data}`);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleCreateEstimate = () => {
    mutate();
  };

  const recentEstimate = estimates.length > 0 ? estimates[0] : null;

  return (
    <div className="rounded-lg flex-col gap-4 flex shadow-sm border border-sidebar-border px-2.5 py-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-main-blue text-sm lg:text-base font-medium">
          Estimates
        </h3>

        <Link
          href={`/dashboard/projects/${projectId}/estimates`}
          className={`group hover:underline underline-offset-2 flex items-center   text-xs gap-0.5
            {estimates.length === 0 ? "text-main-blue" : "text-dark-orange"}`}
        >
          <span>View all</span>
          <ChevronRight className="group-hover:translate-x-0.5 transition-transform duration-200 size-3.5" />
        </Link>
      </div>
      {recentEstimate ? (
        <div className="flex flex-col gap-2 h-full">
          <Link
            href={`/dashboard/estimates/${recentEstimate.id}`}
            className="flex p-3 flex-1 hover:bg-main-blue/10 flex-col justify-between gap-4 bg-white transition-colors cursor-pointer rounded-md border border-dashed border-main-blue/10"
          >
            <div className="flex w-full justify-between items-center gap-2s ">
              <div className="flex-col gap-0.5 flex">
                <span className="text-main-blue/80 text-xs ">
                  {formatEstimateId(recentEstimate.id)} -{" "}
                  {formatDate(
                    new Date(recentEstimate.createdAt),
                    "MMM dd, yyyy"
                  )}
                </span>
                <h4 className="text-main-blue text-sm ">
                  {recentEstimate.title}
                </h4>
                <span className="text-main-blue/80 text-xs ">
                  {recentEstimate.lineItems.length} Items
                </span>
              </div>

              <Badge
                className={`capitalize  ${renderStatusStyle(
                  ProjectStatus.completed
                )}`}
              >
                {renderStatusIcon(ProjectStatus.completed)}
                <span>{recentEstimate.status.toString()}</span>
              </Badge>
            </div>
            <div className="flex-col gap-0.5 flex">
              <span className="text-main-blue/80 text-xs ">
                Total Including Markup
              </span>
              <h5 className="text-base md:text-lg lg:text-xl font-bold text-main-blue">
                {formatCurrency(3000)}
              </h5>
            </div>
          </Link>
          <Button
            disabled={isPending}
            onClick={handleCreateEstimate}
            className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-full rounded-md md:rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange"
          >
            {isPending ? (
              <Loader2 className="size-4" />
            ) : (
              <>
                <Plus className="size-4" />
                <span>New Estimate</span>
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="rounded-md h-full px-4 py-8 bg-main-blue/10 flex flex-col justify-center items-center gap-2">
          {" "}
          <span className="text-xs text-main-blue">No Recent Estimate</span>
          <Button
            disabled={isPending}
            onClick={handleCreateEstimate}
            className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-max rounded-md md:rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange"
          >
            {isPending ? (
              <Loader2 className="size-4" />
            ) : (
              <>
                <Plus className="size-4" />
                <span>New Estimate</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProjectProposalCard() {
  return (
    <div className="rounded-lg flex-col gap-4 flex shadow-sm border border-sidebar-border px-2.5 py-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-main-blue text-sm lg:text-base font-medium">
          Proposals
        </h3>
      </div>
      <div className="rounded-md h-full px-4 py-8 bg-main-blue/10 flex flex-col justify-center items-center gap-2">
        {" "}
        <span className="text-xs text-main-blue">Coming Soon...</span>
      </div>
    </div>
  );
}
export function ProjectInvoicesCard() {
  return (
    <div className="rounded-lg flex-col gap-4 flex shadow-sm border border-sidebar-border px-2.5 py-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-main-blue text-sm lg:text-base font-medium">
          Invoices
        </h3>
      </div>
      <div className="rounded-md h-full px-4 py-8 bg-main-blue/10 flex flex-col justify-center items-center gap-2">
        {" "}
        <span className="text-xs text-main-blue">Coming Soon...</span>
      </div>
    </div>
  );
}
