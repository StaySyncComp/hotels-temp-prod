import {
  createRecurringCall,
  deleteRecurringCall,
  fetchRecurringCallsParams,
  updateRecurringCall,
} from "@/features/calls/api/recurring";
import { getRecurringCallColumns } from "@/features/calls/config/recurring-call-columns";
import { getRecurringCallFields } from "@/features/calls/config/recurring-call-fields";
import { recurringCallFormSchema } from "@/features/calls/schemas/recurring-call-form-schema";
import DataTable from "@/components/common/data-table";
import { OrganizationsContext } from "@/features/organization/context/organization-context";
import { useLocations } from "@/features/organization/hooks/useLocations";
import { useLocalizedMap } from "@/hooks/useLocalizedMap";
import DynamicForm from "@/components/common/dynamic-form/DynamicForm";
import { RecurringCall } from "@/types/api/calls";
import { TableAction } from "@/types/ui/data-table-types";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { ColumnVisibilityButton } from "@/components/common/table-actions/ColumnVisibilityButton";
import { AdvancedSearchModal } from "@/components/common/advanced-search/AdvancedSearchModal";
import { ExportButtonWrapper } from "@/components/common/table-actions/ExportButtonWrapper";

export default function RecurringCallTable() {
  const { departments, callCategories } = useContext(OrganizationsContext);
  const { locations } = useLocations();
  const { t, i18n } = useTranslation();

  const departmentsMap = useLocalizedMap(departments);
  const categoriesMap = useLocalizedMap(callCategories);
  const locationsMap = useLocalizedMap(locations);
  const columns = getRecurringCallColumns(
    t,
    categoriesMap,
    departmentsMap,
    locationsMap,
  );
  const fields = getRecurringCallFields(
    t,
    i18n.language as "he" | "en" | "ar",
    locations,
    callCategories,
  );
  const actions: TableAction<RecurringCall>[] = [
    { label: "Edit", type: "edit" },
    { type: "delete", label: "Delete" },
  ];
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, any>>(
    {},
  );

  // Advanced search config for Recurring Calls
  const allowedTypes = ["select", "date", "text", "number", "checkbox"];
  const advancedFields = fields
    .filter((f) => allowedTypes.includes(f.type))
    .map((f) => ({
      name: f.name,
      label: f.label,
      type: f.type as "select" | "date" | "text" | "number" | "checkbox",
      options: f.options,
      placeholder: f.label,
    }));

  return (
    <DataTable
      fetchData={fetchRecurringCallsParams}
      addData={createRecurringCall}
      updateData={updateRecurringCall}
      deleteData={deleteRecurringCall}
      idField="id"
      columns={columns}
      actions={actions}
      showAddButton
      advancedFilters={advancedFilters}
      setAdvancedFilters={setAdvancedFilters}
      rightHeaderContent={
        <div className="flex items-center gap-2">
          <ColumnVisibilityButton />
          <ExportButtonWrapper
            columns={columns}
            filename="recurring_calls.csv"
          />
          <AdvancedSearchModal
            fields={advancedFields}
            onApply={setAdvancedFilters}
          />
        </div>
      }
      renderExpandedContent={({ rowData, handleEdit, handleSave }) => {
        const mode = rowData?.id ? "edit" : "create";
        return (
          <DynamicForm
            mode={mode}
            fields={fields}
            validationSchema={recurringCallFormSchema}
            defaultValues={rowData}
            onSubmit={async (data: z.infer<typeof recurringCallFormSchema>) => {
              const department = callCategories.find(
                // @ts-ignore
                (category) => category.id === data.callCategoryId,
              )?.departmentId;
              const payload = {
                ...data,
                departmentId: department,
                id: rowData?.id,
              } as any;
              if (mode === "create" && handleSave) await handleSave(payload);
              else if (mode === "edit" && handleEdit) await handleEdit(payload);
            }}
          />
        );
      }}
    />
  );
}
