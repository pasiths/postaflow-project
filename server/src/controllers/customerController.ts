import { Request, Response } from "express";
import { CustomerSchema } from "../schema/customer";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const CreateCustomer = async (req: Request, res: Response) => {
  CustomerSchema.parse(req.body);

  const { firstName, lastName, email, contactNum, address } = req.body;

  let customer = await prisma.customer.findUnique({
    where: { email },
  });

  if (customer) {
    throw new BadRequestException(
      "Customer already exists!",
      ErrorCode.CUSTOMER_ALREADY_EXISTS
    );
  }

  customer = await prisma.customer.create({
    data: {
      fName: firstName,
      lName: lastName,
      email,
      contactNum,
      address,
    },
  });

  console.log(
    `LOG_BOOK customer= ${firstName} added by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );

  res.json({ customer });
};
