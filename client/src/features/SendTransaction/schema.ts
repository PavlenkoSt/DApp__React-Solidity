import { z } from "zod";

export const schema = z.object({
  toAddress: z
    .string()
    .min(42, { message: "Invalid address" })
    .max(42, { message: "Invalid address" }),
  amount: z.string().refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number) && number > 0;
    },
    {
      message: "Must be a positive number",
    },
  ),
  message: z
    .string()
    .min(1, { message: "Required" })
    .max(200, { message: "Max 200 characters" }),
  keyword: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Max 20 characters" }),
});

export type IForm = z.infer<typeof schema>;
