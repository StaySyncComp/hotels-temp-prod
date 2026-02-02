import { useMemo } from "react";
import { CleaningRoom } from "@/features/cleaning/types";
import {
  getName,
  sortRoomsByNumber,
  extractNumberFromAreaName,
} from "@/features/cleaning/utils/roomHelpers";

interface RoomGroup {
  areaId: number;
  areaName: string;
  rooms: CleaningRoom[];
}

/**
 * Custom hook to group rooms by area/floor
 */
export const useRoomGrouping = (
  filteredRooms: CleaningRoom[],
  language: string,
  unknownAreaLabel: string,
): { groupedRooms: RoomGroup[] } => {
  const groupedRooms = useMemo(() => {
    const groups: Record<number, RoomGroup> = {};

    // Sort rooms by room number first
    const sortedRooms: CleaningRoom[] = sortRoomsByNumber(filteredRooms);

    sortedRooms.forEach((room) => {
      const areaId = room.area?.id || 0;
      if (!groups[areaId]) {
        groups[areaId] = {
          areaId,
          areaName: room.area
            ? getName(room.area.name, language)
            : unknownAreaLabel,
          rooms: [],
        };
      }
      groups[areaId].rooms.push(room);
    });

    // Sort groups by area name (extracting numbers if possible)
    return Object.values(groups).sort((a, b) => {
      const numA = extractNumberFromAreaName(a.areaName);
      const numB = extractNumberFromAreaName(b.areaName);

      if (numA !== numB) {
        return numA - numB;
      }

      // Fallback to ID if no numbers found
      return a.areaId - b.areaId;
    });
  }, [filteredRooms, language, unknownAreaLabel]);

  return { groupedRooms };
};
