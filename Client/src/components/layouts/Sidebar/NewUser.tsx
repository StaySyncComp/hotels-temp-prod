import { ChevronsUpDown, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";
import { Link } from "react-router-dom";

export function NavUser() {
  const { t } = useTranslation();
  const { user, isUserLoading, logout } = useContext(AuthContext);
  const { isOrganizationFetching } = useContext(OrganizationsContext);
  const { isMobile } = useSidebar();

  if (isUserLoading || !user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="text-right" disabled>
            <div className="flex aspect-square size-8 items-center justify-center rounded-full">
              <Skeleton className="w-8 h-8" />
            </div>
            <div className="grid flex-1 ltr:text-left rtl:text-right text-sm leading-tight">
              <Skeleton className="w-1/2 h-2" />
              <Skeleton className="w-1/4 h-2 mt-2" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isOrganizationFetching}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-muted data-[state=open]:text-sidebar-accent-foreground text-sidebar-primary"
            >
              <Avatar className="h-8 w-8 rounded-lg mx-3">
                <AvatarImage alt={user.name} src={user.logo} />
                <AvatarFallback className="rounded-lg">
                  <AvatarFallback className="rounded-lg bg-sidebar-accent text-surface">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight rtl:text-right">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sidebar-primary text-sm rtl:flex-row-reverse ">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-sidebar-accent text-surface">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight rtl:text-right">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link to={"/settings"}>
                <DropdownMenuItem>
                  <Settings />
                  {t("settings")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
