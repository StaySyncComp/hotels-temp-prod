import { z } from "zod";

export const callSettingsFormSchema = z.object({
  name: z.object({
    he: z.string().min(2, "Hebrew name is required"),
    en: z.string().optional(),
    ar: z.string().optional(),
  }),
  logo: z.union([z.string(), z.undefined(), z.null()]).optional().transform((val) => val || ""),
  departmentId: z.coerce.number().min(1, "Department is required"),
  expectedTime: z.coerce.number().min(1, "Expected time must be at least 1 minute"),
});
