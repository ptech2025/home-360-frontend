import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyInfo, PersonalInfo } from "./GeneralTabContents";
import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";

const tabsOptions = [
  {
    value: "general",
    label: "General",
  },
  {
    value: "billing",
    label: "Billing & Subscription",
  },
  {
    value: "security",
    label: "Security",
  },
];

function SettingsPageWrapper() {
  return (
    <section className="w-full flex-col flex gap-6 py-4">
      <RedirectOrToggleSidebar url={``} showRedirect={false} />
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-main-blue">
        Settings
      </h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full h-12.5 bg-transparent">
          {tabsOptions.map((option) => {
            return (
              <TabsTrigger
                value={option.value}
                key={option.value}
                className="data-[state=active]:text-main-blue data-[state=inactive]:text-main-blue/50 data-[state=active]:bg-main-blue/10"
              >
                {option.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="general" className="grid grid-cols-1 gap-6">
          <PersonalInfo />
          <CompanyInfo />
        </TabsContent>
        <TabsContent value="security"></TabsContent>
        <TabsContent value="billing"></TabsContent>
      </Tabs>
    </section>
  );
}
export default SettingsPageWrapper;
