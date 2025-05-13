import type { Employee } from "@/types/employee";
import apiClient from ".";

export const getEmployees = async ({
  role,
  status,
}: {
  role: string;
  status: string;
}): Promise<{ employees: Employee[] }> => {
  const response = await apiClient.get("/employee", {
    params: {
      role,
      status,
    },
  });
  return response.data as { employees: Employee[] };
};
