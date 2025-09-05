import FAQs from "@/components/global/FAQs";
import WaitListPage from "@/components/global/WaitListPage";
function HomePage() {
  return (
    <>
      <WaitListPage />
      <FAQs isHome={true} />
    </>
  );
}
export default HomePage;
