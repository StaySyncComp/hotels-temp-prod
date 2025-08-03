import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/Providers/AuthProvider";
import { OrganizationsProvider } from "./Providers/OrganizationsProvider";
import Router from "@/Router";
import "@/i18n";
import "@/assets/styles/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrganizationsProvider>
          <Router />
        </OrganizationsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
