import { useMemo } from "react";
import { CleaningRoom } from "@/features/cleaning/types";

interface UseCleaningRoomsProps {
  locations: any[] | null;
  areas: any[] | null;
  cleaningStates: any[];
}

/**
 * Custom hook to merge locations, areas, and cleaning states into rooms
 */
export const useCleaningRooms = ({
  locations,
  areas,
  cleaningStates,
}: UseCleaningRoomsProps): { rooms: CleaningRoom[] } => {
  const rooms = useMemo(() => {
    if (!locations || !Array.isArray(locations)) {
      return [];
    }

    return locations.map((location: any) => {
      // Find matching cleaning state
      const state = Array.isArray(cleaningStates)
        ? cleaningStates.find((s: any) => s.locationId === location.id)
        : null;

      // Default cleaning status if not found
      const cleaningStatus = state || {
        id: 0,
        locationId: location.id,
        status: "vacant_dirty",
        priority: "normal",
        history: [],
      };

      // Find area information
      const area = Array.isArray(areas)
        ? areas.find((a: any) => a.id === location.areaId)
        : null;

      return {
        ...location,
        area,
        cleaningStatus,
      };
    });
  }, [locations, areas, cleaningStates]);

  return { rooms };
};
