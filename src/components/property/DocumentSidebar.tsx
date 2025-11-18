"use client";

import { userQueries } from "@/queries/user";
import { DocumentCategory } from "@/types/prisma-schema-types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { getDocumentCategoryCount } from "@/utils/funcs";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Route } from "next";

type DocumentSidebarProps = {
  homeId: string;
};

function DocumentSidebar({ homeId }: DocumentSidebarProps) {
  const { category } = useParams<{ homeId: string; category?: string }>();
  const pathname = usePathname();
  const { data, isPending } = useQuery(userQueries.singleHome(homeId));

  const getActiveCategory = (category: string) => {
    const isActive = pathname.includes(category);

    return isActive;
  };

  const isAllDocumentsActive = () => {
    const isActive =
      pathname.endsWith("documents") || pathname.endsWith("documents/");

    return isActive;
  };

  const availableCategories = Object.values(DocumentCategory);

  return (
    <div className="bg-white  rounded-t-md hidden md:flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-black text-base font-bold font-circular-bold">
          Categories
        </h3>
        {isPending ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: availableCategories.length }).map(
              (_, index) => (
                <Skeleton key={index} className="h-8 w-full" />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              data-state={isAllDocumentsActive() ? "active" : "inactive"}
              asChild
              className="flex px-2 group data-[state=inactive]:hover:bg-main-green/20 data-[state=inactive]:shadow-none  data-[state=inactive]:bg-white data-[state=active]:bg-main-green/20 items-center gap-4 justify-between"
            >
              <Link href={`/dashboard/${homeId}/documents`}>
                <span className="text-sm group-data-[state=inactive]:font-circular-light group-data-[state=active]:font-circular-medium transition-all   text-black capitalize">
                  All Documents
                </span>

                <span
                  className={
                    "border-lighter-gray  group-data-[state=inactive]:bg-main-green/20 group-data-[state=active]:opacity-100 duration-300 transition-all group-data-[state=inactive]:opacity-50 group-data-[state=active]:border-white group-data-[state=inactive]:border-light-gray group-data-[state=active]:bg-white shrink-0 border  flex items-center justify-center text-center  rounded-full min-w-6 text-main-green text-sm min-h-6"
                  }
                >
                  {data?.documents.length || 0}
                </span>
              </Link>
            </Button>
            {availableCategories.map((category) => (
              <Button
                key={category}
                asChild
                data-state={getActiveCategory(category) ? "active" : "inactive"}
                className="flex px-2 group data-[state=inactive]:hover:bg-main-green/20 data-[state=inactive]:shadow-none  data-[state=inactive]:bg-white data-[state=active]:bg-main-green/20 items-center gap-4 justify-between"
              >
                <Link href={`/dashboard/${homeId}/documents/${category}`}>
                  <span className="text-sm group-data-[state=inactive]:font-circular-light group-data-[state=active]:font-circular-medium transition-all   text-black capitalize">
                    {category.replace("_", " ")}
                  </span>

                  <span
                    className={
                      "border-lighter-gray  group-data-[state=inactive]:bg-main-green/20 group-data-[state=active]:opacity-100 duration-300 transition-all group-data-[state=inactive]:opacity-50 group-data-[state=active]:border-white group-data-[state=inactive]:border-light-gray group-data-[state=active]:bg-white shrink-0 border  flex items-center justify-center text-center  rounded-full min-w-6 text-main-green text-sm min-h-6"
                    }
                  >
                    {getDocumentCategoryCount(category, data?.documents || [])}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-black text-base font-bold font-circular-bold">
          Tags
        </h3>
        {isPending ? (
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: availableCategories.length }).map(
              (_, index) => (
                <Skeleton key={index} className="h-5 w-full" />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data &&
              Array.from(
                new Set(
                  data.documents.flatMap((doc) => doc.tags).filter(Boolean)
                )
              ).map((tag) => (
                <Link
                  key={tag}
                  href={
                    `/dashboard/${homeId}/documents${
                      category ? `/${category}?tag=${tag}` : `?tag=${tag}`
                    }` as Route
                  }
                  className="px-2 py-1 h-auto w-max rounded-md bg-white transition-colors hover:bg-main-green text-black hover:text-white border border-light-gray hover:border-white text-sm font-medium font-circular-medium"
                >
                  {tag}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default DocumentSidebar;
