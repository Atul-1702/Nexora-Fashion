import { z } from "zod";

const cartZodSchema = z.object({
  product: z.object({
    id: z.string(),
    quantity: z.number().int(),
  }),

  userId: z.string(),
});

export type cartdto = z.infer<typeof cartZodSchema>;
export default cartZodSchema;
