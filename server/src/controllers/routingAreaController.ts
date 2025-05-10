import { Request, Response } from "express";
import { RoutingAreaSchema } from "../schema/routingArea";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { UserRole, UserStatus } from "@prisma/client";

export const CreateRoutingArea = async (req: Request, res: Response) => {
  RoutingAreaSchema.parse(req.body);

  const { homeNumber, address, deliverId } = req.body;

  const deliver = await prisma.employee.findUnique({
    where: { id: Number(deliverId) },
    select: {
      role: true,
      status: true,
    },
  });

  if (
    !deliver ||
    deliver?.status !== UserStatus.ACTIVE ||
    deliver?.role !== UserRole.MAIL_DELIVERER
  ) {
    throw new NotFoundException(
      "Deliver not found!",
      ErrorCode.DELIVER_NOT_FOUND
    );
  }

  const routingArea = await prisma.routingArea.create({
    data: {
      homeNumber,
      address,
      deliverId: Number(deliverId),
    },
  });
  console.log(
    `LOG_BOOK routingArea= ${routingArea?.id} added by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );
  res.json({ routingArea: routingArea });
};
