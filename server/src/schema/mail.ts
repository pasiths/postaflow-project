import {z } from "zod";

export const MailSchema = z.object({
    senderId: z.number().min(1, { message: "Sender ID is required" }),
    receiverName: z.string().min(1, { message: "Receiver name is required" }),
    receiverAddress: z.string().min(1, { message: "Receiver address is required" }),
    type: z.enum(["LETTER", "PARCEL","DOCUMENT"], {
        errorMap: () => ({ message: "Type is required" }),
    }),
})