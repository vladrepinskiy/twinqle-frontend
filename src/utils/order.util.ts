import type { Order } from "../types/order";

const RETRYABLE_STATUSES = ["pending_creation", "creation_in_flight", "failed"];
const RETRY_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

export const isRetryable = (order: Order): boolean => {
  if (!RETRYABLE_STATUSES.includes(order.shipment_status)) return false;

  // If it's a carrier API error, allow immediate retry
  if (
    order.shipment_status_reason &&
    order.shipment_status_reason.startsWith("Late Logistics API error")
  ) {
    return true;
  }

  const updatedAt = new Date(order.updated_at).getTime();
  const now = Date.now();
  return now - updatedAt > RETRY_THRESHOLD_MS;
};

export const formatStatusReason = (reason: string): string => {
  if (reason.startsWith("Late Logistics API error")) {
    return "Carrier shipment issue";
  }
  return reason;
};
