import type { ValueOf } from "../utils/types.util";

export const ORDER_STATUSES = {
  PENDING_CREATION: "pending_creation",
  CREATING_SHIPMENT: "creating_shipment",
  CREATION_UNKNOWN: "creation_unknown",
  CREATED: "created",
  CONFIRMING: "confirming",
  CONFIRMATION_UNKNOWN: "confirmation_unknown",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  FAILED: "failed",
  NEEDS_ATTENTION: "needs_attention",
} as const;

export type OrderStatus = ValueOf<typeof ORDER_STATUSES>;
