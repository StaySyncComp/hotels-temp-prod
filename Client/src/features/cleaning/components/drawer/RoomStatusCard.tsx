import { memo } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { CleaningStatus } from "@/features/cleaning/types";
import { User } from "@/types/api/user";

interface RoomStatusCardProps {
  task: {
    status: CleaningStatus;
    assignedToId?: number;
  };
  users: User[];
  onStatusChange: (roomId: number, status: CleaningStatus) => void;
  onAssignUser: (roomId: number, userId: number) => void;
  roomId: number;
}

/**
 * RoomStatusCard Component
 *
 * Status management card with status and staff assignment selects
 */
export const RoomStatusCard = memo<RoomStatusCardProps>(
  ({ task, users, onStatusChange, onAssignUser, roomId }) => {
    const { t } = useTranslation();

    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          {t("status_management")}
        </h3>

        {/* Status Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">
            {t("current_status")}
          </label>
          <Select
            value={task.status}
            onValueChange={(val) =>
              onStatusChange(roomId, val as CleaningStatus)
            }
          >
            <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vacant_dirty">{t("vacant_dirty")}</SelectItem>
              <SelectItem value="vacant_clean">{t("vacant_clean")}</SelectItem>
              <SelectItem value="vacant_inspected">
                {t("vacant_inspected")}
              </SelectItem>
              <SelectItem value="occupied_clean">
                {t("occupied_clean")}
              </SelectItem>
              <SelectItem value="occupied_dirty">
                {t("occupied_dirty")}
              </SelectItem>
              <SelectItem value="do_not_disturb">
                {t("do_not_disturb")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Staff Assignment Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">
            {t("assigned_staff")}
          </label>
          <Select
            value={task.assignedToId?.toString() || "unassigned"}
            onValueChange={(val) =>
              val !== "unassigned" && onAssignUser(roomId, parseInt(val))
            }
          >
            <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-200">
              <SelectValue placeholder={t("select_cleaner")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">{t("unassigned")}</SelectItem>
              {users.map((u) => (
                <SelectItem key={u.id} value={u.id.toString()}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={u.logo || undefined} />
                      <AvatarFallback className="text-[10px]">
                        {u.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {u.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
);

RoomStatusCard.displayName = "RoomStatusCard";
