import { Request, Response } from "express";
import { MailSchema } from "../schema/mail";
import { prisma } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const CreateMail = async (req: Request, res: Response) => {
  MailSchema.parse(req.body);

  const { senderId, receiverName, receiverAddress, type } = req.body;

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
    },
    include: {
      sender: true,
    },
  });

  if (!mail) {
    throw new BadRequestException("Mail not created", ErrorCode.INTERNAL_EXCEPTION);
  }

  console.log(
    `LOG_BOOK ${req.user?.username} created mail with ID ${mail.id} at ${new Date().toLocaleString()}`
  );

  res.json({ mail: mail });
};
