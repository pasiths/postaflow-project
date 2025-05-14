import { Request, Response } from "express";
import { prisma } from "..";
import { UserRole, UserStatus } from "@prisma/client";

export const getEmployees = async (req: Request, res: Response) => {
  const { role, status } = req.query;
  const employees = await prisma.employee.findMany({
    where: {
      AND: [
        role ? { role: { equals: role as UserRole } } : {},
        status ? { status: { equals: status as UserStatus } } : {},
      ],
    },
    select: {
      id: true,
      username: true,
      fName: true,
      lName: true,
      email: true,
      phoneNum: true,
      address: true,
      role: true,
      status: true,
    },
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

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      status: UserStatus.INACTIVE,
    },
  });
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  console.log(
    `LOG_BOOK employee= ${employee.username} deleted by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );
  res.json({ message: "Employee deleted successfully" });
};
