import { z } from "zod";

export const RoutingAreaSchema = z.object({
  homeNumber: z.string(),
  address: z.string(),
  deliverId: z.string(),
});
