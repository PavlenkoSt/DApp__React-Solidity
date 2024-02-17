import { z } from "zod";

export const schema = z.object({
  amount: z.string().refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number) && number > 0;
    },
    {
      message: "Must be a positive number",
    },
  ),
});

export type IForm = z.infer<typeof schema>;
