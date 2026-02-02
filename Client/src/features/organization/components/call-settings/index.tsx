import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "@/components/common/data-table";
import DynamicForm, {
  FieldConfig,
} from "@/components/common/dynamic-form/DynamicForm";
import { OrganizationsContext } from "@/features/organization/context/organization-context";
import { handleImageChange } from "@/lib/formUtils";
import { CallCategory } from "@/types/api/calls";
import { TableAction } from "@/types/ui/data-table-types";
import {
  deleteCallCategory,
  createCallCategory,
  updateCallCategory,
  fetchCallCategoriesParams,
} from "@/features/calls/api/categories";

import i18n from "@/i18n";
import { callSettingsFormSchema } from "@/features/calls/schemas/call-settings-schema";
import { getCallSettingsFields } from "@/features/calls/config/call-settings-fields";
import { getCallSettingsColumns } from "@/features/calls/config/call-settings-columns";

const CallSettingsTable = () => {
  const { t } = useTranslation();
  const { organization, departments, callCategories, icons } =
    useContext(OrganizationsContext);

  const columns = getCallSettingsColumns<CallCategory>(t, i18n, icons);

  const actions: TableAction<CallCategory>[] = [
    { label: t("edit"), type: "edit" },
    { type: "delete", label: t("delete") },
  ];

  const fields = getCallSettingsFields(
    t,
    i18n.language as "he" | "en" | "ar",
    departments,
  );

  const [advancedFilters, setAdvancedFilters] = useState({});

  return (
    <DataTable<CallCategory>
      initialData={callCategories}
      idField="id"
      columns={columns}
      actions={actions}
      searchable
      showAddButton
      isPagination
      defaultPageSize={10}
      fetchData={fetchCallCategoriesParams}
      addData={createCallCategory}
      deleteData={deleteCallCategory}
      updateData={updateCallCategory}
      advancedFilters={advancedFilters}
      setAdvancedFilters={setAdvancedFilters}
      renderExpandedContent={({ handleSave, rowData, handleEdit }) => {
        const mode = rowData?.id ? "edit" : "create";
        return (
          <DynamicForm
            mode={mode}
            headerKey="call_category"
            fields={fields}
            defaultValues={rowData}
            validationSchema={callSettingsFormSchema}
            onSubmit={async (formData) => {
              try {
                const isCreateMode = mode === "create";

                // Ensure logo is a string (icon ID or empty string)
                const logoValue = formData.logo ? String(formData.logo) : "";

                const payload: Partial<CallCategory> = {
                  ...formData,
                  logo: logoValue,
                  organizationId: organization!.id,
                  id: rowData?.id,
                };

                if (isCreateMode && handleSave) {
                  await handleSave(payload);
                } else if (!isCreateMode && handleEdit) {
                  await handleEdit(payload);
                }
              } catch (error: any) {
                console.error("Error submitting call category form:", error);
                // Error will be shown by form validation
              }
            }}
          />
        );
      }}
    />
  );
};

export default CallSettingsTable;
