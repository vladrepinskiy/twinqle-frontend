import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { env } from "../config/env";
import { useAPI } from "../hooks/useAPI";
import type { CreateOrderRequest, Order } from "../types/order";

interface OrdersContextValue {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  markOrderAsRead: (orderId: string) => Promise<void>;
  createOrder: (order: CreateOrderRequest) => Promise<void>;
  retryShipment: (orderId: string) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const {
    callFetchOrders,
    callMarkOrderAsRead,
    callCreateOrder,
    callRetryShipment,
  } = useAPI();

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: callFetchOrders,
    refetchInterval: env.ordersPollingInterval,
    refetchIntervalInBackground: true,
  });

  const markOrderAsRead = async (orderId: string) => {
    try {
      await callMarkOrderAsRead(orderId);
      refetch();
    } catch (error) {
      console.error("Failed to mark order as read:", error);
    }
  };

  const createOrder = async (data: CreateOrderRequest) => {
    try {
      await callCreateOrder(data);
      refetch();
      toast.success("Order created successfully", {
        description: `Order ${data.merchant_reference} has been created`,
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to create order", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const retryShipment = async (orderId: string) => {
    try {
      await callRetryShipment(orderId);
      refetch();
      toast.success("Shipment retry initiated", {
        description: "The shipment creation will be retried",
      });
    } catch (error) {
      console.error("Failed to retry shipment:", error);
      toast.error("Failed to retry shipment", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const value: OrdersContextValue = {
    orders,
    isLoading,
    error: error as Error | null,
    refetch,
    markOrderAsRead,
    createOrder,
    retryShipment,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
