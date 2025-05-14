import type { Bill } from "@/types/bill";
import apiClient from ".";

export const getBills = async (): Promise<{ bills: Bill[] }> => {
    const response = await apiClient.get("/bill");
    return response.data as { bills: Bill[] };
    }