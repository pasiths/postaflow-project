import { Request, Response } from "express";
import { MailSchema } from "../schema/mail";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { MailDirection, MailStatus, MailType } from "@prisma/client";

export const GetMails = async (req: Request, res: Response) => {
  const {
    receiverName,
    senderName,
    type,
    status,
    direction,
    sortBy,
    sortOrder,
  } = req.query;
  const employeeId = Number(req.user?.id);
  const mails = await prisma.mail.findMany({
    where: {
      employeeId,
      AND: [
        receiverName
          ? {
              receiverName: {
                contains: receiverName as string,
                mode: "insensitive",
              },
            }
          : {},
        senderName
          ? {
              sender: {
                fName: { contains: senderName as string, mode: "insensitive" },
              },
            }
          : {},
        type ? { type: { equals: type as MailType } } : {},
        status ? { status: { equals: status as MailStatus } } : {},
        direction ? { direction: { equals: direction as MailDirection } } : {},
      ],
    },
    include: {
      sender: true,
      routingArea: true,
    },
    orderBy: sortBy
      ? {
          [sortBy as string]: sortOrder === "desc" ? "desc" : "asc",
        }
      : undefined,
  });
  if (!mails) {
    throw new BadRequestException(
      "Mails not found",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
  console.log(
    `LOG_BOOK ${
      req.user?.username
    } fetched mails at ${new Date().toLocaleString()}`
  );
  res.json({ mails: mails });
};

export const GetMailById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    throw new BadRequestException(
      "Mail ID is required!",
      ErrorCode.BAD_REQUEST
    );
  }

  const mail = await prisma.mail.findUnique({
    where: { id: Number(id) },
    include: {
      sender: true,
      routingArea: true,
    },
  });

  if (!mail) {
    throw new BadRequestException("Mail not found!", ErrorCode.MAIL_NOT_FOUND);
  }

  console.log(
    `LOG_BOOK ${req.user?.username} fetched mail with ID ${
      mail.id
    } at ${new Date().toLocaleString()}`
  );

  res.json({ mail: mail });
};

export const CreateMail = async (req: Request, res: Response) => {
  MailSchema.parse(req.body);

  const { senderId, receiverName, receiverAddress, type, direction } = req.body;

  const sender = await prisma.customer.findUnique({
    where: {
      id: senderId,
    },
  });
  if (!sender) {
    throw new BadRequestException(
      "Sender not found",
      ErrorCode.SENDER_NOT_FOUND
    );
  }

  const mail = await prisma.mail.create({
    data: {
      receiverName,
      receiverAddress,
      type,
      senderId,
      employeeId: Number(req?.user?.id),
      direction: direction,
    },
    include: {
      sender: true,
    },
  });

  if (!mail) {
    throw new BadRequestException(
      "Mail not created",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  console.log(
    `LOG_BOOK ${req.user?.username} created mail with ID ${
      mail.id
    } at ${new Date().toLocaleString()}`
  );

  res.json({ mail: mail });
};
