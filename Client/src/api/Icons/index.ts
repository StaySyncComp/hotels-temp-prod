import { createApiService } from "../utils/apiFactory";
import { AIContext } from "@/types/api/ai.types";

const IconsApi = createApiService<AIContext>("/icons", {
  includeOrgId: true,
});

export const fetchIcons = async () => IconsApi.fetchAll();
