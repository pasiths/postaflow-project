import apiClient from ".";

export const loginApi = async (username: string, password: string) => {
    const response = await apiClient.post(`/auth/signin`, { username, password });
    return response.data;
  };
  