import { memo } from "react";
import { CleaningRoom } from "@/features/cleaning/types";

interface RoomGridButtonProps {
  room: CleaningRoom;
  onClick: (room: CleaningRoom) => void;
  className: string;
  style?: React.CSSProperties;
}

/**
 * RoomGridButton Component
 *
 * Individual room button with status styling
 */
export const RoomGridButton = memo<RoomGridButtonProps>(
  ({ room, onClick, className, style }) => {
    return (
      <button
        onClick={() => onClick(room)}
        className={`size-14 flex items-center justify-center rounded shadow-sm text-sm font-medium transition-transform hover:scale-105 hover:shadow-md ${className}`}
        style={style}
      >
        {room.roomNumber}
      </button>
    );
  },
  // Custom comparison to prevent unnecessary re-renders
  (prevProps, nextProps) => {
    return (
      prevProps.room.id === nextProps.room.id &&
      prevProps.room.cleaningStatus?.status ===
        nextProps.room.cleaningStatus?.status &&
      prevProps.className === nextProps.className
    );
  },
);

RoomGridButton.displayName = "RoomGridButton";
