import { ChevronRight, Plus } from "lucide-react";
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

export function NavRoutes() {
  return (
    <SidebarGroup className="gap-4">
      <NewCallButton />
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
  const { state, isMobile } = useSidebar();

  return (
    <SidebarMenu className="gap-5">
      {route.children?.map((childRoute) => {
        if (!childRoute.handle?.showInSidebar) return null;

        const routePath = childRoute.path?.startsWith("/")
          ? childRoute.path
          : `/${childRoute.path}`;

        const isActive = !!matchPath(
          { path: routePath, end: true },
          currentPath
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
                    className={`ease duration-150 text-sidebar-primary-foreground rounded-none px-2 relative ${
                      isActive && "text-sidebar-accent"
                    }`}
                    tooltip={t(childRoute.handle.title)}
                  >
                    {isActive && (
                      <div className="absolute h-full rtl:left-0 ltr:right-0 w-1 rtl:rounded-tr-md ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-br-md bg-sidebar-accent" />
                    )}
                    <span
                      className={`mx-4 bg-black${
                        isActive
                          ? "!text-sidebar-accent"
                          : "!text-sidebar-primary-foreground"
                      }`}
                      style={{ color: isActive ? "var(--accent)" : "black" }}
                    >
                      {childRoute.handle.icon && (
                        <childRoute.handle.icon isActive={isActive} />
                      )}
                    </span>

                    <span
                      className={`transition-colors font-semibold ${
                        state === "collapsed" && !isMobile ? "hidden" : ""
                      } ${isActive ? "text-accent" : "text-foreground"}`}
                    >
                      {t(childRoute.handle.title)}
                    </span>
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

  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          className={`${isActive && "text-black"}`}
          tooltip={childRoute.handle.title}
        >
          {childRoute.handle.icon && <childRoute.handle.icon />}
          <span>{childRoute.handle.title}</span>
          <ChevronRight className="ltr:ml-auto rtl:mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
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

function NewCallButton() {
  const { t } = useTranslation();
  const { state, isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="m-[2.5px] mt-5">
        <Link to="/calls/add">
          <SidebarMenuButton className="text-sidebar-primary-foreground active:bg-none group">
            <span className="flex items-center gap-2 font-bold whitespace-nowrap">
              <div className="rounded-full bg-sidebar-accent p-2 mx-1">
                <Plus className="text-surface rounded-full w-5 h-5" />
              </div>
              <span
                className={`${
                  state === "collapsed" && !isMobile ? "hidden" : ""
                } transition-colors text-accent`}
              >
                {t("add_x", { x: t("call") })}
              </span>
            </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
