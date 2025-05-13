import type { RoutingArea } from "@/types/routing-areas";
import apiClient from ".";

export const getRoutingAreas = async (): Promise<{ routingAreas: RoutingArea[] }> => {
    const response = await apiClient.get("/routingArea");
    return response.data as { routingAreas: RoutingArea[] };
}