import { styled } from "goober";
import { useEffect, useState } from "react";
import { useOrders } from "../providers/orders.provider";
import { CreateOrderModal } from "./CreateOrderModal";
import { OrderDetailsEmpty } from "./OrderDetails/OrderDetailsEmpty";
import { OrderDetails } from "./OrderDetails/OrderDetails";
import { OrderList } from "./OrderList/OrderList";

export const Dashboard = () => {
  const { orders, isLoading, error, markOrderAsRead } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handleSelectOrder = (orderId: string | null) => {
    setSelectedOrderId(orderId);

    if (orderId) {
      const order = orders.find((o) => o.id === orderId);
      if (order?.has_updates) {
        markOrderAsRead(orderId);
      }
    }
  };

  const handleCreateOrder = () => {
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    if (selectedOrderId) {
      localStorage.setItem("selectedOrderId", selectedOrderId);
    }
  }, [selectedOrderId]);

  useEffect(() => {
    const storedSelectedOrderId = localStorage.getItem("selectedOrderId");
    if (storedSelectedOrderId) {
      setSelectedOrderId(storedSelectedOrderId);
    }
  }, []);

  if (error) {
    return (
      <ErrorContainer>
        <p>Failed to load orders: {error.message}</p>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Container>
        <OrderList
          orders={orders}
          isLoading={isLoading}
          selectedOrderId={selectedOrderId}
          onSelectOrder={handleSelectOrder}
          onCreateOrder={handleCreateOrder}
        />
        <Panel>
          {selectedOrder ? (
            <OrderDetails order={selectedOrder} />
          ) : (
            <OrderDetailsEmpty />
          )}
        </Panel>
      </Container>

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

const Container = styled("div")`
  display: grid;
  grid-template-columns: 380px 1fr;
  height: 100vh;
  background: #f8f9fa;
`;

const ErrorContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  color: #dc2626;
  font-size: 0.875rem;
`;

const Panel = styled("div")`
  background: white;
  overflow-y: auto;
  border-left: 1px solid #e5e7eb;
`;
