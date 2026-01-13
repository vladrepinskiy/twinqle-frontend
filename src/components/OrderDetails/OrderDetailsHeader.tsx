import { styled } from "goober";
import type { Order } from "../../types/order";
import { formatStatus } from "../../utils/format.util";

interface OrderDetailsHeaderProps {
  order: Order;
}

export const OrderDetailsHeader = ({ order }: OrderDetailsHeaderProps) => {
  return (
    <Header>
      <HeaderContent>
        <Title>{order.merchant_reference}</Title>
        <StatusBadge $status={order.shipment_status}>
          {formatStatus(order.shipment_status as any)}
        </StatusBadge>
      </HeaderContent>
      {order.has_updates && <UpdateBadge>New Updates</UpdateBadge>}
    </Header>
  );
};

const Header = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderContent = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled("h2")`
  font-size: 1.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const StatusBadge = styled("span")<{ $status: string }>`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${(props) => {
    if (
      props.$status === "pending_creation" ||
      props.$status === "creating_shipment" ||
      props.$status === "confirming"
    )
      return "#fef3c7";
    if (
      props.$status === "created" ||
      props.$status === "in_transit" ||
      props.$status === "out_for_delivery"
    )
      return "#dbeafe";
    if (props.$status === "delivered") return "#d1fae5";
    if (props.$status === "failed" || props.$status === "needs_attention")
      return "#fee2e2";
    return "#f3f4f6";
  }};
  color: ${(props) => {
    if (
      props.$status === "pending_creation" ||
      props.$status === "creating_shipment" ||
      props.$status === "confirming"
    )
      return "#92400e";
    if (
      props.$status === "created" ||
      props.$status === "in_transit" ||
      props.$status === "out_for_delivery"
    )
      return "#1e40af";
    if (props.$status === "delivered") return "#065f46";
    if (props.$status === "failed" || props.$status === "needs_attention")
      return "#991b1b";
    return "#4b5563";
  }};
`;

const UpdateBadge = styled("span")`
  flex-shrink: 0;
  padding: 0.375rem 0.75rem;
  background: #dbeafe;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;
