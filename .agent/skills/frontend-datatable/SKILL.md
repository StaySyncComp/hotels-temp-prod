---
name: frontend-datatable
description: Implementation guide for DataTables. Use when creating list views, tables, or grids.
---

# Frontend DataTables

## When to use this skill

- Displaying lists of data (users, calls, locations).
- Implementing filtering, sorting, or pagination.
- Adding actions (Edit/Delete) to rows.

## Core Component: `DataTable`

**Path**: `@/components/common/data-table`

This component wraps `@tanstack/react-table` and handles most state management internally.

### Props API

| Prop                 | Type                               | Description                                                          |
| -------------------- | ---------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| `fetchData`          | `(params) => Promise<{data, total} | T[]>`                                                                | Function to load data. Can handle pagination params. |
| `columns`            | `ColumnDef<T>[]`                   | TanStack table column definitions.                                   |
| `actions`            | `TableAction<T>[]`                 | Array of actions (edit, delete, custom).                             |
| `advancedFilters`    | `Record`                           | State object for filters.                                            |
| `renderEditContent`  | `(props) => ReactNode`             | Render prop for the Add/Edit form (usually `DynamicForm`).           |
| `rightHeaderContent` | `ReactNode`                        | Content for the top-right header (Export button, Column visibility). |

### Implementation Pattern

1. **Define Columns**
   Create a config file (e.g., `feature-columns.ts`) to keep the component clean.

   ```tsx
   export const getColumns = (t: TFunction): ColumnDef<User>[] => [
     { accessorKey: "name", header: t("name") },
     { accessorKey: "status", header: t("status"), cell: StatusCell },
   ];
   ```

2. **Define Actions**

   ```tsx
   const actions: TableAction<User>[] = [
     { type: "edit", label: t("edit") },
     { type: "delete", label: t("delete") },
     {
       placement: "external",
       component: (row) => <CustomAction row={row} />,
     },
   ];
   ```

3. **Component Usage**
   ```tsx
   <DataTable<User>
     fetchData={fetchUsers}
     columns={columns}
     actions={actions}
     searchable={true}
     showAddButton={true}
     renderEditContent={({ rowData, handleSave }) => (
       <DynamicForm
         mode={rowData ? "edit" : "create"}
         fields={fields}
         validationSchema={schema}
         defaultValues={rowData}
         onSubmit={handleSave}
       />
     )}
   />
   ```

### Advanced Features

- **WebSocket Updates**: Pass `websocketUrl="/ws/resource"` to automatically update the table data from the server.
- **Advanced Search**: Use `AdvancedSearchModal` in `rightHeaderContent` to filter data.
- **Export**: Use `ExportButtonWrapper` to allow downloading CSVs.
