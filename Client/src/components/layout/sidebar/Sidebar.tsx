import * as React from "react";
import { NavRoutes } from "@/components/layout/sidebar/NavRoutes";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { OrganizationsContext } from "@/features/organization/context/organization-context";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isOrganizationFetching } = React.useContext(OrganizationsContext);
  const loading = isOrganizationFetching;

  return (
    <Sidebar className="bg-primary" collapsible="icon" {...props}>
      <SidebarTrigger className=" hover:bg-sidebar-accent/85 hover:text-surface bg-sidebar-accent absolute duration-150 ease-in-out top-14 rtl:-left-[10px] ltr:-right-[10px] text-surface rounded-full z-50" />
      <SidebarHeader />
      <SidebarContent>{!loading && <NavRoutes />}</SidebarContent>
      <SidebarRail />
      <SidebarFooter />
    </Sidebar>
  );
}
