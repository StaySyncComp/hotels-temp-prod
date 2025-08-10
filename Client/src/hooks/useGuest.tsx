import { getGuestOrganizationInformation } from "@/api/guestCalls";
import { MutationResponse } from "@/types/api/auth";
import { Organization } from "@/types/api/organization";
import { useQuery } from "@tanstack/react-query";

export function useGuest() {
  const organizationQuery = useQuery<MutationResponse<Organization>>({
    queryKey: ["guest-organization"],
    // @ts-ignore
    queryFn: getGuestOrganizationInformation,
    retry: false,
  });

  return {
    // @ts-ignore
    organization: organizationQuery.data?.data || {},
    isOrganizationLoading: organizationQuery.isLoading,
  };
}
