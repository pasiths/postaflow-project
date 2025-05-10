import { Request, Response } from "express";
import { CustomerSchema } from "../schema/customer";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const GetCustomers = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.query;

  const customers = await prisma.customer.findMany({
    where: {
      AND: [
        firstName
          ? { fName: { contains: firstName as string, mode: "insensitive" } }
          : {},
        lastName
          ? { lName: { contains: lastName as string, mode: "insensitive" } }
          : {},
        email
          ? { email: { contains: email as string, mode: "insensitive" } }
          : {},
      ],
    },
  });

  if (customers.length === 0) {
    throw new BadRequestException(
      "No customers found!",
      ErrorCode.CUSTOMER_NOT_FOUND
    );
  }

  console.log(
    `LOG_BOOK customer= ${firstName} ${lastName} ${email} searched by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );

  res.json({ customers: customers });
};

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
