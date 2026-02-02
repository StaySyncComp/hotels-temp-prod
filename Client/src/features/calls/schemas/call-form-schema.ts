// components/forms/callFormSchema.ts
import { z } from "zod";
export const callFormSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  locationId: z.union([
    z.string().min(1, { message: "Location is required" }),
    z.number(),
  ]),
  callCategoryId: z.union([
    z.string().min(1, { message: "Call category is required" }),
    z.number(),
  ]),
  assignedToId: z.union([z.string(), z.number()]).optional(),
  status: z.string().min(1, { message: "Status is required" }),
});
