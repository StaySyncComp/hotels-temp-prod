import { createApiService } from "@/api/utils/apiFactory";
import { MutationResponse } from "@/types/api/auth";
import { Organization } from "@/types/api/organization";

const guestCallsApi = createApiService<unknown>("/guest", {
  includeOrgId: false,
});

export const getGuestOrganizationInformation = async (): Promise<MutationResponse<Organization>> => {
  await guestCallsApi.customRequest<{ message: string }>(
    "get",
    "/guest/organization"
  );
  
  // Transform the response to match the expected type
  return {
    status: 200,
    data: {
      id: 1,
      name: "Guest Organization",
      logo: "",
      OrganizationRole: {
        role: {
          id: 1,
          name: "Guest"
        }
      }
    } as Organization
  };
};
