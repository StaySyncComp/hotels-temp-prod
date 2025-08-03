// utils/formatOptions.ts
import { Name } from "@/types/api/common";

export const formatOptions = (
  items: { id: string | number; name: Name | string }[],
  language: "he" | "en" | "ar" = "en"
) => {
  return items.map((item) => ({
    value: item.id,
    label: typeof item.name === 'string' 
      ? item.name 
      : (item.name as Name)[language] || (item.name as Name).en,
  }));
};
