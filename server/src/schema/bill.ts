import { z } from "zod";

export const BillSchema = z.object({
  amount: z.number().positive(),
  billType: z.enum([
    "ELECTRICITY",
    "WATER",
    "GAS",
    "INTERNET",
    "PHONE",
    "RENT",
    "INSURANCE",
    "OTHER",
  ]),
  paymentStatus: z.enum(["PAID", "UNPAID", "PARTIALLY_PAID", "OVERDUE"]),
  clientId: z.string(),
});

export const PaymentSchema = z.object({
  amountPaid: z.number().positive(),
  paymentMethod: z.enum([
    "CREDIT_CARD",
    "DEBIT_CARD",
    "CASH",
    "BANK_TRANSFER",
    "OTHER",
  ]),
  paymentDate: z.string(),
  billId: z.string(),
});
