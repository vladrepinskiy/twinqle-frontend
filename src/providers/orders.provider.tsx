import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { env } from "../config/env";
import { useAPI } from "../hooks/useAPI";
import type { Order } from "../types/order";

interface OrdersContextValue {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  markOrderAsRead: (orderId: string) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const { fetchOrders, markOrderAsRead: markOrderAsReadAPI } = useAPI();
  const previousOrdersRef = useRef<Order[]>([]);

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: env.ordersPollingInterval,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    const hasChanged =
      JSON.stringify(previousOrdersRef.current) !== JSON.stringify(orders);

    if (hasChanged && previousOrdersRef.current.length > 0) {
      toast.info("Orders updated", {
        description: `${orders.length} order${orders.length !== 1 ? "s" : ""} in the system`,
      });
    }

    previousOrdersRef.current = orders;
  }, [orders]);

  const markOrderAsRead = async (orderId: string) => {
    try {
      await markOrderAsReadAPI(orderId);
      refetch();
    } catch (error) {
      console.error("Failed to mark order as read:", error);
    }
  };

  const value: OrdersContextValue = {
    orders,
    isLoading,
    error: error as Error | null,
    refetch,
    markOrderAsRead,
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
