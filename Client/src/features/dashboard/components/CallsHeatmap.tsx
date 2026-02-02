import { useEffect, useState, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { OrganizationsContext } from "@/features/organization/context/organization-context";
import { createApiService } from "@/lib/api-utils/apiFactory";
import { Call } from "@/types/api/calls";
import i18n from "@/i18n";

const callsApi = createApiService<Call>("/calls", { includeOrgId: true });

export default function CallsHeatmap() {
  const { t } = useTranslation();
  const { departments, areas } = useContext(OrganizationsContext);
  const [heatmapData, setHeatmapData] = useState<
    Record<string, Record<string, number>>
  >({});
  const [loading, setLoading] = useState(true);
  console.log(areas);

  useEffect(() => {
    const fetchCallsData = async () => {
      try {
        setLoading(true);
        const response = await callsApi.fetchAll({});

        // @ts-ignore
        const calls: Call[] = response.data?.data || [];

        // Initialize data structure with all departments and areas
        const data: Record<string, Record<string, number>> = {};

        // Get department names in current language
        const departmentMap = new Map<number, string>();
        departments.forEach((dept) => {
          const deptName =
            dept.name[i18n.language as "he" | "en" | "ar"] ||
            dept.name.he ||
            dept.name.en ||
            "";
          departmentMap.set(dept.id, deptName);
          data[deptName] = {};
        });

        // Get area names in current language
        const areaMap = new Map<number, string>();
        areas.forEach((area) => {
          const areaName =
            area.name[i18n.language as "he" | "en" | "ar"] ||
            area.name.he ||
            area.name.en ||
            "";
          areaMap.set(area.id, areaName);
          // Initialize all department-area combinations to 0
          Object.keys(data).forEach((deptName) => {
            data[deptName][areaName] = 0;
          });
        });

        // Count calls by department and area
        calls.forEach((call) => {
          if (call.Department && call.location?.area) {
            const deptName = departmentMap.get(call.Department.id);
            const areaName = areaMap.get(call.location.area.id);

            if (deptName && areaName) {
              if (!data[deptName]) {
                data[deptName] = {};
              }
              if (!data[deptName][areaName]) {
                data[deptName][areaName] = 0;
              }
              data[deptName][areaName]++;
            }
          }
        });

        setHeatmapData(data);
      } catch (error) {
        console.error("Error fetching calls for heatmap:", error);
        setHeatmapData({});
      } finally {
        setLoading(false);
      }
    };

    if (departments.length > 0 && areas.length > 0) {
      fetchCallsData();
    }
  }, [departments, areas, i18n.language]);

  // Get unique department and area names from the data
  const departmentNames = Object.keys(heatmapData).sort();
  const areaNames = areas
    .map(
      (area) =>
        area.name[i18n.language as "he" | "en" | "ar"] ||
        area.name.he ||
        area.name.en ||
        "",
    )
    .filter((name) => name)
    .sort();

  const getHeatmapColor = (value: number) => {
    if (value >= 80) return "bg-blue-800";
    if (value >= 60) return "bg-blue-600";
    if (value >= 40) return "bg-blue-400";
    if (value >= 20) return "bg-blue-200";
    return "bg-blue-100";
  };

  const getTextColor = (value: number) => {
    return value >= 40 ? "text-white" : "text-gray-800";
  };

  if (loading) {
    return (
      <Card className="bg-surface/90 backdrop-blur-sm shadow-lg w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-4 text-lg">
            {t("inquiries_by_department_and_area") ===
            "inquiries_by_department_and_area"
              ? "פניות לפי מחלקה ואיזור"
              : t("inquiries_by_department_and_area")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              {t("loading") === "loading" ? "טוען..." : t("loading")}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (departmentNames.length === 0 || areaNames.length === 0) {
    return (
      <Card className="bg-surface/90 backdrop-blur-sm shadow-lg w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-4 text-lg">
            {t("inquiries_by_department_and_area") ===
            "inquiries_by_department_and_area"
              ? "פניות לפי מחלקה ואיזור"
              : t("inquiries_by_department_and_area")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              {t("no_data_available") === "no_data_available"
                ? "אין נתונים זמינים"
                : t("no_data_available")}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-surface/90 backdrop-blur-sm shadow-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-4 text-lg">
          {t("inquiries_by_department_and_area") ===
          "inquiries_by_department_and_area"
            ? "פניות לפי מחלקה ואיזור"
            : t("inquiries_by_department_and_area")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col w-full min-w-max">
            {/* Column Headers */}
            <div className="flex mb-2 w-full">
              <div className="flex-shrink-0 w-32"></div>
              {areaNames.map((area, index) => (
                <div key={index} className="flex-1 text-center min-w-[100px]">
                  <div className="text-sm font-medium text-gray-700">
                    {area}
                  </div>
                </div>
              ))}
            </div>
            {/* Data Rows */}
            {departmentNames.map((dept, deptIndex) => (
              <div key={deptIndex} className="flex mb-1 w-full">
                <div className="flex-shrink-0 w-32 flex items-center">
                  <div className="text-sm font-medium text-gray-700 pr-2">
                    {dept}
                  </div>
                </div>
                {areaNames.map((area, areaIndex) => {
                  const value = heatmapData[dept]?.[area] || 0;
                  return (
                    <div
                      key={areaIndex}
                      className={`flex-1 h-14 flex items-center justify-center mx-0.5 rounded ${getHeatmapColor(
                        value,
                      )} ${getTextColor(
                        value,
                      )} transition-all duration-200 hover:scale-105 cursor-pointer`}
                      title={`${dept} - ${area}: ${value}`}
                    >
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
