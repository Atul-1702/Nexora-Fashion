import { z } from "zod";

const userLoginZodSchema = z.object({
  email: z.email("Invalid email."),
  password: z
    .string()
    .min(6, "Password should contain minimum 6 characters.")
    .max(10, "Password should contain maximum 10 characters."),
});

export type userlogindto = z.infer<typeof userLoginZodSchema>;
export default userLoginZodSchema;
