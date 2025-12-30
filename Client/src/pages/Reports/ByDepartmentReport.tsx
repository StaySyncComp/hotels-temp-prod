import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchCalls } from "@/api/calls";
import { Loader2 } from "lucide-react";

// Modern color palette (same as GeneralData)
const COLORS = {
  primary: "#2563eb",
  secondary: "#7c3aed",
  success: "#059669",
  warning: "#d97706",
  danger: "#dc2626",
  background: "#f8fafc",
  text: "#1e293b",
};

// Custom tooltip (same as GeneralData)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          {payload[0].name || payload[0].payload.department}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function ByDepartmentReport() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<{ department: string; calls: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCalls();
        // @ts-ignore
        const calls = response.data.data || [];
        // Group by department
        const counts: Record<string, number> = {};
        calls.forEach((call: any) => {
          const dep =
            call.Department?.name?.[i18n.language as "he" | "en" | "ar"] ||
            call.Department?.name?.en ||
            call.Department?.name?.he ||
            t("unknown") === "unknown" ? "לא ידוע" : t("unknown");
          counts[dep] = (counts[dep] || 0) + 1;
        });
        setData(
          Object.entries(counts)
            .map(([department, calls]) => ({
              department,
              calls,
            }))
            .sort((a, b) => b.calls - a.calls)
        );
      } catch (e) {
        console.error("Error fetching calls for ByDepartmentReport:", e);
        setError(t("error_loading_data") === "error_loading_data" ? "שגיאה בטעינת נתונים" : t("error_loading_data"));
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [i18n.language, t]);

  if (loading) {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            {t("calls_by_department") === "calls_by_department" ? "פניות לפי מחלקה" : t("calls_by_department")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[350px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            {t("calls_by_department") === "calls_by_department" ? "פניות לפי מחלקה" : t("calls_by_department")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            {t("calls_by_department") === "calls_by_department" ? "פניות לפי מחלקה" : t("calls_by_department")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">
              {t("no_data_available") === "no_data_available" ? "אין נתונים זמינים" : t("no_data_available")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          {t("calls_by_department") === "calls_by_department" ? "פניות לפי מחלקה" : t("calls_by_department")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="department"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fill: COLORS.text, fontSize: 12 }}
              />
              <YAxis tick={{ fill: COLORS.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="calls"
                fill={COLORS.primary}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                isAnimationActive={true}
                onMouseOver={(e) =>
                  e &&
                  e.target &&
                  e.target.setAttribute("fill", COLORS.secondary)
                }
                onMouseOut={(e) =>
                  e && e.target && e.target.setAttribute("fill", COLORS.primary)
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
