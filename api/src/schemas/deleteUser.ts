import { z } from "zod";

export const schema = z.object({
  params: z.object({
    // user_id
    uid: z.string({
      required_error: "auth/uid-required",
      invalid_type_error: "auth/uid-must-be-string",
    }),
  }),
});
