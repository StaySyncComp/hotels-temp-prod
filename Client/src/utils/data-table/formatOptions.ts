// utils/formatOptions.ts
import { Name } from "@/types/api/common";

export const formatOptions = (
  items: { id: string | number; name: Name | string }[],
  language: "he" | "en" | "ar" = "en",
) => {
  return items.map((item) => ({
    value: String(item.id),
    // @ts-ignore
    label: item.name[language] || item.name.en || item.name,
  }));
};
