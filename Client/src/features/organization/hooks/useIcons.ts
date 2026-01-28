import { fetchIcons } from "../api/icons";
import { useQuery } from "@tanstack/react-query";

export function useIcons(enable = true) {
  const iconsQuery = useQuery({
    queryKey: ["icons"],
    queryFn: fetchIcons,
    enabled: enable,
  });

  return {
    icons: iconsQuery.data?.data || [],
    isIconsLoading: iconsQuery.isLoading,
  };
}
