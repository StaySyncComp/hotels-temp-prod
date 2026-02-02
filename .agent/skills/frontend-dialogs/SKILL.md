---
name: frontend-dialogs
description: Standardized way to create dialogs using BaseDialog. Use for all modals and popups.
---

# Frontend Dialogs

## When to use this skill

- Creating confirmation modals.
- Creating custom action dialogs (e.g., "Assign Worker").
- **Never** use `shadcn` primitives directly.

## Core Component: `BaseDialog`

**Path**: `@/components/common/BaseDialog`

This component enforces a strict layout with premium styling (white background, standard padding).

### Strict Layout Rules

1.  **No Custom Padding**: Do NOT add `p-*` classes to the `className` prop. `BaseDialog` automatically adds `p-6` to the content area.
2.  **Footer Layout**: Use the `footer` prop. `BaseDialog` automatically wraps it in a styled container (`bg-gray-50 border-t`).
3.  **Width Control**: Use `className` ONLY to control width/max-width (e.g., `sm:max-w-[500px]`).

### Implementation

```tsx
import { BaseDialog } from "@/components/common/BaseDialog";

export function MyCustomDialog({ open, onOpenChange }: Props) {
  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Dialog Title"
      description="Optional description text."
      className="sm:max-w-md" // Width only!
      footer={
        <>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit}>Confirm</Button>
        </>
      }
    >
      {/* Content Area - Automatically padded (p-6) */}
      <div className="flex flex-col gap-4">
        <label>Input Field</label>
        <input className="border p-2 rounded" />
      </div>
    </BaseDialog>
  );
}
```

### Common Dialogs

- **AreYouSureDialog**: Use for simple confirmations (delete, irreversible actions).
  ```tsx
  <AreYouSureDialog title="Delete User?" onConfirm={handleDelete}>
    <Button>Delete</Button>
  </AreYouSureDialog>
  ```
