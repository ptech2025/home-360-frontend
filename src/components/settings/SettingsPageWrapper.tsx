import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthUserType } from "@/types";
import { UpdatePassword } from "./SecurityTabContents";
import { DisplayCurrentPlan } from "./PricingTabContents";

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

function SettingsPageWrapper({ user }: { user: AuthUserType }) {
  return (
    <section className="w-full flex-col flex gap-6 py-4  px-10 md:px-20 lg:px-25">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold font-broke-bold text-black">
        Settings
      </h1>
      <Tabs defaultValue="general" className="w-full gap-6">
        <TabsList className="w-full h-12.5 bg-transparent">
          {tabsOptions.map((option) => {
            return (
              <TabsTrigger
                value={option.value}
                key={option.value}
                className="data-[state=active]:text-black data-[state=inactive]:text-black/50 data-[state=active]:bg-main-green/10"
              >
                {option.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="security">
          <UpdatePassword />
        </TabsContent>
        <TabsContent value="billing">
          <DisplayCurrentPlan user={user} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
export default SettingsPageWrapper;
