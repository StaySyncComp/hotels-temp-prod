import { memo } from "react";
import { AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { CleaningRoom } from "@/features/cleaning/types";

interface RoomActionsCardProps {
  room: CleaningRoom;
  onCreateCall: (room: CleaningRoom) => void;
  onClose: () => void;
}

/**
 * RoomActionsCard Component
 *
 * Quick actions card for room operations
 */
export const RoomActionsCard = memo<RoomActionsCardProps>(
  ({ room, onCreateCall, onClose }) => {
    const { t } = useTranslation();

    const handleCreateCall = () => {
      onCreateCall(room);
      onClose();
    };

    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          {t("quick_actions")}
        </h3>

        <Button
          className="w-full h-12 justify-start gap-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary shadow-none"
          onClick={handleCreateCall}
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-4 h-4" />
          </div>
          {t("create_room_request")}
        </Button>
      </div>
    );
  },
);

RoomActionsCard.displayName = "RoomActionsCard";
