import { z } from "zod";

export const schema = z.object({
  body: z.object({
    name: z.string({
      required_error: "daws/name-required",
      invalid_type_error: "daws/name-must-be-string",
    }),
    type: z.string({
      required_error: "daws/bank-type-required",
      invalid_type_error: "daws/bank-type-must-be-string",
    }),
    bank: z.string({
      required_error: "daws/bank-name-required",
      invalid_type_error: "daws/bank-name-must-be-string",
    }),
    transit_number: z.string({
      required_error: "daws/transit-number-required",
      invalid_type_error: "daws/transit-number-must-be-string",
    }),
    institution_number: z.string({
      required_error: "daws/institution-number-required",
      invalid_type_error: "daws/institution-number-must-be-string",
    }),
    account_number: z.string({
      required_error: "daws/account-number-required",
      invalid_type_error: "daws/account-number-must-be-string",
    }),
  }),
});
