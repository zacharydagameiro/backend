import { z } from "zod";

export const schema = z.object({
  body: z.object({
    debtor: z.string({
      required_error: "transfer/debtor-required",
      invalid_type_error: "transfer/debtor-must-be-string",
    }),
    creditor: z.string({
      required_error: "transfer/creditor-required",
      invalid_type_error: "transfer/creditor-must-be-string",
    }),
    amount: z.string({
      required_error: "transfer/amount-required",
      invalid_type_error: "transfer/amount-must-be-string",
    }),
  }),
});
