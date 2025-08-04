import { useContext, useState } from "react";
import DataTable from "@/components/ui/completed/data-table";
import { useTranslation } from "react-i18next";
import { fetchDepartmentsParams } from "@/api/departments";
import { Department } from "@/types/api/departments";
import i18n from "@/i18n";
import DynamicForm from "../../../components/forms/DynamicForm";
import { z } from "zod";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";
import { getDepartmentsColumns } from "@/components/forms/departments/departmentsColumns";
import TableHeaderActions from "@/components/table-actions/TableHeaderActions";
import { TableAction } from "@/types/ui/data-table-types";

const DepartmentsTable = () => {
  const { t } = useTranslation();
  const {
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
  const fields = [
    { name: "logo", label: t("picture"), type: "image" },
    { name: "name", label: t("name"), type: "language" },
  ];

  const schema = z.object({
    name: z.object({
      he: z.string().min(2),
      en: z.string().min(2),
      ar: z.string().min(2).optional(),
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
      options: (f as any).options,
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
            fields={fields as any}
            validationSchema={schema}
            onSubmit={async (data: z.infer<typeof schema>) => {
              const isCreateMode = mode === "create";
              const departmentData: Partial<Department> = {
                logo: data.logo,
                name: {
                  en: data.name.en,
                  he: data.name.he,
                  ar: data.name.ar || "",
                },
              };

              if (!isCreateMode) departmentData.id = rowData?.id;

              if (isCreateMode && handleSave) {
                await handleSave(departmentData);
              } else if (!isCreateMode && handleEdit) {
                await handleEdit(departmentData);
              }
            }}
          />
        );
      }}
    />
  );
};

export default DepartmentsTable;
