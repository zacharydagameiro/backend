import { z } from "zod";

export const schema = z.object({
  headers: z.object({
    // user_id
    authorization: z.string({
      required_error: "auth/uid-required",
      invalid_type_error: "auth/uid-must-be-string",
    }),
  }),
});
