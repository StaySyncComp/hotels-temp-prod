import { memo } from "react";
import { Phone, Mail, User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CleaningRoom } from "@/features/cleaning/types";

interface RoomMetricsBarProps {
  room: CleaningRoom;
}

/**
 * RoomMetricsBar Component
 *
 * Display room metrics and guest information
 */
export const RoomMetricsBar = memo<RoomMetricsBarProps>(({ room }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#EFF4FF] px-8 pb-8 pt-2 border-b border-white/50 shrink-0 flex items-center justify-between z-10 relative">
      {/* Metrics Group */}
      <div className="flex bg-[#EFF4FF] items-center text-sm gap-0">
        {/* Cleaning Status */}
        <div className="flex flex-col items-center px-6 border-l border-[#CBD5E1]">
          <span className="font-bold text-lg text-[#1E293B] leading-tight">
            {t("clean")}
          </span>
          <span className="text-[#64748B] text-xs font-normal">
            {t("cleaning_status")}
          </span>
        </div>

        {/* Open Requests */}
        <div className="flex flex-col items-center px-6 border-l border-[#CBD5E1]">
          <span className="font-bold text-lg text-[#1E293B] leading-tight">
            1
          </span>
          <span className="text-[#64748B] text-xs font-normal">
            {t("open_requests")}
          </span>
        </div>

        {/* Closed Requests */}
        <div className="flex flex-col items-center px-6 border-l border-[#CBD5E1]">
          <span className="font-bold text-lg text-[#1E293B] leading-tight">
            16
          </span>
          <span className="text-[#64748B] text-xs font-normal">
            {t("closed_requests")}
          </span>
        </div>

        {/* Check In */}
        <div className="flex flex-col items-center px-6 border-l border-[#CBD5E1]">
          <span className="font-bold text-lg text-[#1E293B] leading-tight">
            19 {t("june")}
          </span>
          <span className="text-[#64748B] text-xs font-normal">
            {t("check_in")}
          </span>
        </div>

        {/* Check Out */}
        <div className="flex flex-col items-center px-6">
          <span className="font-bold text-lg text-[#1E293B] leading-tight">
            24 {t("june")}
          </span>
          <span className="text-[#64748B] text-xs font-normal">
            {t("check_out")}
          </span>
        </div>
      </div>

      {/* Guest Info Group */}
      <div className="flex items-center gap-8 pl-2">
        <div className="h-10 w-px bg-[#94A3B8]" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-xs text-[#64748B] font-medium">
              {t("occupied_by")}
            </span>
            <span className="block font-bold text-[#1E293B] text-base">
              ישראל ישראלי
            </span>
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#94A3B8] shadow-sm">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
          <span>052-5381648</span>
          <Phone className="w-4 h-4 text-[#94A3B8]" />
        </div>
        <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
          <span>israel@example.com</span>
          <Mail className="w-4 h-4 text-[#94A3B8]" />
        </div>
        <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
          <span>2</span>
          <div className="flex -space-x-1">
            <UserIcon className="w-4 h-4 text-[#94A3B8]" />
          </div>
        </div>
      </div>
    </div>
  );
});

RoomMetricsBar.displayName = "RoomMetricsBar";
