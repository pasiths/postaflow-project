import type { Customer } from "@/types/customer";
import apiClient from ".";

export const getCustomers = async (): Promise<{ customers: Customer[] }> => {
    const response = await apiClient.get("/customer");
    return response.data as { customers: Customer[] };
}