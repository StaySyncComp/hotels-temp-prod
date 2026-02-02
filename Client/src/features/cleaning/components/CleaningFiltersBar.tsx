import { memo, useMemo } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { Combobox } from "@/components/common/data-table/Combobox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRtl";
import { CleaningStatus, CleaningRoom } from "@/features/cleaning/types";
import { Area } from "@/types/api/areas.type";

interface CleaningFiltersBarProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: CleaningStatus | "all";
  setStatusFilter: (value: CleaningStatus | "all") => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
  rooms: CleaningRoom[];
}

/**
 * CleaningFiltersBar Component
 *
 * Search and status filter controls for the cleaning board
 */
export const CleaningFiltersBar = memo<CleaningFiltersBarProps>(
  ({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    areaFilter,
    setAreaFilter,
    rooms,
  }) => {
    const { t } = useTranslation();
    const { getNameByLanguage } = useRTL();

    const statusButtons = [
      "all",
      "vacant_dirty",
      "vacant_clean",
      "occupied_clean",
      "occupied_dirty",
    ] as const;

    // Extract unique areas from rooms
    const areaOptions = useMemo(() => {
      const uniqueAreas = new Map<number, Area>();
      rooms.forEach((room) => {
        if (room.area && room.area.id) {
          uniqueAreas.set(room.area.id, room.area);
        }
      });
      return Array.from(uniqueAreas.values())
        .map((area) => ({
          value: area.id.toString(),
          label: getNameByLanguage(area.name),
        }))
        .sort((a, b) => {
          // Extract numbers from strings like "Floor 1" or "קומה 1"
          const numA = parseInt(a.label.replace(/\D/g, "")) || 0;
          const numB = parseInt(b.label.replace(/\D/g, "")) || 0;
          return numA - numB;
        });
    }, [rooms, getNameByLanguage]);

    return (
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white py-3 px-4 rounded-full border backdrop-blur-sm shrink-0">
        <div className="flex gap-2 w-full md:w-auto">
          <SearchInput
            width="w-full md:w-80"
            placeholder={t("search_rooms")}
            className="bg-white border-muted-foreground/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Combobox
            options={areaOptions}
            value={areaFilter}
            onChange={(value) => setAreaFilter(value as string)}
            placeholder={t("all_areas") || "All Areas"}
            searchPlaceholder={t("search_areas") || "Search areas..."}
            className="w-full  md:w-10 rounded-full p-0!"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {statusButtons.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="rounded-full capitalize whitespace-nowrap"
            >
              {status === "all" ? t("all_rooms") : t(status)}
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-[1.25rem] px-1 pointer-events-none bg-background/50 text-foreground"
              >
                {status === "all"
                  ? rooms.length
                  : rooms.filter((r) => r.cleaningStatus?.status === status)
                      .length}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    );
  },
);

CleaningFiltersBar.displayName = "CleaningFiltersBar";
