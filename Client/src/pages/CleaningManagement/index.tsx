import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CleaningBoard } from "./CleaningBoard";
import { CleaningRoom } from "./types";
import { fetchLocations } from "@/api/locations";
import { fetchAllCleaningStates, initializeMockData } from "@/api/cleaning";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function CleaningManagement() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<CleaningRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  const loadData = async () => {
    setIsLoading(true);
    try {
      // First, ensure backend has data (optional safety check/init)
      // await initializeMockData();
      // Ideally this init is done once or by admin.
      // We will try to fetch, if empty, maybe trigger init?
      // Let's fetch both parallel.

      const [locResponse, statesResponse] = await Promise.all([
        fetchLocations(),
        fetchAllCleaningStates(),
      ]);

      let states = (statesResponse as any).data || [];

      // If no states exist, try initializing and fetch again
      if (Array.isArray(states) && states.length === 0) {
        await initializeMockData();
        const newStatesRes = await fetchAllCleaningStates();
        states = (newStatesRes as any).data || [];
      }

      if (locResponse?.data) {
        console.log("Fetched locations:", locResponse.data);
        console.log("Fetched states:", states);

        const mergedData = locResponse.data.map((location: any) => {
          // Find matching state
          const state = Array.isArray(states)
            ? states.find((s: any) => s.locationId === location.id)
            : null;
          // Default if not found (should be found after init)
          const cleaningStatus = state || {
            id: 0,
            locationId: location.id,
            status: "dirty",
            priority: "normal",
            history: [],
          };

          return {
            ...location,
            cleaningStatus,
          };
        });

        console.log("Merged data:", mergedData);
        setRooms(mergedData);
      }
    } catch (error) {
      console.error("Failed to load cleaning data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-display tracking-tight text-foreground">
            {t("cleaning_management")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("cleaning_management_subtitle") ||
              "Manage housekeeping operations and room statuses"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            disabled={isLoading}
          >
            <RefreshCcw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            {t("auto_assign")}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <CleaningBoard
          rooms={rooms}
          isLoading={isLoading}
          onRefresh={loadData}
        />
      </div>
    </div>
  );
}
