import { fetchLocations } from "@/features/organization/api/locations";
import { MutationResponse } from "@/types/api/auth";
import { Location } from "@/types/api/locations";
import { useQuery } from "@tanstack/react-query";

export function useLocations() {
  const fetchLocationsQuery = useQuery<MutationResponse<Location[]>, Error>({
    queryKey: ["calls"],
    queryFn: fetchLocations,
    retry: false,
  });

  return {
    locations: fetchLocationsQuery.data || [],
    isLocationsLoading: fetchLocationsQuery.isLoading,
    fetchCallsManually: fetchLocationsQuery.refetch,
  };
}
