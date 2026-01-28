import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { router } from "@/utils/routes/router";
import { Link, RouteObject, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isRouteActive } from "@/utils/routes/routesUtils";
import { matchPath } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/api/user";

export function NavRoutes() {
  return (
    <SidebarGroup className="gap-2 pt-6">
      {router.routes.map((route) => {
        if (!route.handle?.showInSidebar) return null;
        return (
          <div key={route.id}>
            {route.handle?.groupLabel && (
              <SidebarGroupLabel>{route.handle?.groupLabel}</SidebarGroupLabel>
            )}
            <SideBarMenuRoute route={route} />
          </div>
        );
      })}
    </SidebarGroup>
  );
}

function SideBarMenuRoute({ route }: { route: RouteObject }) {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useAuth();

  return (
    <SidebarMenu className="gap-2">
      {route.children?.map((childRoute) => {
        if (!childRoute.handle?.showInSidebar) return null;

        if (
          childRoute.path?.includes("cleaning-management") &&
          !canAccessCleaningModule(user)
        ) {
          return null;
        }

        const routePath = childRoute.path?.startsWith("/")
          ? childRoute.path
          : `/${childRoute.path}`;

        const isActive = !!matchPath(
          { path: routePath, end: true },
          currentPath,
        );

        return (
          <Collapsible
            key={childRoute.id}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {childRoute.children && childRoute.children?.length > 0 && (
                <CollapsibleChildren childRoute={childRoute} />
              )}
              {childRoute.handle?.groupLabel && (
                <SidebarGroupLabel>
                  {childRoute.handle?.groupLabel}
                </SidebarGroupLabel>
              )}
              {!childRoute.children && childRoute.path && (
                <Link to={childRoute.path}>
                  <SidebarMenuButton
                    className={`hover:bg-muted transition-all py-2 px-1 rounded-md ease duration-200 gap-0 text-sidebar-primary-foreground w-60  relative mx-3 ${
                      isActive &&
                      "text-sidebar-accent bg-accent/10  ring-1 hover:bg-accent/20 "
                    } ${isCollapsed && "!max-w-fit"}`}
                    tooltip={t(childRoute.handle.title)}
                  >
                    <span
                      className={`mx-2 ${
                        isActive
                          ? "text-accent fill-accent stroke-white"
                          : "!text-muted-foreground hover:!text-foreground "
                      }`}
                    >
                      {childRoute.handle.icon && (
                        <childRoute.handle.icon isActive={isActive} />
                      )}
                    </span>

                    {/* Animated text */}
                    <AnimatePresence initial={false}>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className={`font-medium  ${
                            isActive ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {t(childRoute.handle.title)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </SidebarMenu>
  );
}

function CollapsibleChildren({ childRoute }: { childRoute: RouteObject }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = isRouteActive(childRoute, currentPath);
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          className={`${isActive && "text-black"}`}
          tooltip={childRoute.handle.title}
        >
          {childRoute.handle.icon && <childRoute.handle.icon />}

          {/* Animated text */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {childRoute.handle.title}
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronRight className="ltr:ml-auto rtl:mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {childRoute.children?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.handle.title}>
              <SidebarMenuSubButton asChild>
                <Link to={subItem.path || "/"}>
                  <span
                    className={
                      isRouteActive(subItem, currentPath, true)
                        ? "text-sidebar-accent"
                        : "ease duration-150"
                    }
                  >
                    {subItem.handle.title}
                  </span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  );
}

const canAccessCleaningModule = (user: User | null) => {
  if (!user) return false;
  // Check based on role permissions
  return user.organizationRoles.some((r) => {
    return r.role?.permissions?.some(
      (p) =>
        p.resource === "cleaning" && p.action === "view" && p.scope !== "none",
    );
  });
};
