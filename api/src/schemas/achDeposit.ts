import { z } from "zod";

export const schema = z.object({
  body: z.object({
    amount: z.string({
      required_error: "daws/amount-required",
      invalid_type_error: "daws/amount-must-be-a-number",
    }),
  }),
});
