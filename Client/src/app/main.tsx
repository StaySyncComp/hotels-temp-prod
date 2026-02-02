import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { OrganizationsProvider } from "@/app/providers/OrganizationsProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes/router";
import "@/i18n";
import "@/assets/styles/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrganizationsProvider>
          <RouterProvider router={router} />
        </OrganizationsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

//change
