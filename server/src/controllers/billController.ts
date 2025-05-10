import { Request, Response } from "express";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { BillSchema } from "../schema/bill";

export const CreateBill = async (req: Request, res: Response) => {
  BillSchema.parse(req.body);
  const { amount, billType, paymentStatus, clientId } = req.body;

  const customer = await prisma.customer.findUnique({
    where: { id: Number(clientId) },
  });

  if (!customer) {
    throw new NotFoundException(
      "Customer not found!",
      ErrorCode.CUSTOMER_NOT_FOUND
    );
  }

  const bill = await prisma.bill.create({
    data: {
      amount,
      billType,
      paymentStatus,
      clientId: Number(clientId),
    },
  });

  console.log(
    `LOG_BOOK bill= ${billType} ${amount} ${paymentStatus} created by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );
  res.json({
    bill: bill,
  });
};
