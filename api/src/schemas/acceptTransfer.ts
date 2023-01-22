import { z } from "zod";

export const schema = z.object({
  params: z.object({
    transfer_id: z.string({
      required_error: "transfer/transfer_id-required",
      invalid_type_error: "transfer/transfer_id-must-be-string",
    }),
  }),
});
