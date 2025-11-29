import { useState, useMemo, useContext, useEffect, UIEvent } from "react";
import type { FieldConfig } from "./DynamicForm";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";

interface IconSelectProps {
  value?: string;
  // react-hook-form style: setValue(name, value, options?)
  setValue?: (name: string, value: string, options?: any) => void;
  field: FieldConfig;
}

interface IconMetaPrepared {
  id: string;
  name: string;
  file: string;
  tags: string[];
  keyword?: string | null;
  url: string;
  searchText: string;
}

const ICON_BASE =
  "https://raw.githubusercontent.com/Hotels-Take-Over/hotels-icons/refs/heads/main/icons/";

const PAGE_SIZE = 50;
const SCROLL_THRESHOLD_PX = 40;

const IconSelect: React.FC<IconSelectProps> = ({ value, setValue, field }) => {
  const { icons: rawIcons } = useContext(OrganizationsContext);

  const [open, setOpen] = useState(false);

  // raw text from input
  const [searchInput, setSearchInput] = useState("");
  // debounced search text (for smoother UX + loading indicator)
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // infinite scroll
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1️⃣ Normalize DB rows from icon_vectors into a frontend-friendly shape
  const preparedIcons: IconMetaPrepared[] = useMemo(() => {
    if (!rawIcons || !Array.isArray(rawIcons)) return [];

    return rawIcons.map((icon: any) => {
      const id: string = icon.id;
      const name: string = icon.icon_name ?? icon.name ?? "";
      const file: string = icon.file;
      const tags: string[] = icon.tags ?? [];
      const keyword: string = icon.keyword ?? "";

      const searchText = [name, keyword, ...tags].join(" ").toLowerCase();

      return {
        id,
        name,
        file,
        tags,
        keyword,
        url: `${ICON_BASE}${file}`,
        searchText,
      };
    });
  }, [rawIcons]);

  const initialLoading = !rawIcons; // crude but usually fine

  // 2️⃣ Debounce the search input
  useEffect(() => {
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setIsSearching(false);
      setVisibleCount(PAGE_SIZE); // reset pagination when search changes
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const normalizedQuery = debouncedSearch.trim().toLowerCase();

  // 3️⃣ Efficient multi-term search over name + keyword + tags
  const filteredIcons = useMemo(() => {
    if (!normalizedQuery) return preparedIcons;
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    if (!tokens.length) return preparedIcons;

    return preparedIcons.filter((icon) =>
      tokens.every((token) => icon.searchText.includes(token))
    );
  }, [preparedIcons, normalizedQuery]);

  // 4️⃣ Apply visibleCount for infinite scroll
  const visibleIcons = useMemo(
    () => filteredIcons.slice(0, visibleCount),
    [filteredIcons, visibleCount]
  );

  // 5️⃣ Currently selected icon by id
  const selectedIcon = useMemo(
    () =>
      value ? preparedIcons.find((icon) => icon.id === value) ?? null : null,
    [value, preparedIcons]
  );

  const handleSelect = (icon: IconMetaPrepared) => {
    setValue?.(field.name, icon.id, { shouldDirty: true });
    setOpen(false);
  };

  // Reset pagination when popover opens
  useEffect(() => {
    if (open) {
      setVisibleCount(PAGE_SIZE);
    }
  }, [open]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    const isNearBottom =
      scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD_PX;

    if (isNearBottom && !isLoadingMore && visibleCount < filteredIcons.length) {
      setIsLoadingMore(true);
      // tiny delay so it feels like loading
      setTimeout(() => {
        setVisibleCount((prev) =>
          Math.min(prev + PAGE_SIZE, filteredIcons.length)
        );
        setIsLoadingMore(false);
      }, 150);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      <p className="text-sm font-medium text-gray-800">
        {field.label ?? "אייקון"}
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* Square trigger */}
          <button
            type="button"
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-xl border bg-white",
              "shadow-sm hover:bg-gray-50 focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
            )}
          >
            {selectedIcon ? (
              <img
                src={selectedIcon.url}
                alt={selectedIcon.name}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <span className="text-[11px] text-gray-400 text-center px-1 leading-tight">
                בחר <span className="block">אייקון</span>
              </span>
            )}

            {/* Little dropdown chevron in the corner */}
            <span className="pointer-events-none absolute bottom-1 right-1 text-[10px] text-gray-400 bg-white/90 rounded-full px-1 shadow-sm">
              ▼
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="start"
          className="w-80 p-3 rtl:text-right"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-700">בחר אייקון</p>
              <p className="text-[11px] text-gray-400">
                חיפוש לפי שם, מילות מפתח ותגיות (עברית / אנגלית)
              </p>
            </div>

            {/* Search */}
            <Input
              type="text"
              placeholder="חפש לפי שם או תגית…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-8 text-xs"
            />

            {/* Initial loading */}
            {initialLoading && (
              <div className="py-4 text-xs text-gray-500 text-center">
                טוען אייקונים…
              </div>
            )}

            {!initialLoading && (
              <>
                {/* Search loading hint */}
                {isSearching && (
                  <div className="text-[11px] text-gray-400 text-center mt-1">
                    מחפש…
                  </div>
                )}

                {/* Scrollable icon grid */}
                <div
                  className="mt-1 max-h-72 overflow-y-auto rounded-md border bg-gray-50/60 p-2"
                  onScroll={handleScroll}
                >
                  <div className="grid grid-cols-5 gap-2">
                    {visibleIcons.length === 0 && !isSearching && (
                      <p className="col-span-full text-xs text-gray-400 text-center py-4">
                        לא נמצאו אייקונים מתאימים
                      </p>
                    )}

                    {visibleIcons.map((icon) => {
                      const isActive = value === icon.id;
                      return (
                        <button
                          key={icon.id}
                          type="button"
                          onClick={() => handleSelect(icon)}
                          className={cn(
                            "relative flex h-12 w-12 items-center justify-center rounded-lg border bg-white transition",
                            "hover:bg-blue-50/80",
                            isActive
                              ? "border-blue-500 ring-1 ring-blue-500"
                              : "border-gray-200"
                          )}
                          title={icon.name}
                        >
                          <img
                            src={icon.url}
                            alt={icon.name}
                            className="w-7 h-7 object-contain"
                            loading="lazy"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* "Loading more" indicator at bottom */}
                  {isLoadingMore && (
                    <div className="py-2 text-[11px] text-gray-400 text-center">
                      טוען עוד אייקונים…
                    </div>
                  )}

                  {/* If we reached the end */}
                  {!isLoadingMore &&
                    !isSearching &&
                    visibleIcons.length > 0 &&
                    visibleIcons.length === filteredIcons.length && (
                      <div className="py-2 text-[10px] text-gray-400 text-center">
                        הגעת לסוף הרשימה
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconSelect;
