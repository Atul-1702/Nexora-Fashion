import { z } from "zod";

const userZodSchema = z.object({
  name: z.string(),
  email: z.email("Invalid email."),
  password: z
    .string()
    .min(6, "Password should contain minimum 6 characters.")
    .max(10, "Password should contain maximum 10 characters."),
});

export type userdto = z.infer<typeof userZodSchema>;
export default userZodSchema;
