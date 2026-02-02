import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CleaningRoom, CleaningStatus } from "../types";
import { User } from "@/types/api/user";
import { RoomChat } from "@/components/room-card/RoomChat/RoomChat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import {
  MapPin,
  Clock,
  Phone,
  X,
  User as UserIcon,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const getName = (name: any, lang: string) => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lang] || name["en"] || "";
};

interface CleaningDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  room: CleaningRoom | null;
  users: User[];
  onStatusChange: (roomId: number, status: CleaningStatus) => void;
  onAssignUser: (roomId: number, userId: number) => void;
  onCreateCall: (room: CleaningRoom) => void;
}

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
  const isVacant = task.status.startsWith("vacant");
  const occupationStatus = isVacant ? t("vacant") : t("occupied");
  const occupationBadgeColor = isVacant
    ? "bg-green-100 text-green-700 hover:bg-green-100"
    : "bg-red-100 text-red-700 hover:bg-red-100";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] w-[1400px] h-[90vh] p-0 gap-0 overflow-hidden bg-[#F8F9FB] rounded-2xl flex flex-col border-none shadow-2xl">
        {/* 1. Header Section */}
        <div className="bg-[#EFF4FF] px-8 py-5 shrink-0 flex items-center justify-between">
          {/* Room Title & Status (Right Side in RTL) */}
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
              {occupationStatus}
            </Badge>
          </div>

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

        {/* 2. Information Bar */}
        <div className="bg-[#EFF4FF] px-8 pb-8 pt-2 border-b border-white/50 shrink-0 flex items-center justify-between z-10 relative">
          {/* Left Side: Guest Info (Visually Left, End in RTL flow if row-reverse? No, natural flow) 
               We need Metrics on the Right (Start) and Guest on the Left (End).
               So Flex container `justify-between`.
               Item 1: Metrics (Start/Right).
               Item 2: Guest (End/Left).
           */}

          {/* Metrics Group */}
          <div className="flex bg-[#EFF4FF] items-center text-sm gap-0">
            {/* Status */}
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
                {/* Hardcoded 19 June for match or dynamic */}19 {t("june")}
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

          {/* Guest Info Group (Left Side) */}
          <div className="flex items-center gap-8 pl-2">
            <div className="h-10 w-px bg-[#94A3B8]" /> {/* Major Separator */}
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
              {/* Users Icon */}
              <div className="flex -space-x-1">
                <UserIcon className="w-4 h-4 text-[#94A3B8]" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] overflow-hidden">
          {/* Left: Chat (White bg) */}
          <div className="bg-white flex flex-col h-full border-r overflow-hidden relative">
            <RoomChat
              locationId={room.id}
              roomName={getName(room.name, i18n.language)}
              className="h-full border-none shadow-none"
            />
          </div>

          {/* Right: Management (Grayish bg) */}
          <div className="bg-[#F8F9FB] p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Status Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                {t("status_management")}
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">
                  {t("current_status")}
                </label>
                <Select
                  value={task.status}
                  onValueChange={(val) =>
                    onStatusChange(room.id, val as CleaningStatus)
                  }
                >
                  <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-200">
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

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">
                  {t("assigned_staff")}
                </label>
                <Select
                  value={task.assignedToId?.toString() || "unassigned"}
                  onValueChange={(val) =>
                    val !== "unassigned" && onAssignUser(room.id, parseInt(val))
                  }
                >
                  <SelectTrigger className="w-full h-12 bg-slate-50 border-slate-200">
                    <SelectValue placeholder={t("select_cleaner")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">
                      {t("unassigned")}
                    </SelectItem>
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

            {/* Actions Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                {t("quick_actions")}
              </h3>

              <Button
                className="w-full h-12 justify-start gap-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary shadow-none"
                onClick={() => {
                  if (room) {
                    onCreateCall(room);
                    onClose();
                  }
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileText className="w-4 h-4" />
                </div>
                {t("create_room_request")}
              </Button>
            </div>

            {/* Footer Button (Bottom of column) */}
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
