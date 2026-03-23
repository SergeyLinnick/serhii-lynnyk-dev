import { z } from "zod";

import { LoginSchema, RegisterFormSchema, RegisterSchema } from "./schema";

export type RegisterType = z.infer<typeof RegisterSchema>;
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
