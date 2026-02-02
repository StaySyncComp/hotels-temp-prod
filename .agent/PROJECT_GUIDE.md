# Project Code Style & Master Guide

This document serves as the **Main Rule** for the codebase. It aggregates all specialized skills, architectural patterns, and data layer rules.

## 1. Skill Mapping (When to use what)

| Domain                   | Task               | Skill / Standard                                  |
| :----------------------- | :----------------- | :------------------------------------------------ |
| **UI Components**        | Data Tables        | `frontend-datatable` (`DataTable` wrapper)        |
|                          | Modals / Dialogs   | `frontend-dialogs` (`BaseDialog`)                 |
|                          | Forms / Input      | `frontend-forms` (`DynamicForm`)                  |
|                          | Auth / Permissions | `frontend-auth` (`useAuth`, `useHasScopedAccess`) |
|                          | Icons              | Use `lucide-react` or `src/assets/icons`          |
| **Internationalization** | Translations       | `frontend-i18n` (`useTranslation`)                |
|                          | RTL / Layout       | `frontend-i18n` (`useRTL`)                        |
| **Data & Backend**       | Fetching / CRUD    | `connecting-backend` (`createApiService`)         |
|                          | Types              | `src/types/api`                                   |

## 2. Frontend Architecture rules

### Component Structure

- **Functional Components**: Use `const Component: React.FC<Props> = ...`
- **Hooks**: Logic should be extracted to custom hooks (`useUser`, `useOrganization`) when reusable or complex.
- **Strict Layout**:
  - **Dialogs**: ALWAYS use `BaseDialog`. Never `DialogPrimitive` directly.
  - **Tables**: ALWAYS use `DataTable`. Never `<table>` directly.

### Styling

- **Tailwind CSS**: Use utility classes.
- **RTL**: Use logical or direction-aware classes (`rtl:text-right`, `ltr:text-left`).
- **Colors**: Use semantic theme colors (`bg-background`, `text-primary`) for Dark Mode compatibility.

## 3. Data Layer & Database (General Knowledge)

### API Architecture

- **Factory**: All API services are built with `createApiService` (`src/lib/api-utils/apiFactory.ts`).
- **Organization Scope**: Most requests require `organizationId`. The factory handles this if `includeOrgId: true` is set.
- **Endpoints**: Defined in `src/features/[feature]/api`.

### Database Schema (Inferred from API Types)

The "Database" structure is reflected in `src/types/api`. Key entities:

- **Users**: (`types/api/user.ts`) - Managed via `useUser`.
- **Organization**: (`types/api/organization.ts`) - Root entity.
- **Calls**: (`types/api/calls.ts`) - Core feature.

### Supabase (Images/Storage)

- **Usage**: Used primarily for **Image Storage**.
- **Bucket**: `Images`.
- **Helper**: `src/lib/supabase.ts` provides `uploadImage`, `deleteImage`, `getImage`.
- **Environment**: Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## 4. Workflows

### Creating a New Feature

1.  **Define Types**: Add DTOs to `src/types/api`.
2.  **Create API Service**: in `src/features/[feature]/api`.
3.  **Create Hook**: `use[Feature]` wrapper with React Query.
4.  **Create UI**: Use `DataTable` (for lists) and `DynamicForm` (for create/edit).
5.  **Add Translations**: Update `locales`.

### Code Reviews

- Check for `BaseDialog` usage (reject valid `DialogContent` with custom padding).
- Check for RTL support in flex containers (`flexDirection` from `useRtl`).
- Ensure `organizationId` is passed in API calls.
