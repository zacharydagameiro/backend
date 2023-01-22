import { z } from "zod";

export const schema = z.object({
  body: z.object({
    handle: z.string({
      required_error: "wallet/handle-required",
      invalid_type_error: "wallet/handle-must-be-string",
    }),
  }),
});
