import { useTranslation } from "react-i18next";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Call } from "@/types/api/calls";
import { createApiService } from "@/api/utils/apiFactory";
import { useEffect, useState } from "react";
import ByDayReport from "./ByDayReport";
import ByDepartmentReport from "./ByDepartmentReport";
import AIReccomendations from "./AIReccomendations";

const callsApi = createApiService<Call>("/calls", { includeOrgId: true });

export default function Reports() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await callsApi.fetchAll({});
        // @ts-ignore
        const callsData = response.data?.data || [];
        // setCalls(callsData); // This line was removed as per the edit hint
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading">{t("reports")}</h1>
        <div
          className="h-[3px] w-20 rounded-full mt-1"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <p className="text-lg text-foreground/70">{t("reports_description")}</p>
      </div>

      <Tabs defaultValue="by-day" className="w-full">
        <TabsContent value="by-day">
          <ByDayReport />
        </TabsContent>
        <TabsContent value="by-department">
          <ByDepartmentReport />
        </TabsContent>
        <TabsContent value="ai-recommendations">
          <AIReccomendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
