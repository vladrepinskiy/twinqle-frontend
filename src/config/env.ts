export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  ordersPollingInterval: Number(
    import.meta.env.VITE_ORDERS_POLLING_INTERVAL || 5000
  ),
} as const;
