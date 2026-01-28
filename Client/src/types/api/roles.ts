import { Name } from "./api.types";

export interface Role {
  id: number;
  name: Name;
  userCount: number;
  permissions: Permission[];
}

export type Scope = "any" | "own" | "none";
export type Action = "view" | "update" | "create" | "delete";
export type Resource =
  | "users"
  | "calls"
  | "callCategories"
  | "site"
  | "app"
  | "roles"
  | "departments"
  | "reports"
  | "cleaning";

export interface Permission {
  id?: number;
  roleId?: number;
  resource: Resource;
  action: Action;
  scope: Scope;
}
