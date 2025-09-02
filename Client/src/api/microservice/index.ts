import { createApiService } from "../utils/apiFactory";

const VITE_AI_BASE_URL =
  import.meta.env.VITE_AI_BASE_URL || "http://localhost:5000";

const microserviceApi = createApiService<unknown>("/organizations", {
  includeOrgId: true,
  customRoutes: {
    create: (prompt) => ({ url: VITE_AI_BASE_URL + "/log", data: prompt }),
  },
});

export const createLog = microserviceApi.create;

export default microserviceApi;
