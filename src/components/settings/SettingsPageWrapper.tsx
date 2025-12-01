import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthUserType } from "@/types";
import { UpdatePassword } from "./SecurityTabContent";
import { UpdateProfileForm } from "./ProfileTabContent";
import { DisplayCurrentPlan } from "./PricingTabContent";

const tabsOptions = [
  {
    value: "profile",
    label: "Profile",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "billing",
    label: "Billing",
  },
];

function SettingsPageWrapper({ user }: { user: AuthUserType }) {
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-dvh">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-black text-xl font-circular-medium">
          App Settings
        </h1>
        <p className="text-gray text-sm">Customize your Home360 experience</p>
      </div>
      <Tabs
        defaultValue="profile"
        orientation="vertical"
        className="w-full flex flex-1 flex-col gap-6 md:flex-row "
      >
        <TabsList className="flex w-full max-w-full md:h-full md:min-h-full md:justify-start  flex-row gap-2 rounded-md bg-white p-0 md:p-4 md:w-56 md:flex-col">
          {tabsOptions.map((option) => {
            return (
              <TabsTrigger
                value={option.value}
                key={option.value}
                className="group data-[state=active]:shadow-none flex items-center gap-3 justify-start rounded-md border border-transparent px-3 py-2 text-left transition-colors data-[state=active]:bg-light-gray/10 data-[state=active]:text-black data-[state=inactive]:text-black/50 md:flex-none md:h-11 md:w-full"
              >
                <span className="w-1 h-full rounded-md shrink-0 bg-transparent transition-colors group-data-[state=active]:bg-main-green" />
                <span className="font-circular-medium">{option.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value="profile"
          className="w-full flex-1 rounded-md flex flex-col gap-4 bg-white"
        >
          <UpdateProfileForm user={user} />
        </TabsContent>
        <TabsContent
          value="security"
          className="w-full rounded-md flex flex-col gap-4 bg-white"
        >
          <UpdatePassword />
        </TabsContent>
        <TabsContent
          value="billing"
          className="w-full rounded-md flex flex-col gap-4 bg-white"
        >
          <DisplayCurrentPlan user={user} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
export default SettingsPageWrapper;
