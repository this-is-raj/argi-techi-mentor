// components/admin/ProductSchema.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  subtitle: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  botanicalName: z.string().optional(),
  form: z.string().optional(),
  packaging: z.string().optional(),
  origin: z.string().optional(),
  gallery: z.array(z.string().url("Invalid gallery URL")).optional(),
  specifications: z.record(z.string()).optional(),
  description: z.string().min(1, "Description required"),
  benefits: z.string().optional(),
  details: z.string().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
