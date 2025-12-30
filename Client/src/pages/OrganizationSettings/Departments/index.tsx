import { useContext, useState } from "react";
import DataTable from "@/components/ui/completed/data-table";
import { useTranslation } from "react-i18next";
import { TableAction } from "@/types/ui/data-table-types";
import { fetchDepartmentsParams } from "@/api/departments";
import { Department } from "@/types/api/departments";
import i18n from "@/i18n";
import DynamicForm, {
  FieldConfig,
} from "../../../components/forms/DynamicForm/DynamicForm";
import { z } from "zod";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";
import { handleImageChange } from "@/lib/formUtils";
import { getDepartmentsColumns } from "@/components/forms/departments/departmentsColumns";
import TableHeaderActions from "@/components/table-actions/TableHeaderActions";

const DepartmentsTable = () => {
  const { t } = useTranslation();
  const {
    organization,
    createNewDepartment,
    deleteDepartment,
    updateDepartment,
    departments,
  } = useContext(OrganizationsContext);
  const columns = getDepartmentsColumns(t, i18n);
  const [advancedFilters, setAdvancedFilters] = useState({});

  const actions: TableAction<Department>[] = [
    { label: "Edit", type: "edit" },
    { type: "delete", label: "Delete" },
  ];
  const fields: FieldConfig[] = [
    { name: "logo", label: t("picture"), type: "image" },
    { name: "name", label: t("name"), type: "language" },
  ];

  const schema = z.object({
    name: z.object({
      he: z.string().min(2, t("name_required") || "Name is required"),
      en: z.string().optional(),
      ar: z.string().optional(),
    }),
    logo: z.any().optional(),
  });

  // Build advancedFields for advanced search
  const allowedTypes = ["select", "date", "text", "number", "checkbox"];
  const advancedFields = fields
    .filter((f) => allowedTypes.includes(f.type))
    .map((f) => ({
      name: f.name,
      label: f.label,
      type: f.type,
      options: f.options,
      placeholder: f.label,
    }));

  return (
    <DataTable<Department>
      initialData={departments}
      fetchData={fetchDepartmentsParams}
      // @ts-ignore
      addData={createNewDepartment}
      // @ts-ignore
      deleteData={deleteDepartment}
      updateData={updateDepartment}
      columns={columns}
      actions={actions}
      searchable={true}
      showAddButton={true}
      isPagination={true}
      defaultPageSize={10}
      idField="id"
      advancedFilters={advancedFilters}
      setAdvancedFilters={setAdvancedFilters}
      rightHeaderContent={
        <TableHeaderActions
          columns={columns}
          filename="departments.csv"
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
            headerKey="department"
            fields={fields}
            validationSchema={schema}
            onSubmit={async (data: z.infer<typeof schema>) => {
              try {
                const isCreateMode = mode === "create";
                const logoPath = await handleImageChange({
                  newImage: data.logo,
                  oldImage: rowData?.logo,
                  isCreateMode,
                  path: `${organization?.id}/departments`,
                });

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

                // @ts-ignore
                const departmentData: Partial<Department> = {
                  ...data,
                  name: nameData,
                  logo: logoPath || "",
                };

                if (!isCreateMode) departmentData.id = rowData?.id;

                if (isCreateMode && handleSave) {
                  try {
                    await handleSave(departmentData);
                    // Form will close automatically via handleSave in DataTable
                  } catch (error: any) {
                    console.error("Department creation error:", error);
                    // Don't rethrow - let the form stay open so user can fix errors
                  }
                } else if (!isCreateMode && handleEdit) {
                  try {
                    await handleEdit(departmentData);
                  } catch (error: any) {
                    console.error("Department update error:", error);
                  }
                }
              } catch (error: any) {
                console.error("Error submitting department form:", error);
                // Error will be shown by the form validation
              }
            }}
          />
        );
      }}
    />
  );
};

export default DepartmentsTable;
