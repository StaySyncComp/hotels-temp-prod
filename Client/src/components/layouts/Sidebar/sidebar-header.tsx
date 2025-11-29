import { AnimatePresence, motion } from "framer-motion";
import {
  SidebarHeader as SidebarHeaderComponent,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/assets/fullLogo.svg"; // full logo
import LogoCompact from "@/assets/logo.svg";
export function SidebarHeader() {
  const { state } = useSidebar(); // "expanded" | "collapsed" | "mobile"
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeaderComponent className="flex justify-center py-2 items-center h-16">
      <div className=" w-4/5 flex items-center h-12 flex-col justify-center border-b">
        {/* Wrapper to keep layout from jumping */}
        <div className="relative w-full flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isCollapsed ? (
              <motion.img
                key="logo-compact"
                src={LogoCompact}
                alt="Logo"
                className="object-contain w-7 h-7"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              />
            ) : (
              <motion.img
                key="logo-full"
                src={Logo}
                alt="Logo"
                className="w-3/5 pb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </SidebarHeaderComponent>
  );
}
