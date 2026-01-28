import { useState, useMemo } from "react";
import { RoomCard } from "@/features/cleaning/components/RoomCard";
import { CleaningDetailsDrawer } from "@/features/cleaning/components/CleaningDetailsDrawer";
import { CleaningRoom, CleaningStatus } from "@/features/cleaning/types";
import { useUser } from "@/features/auth/hooks/useUser";
import {
  updateCleaningTaskStatus,
  assignWorkerToTask,
} from "@/features/cleaning/api";
import { User } from "@/types/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import AddCall from "@/features/calls/components/AddCall";

interface CleaningBoardProps {
  rooms: CleaningRoom[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const CleaningBoard = ({
  rooms,
  isLoading,
  onRefresh,
}: CleaningBoardProps) => {
  const { t } = useTranslation();
  const { allUsers } = useUser();
  const [selectedRoom, setSelectedRoom] = useState<CleaningRoom | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CleaningStatus | "all">(
    "all",
  );
  const [isAddCallOpen, setIsAddCallOpen] = useState(false);
  const [roomForCall, setRoomForCall] = useState<CleaningRoom | null>(null);

  // Derived state for filtered rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.roomNumber?.toString().includes(search) ||
        JSON.stringify(room.name).toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || room.cleaningStatus?.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rooms, search, statusFilter]);

  // Handlers
  const handleStatusChange = async (roomId: number, status: CleaningStatus) => {
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
  };

  const handleAssignUser = async (roomId: number, userId: number) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room && room.cleaningStatus) {
      await assignWorkerToTask(room.cleaningStatus.id, userId);
      onRefresh();
      setSelectedRoom((prev) =>
        prev
          ? {
              ...prev,
              cleaningStatus: { ...prev.cleaningStatus!, assignedToId: userId },
            }
          : null,
      );
    }
  };

  const handleCreateCall = (room: CleaningRoom) => {
    setRoomForCall(room);
    setIsAddCallOpen(true);
  };

  const handleCallCreated = () => {
    setIsAddCallOpen(false);
    setRoomForCall(null);
    // Ideally refresh calls or show success, but this board focuses on room status
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/50 p-4 rounded-xl border backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("search_rooms")}
            className="pl-9 bg-background/50 border-muted-foreground/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {(
            [
              "all",
              "vacant_dirty",
              "vacant_clean",
              "occupied_clean",
              "occupied_dirty",
              "do_not_disturb",
            ] as const
          ).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="rounded-full capitalize whitespace-nowrap"
            >
              {status === "all" ? t("all_rooms") : t(status)}
              {status !== "all" && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-[1.25rem] px-1 pointer-events-none bg-background/50 text-foreground"
                >
                  {
                    rooms.filter((r) => r.cleaningStatus?.status === status)
                      .length
                  }
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto pb-20">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            assignedUser={allUsers.find(
              (u: User) => u.id === room.cleaningStatus?.assignedToId,
            )}
            onClick={setSelectedRoom}
            onCreateCall={handleCreateCall}
          />
        ))}

        {filteredRooms.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            <Search className="w-12 h-12 opacity-20" />
            <p>{t("no_rooms_found")}</p>
          </div>
        )}
      </div>

      <CleaningDetailsDrawer
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        users={allUsers}
        onStatusChange={handleStatusChange}
        onAssignUser={handleAssignUser}
      />

      {/* Add Call Dialog/Sheet */}
      {isAddCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Wrapper to control close */}
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
