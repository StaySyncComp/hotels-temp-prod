import { memo } from "react";
import { useTranslation } from "react-i18next";
import { dirtyPattern } from "@/features/cleaning/utils/roomStyles";

/**
 * CleaningLegend Component
 *
 * Status legend fixed to bottom of viewport
 */
export const CleaningLegend = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t pt-4 pb-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#86efac]"></div>
          <span>{t("vacant_clean")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded bg-[#86efac]"
            style={{ backgroundImage: dirtyPattern }}
          ></div>
          <span>{t("vacant_dirty")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gray-200"></div>
          <span>{t("occupied_clean")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded bg-gray-200"
            style={{ backgroundImage: dirtyPattern }}
          ></div>
          <span>{t("occupied_dirty")}</span>
        </div>
      </div>
    </div>
  );
});

CleaningLegend.displayName = "CleaningLegend";
