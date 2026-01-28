import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CleaningRoom, CleaningStatus } from "../../types";
import { User } from "@/types/api/user";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  User as UserIcon,
  Brush,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RoomCardProps {
  room: CleaningRoom;
  assignedUser?: User;
  onClick: (room: CleaningRoom) => void;
}

const statusColors: Record<CleaningStatus, string> = {
  clean:
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
  dirty: "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400",
  in_progress:
    "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400",
  inspected:
    "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-400",
  do_not_disturb:
    "bg-gray-500/15 border-gray-500/30 text-gray-700 dark:text-gray-400",
};

const statusIcons: Record<CleaningStatus, any> = {
  clean: CheckCircle2,
  dirty: AlertCircle,
  in_progress: Brush,
  inspected: CheckCircle2,
  do_not_disturb: Circle,
};

export const RoomCard = ({ room, assignedUser, onClick }: RoomCardProps) => {
  const { t } = useTranslation();
  const task = room.cleaningStatus!;
  const StatusIcon = statusIcons[task.status] || Circle;

  return (
    <Card
      onClick={() => onClick(room)}
      className={cn(
        "cursor-pointer group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 min-h-[140px] flex flex-col justify-between",
        task.status === "clean"
          ? "border-l-emerald-500"
          : task.status === "dirty"
            ? "border-l-red-500"
            : task.status === "in_progress"
              ? "border-l-blue-500"
              : task.status === "inspected"
                ? "border-l-purple-500"
                : "border-l-gray-400",
      )}
    >
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {t("room")}
            </span>
            <h3 className="text-2xl font-black font-display text-foreground">
              {room.roomNumber || "?"}
            </h3>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "capitalize gap-1.5 pl-1.5 pr-2.5 py-1",
              statusColors[task.status],
            )}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {t(task.status)}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            {assignedUser ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={assignedUser.logo || undefined} />
                  <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                    {assignedUser.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">
                  {assignedUser.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground/50">
                <div className="h-6 w-6 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <UserIcon className="w-3 h-3" />
                </div>
                <span className="text-xs">{t("unassigned")}</span>
              </div>
            )}
          </div>

          {task.priority === "high" && (
            <span
              className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20"
              title={t("high_priority")}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
