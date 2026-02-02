/**
 * Get localized name from multi-language object or string
 */
export const getName = (name: any, lang: string): string => {
  if (!name) return "";
  if (typeof name === "string") return name;
  return name[lang] || name["en"] || "";
};

/**
 * Sort rooms by room number
 */
export const sortRoomsByNumber = <T extends { roomNumber?: number | null }>(
  rooms: T[],
): T[] => {
  return [...rooms].sort((a, b) => (a.roomNumber || 0) - (b.roomNumber || 0));
};

/**
 * Extract number from area name for sorting (e.g., "Floor 1" -> 1)
 */
export const extractNumberFromAreaName = (areaName: string): number => {
  return parseInt(areaName.replace(/\D/g, "")) || 0;
};
