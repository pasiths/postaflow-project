import { Request, Response } from "express";
import { RoutingAreaSchema } from "../schema/routingArea";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { UserRole, UserStatus } from "@prisma/client";

export const GetRoutingAreas = async (req: Request, res: Response) => {
  const { homeNumber, address, deliverName } = req.query;

  const routingAreas = await prisma.routingArea.findMany({
    where: {
      AND: [
        homeNumber
          ? {
              homeNumber: {
                contains: homeNumber as string,
                mode: "insensitive",
              },
            }
          : {},
        address
          ? { address: { contains: address as string, mode: "insensitive" } }
          : {},
        deliverName
          ? {
              deliver: {
                fName: {
                  contains: deliverName as string,
                  mode: "insensitive",
                },
              },
            }
          : {},
      ],
    },
    include: {
      deliver: true,
    },
  });
  if (routingAreas.length === 0) {
    return res.json({ routingAreas: [] });
  }

  console.log(
    `LOG_BOOK routingArea= ${homeNumber} ${address} ${deliverName} searched by ${
      req.user?.username
    } at ${new Date().toLocaleString()}`
  );

  res.json({ routingAreas: routingAreas });
};

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
