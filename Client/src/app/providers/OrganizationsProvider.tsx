import React, { ReactNode } from "react";
import { OrganizationsContext } from "@/features/organization/context/organization-context"; // Adjust the import path as needed
import { useOrganization } from "@/features/organization/hooks/useOrganization";

export const OrganizationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const organization = useOrganization();

  return (
    <OrganizationsContext.Provider value={organization}>
      {children}
    </OrganizationsContext.Provider>
  );
};
