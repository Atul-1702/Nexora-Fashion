import { z } from "zod";

const productZodSchema = z.object({
  _id: z.string(),
  name: z.string().min(5).max(100),
  price: z.number().nonnegative().min(10).max(5000),
  category: z.enum(["men", "women", "accessories"]),
  image: z.string(),
});

export type Product = z.infer<typeof productZodSchema>;
