// components/forms/callFields.ts
import { FieldConfig } from "@/components/forms/DynamicForm";
import { CallCategory } from "@/types/api/calls";
import { Location } from "@/types/api/locations";
import { User } from "@/types/api/user";
import { formatOptions } from "@/utils/data-table/formatOptions";
import { TFunction } from "i18next";

export function getCallFields(
  t: TFunction,
  language: "he" | "en" | "ar",
  locations: Location[],
  callCategories: CallCategory[],
  allUsers: User[],
  statusOptions: { label: string; value: string }[]
): FieldConfig[] {
  const formattedLocations = formatOptions(locations, language);
  const formattedCategories = formatOptions(callCategories, language);
  const formattedUsers = formatOptions(allUsers, language);

  // Convert statusMap to an array of options

  return [
    { name: "description", type: "text", label: t("description") },
    {
      name: "locationId",
      type: "autocomplete",
      label: t("location"),
      options: formattedLocations,
    },
    {
      name: "callCategoryId",
      type: "autocomplete",
      label: t("call_category"),
      options: formattedCategories,
    },
    {
      name: "assignedToId",
      label: t("assigned_to"),
      type: "autocomplete",
      options: formattedUsers,
    },
    {
      name: "status",
      label: t("status"),
      type: "autocomplete",
      options: statusOptions, // Use the array of status options
    },
  ];
}
