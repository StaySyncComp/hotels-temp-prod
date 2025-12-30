import type { Role } from "@/types/api/roles";
import { TableAction } from "@/types/ui/data-table-types";
import { Row } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import DynamicForm, {
  FieldConfig,
} from "../../../components/forms/DynamicForm/DynamicForm";
import { z } from "zod";
import DataTable from "@/components/ui/completed/data-table";
import { fetchRolesParams } from "@/api/roles/index";
import { useContext, useState } from "react";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";
import { getRolesColumns } from "@/components/forms/roles/rolesColumns";
import TableHeaderActions from "@/components/table-actions/TableHeaderActions";

interface Props {
  setSearchParams: (
    params: URLSearchParams,
    options?: { replace?: boolean }
  ) => void;
}
function RoleList({ setSearchParams }: Props) {
  const { t, i18n } = useTranslation();
  const { roles, createNewRole, updateRole, deleteRole } =
    useContext(OrganizationsContext);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const onRowClick = (row: Row<Role>) => {
    setSearchParams(
      new URLSearchParams({
        tab: "roles",
        subtab: "permissions",
        id: String(row.original.id),
      }),
      { replace: true }
    );
  };
  const columns = getRolesColumns(t, i18n);
  const actions: TableAction<Role>[] = [
    { label: "Edit", type: "edit" },
    { type: "delete", label: "Delete" },
  ];
  const FormFields: FieldConfig[] = [
    { name: "name", label: t("name"), type: "language" },
  ];
  const schema = z.object({
    name: z.object({
      he: z.string().min(2, t("name_required") || "Name is required"),
      en: z.string().optional(),
      ar: z.string().optional(),
    }),
  });

  // Build advancedFields for advanced search
  const allowedTypes = ["select", "date", "text", "number", "checkbox"];
  const advancedFields = FormFields.filter((f) =>
    allowedTypes.includes(f.type)
  ).map((f) => ({
    name: f.name,
    label: f.label,
    type: f.type,
    options: f.options,
    placeholder: f.label,
  }));

  return (
    <DataTable<Role>
      initialData={roles}
      fetchData={fetchRolesParams}
      addData={createNewRole}
      updateData={updateRole}
      deleteData={deleteRole}
      columns={columns}
      actions={actions}
      searchable={true}
      showAddButton={true}
      isPagination={true}
      onRowClick={(row) => onRowClick(row)}
      defaultPageSize={10}
      idField="id"
      advancedFilters={advancedFilters}
      setAdvancedFilters={setAdvancedFilters}
      rightHeaderContent={
        <TableHeaderActions
          columns={columns}
          filename="roles.csv"
          advancedFields={advancedFields}
          setAdvancedFilters={setAdvancedFilters}
        />
      }
      renderEditContent={({ handleSave, rowData, handleEdit }) => {
        const mode = rowData?.id ? "edit" : "create";
        return (
          <DynamicForm
            mode={mode}
            defaultValues={rowData}
            headerKey="role"
            fields={FormFields}
            validationSchema={schema}
            onSubmit={async (data: z.infer<typeof schema>) => {
              try {
                // Ensure name object has at least Hebrew, and include other languages if provided
                const nameData: Record<string, string> = {
                  he: data.name.he.trim(),
                };
                // Only include en/ar if they have meaningful content (at least 2 chars)
                if (data.name.en && data.name.en.trim().length >= 2) {
                  nameData.en = data.name.en.trim();
                }
                if (data.name.ar && data.name.ar.trim().length >= 2) {
                  nameData.ar = data.name.ar.trim();
                }

                const roleData = {
                  ...data,
                  name: nameData,
                };

                if (handleSave && mode === "create") {
                  await handleSave(roleData);
                } else if (handleEdit && mode === "edit") {
                  await handleEdit({ id: rowData?.id, ...roleData });
                }
              } catch (error: any) {
                console.error("Error submitting role form:", error);
                // Error will be shown by form validation
              }
            }}
          />
        );
      }}
    />
  );
}

export default RoleList;
