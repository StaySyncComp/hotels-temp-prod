import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { CleaningRoom, CleaningStatus } from "../types";
import { User } from "@/types/api/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { MapPin, Clock, MessageSquare, Trash2, Camera } from "lucide-react";

interface CleaningDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  room: CleaningRoom | null;
  users: User[];
  onStatusChange: (roomId: number, status: CleaningStatus) => void;
  onAssignUser: (roomId: number, userId: number) => void;
}

export const CleaningDetailsDrawer = ({
  isOpen,
  onClose,
  room,
  users,
  onStatusChange,
  onAssignUser,
}: CleaningDetailsDrawerProps) => {
  const { t } = useTranslation();

  if (!room || !room.cleaningStatus) return null;

  const task = room.cleaningStatus;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto w-full">
        <SheetHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {room.roomNumber}
            </div>
            <div>
              <SheetTitle className="text-2xl">
                {room.name[i18n.language as "en" | "he" | "ar"]}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {t("floor")} 3 • {t("wing")} A
              </SheetDescription>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                {t("status")}
              </label>
              <Select
                value={task.status}
                onValueChange={(val) =>
                  onStatusChange(room.id, val as CleaningStatus)
                }
              >
                <SelectTrigger
                  className={
                    task.status === "vacant_clean"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                      : task.status === "vacant_dirty"
                        ? "bg-red-500/10 border-red-500/20 text-red-700"
                        : task.status === "occupied_clean"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-700"
                          : task.status === "occupied_dirty"
                            ? "bg-orange-500/10 border-orange-500/20 text-orange-700"
                            : task.status === "vacant_inspected"
                              ? "bg-purple-500/10 border-purple-500/20 text-purple-700"
                              : "bg-background"
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant_dirty">
                    {t("vacant_dirty")}
                  </SelectItem>
                  <SelectItem value="vacant_clean">
                    {t("vacant_clean")}
                  </SelectItem>
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                {t("assigned_to")}
              </label>
              <Select
                value={task.assignedToId?.toString() || "unassigned"}
                onValueChange={(val) =>
                  val !== "unassigned" && onAssignUser(room.id, parseInt(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("select_cleaner")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">{t("unassigned")}</SelectItem>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={u.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={u.logo || undefined} />
                          <AvatarFallback className="text-[9px]">
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
        </SheetHeader>

        <Separator />

        <div className="py-6 space-y-6">
          {/* Timeline / History Mock */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {t("recent_activity")}
            </h4>

            {task.history && task.history.length > 0 ? (
              <div className="relative pl-6 space-y-6 before:absolute before:left-[9px] before:top-2 before:h-full before:w-[2px] before:bg-muted">
                {task.history.map((item: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-6 bg-primary h-5 w-5 rounded-full border-4 border-background flex items-center justify-center">
                      <i className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <p className="text-sm font-medium">
                      {item.action}{" "}
                      <span className="text-muted-foreground font-normal">
                        {t("by")} {item.performerName}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground italic py-4">
                {t("no_recent_activity")}
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed"
            >
              <Camera className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-semibold">{t("add_photo")}</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 items-center justify-center border-dashed"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-semibold">{t("add_comment")}</span>
            </Button>
          </div>
        </div>

        <SheetFooter className="absolute bottom-0 left-0 w-full p-6 bg-background border-t">
          <Button className="w-full" size="lg" onClick={onClose}>
            {t("done")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
