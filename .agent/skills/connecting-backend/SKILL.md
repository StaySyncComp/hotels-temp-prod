---
name: connecting-backend
description: Implements backend API connections using the project's standard `createApiService` factory and React Query hooks. Use when the user wants to fetch data, create API endpoints, or manage server state.
---

# Backend Connection Skill

## When to use this skill

- Connecting to a new backend resource (CRUD).
- Creating new API endpoints in the frontend layer.
- fetching data using React Query.
- Managing server state (loading, error, cache).

## Workflow

1.  **Define Types**: Create/Update type definitions in `src/types/api/[entity].ts`.
2.  **Create API Service**: Use `createApiService` in `src/api/[entity]/index.ts`.
3.  **Create Hook**: Create a custom hook in `src/hooks/use[Entity].ts` wrapping the API service with `useQuery`/`useMutation`.
4.  **Export**: Export the hook and types for component usage.

## Instructions

### 1. Type Definitions

Always define the expected response shape. Use `MutationResponse` or `ApiResponse`.

```typescript
// src/types/api/example.ts
export interface ExampleEntity {
  id: number;
  name: string;
  // ...
}

export interface CreateExamplePayload {
  name: string;
  // ...
}
```

### 2. API Service Configuration

Use the `createApiService` factory. This handles `axios` setup, auth, and error handling automatically.

```typescript
// src/api/examples/index.ts
import { createApiService } from "@/api/utils/apiFactory";
import { ExampleEntity } from "@/types/api/example";

// 2nd arg options: { includeOrgId: boolean, customRoutes: { ... } }
export const exampleService = createApiService<ExampleEntity>("/examples", {
  includeOrgId: true,
});

// Export specific methods for React Query
export const fetchExamples = exampleService.fetchAll;
export const createExample = exampleService.create;
export const updateExample = exampleService.update;
export const deleteExample = exampleService.delete;
```

### 3. Custom Hook Implementation

Wrap the service methods with React Query. Handle invalidation on mutations.

```typescript
// src/hooks/useExample.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchExamples,
  createExample,
  updateExample,
  deleteExample,
} from "@/api/examples";
import { ExampleEntity, CreateExamplePayload } from "@/types/api/example";
import { MutationResponse } from "@/types/api/auth";

export function useExample() {
  const queryClient = useQueryClient();
  const queryKey = ["examples"];

  // Fetching
  const query = useQuery<MutationResponse<ExampleEntity[]>>({
    queryKey,
    // @ts-ignore - apiFactory types sometimes need loose matching
    queryFn: fetchExamples,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createExample,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    data: query.data?.data || [],
    isLoading: query.isLoading,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    // ... expose other methods
  };
}
```

## Dependencies

- `@tanstack/react-query`
- `@/api/utils/apiFactory`
- `@/api/apiClient`
