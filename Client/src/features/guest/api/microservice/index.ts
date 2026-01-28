import { createApiService } from "@/lib/api-utils/apiFactory";

const microserviceApi = createApiService<unknown>("/ai/request", {
  includeOrgId: true,
});

export const promptAdmin = microserviceApi.create;

export default microserviceApi;
