import type { CreateCustomerInput, Customer } from "@/types/customer";
import apiClient from ".";

export const getCustomers = async (): Promise<{ customers: Customer[] }> => {
  const response = await apiClient.get("/customer");
  return response.data as { customers: Customer[] };
};

export const getSearchCustomers = async ({
  query,
}: {
  query: string;
}): Promise<{ customers: Customer[] }> => {
  const response = await apiClient.get("/customer", {
    params: { q: query, status:"ACTIVE" },
  });
  return response.data as { customers: Customer[] };
};

export const createCustomer = async ({
  firstName,
  lastName,
  email,
  contactNum,
  address,
}: CreateCustomerInput) => {
  const response = await apiClient.post("/customer", {
    firstName,
    lastName,
    email,
    contactNum,
    address,
  });
  return response.data as Customer;
};
