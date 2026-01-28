import { Location } from "@/types/api/locations";
import { User } from "@/types/api/user";

export type CleaningStatus = "vacant_dirty" | "vacant_clean" | "occupied_clean" | "occupied_dirty" | "do_not_disturb";

export interface CleaningTask {
  id: number;
  locationId: number;
  status: CleaningStatus;
  assignedToId?: number;
  lastCleanedAt?: string;
  notes?: string;
  priority: "low" | "normal" | "high";
  photos?: string[];
  history: {
      action: string;
      timestamp: string;
      performerName?: string;
  }[];
}

// Extended Location type with cleaning data
export interface CleaningRoom extends Location {
  cleaningStatus?: CleaningTask;
}
