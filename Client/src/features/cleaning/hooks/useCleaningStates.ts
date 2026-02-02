import { useState, useEffect } from "react";
import {
  fetchAllCleaningStates,
  initializeMockData,
} from "@/features/cleaning/api";

/**
 * Custom hook to manage cleaning states data fetching
 */
export const useCleaningStates = () => {
  const [cleaningStates, setCleaningStates] = useState<any[]>([]);
  const [isStatesLoading, setIsStatesLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStates = async () => {
    setIsStatesLoading(true);
    setError(null);
    try {
      const statesResponse = await fetchAllCleaningStates();
      let states = (statesResponse as any).data || [];

      // If no states exist, initialize mock data and fetch again
      if (Array.isArray(states) && states.length === 0) {
        await initializeMockData();
        const newStatesRes = await fetchAllCleaningStates();
        states = (newStatesRes as any).data || [];
      }

      setCleaningStates(states);
    } catch (err) {
      console.error("Failed to load cleaning states", err);
      setError(err as Error);
    } finally {
      setIsStatesLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return {
    cleaningStates,
    isStatesLoading,
    fetchStates,
    error,
  };
};
