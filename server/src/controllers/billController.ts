import { Request, Response } from "express";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { BillSchema, PaymentSchema } from "../schema/bill";
import { PaymentStatus } from "@prisma/client";

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

export const CreatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  PaymentSchema.parse(req.body);
  const { amountPaid, paymentMethod, paymentDate } = req.body;

  if (!id || isNaN(Number(id))) {
    throw new BadRequestException(
      "Bill ID is required!",
      ErrorCode.BAD_REQUEST
    );
  }

  const bill = await prisma.bill.findUnique({
    where: { id: Number(id) },
  });

  if (!bill) {
    throw new NotFoundException("Bill not found!", ErrorCode.BILL_NOT_FOUND);
  }

const payment = await prisma.payment.create({
    data: {
        amountPaid,
        paymentMethod,
        paymentDate: paymentDate || new Date(),
        billId: Number(id),
    },
});

  await prisma.bill.update({
    where: { id: Number(id) },
    data: {
      paymentStatus: PaymentStatus.PAID,
    },
  });

  console.log(
    `LOG_BOOK payment= ${amountPaid} ${paymentMethod} created by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );

  res.json({
    payment: payment,
  });
};
