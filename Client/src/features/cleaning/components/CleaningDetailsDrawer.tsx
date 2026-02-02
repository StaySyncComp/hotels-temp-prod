import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CleaningRoom, CleaningStatus } from "../types";
import { User } from "@/types/api/user";
import { RoomChat } from "@/components/room-card/RoomChat/RoomChat";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { RoomDetailsHeader } from "./drawer/RoomDetailsHeader";
import { RoomMetricsBar } from "./drawer/RoomMetricsBar";
import { RoomStatusCard } from "./drawer/RoomStatusCard";
import { RoomActionsCard } from "./drawer/RoomActionsCard";
import { getName } from "@/features/cleaning/utils/roomHelpers";

interface CleaningDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  room: CleaningRoom | null;
  users: User[];
  onStatusChange: (roomId: number, status: CleaningStatus) => void;
  onAssignUser: (roomId: number, userId: number) => void;
  onCreateCall: (room: CleaningRoom) => void;
}

/**
 * CleaningDetailsDrawer Component
 *
 * Modal drawer for viewing and managing room cleaning details.
 * Refactored to use sub-components for better modularity.
 */
export const CleaningDetailsDrawer = ({
  isOpen,
  onClose,
  room,
  users,
  onStatusChange,
  onAssignUser,
  onCreateCall,
}: CleaningDetailsDrawerProps) => {
  const { t } = useTranslation();

  if (!room || !room.cleaningStatus) return null;

  const task = room.cleaningStatus;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] w-[1400px] h-[90vh] p-0 gap-0 overflow-hidden bg-[#F8F9FB] rounded-2xl flex flex-col border-none shadow-2xl">
        {/* Header Section */}
        <RoomDetailsHeader room={room} onClose={onClose} />

        {/* Information Bar */}
        <RoomMetricsBar room={room} />

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] overflow-hidden">
          {/* Left: Chat */}
          <div className="bg-white flex flex-col h-full border-r overflow-hidden relative">
            <RoomChat
              locationId={room.id}
              roomName={getName(room.name, i18n.language)}
              className="h-full border-none shadow-none"
            />
          </div>

          {/* Right: Management */}
          <div className="bg-[#F8F9FB] p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Status Card */}
            <RoomStatusCard
              task={task}
              users={users}
              onStatusChange={onStatusChange}
              onAssignUser={onAssignUser}
              roomId={room.id}
            />

            {/* Actions Card */}
            <RoomActionsCard
              room={room}
              onCreateCall={onCreateCall}
              onClose={onClose}
            />

            {/* Footer Button */}
            <div className="mt-auto">
              <Button
                className="w-full h-12 text-lg font-bold shadow-lg shadow-blue-500/20"
                onClick={onClose}
              >
                {t("done")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
