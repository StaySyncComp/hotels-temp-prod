import { motion, AnimatePresence } from "framer-motion";

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRtl";
import { ChevronRight } from "lucide-react";

export function SidebarFooter() {
  const { t } = useTranslation("sidebar");
  const { isRtl } = useRTL();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarFooterComponent className="flex justify-center items-center text-muted-foreground">
      <div className="border-t p-2 w-4/5">
        <SidebarTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md py-1.5 text-sm hover:bg-muted justify-start"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="shrink-0"
            >
              <ChevronRight
                size={18}
                className={`group-hover:scale-110 transition-transform ${
                  !isRtl && "rotate-180"
                }`}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  key="sidebar-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden "
                >
                  {t("collapse")}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </SidebarTrigger>
      </div>
    </SidebarFooterComponent>
  );
}
