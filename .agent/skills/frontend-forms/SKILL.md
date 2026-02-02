---
name: frontend-forms
description: Implementation guide for DynamicForm. Use for data entry, editing, and validation.
---

# Frontend Forms

## When to use this skill

- Creating Create/Edit forms for DataTables.
- Building standalone forms.
- Handling complex inputs like localized text, images, or multi-selects.

## Core Component: `DynamicForm`

**Path**: `@/components/common/dynamic-form/DynamicForm.tsx`

This component generates a form based on a configuration array and Zod schema.

### Configuration (`FieldConfig`)

| Type                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `text` / `email` / `number`   | Standard inputs.                                        |
| `select`                      | Dropdown. Requires `options: { label, value }[]`.       |
| `language`                    | Creates `LanguageInput` for localizable fields (en/he). |
| `image`                       | Image upload with preview.                              |
| `date` / `multi-time`         | Date/Time pickers.                                      |
| `checkbox` / `multi-checkbox` | Boolean inputs.                                         |

### Schema (Zod)

Validation schemas must match the field names.
For `language` fields, use a nested object schema:

```ts
name: z.object({
  en: z.string().min(1),
  he: z.string().optional(),
});
```

### Implementation Example

```tsx
// 1. Define Fields
const fields: FieldConfig[] = [
  { name: "title", label: t("title"), type: "language" },
  {
    name: "category",
    label: t("category"),
    type: "select",
    options: categories,
  },
  { name: "active", label: t("is_active"), type: "checkbox" },
];

// 2. Define Schema
const schema = z.object({
  title: z.object({ en: z.string(), he: z.string() }),
  category: z.string(),
  active: z.boolean(),
});

// 3. Render
<DynamicForm
  mode={isEdit ? "edit" : "create"}
  headerKey="item" // Used for title: "Create Item" / "Edit Item"
  fields={fields}
  validationSchema={schema}
  defaultValues={initialData} // Important for edit mode
  onSubmit={async (data) => {
    await saveApi(data);
  }}
/>;
```
