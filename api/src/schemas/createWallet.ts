import { z } from "zod";

export const schema = z.object({
  body: z.object({
    handle: z
      .string({
        required_error: "auth/handle-required",
        invalid_type_error: "auth/handle-must-be-string",
      })
      .min(1)
      .max(32),
  }),
});
