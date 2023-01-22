import { z } from "zod";

export const schema = z.object({
  body: z.object({
    debitor: z.string({
      required_error: "transfer/debitor-required",
    }),
    creditor: z.string({
      required_error: "transfer/creditor-required",
    }),
    amount: z.string({
      required_error: "transfer/amount-required",
      invalid_type_error: "transfer/amount-must-be-string",
    }),
  }),
});
