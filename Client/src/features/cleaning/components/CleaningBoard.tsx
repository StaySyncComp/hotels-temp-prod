import { useState, useMemo } from "react";
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

const getName = (name: any, lang: string) => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lang] || name["en"] || "";
};

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
  const { t, i18n } = useTranslation();
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

  // Group rooms by Area (Floor)
  const groupedRooms = useMemo(() => {
    const groups: Record<
      number,
      { areaName: string; areaId: number; rooms: CleaningRoom[] }
    > = {};

    // Sort rooms by room number first for display order
    const sortedRooms = [...filteredRooms].sort(
      (a, b) => (a.roomNumber || 0) - (b.roomNumber || 0),
    );

    sortedRooms.forEach((room) => {
      const areaId = room.area?.id || 0;
      if (!groups[areaId]) {
        groups[areaId] = {
          areaId,
          areaName: room.area
            ? getName(room.area.name, i18n.language)
            : t("unknown_area"),
          rooms: [],
        };
      }
      groups[areaId].rooms.push(room);
    });

    // Sort groups by area name, extracting number if possible
    return Object.values(groups).sort((a, b) => {
      // Extract numbers from strings like "Floor 1" or "קומה 1"
      const numA = parseInt(a.areaName.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.areaName.replace(/\D/g, "")) || 0;

      if (numA !== numB) {
        return numA - numB;
      }

      // Fallback to ID if no numbers found
      return a.areaId - b.areaId;
    });
  }, [filteredRooms, i18n.language, t]);

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
  };

  const getStatusStyle = (status?: CleaningStatus) => {
    const dirtyPattern =
      "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)";

    switch (status) {
      case "vacant_clean":
        return { className: "bg-[#86efac] text-green-950" }; // Light Green
      case "vacant_dirty":
        return {
          className: "bg-[#86efac] text-green-950",
          style: { backgroundImage: dirtyPattern },
        };
      case "occupied_clean":
        return { className: "bg-gray-200 text-gray-900" }; // Light Gray
      case "occupied_dirty":
        return {
          className: "bg-gray-200 text-gray-900",
          style: { backgroundImage: dirtyPattern },
        };
      case "vacant_inspected":
        return { className: "bg-[#4ade80] text-green-950" }; // Stronger Green?
      case "do_not_disturb":
        return { className: "bg-red-200 text-red-950" };
      default:
        return { className: "bg-slate-100 text-slate-500" }; // Unknown
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/50 p-4 rounded-xl border backdrop-blur-sm shrink-0">
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

      {/* Grouped Grid Map */}
      <div className="flex-1 space-y-6 pb-24 pr-1">
        {groupedRooms.length > 0 ? (
          groupedRooms.map((group) => (
            <div key={group.areaId} className="flex flex-row items-start gap-4">
              {/* Floor Label */}
              <div className="w-24 shrink-0 pt-3 text-right font-bold text-muted-foreground">
                {group.areaName}
              </div>

              {/* Rooms Grid */}
              <div className="flex flex-wrap gap-2 items-center flex-1">
                {group.rooms.map((room) => {
                  const { className, style } = getStatusStyle(
                    room.cleaningStatus?.status,
                  );
                  return (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`w-12 h-12 flex items-center justify-center rounded shadow-sm text-sm font-medium transition-transform hover:scale-105 hover:shadow-md ${className}`}
                      style={style}
                    >
                      {room.roomNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <Search className="w-12 h-12 opacity-20 mx-auto mb-2" />
            <p>{t("no_rooms_found")}</p>
          </div>
        )}
      </div>

      {/* Legend - Fixed to bottom of viewport */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t pt-4 pb-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#86efac]"></div>
            <span>{t("vacant_clean")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded bg-[#86efac]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)",
              }}
            ></div>
            <span>{t("vacant_dirty")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-200"></div>
            <span>{t("occupied_clean")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded bg-gray-200"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)",
              }}
            ></div>
            <span>{t("occupied_dirty")}</span>
          </div>
        </div>
      </div>

      <CleaningDetailsDrawer
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        users={allUsers}
        onStatusChange={handleStatusChange}
        onAssignUser={handleAssignUser}
        onCreateCall={handleCreateCall}
      />

      {/* Add Call Dialog/Sheet */}
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
