import ChatWrapper from "@/components/chat/ChatWrapper";
import RedirectOrToggleSidebar from "@/components/chat/RedirectOrToggleSidebar";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchMessagesServer, fetchEstimateByIdServer } from "@/lib/actions";

async function SessionChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ estimateId?: string }>;
}) {
  const queryClient = new QueryClient();
  const { sessionId } = await params;
  const { estimateId } = await searchParams;
  await queryClient.prefetchQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => fetchMessagesServer(sessionId),
  });

  if (estimateId) {
    await queryClient.prefetchQuery({
      queryKey: ["estimate", estimateId],
      queryFn: () => fetchEstimateByIdServer(estimateId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="w-full h-full py-4  flex-col flex gap-4">
        <RedirectOrToggleSidebar
          url="/dashboard/projects"
          showRedirect={true}
        />
        <ChatWrapper sessionId={sessionId} estimateId={estimateId} />
      </section>
    </HydrationBoundary>
  );
}
export default SessionChatPage;
