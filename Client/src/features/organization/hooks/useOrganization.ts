import { useOrganizationCore } from "./useOrganizationCore";
import { useDepartments } from "./useDepartments";
import { useCallCategories } from "./useCallCategories";
import { useAreas } from "./useAreas";
import { useRoles } from "./useRoles";
import { useIcons } from "./useIcons";

/**
 * Main hook that composes all organization-related functionality
 * This provides a unified API for organization, departments, and call categories
 */
export function useOrganization() {
  const organizationCore = useOrganizationCore();
  const organizationLoaded = !!organizationCore?.organization?.id;

  const departments = useDepartments(organizationLoaded);
  const callCategories = useCallCategories(organizationLoaded);
  const areas = useAreas(organizationLoaded);
  const roles = useRoles(organizationLoaded);
  const icons = useIcons(organizationLoaded);

  return {
    ...organizationCore,

    ...departments,

    ...callCategories,

    ...areas,

    ...roles,

    ...icons,
  };
}
