import { createApiService } from "../utils/apiFactory";
import { CleaningTask, CleaningStatus } from "@/pages/CleaningManagement/types";
import apiClient from "../apiClient";

// Create a base service for cleaning states
// The endpoint is /cleaning which matches our server route
const cleaningApi = createApiService<CleaningTask>("/cleaning", {});

export const fetchAllCleaningStates = async () => {
    return cleaningApi.fetchAll({}, false);
}

export const getCleaningTaskForLocation = async (locationId: number): Promise<CleaningTask> => {
    // This is a fallback if needed, but we should prefer fetching all.
    // We can filter from all if we have a store, but for direct API usage:
    // We don't have a direct "get by location id" endpoint, only get by state ID.
    // For now, return a placeholder or throw.
    // The frontend page is being refactored to not use this individually.
    return {
      id: 0,
      locationId: locationId,
      status: "dirty",
      priority: "normal",
      history: []
    } as CleaningTask; 
};

export const updateCleaningTaskStatus = async (
  stateId: number, 
  status: CleaningStatus
): Promise<CleaningTask> => {
    // API expects { status: "..." }
    // We pass id to update method
    const res = await cleaningApi.update({ id: stateId, status } as any);
    return res.data as CleaningTask;
};

export const assignWorkerToTask = async (
  stateId: number,
  userId: number
): Promise<CleaningTask> => {
   // PUT /cleaning/:id/assign
   const res = await apiClient.put(`/cleaning/${stateId}/assign`, { userId });
   return res.data;
}

export const initializeMockData = async () => {
    await apiClient.post("/cleaning/init");
}

