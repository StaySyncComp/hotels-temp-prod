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
import { fetchCalls } from "@/features/calls/api";
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
          {payload[0].name || payload[0].payload.hour}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const daysOfWeekHebrew = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

function getDayName(dateString: string) {
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

function getHour(dateString: string) {
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, "0")}:00`;
}

export default function ByDayReport() {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [dataByDay, setDataByDay] = useState<
    Record<string, { hour: string; calls: number }[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCalls();
        // @ts-ignore
        const calls = response.data.data || [];
        const grouped: Record<string, Record<string, number>> = {};
        daysOfWeek.forEach((day) => (grouped[day] = {}));
        calls.forEach((call: any) => {
          const day = getDayName(call.createdAt);
          const hour = getHour(call.createdAt);
          if (!grouped[day]) grouped[day] = {};
          if (!grouped[day][hour]) grouped[day][hour] = 0;
          grouped[day][hour]++;
        });
        // Convert to chart format
        const chartData: Record<string, { hour: string; calls: number }[]> = {};
        Object.keys(grouped).forEach((day) => {
          chartData[day] = Object.entries(grouped[day])
            .map(([hour, calls]) => ({
              hour,
              calls: calls as number,
            }))
            .sort((a, b) => a.hour.localeCompare(b.hour));
        });
        setDataByDay(chartData);
      } catch (err) {
        console.error("Error fetching calls for ByDayReport:", err);
        setError(
          t("error_loading_data") === "error_loading_data"
            ? "שגיאה בטעינת נתונים"
            : t("error_loading_data"),
        );
        setDataByDay({});
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [t]);

  const handlePrevDay = () => {
    const idx = daysOfWeek.indexOf(selectedDay);
    setSelectedDay(
      daysOfWeek[(idx - 1 + daysOfWeek.length) % daysOfWeek.length],
    );
  };
  const handleNextDay = () => {
    const idx = daysOfWeek.indexOf(selectedDay);
    setSelectedDay(daysOfWeek[(idx + 1) % daysOfWeek.length]);
  };

  const getDayLabel = (day: string) => {
    if (i18n.language === "he") {
      const index = daysOfWeek.indexOf(day);
      return index >= 0 ? daysOfWeekHebrew[index] : day;
    }
    const translated = t(`week_days.${day}`);
    return translated === `week_days.${day}` ? day : translated;
  };

  if (loading) {
    return (
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            {t("calls_by_hour") === "calls_by_hour"
              ? "פניות לפי שעה"
              : t("calls_by_hour")}
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
            {t("calls_by_hour") === "calls_by_hour"
              ? "פניות לפי שעה"
              : t("calls_by_hour")}
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

  const currentDayData = dataByDay[selectedDay] || [];
  const hasData = currentDayData.length > 0;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-800">
          {t("calls_by_hour") === "calls_by_hour"
            ? "פניות לפי שעה"
            : t("calls_by_hour")}{" "}
          - {getDayLabel(selectedDay)}
        </CardTitle>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handlePrevDay}
            aria-label={
              t("previous_day") === "previous_day"
                ? "יום קודם"
                : t("previous_day")
            }
          >
            &#8592;
          </button>
          <select
            className="px-2 py-1 rounded border border-gray-300"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {getDayLabel(day)}
              </option>
            ))}
          </select>
          <button
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleNextDay}
            aria-label={
              t("next_day") === "next_day" ? "יום הבא" : t("next_day")
            }
          >
            &#8594;
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">
              {t("no_data_for_day") === "no_data_for_day"
                ? `אין נתונים ליום ${getDayLabel(selectedDay)}`
                : t("no_data_for_day")}
            </p>
          </div>
        ) : (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentDayData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="hour"
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
                    e &&
                    e.target &&
                    e.target.setAttribute("fill", COLORS.primary)
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
