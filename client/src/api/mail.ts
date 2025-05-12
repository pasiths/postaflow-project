import type { Mail } from "@/types/mail";
import apiClient from "."

export const getMails = async (): Promise<{ mails: Mail[] }> => {
    const response = await apiClient.get("/mail");
    return response.data as { mails: Mail[] };
}