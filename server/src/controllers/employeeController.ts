import { Request, Response } from "express";
import { prisma } from "..";
import { UserRole, UserStatus } from "@prisma/client";

export const getEmployees = async (req: Request, res: Response) => {
    const { role,status } = req.query;
  const employees = await prisma.employee.findMany({
    where: {
      AND: [
        role
          ? { role: { equals: role as UserRole } }
          : {},
        status
          ? { status: { equals: status as UserStatus } }
          : {},
      ],
    },
    select:{
        id: true,
        username: true,
        fName: true,
        lName: true,
        email: true,
        phoneNum: true,
        address: true,
        role: true,
        status: true,
    }
  });
  if (employees.length === 0) {
    return res.json({ employees: [] });
  }
  console.log(
    `LOG_BOOK employee= ${employees.length} searched by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );
  res.json({ employees: employees });
};
