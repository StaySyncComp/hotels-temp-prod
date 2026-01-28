import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CleaningRoom, CleaningStatus } from "../types";
import { User } from "@/types/api/user";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  User as UserIcon,
  Phone,
  BedDouble,
  DoorOpen,
  Ban,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: CleaningRoom;
  assignedUser?: User;
  onClick: (room: CleaningRoom) => void;
  onCreateCall: (room: CleaningRoom) => void;
}

const statusColors: Record<CleaningStatus, string> = {
  vacant_clean:
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
  vacant_dirty:
    "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-400",
  occupied_clean:
    "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-400",
  occupied_dirty:
    "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-400",
  do_not_disturb:
    "bg-gray-500/15 border-gray-500/30 text-gray-700 dark:text-gray-400",
};

const statusIcons: Record<CleaningStatus, any> = {
  vacant_clean: CheckCircle2,
  vacant_dirty: AlertCircle,
  occupied_clean: BedDouble,
  occupied_dirty: DoorOpen, // Or any appropriate icon
  do_not_disturb: Ban,
};

export const RoomCard = ({
  room,
  assignedUser,
  onClick,
  onCreateCall,
}: RoomCardProps) => {
  const { t } = useTranslation();
  const task = room.cleaningStatus!;
  const StatusIcon = statusIcons[task.status] || Circle;

  // Determine border color based on status
  const borderColor =
    task.status === "vacant_clean"
      ? "border-l-emerald-500"
      : task.status === "vacant_dirty"
        ? "border-l-red-500"
        : task.status === "occupied_clean"
          ? "border-l-blue-500"
          : task.status === "occupied_dirty"
            ? "border-l-orange-500"
            : "border-l-gray-400"; // DND

  return (
    <Card
      className={cn(
        "cursor-pointer group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 min-h-[160px] flex flex-col justify-between",
        borderColor,
      )}
      onClick={() => onClick(room)}
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

      {/* Footer for Actions */}
      <div className="bg-muted/30 px-4 py-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs gap-1 hover:bg-primary/10 hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onCreateCall(room);
          }}
        >
          <Plus className="w-3 h-3" />
          {t("create_call")}
        </Button>
      </div>
    </Card>
  );
};
