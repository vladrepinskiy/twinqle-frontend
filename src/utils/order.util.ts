import type { Order } from "../types/order";

const RETRYABLE_STATUSES = ["pending_creation", "creation_in_flight", "failed"];
const RETRY_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

export const isRetryable = (order: Order): boolean => {
  if (!RETRYABLE_STATUSES.includes(order.shipment_status)) return false;

  const updatedAt = new Date(order.updated_at).getTime();
  const now = Date.now();
  return now - updatedAt > RETRY_THRESHOLD_MS;
};
