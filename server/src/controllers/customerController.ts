import { Request, Response } from "express";
import { CustomerSchema } from "../schema/customer";
import { prisma } from "..";

export const CreateCustomer = async (req: Request, res: Response) => {
  CustomerSchema.parse(req.body);

  const { fName, lName, email, contactNum, address } = req.body;
  const customer = await prisma.customer.create({
    data: {
      fName,
      lName,
      email,
      contactNum,
      address,
    },
  });

  res.json({ customer });
};
