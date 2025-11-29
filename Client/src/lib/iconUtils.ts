// src/lib/icon-utils.ts

const ICON_BASE =
  "https://raw.githubusercontent.com/Hotels-Take-Over/hotels-icons/refs/heads/main/icons/";

export function getIconUrl(file: string | null | undefined): string {
  if (!file) return "";
  return `${ICON_BASE}${file}`;
}
