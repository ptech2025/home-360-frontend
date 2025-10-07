import DocumentSidebar from "@/components/property/DocumentSidebar";
import { fetchUserServerWithCookies } from "@/lib/actions";
import { userQueries } from "@/queries/user";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DocumentLayout(
  props: LayoutProps<"/dashboard/[homeId]/documents">
) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).singleHome(homeId)
    ),
  ]);

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded || user.homes.length === 0) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="px-4  py-4 bg-lighter-gray grid grid-cols-1 md:grid-cols-[0.3fr_1fr] gap-2 ">
        <DocumentSidebar homeId={homeId} />
        <div className="min-h-svh bg-white rounded-t-md p-4 w-full">{props.children}</div>
      </section>
    </HydrationBoundary>
  );
}
