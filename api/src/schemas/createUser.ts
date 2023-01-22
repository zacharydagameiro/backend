import { z } from "zod";

export const schema = z.object({
  body: z
    .object({
      first_name: z.string({
        required_error: "auth/first_name-required",
        invalid_type_error: "auth/first_name-must-be-string",
      }),
      // last name
      last_name: z.string({
        required_error: "auth/first_name-required",
        invalid_type_error: "auth/first_name-must-be-string",
      }),
      // username
      username: z.string({
        required_error: "auth/username-required",
        invalid_type_error: "auth/username-must-be-string",
      }),
      // email
      email: z
        .string({
          required_error: "auth/email-required",
          invalid_type_error: "auth/email-must-be-string",
        })
        .email("auth/invalid-email"),
      // password
      password: z.string({
        required_error: "auth/password-required",
        invalid_type_error: "auth/password-must-be-string",
      }),
      // first name
    })
    .strict(),
});
