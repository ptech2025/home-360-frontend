// import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
// import { redirect } from "next/navigation";

async function ProjectsPage() {
  const queryClient = new QueryClient();
  // const user = await fetchUserServer();
  // console.log(user);

  // if (!user) {
  //   redirect("/sign-in");
  // }

  // if (!user.isOnboarded) {
  //   redirect("/onboarding");
  // }

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
}
export default ProjectsPage;
