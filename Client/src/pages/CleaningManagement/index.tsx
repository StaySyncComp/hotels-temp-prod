import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CleaningBoard } from "@/features/cleaning/components/CleaningBoard";
import { CleaningRoom } from "@/features/cleaning/types";
// import { fetchLocations } from "@/features/organization/api/locations";
import {
  fetchAllCleaningStates,
  initializeMockData,
} from "@/features/cleaning/api";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
// import { useOrganization } from "@/features/organization/hooks/useOrganization";
import { useLocations } from "@/features/organization/hooks/useLocations";

export default function CleaningManagement() {
  const { locations, isLocationsLoading } = useLocations();
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<CleaningRoom[]>([]);
  const [cleaningStates, setCleaningStates] = useState<any[]>([]);
  const [isStatesLoading, setIsStatesLoading] = useState(true);

  // Fetch cleaning states
  const fetchStates = async () => {
    setIsStatesLoading(true);
    try {
      const statesResponse = await fetchAllCleaningStates();
      let states = (statesResponse as any).data || [];

      // If no states exist, try initializing and fetch again
      if (Array.isArray(states) && states.length === 0) {
        await initializeMockData();
        const newStatesRes = await fetchAllCleaningStates();
        states = (newStatesRes as any).data || [];
      }

      setCleaningStates(states);
    } catch (error) {
      console.error("Failed to load cleaning states", error);
    } finally {
      setIsStatesLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Merge locations and states whenever either changes
  useEffect(() => {
    console.log("CleaningManagement effect running");
    console.log("Locations from hook:", locations);
    console.log("States from local state:", cleaningStates);

    if (locations && Array.isArray(locations)) {
      console.log("Merging data...", locations.length, cleaningStates.length);

      const mergedData = locations.map((location: any) => {
        // Find matching state
        const state = Array.isArray(cleaningStates)
          ? cleaningStates.find((s: any) => s.locationId === location.id)
          : null;

        // Default if not found
        const cleaningStatus = state || {
          id: 0,
          locationId: location.id,
          status: "vacant_dirty", // Default safe status
          priority: "normal",
          history: [],
        };

        return {
          ...location,
          cleaningStatus,
        };
      });

      console.log("Merged Rooms result:", mergedData);
      setRooms(mergedData);
    } else {
      console.warn("Locations is not an array or is null:", locations);
    }
  }, [locations, cleaningStates]);

  const handleRefresh = () => {
    fetchStates();
  };

  return (
    <div className="flex flex-col min-h-full p-6 space-y-6">
      <div className="flex items-center justify-between shrink-0">
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
            onClick={handleRefresh}
            disabled={isStatesLoading || isLocationsLoading}
          >
            <RefreshCcw
              className={`w-4 h-4 ${isStatesLoading || isLocationsLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            {t("auto_assign")}
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <CleaningBoard
          rooms={rooms}
          isLoading={isStatesLoading || isLocationsLoading}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}
