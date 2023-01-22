import { z } from "zod";

export const schema = z.object({
  body: z
    .object({
      // user_i
      sin: z.string({
        required_error: "error/sin-required",
        invalid_type_error: "error/sin-must-be-string",
      }),
      dob: z.string({
        required_error: "error/dob-required",
        invalid_type_error: "error/dob-must-be-string",
      }),
      gender: z.string({
        required_error: "error/gender-required",
        invalid_type_error: "error/gender-must-be-string",
      }),
      street: z.string({
        required_error: "error/street-required",
        invalid_type_error: "error/street-must-be-string",
      }),
      city: z.string({
        required_error: "error/city-required",
        invalid_type_error: "error/city-must-be-string",
      }),
      province: z.string({
        required_error: "error/province-required",
        invalid_type_error: "error/province-must-be-string",
      }),
      postal: z.string({
        required_error: "error/postal-required",
        invalid_type_error: "error/postal-must-be-string",
      }),
    })
    .strict("error/extra-fields-not-allowed"),
});
