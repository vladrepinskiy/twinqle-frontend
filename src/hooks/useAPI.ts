import { env } from "../config/env";
import type { CreateOrderRequest, Order } from "../types/order";

export const useAPI = () => {
  const API_BASE_URL = env.apiBaseUrl;

  const callFetchOrders = async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const callGetOrder = async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Order not found");
      }
      throw new Error("Failed to fetch order");
    }

    return response.json();
  };

  const callCreateOrder = async (data: CreateOrderRequest): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to create order");
    }

    return response.json();
  };

  const callMarkOrderAsRead = async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/mark-read`, {
      method: "PATCH",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Order not found");
      }
      throw new Error("Failed to mark order as read");
    }

    return response.json();
  };

  return {
    callFetchOrders,
    callGetOrder,
    callCreateOrder,
    callMarkOrderAsRead,
  };
};
