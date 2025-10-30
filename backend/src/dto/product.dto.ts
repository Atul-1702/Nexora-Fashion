import { z } from "zod";

const productZodSchema = z.object({
  name: z.string().min(5).max(100),
  price: z.coerce
    .number()
    .min(10, "Price must be at least 10")
    .max(5000, "Price cannot exceed 5,000"),
  image: z.string().optional(),
  category: z.string(),
});

export type productdto = z.infer<typeof productZodSchema>;

export default productZodSchema;
