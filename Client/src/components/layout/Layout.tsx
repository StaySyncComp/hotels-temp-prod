import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { OrganizationsContext } from "@/features/organization/context/organization-context";
import { useRoutes } from "@/hooks/useRoutes";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRtl";
import { AppSidebar } from "./sidebar/Sidebar";
import Navigation from "./topbar/Navigation";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRtl } = useRTL();
  const { organization } = useContext(OrganizationsContext);
  const { currentRoute } = useRoutes();
  const { t } = useTranslation();
  const title = `${organization?.name} - ${t(
    // @ts-ignore
    currentRoute?.handle.documentTitle,
  )}`;
  return (
    <>
      <Helmet>
        <title>{organization && title}</title>
      </Helmet>
      <div className="flex h-screen flex-col relative">
        {/* <Topbar /> */}

        <SidebarProvider>
          <AppSidebar side={isRtl ? "right" : "left"} />

          <SidebarInset>
            <Navigation />

            <div className="flex flex-col gap-4 flex-1 overflow-auto">
              <div className="w-full overflow-y-auto p-2 min-h-full ">
                {children}
              </div>
              {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
};
