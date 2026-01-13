import { styled } from "goober";
import { useEffect } from "react";
import type { Order } from "../../types/order";
import { OrderListCard } from "./OrderListCard";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string | null) => void;
}

export const OrderList = ({
  orders,
  isLoading,
  selectedOrderId,
  onSelectOrder,
}: OrderListProps) => {
  // Handle keyboard navigation through the list
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (orders.length === 0) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onSelectOrder(null);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();

        const currentIndex = selectedOrderId
          ? orders.findIndex((order) => order.id === selectedOrderId)
          : -1;

        let nextIndex: number;

        if (event.key === "ArrowDown") {
          nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
        } else {
          nextIndex =
            currentIndex === -1 ? orders.length - 1 : currentIndex - 1;
        }

        onSelectOrder(orders[nextIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [orders, selectedOrderId, onSelectOrder]);

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Orders</Title>
          <Count>Loading...</Count>
        </Header>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Orders</Title>
        <Count>{orders.length}</Count>
      </Header>
      <Content>
        {orders.length === 0 ? (
          <EmptyContainer>
            <p>No orders yet</p>
          </EmptyContainer>
        ) : (
          orders.map((order) => (
            <OrderListCard
              key={order.id}
              order={order}
              isSelected={order.id === selectedOrderId}
              onClick={() => onSelectOrder(order.id)}
            />
          ))
        )}
      </Content>
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
  overflow: hidden;
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled("h1")`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const Count = styled("span")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 1.75rem;
  padding: 0 0.625rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
`;

const Content = styled("div")`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

const LoadingContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  font-size: 0.875rem;
`;

const EmptyContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  font-size: 0.875rem;
`;

const Spinner = styled("div")`
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
