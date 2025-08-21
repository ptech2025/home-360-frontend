import { createChatSessionServer } from "@/lib/actions";

async function CreateChatSessionPage() {
  await createChatSessionServer();
  return (
    <section className="w-full h-full py-4  flex-col flex gap-4"></section>
  );
}
export default CreateChatSessionPage;
