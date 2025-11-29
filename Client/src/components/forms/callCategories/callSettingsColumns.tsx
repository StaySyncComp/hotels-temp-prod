// components/columns/callColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { i18n, TFunction } from "i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DoorOpen } from "lucide-react";
import { getIconUrl } from "@/lib/iconUtils";
import { ColoredIcon } from "@/components/miscellaneous/Icons/ColoredIcon";
export const getCallSettingsColumns = <T,>(
  t: TFunction,
  i18n: i18n,
  icons: any[]
): ColumnDef<T>[] => [
  {
    accessorKey: "logo",
    header: t("picture"),
    cell: ({ row }) => {
      const icon = icons.find((icon) => icon.id === row.getValue("logo"));

      return (
        <Avatar className="size-10  flex justify-center items-center rounded-none">
          {/* <AvatarImage className="size-7" style={{ color: "red" }}>
            <ColoredIcon file={icon?.file} color="red" />
          </AvatarImage>
          <AvatarFallback className="bg-sidebar-primary text-surface rounded-md">
            <DoorOpen className="size-4" />
          </AvatarFallback> */}
          {icon && (
            <div className="size-10 bg-background border rounded-xl p-1">
              <ColoredIcon
                file={icon.file}
                className="size-2 !text-transparent" // fill = yellow-400
                stroke="#203C87" // stroke = primary
              />
            </div>
          )}
          {!icon && (
            <AvatarFallback className="bg-sidebar-primary text-surface rounded-md">
              <DoorOpen className="size-4" />
            </AvatarFallback>
          )}
        </Avatar>
      );
    },
    size: 100,
  },
  {
    accessorKey: "name",
    header: t("name"),
    cell: ({ row }) => {
      const name = row.getValue("name") as {
        he: string;
        en: string;
        ar: string;
      };
      return <div>{name[i18n.language as "he" | "en" | "ar"] || name.en}</div>;
    },
    size: 100,
  },
];
