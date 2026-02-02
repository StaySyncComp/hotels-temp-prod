import { createApiService } from "@/lib/api-utils/apiFactory";

const iconsApi = createApiService<any>("/icons");

export const fetchIcons = () => iconsApi.fetchAll();
