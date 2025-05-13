import type { createMail as CreateMailType, Mail } from "@/types/mail";
import apiClient from ".";

export const getMails = async (): Promise<{ mails: Mail[] }> => {
  const response = await apiClient.get("/mail");
  return response.data as { mails: Mail[] };
};

export const createMail = async ({
  senderId,
  receiverId,
  type,
  direction,
}: CreateMailType) => {
  const response = await apiClient.post("/mail", {
    senderId,
    receiverId,
    type,
    direction,
  });
  return response.data as Mail;
};
