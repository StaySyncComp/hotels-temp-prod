import { CleaningStatus } from "../types";

const dirtyPattern =
  "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)";

/**
 * Get CSS styling for room based on cleaning status
 */
export const getStatusStyle = (status?: CleaningStatus) => {
  switch (status) {
    case "vacant_clean":
      return { className: "bg-[#86efac] text-green-950" };
    case "vacant_dirty":
      return {
        className: "bg-[#86efac] text-green-950",
        style: { backgroundImage: dirtyPattern },
      };
    case "occupied_clean":
      return { className: "bg-[#DBDDE3] text-green-950" };
    case "occupied_dirty":
      return {
        className: "bg-[#DBDDE3] text-green-950",
        style: { backgroundImage: dirtyPattern },
      };
    case "vacant_inspected":
      return { className: "bg-[#4ade80] text-green-950" };
    case "do_not_disturb":
      return { className: "bg-red-200 text-red-950" };
    default:
      return { className: "bg-slate-100 text-slate-500" };
  }
};

export { dirtyPattern };
