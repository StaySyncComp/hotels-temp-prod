---
name: frontend-auth
description: Handles authentication flow (login/logout) and role-based permissions access.
---

# Frontend Authentication & Permissions

## When to use this skill

- Implementing login/logout functionality.
- Protecting routes or components based on user roles.
- Checking if a user has permission to perform a specific action.

## 1. Authentication (`useAuth`)

**Path**: `@/features/auth/hooks/useAuth.ts`
**Context**: `AuthContext`

The `useAuth` hook provides the current user state and authentication methods.

### API

```typescript
const {
  user, // User object (or null)
  isAuthenticated, // boolean
  isUserLoading, // boolean (initial fetch)
  login, // func: (credentials) => Promise
  logout, // func: () => Promise
} = useAuth(); // Or useContext(AuthContext)
```

### User Object Structure

The user object contains nested organization roles which hold the permissions:

```typescript
user.organizationRoles[0].role.permissions;
// Permission[]: { resource: string, action: string, scope: "none" | "any" | ... }
```

## 2. Permissions (`useHasScopedAccess`)

**Path**: `@/lib/api-utils/hasScopedAccess.tsx`

Use this hook to check if the current user has access to a specific resource action.

### Usage

```tsx
import { useHasScopedAccess } from "@/lib/api-utils/hasScopedAccess";

const canEditUsers = useHasScopedAccess({
  resource: "users",
  action: "update",
});

if (!canEditUsers) return null; // Or disable button
```

### Logic

- It looks up the permission in `user.organizationRoles[0].role.permissions`.
- Returns `true` if a matching permission exists and `scope !== "none"`.
- Returns `false` otherwise.

## 3. Route Protection (`PrivateRoute`)

**Path**: `@/components/common/PrivateRoute.tsx`

The `PrivateRoute` component wraps protected routes. It enforces:

1.  **Authentication**: Redirects to `/login` if not logged in.
2.  **Site Access**: Checks for `resource: "site"` permission. Redirects to `/unauthorized` if missing.

### Router Implementation

```tsx
<Route element={<PrivateRoute />}>
  <Route path="/" element={<Home />} />
  {/* ... other protected routes */}
</Route>
```
