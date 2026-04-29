import { z } from "zod";

const moneyPattern = /^\d+(?:\.\d{0,2})?$/;
const wholeNumberPattern = /^\d+$/;

const createOptionalFieldValidator = (
  schema: z.ZodString,
  value: string,
): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const validationResult = schema.safeParse(trimmedValue);

  if (validationResult.success) {
    return undefined;
  }

  return validationResult.error.issues[0]?.message;
};

export const salesTargetAmountSchema = z
  .string()
  .refine((value) => moneyPattern.test(value), {
    message: "Enter a valid sales target amount",
  })
  .refine((value) => Number(value) > 0, {
    message: "Sales target amount must be greater than 0",
  });

export const bonusAmountSchema = z
  .string()
  .refine((value) => moneyPattern.test(value), {
    message: "Enter a valid bonus amount",
  })
  .refine((value) => Number(value) > 0, {
    message: "Bonus amount must be greater than 0",
  });

export const postCountSchema = z
  .string()
  .refine((value) => wholeNumberPattern.test(value), {
    message: "Enter a valid post count",
  })
  .refine((value) => Number(value) > 0, {
    message: "Post count must be greater than 0",
  });

export const getSalesTargetAmountError = (value: string) =>
  createOptionalFieldValidator(salesTargetAmountSchema, value);

export const getBonusAmountError = (value: string) =>
  createOptionalFieldValidator(bonusAmountSchema, value);

export const getPostCountError = (value: string) =>
  createOptionalFieldValidator(postCountSchema, value);
