import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { CleaningDetailsDrawer } from "@/features/cleaning/components/CleaningDetailsDrawer";
import { CleaningFiltersBar } from "@/features/cleaning/components/CleaningFiltersBar";
import { RoomGridGroup } from "@/features/cleaning/components/RoomGridGroup";
import { CleaningLegend } from "@/features/cleaning/components/CleaningLegend";
import { CleaningRoom, CleaningStatus } from "@/features/cleaning/types";
import { useUser } from "@/features/auth/hooks/useUser";
import { useRoomFilters } from "@/features/cleaning/hooks/useRoomFilters";
import { useRoomGrouping } from "@/features/cleaning/hooks/useRoomGrouping";
import {
  updateCleaningTaskStatus,
  assignWorkerToTask,
} from "@/features/cleaning/api";
import { CleaningBoardSkeleton } from "@/features/cleaning/components/CleaningBoardSkeleton";
import { Button } from "@/components/ui/button";
import AddCall from "@/features/calls/components/AddCall";

interface CleaningBoardProps {
  rooms: CleaningRoom[];
  isLoading: boolean;
  onRefresh: () => void;
}

/**
 * CleaningBoard Component
 *
 * Main cleaning management interface with room grid, filtering, and details drawer.
 * Refactored to use custom hooks and sub-components for better modularity.
 */
export const CleaningBoard = ({
  rooms,
  isLoading,
  onRefresh,
}: CleaningBoardProps) => {
  const { t, i18n } = useTranslation();
  const { allUsers } = useUser();

  // State management
  const [selectedRoom, setSelectedRoom] = useState<CleaningRoom | null>(null);
  const [isAddCallOpen, setIsAddCallOpen] = useState(false);
  const [roomForCall, setRoomForCall] = useState<CleaningRoom | null>(null);

  // Use custom hooks for filtering and grouping
  const {
    filteredRooms,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    areaFilter,
    setAreaFilter,
  } = useRoomFilters(rooms);

  const { groupedRooms } = useRoomGrouping(
    filteredRooms,
    i18n.language,
    t("unknown_area"),
  );

  // Event handlers - memoized for performance
  const handleRoomClick = useCallback((room: CleaningRoom) => {
    setSelectedRoom(room);
  }, []);

  const handleStatusChange = useCallback(
    async (roomId: number, status: CleaningStatus) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room && room.cleaningStatus) {
        await updateCleaningTaskStatus(room.cleaningStatus.id, status);
        onRefresh();
        setSelectedRoom((prev) =>
          prev
            ? { ...prev, cleaningStatus: { ...prev.cleaningStatus!, status } }
            : null,
        );
      }
    },
    [rooms, onRefresh],
  );

  const handleAssignUser = useCallback(
    async (roomId: number, userId: number) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room && room.cleaningStatus) {
        await assignWorkerToTask(room.cleaningStatus.id, userId);
        onRefresh();
        setSelectedRoom((prev) =>
          prev
            ? {
                ...prev,
                cleaningStatus: {
                  ...prev.cleaningStatus!,
                  assignedToId: userId,
                },
              }
            : null,
        );
      }
    },
    [rooms, onRefresh],
  );

  const handleCreateCall = useCallback((room: CleaningRoom) => {
    setRoomForCall(room);
    setIsAddCallOpen(true);
  }, []);

  const handleCallCreated = useCallback(() => {
    setIsAddCallOpen(false);
    setRoomForCall(null);
  }, []);

  if (isLoading) {
    return <CleaningBoardSkeleton />;
  }

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Filters Bar */}
      <CleaningFiltersBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        rooms={rooms}
      />

      {/* Grouped Grid Map */}
      <div className="flex-1 space-y-[3px] pb-24 pr-1">
        {groupedRooms.length > 0 ? (
          groupedRooms.map((group) => (
            <RoomGridGroup
              key={group.areaId}
              areaName={group.areaName}
              rooms={group.rooms}
              onRoomClick={handleRoomClick}
            />
          ))
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <p>{t("no_rooms_found")}</p>
          </div>
        )}
      </div>

      {/* Legend - Fixed to bottom */}
      <CleaningLegend />

      {/* Room Details Drawer */}
      <CleaningDetailsDrawer
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        users={allUsers}
        onStatusChange={handleStatusChange}
        onAssignUser={handleAssignUser}
        onCreateCall={handleCreateCall}
      />

      {/* Add Call Dialog */}
      {isAddCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={() => setIsAddCallOpen(false)}
            >
              <Plus className="rotate-45" />
            </Button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {t("create_call_for_room")} {roomForCall?.roomNumber}
              </h2>
              <AddCall
                defaultLocationId={roomForCall?.id}
                onSuccess={handleCallCreated}
                onCancel={() => setIsAddCallOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
