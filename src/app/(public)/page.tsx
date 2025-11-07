import WaitlistPage from "@/components/home/WaitlistPage";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
function HomePage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WaitlistPage />
    </HydrationBoundary>
  );
}
export default HomePage;
