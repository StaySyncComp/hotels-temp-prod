import { memo } from "react";
import { CleaningRoom } from "@/features/cleaning/types";
import { RoomGridButton } from "./RoomGridButton";
import { getStatusStyle } from "@/features/cleaning/utils/roomStyles";

interface RoomGridGroupProps {
  areaName: string;
  rooms: CleaningRoom[];
  onRoomClick: (room: CleaningRoom) => void;
}

/**
 * RoomGridGroup Component
 *
 * Display a single area/floor with its rooms
 */
export const RoomGridGroup = memo<RoomGridGroupProps>(
  ({ areaName, rooms, onRoomClick }) => {
    return (
      <div className="flex flex-row items-start gap-4">
        {/* Floor Label */}
        <div className="w-20 shrink-0 pt-3 truncate text-right text-sm text-foreground">
          {areaName}
        </div>

        {/* Rooms Grid */}
        <div className="flex flex-wrap gap-[3px] items-center flex-1">
          {rooms.map((room) => {
            const { className, style } = getStatusStyle(
              room.cleaningStatus?.status,
            );
            return (
              <RoomGridButton
                key={room.id}
                room={room}
                onClick={onRoomClick}
                className={className}
                style={style}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

RoomGridGroup.displayName = "RoomGridGroup";
