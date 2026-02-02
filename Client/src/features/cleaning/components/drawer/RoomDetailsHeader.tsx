import { memo } from "react";
import { X } from "lucide-react";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { CleaningRoom } from "@/features/cleaning/types";
import { getName } from "@/features/cleaning/utils/roomHelpers";
import { cn } from "@/lib/utils";

interface RoomDetailsHeaderProps {
  room: CleaningRoom;
  onClose: () => void;
}

/**
 * RoomDetailsHeader Component
 *
 * Dialog header with room information and close button
 */
export const RoomDetailsHeader = memo<RoomDetailsHeaderProps>(
  ({ room, onClose }) => {
    const { t } = useTranslation();
    const task = room.cleaningStatus;
    const isVacant = task?.status.startsWith("vacant");

    return (
      <div className="bg-[#EFF4FF] px-8 py-5 shrink-0 flex items-center justify-between">
        {/* Room Title & Status */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <DialogTitle className="text-3xl font-black text-[#1E293B] tracking-tight leading-none">
              {getName(room.name, i18n.language)}
            </DialogTitle>
            <div className="text-sm text-[#64748B] font-medium flex items-center gap-2 justify-end mt-1.5">
              <span>
                {t("floor")} {getName(room.area?.name, i18n.language)}
              </span>
              <span className="text-[#CBD5E1]">|</span>
              <span>
                {t("room")} {room.roomNumber}
              </span>
            </div>
          </div>
          <Badge
            variant="default"
            className={cn(
              "px-3 py-1 text-sm font-bold shadow-none rounded-full border-none",
              isVacant
                ? "bg-[#D1FAE5] text-[#065F46] hover:bg-[#D1FAE5]"
                : "bg-[#FF8A8A] text-white hover:bg-[#FF8A8A]",
            )}
          >
            {isVacant ? t("vacant") : t("occupied")}
          </Badge>
        </div>

        {/* Close Button */}
        <div className="flex items-center gap-4">
          <DialogClose asChild onClick={onClose}>
            <Button
              variant="ghost"
              className="gap-2 text-slate-500 hover:bg-white/50 hover:text-slate-900 border-none font-medium h-9 px-2"
            >
              <X className="w-5 h-5" />
              <span className="text-base">{t("close")}</span>
            </Button>
          </DialogClose>
        </div>
      </div>
    );
  },
);

RoomDetailsHeader.displayName = "RoomDetailsHeader";
