import { useMemo, useState } from "react";
import { CleaningRoom, CleaningStatus } from "@/features/cleaning/types";

/**
 * Custom hook to manage room filtering by search and status
 */
export const useRoomFilters = (rooms: CleaningRoom[]) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CleaningStatus | "all">(
    "all",
  );
  const [areaFilter, setAreaFilter] = useState<string>("");

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.roomNumber?.toString().includes(search) ||
        JSON.stringify(room.name).toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || room.cleaningStatus?.status === statusFilter;
      const matchesArea =
        !areaFilter || room.area?.id?.toString() === areaFilter;
      return matchesSearch && matchesStatus && matchesArea;
    });
  }, [rooms, search, statusFilter, areaFilter]);

  return {
    filteredRooms,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    areaFilter,
    setAreaFilter,
  };
};
