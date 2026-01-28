import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetTextDirection } from "@/lib/i18n";
import CallTable from "./Tabs/CallTable";
import RecurringCallTable from "./Tabs/RecurringCallTable";
import { useState } from "react";
import { Call } from "@/types/api/calls";
import { SideStatsCard } from "./SideStatsCard";
import { useUser } from "@/hooks/useUser";

export default function CallsPage() {
  const { t } = useTranslation();
  const direction = GetTextDirection();
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const { allUsers } = useUser();

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      <div className="flex-1 flex flex-col min-w-0">
        <h1 className="heading mb-6">{t("calls")}</h1>

        <Tabs
          defaultValue="active"
          className="w-full flex-1 flex flex-col overflow-hidden"
          dir={direction}
        >
          <TabsList className={`grid flex-shrink-0`}>
            <TabsTrigger variant={"boxed"} value="active">
              {t("active_calls")}
            </TabsTrigger>
            <TabsTrigger variant={"boxed"} value="recurring">
              {t("recurring_calls")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 flex-1 flex flex-col">
            <CallTable selectedCall={selectedCall} onSelect={setSelectedCall} />
          </TabsContent>
          <TabsContent
            value="recurring"
            className="mt-6 flex-1 overflow-hidden flex flex-col"
          >
            <RecurringCallTable />
          </TabsContent>
        </Tabs>
      </div>

      <SideStatsCard
        call={selectedCall}
        users={allUsers}
        className="w-[350px] flex-shrink-0 h-full overflow-hidden"
      />
    </div>
  );
}
