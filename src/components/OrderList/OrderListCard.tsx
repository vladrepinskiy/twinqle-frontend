import { styled } from "goober";
import type { Order } from "../../types/order";
import { formatStatus } from "../../utils/format.util";
import { formatStatusReason } from "../../utils/order.util";

interface OrderListCardProps {
  order: Order;
  isSelected: boolean;
  onClick: () => void;
}

export const OrderListCard = ({
  order,
  isSelected,
  onClick,
}: OrderListCardProps) => {
  return (
    <Card $isSelected={isSelected} onClick={onClick} type="button">
      <CardHeader>
        <Reference>{order.merchant_reference}</Reference>
        {order.has_updates && <UpdateDot />}
      </CardHeader>
      <CardBody>
        <Row>
          <Label>Status</Label>
          <Status $status={order.shipment_status}>
            {formatStatus(order.shipment_status as any)}
          </Status>
        </Row>
        {order.shipment_status === "failed" && order.shipment_status_reason && (
          <FailureReason>
            {formatStatusReason(order.shipment_status_reason)}
          </FailureReason>
        )}
        <Row>
          <Label>Recipient</Label>
          <Value>{order.recipient_name}</Value>
        </Row>
        <Row>
          <Label>City</Label>
          <Value>{order.recipient_city}</Value>
        </Row>
      </CardBody>
    </Card>
  );
};

const Card = styled("button")<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: ${(props) => (props.$isSelected ? "#eff6ff" : "white")};
  border: 1px solid ${(props) => (props.$isSelected ? "#3b82f6" : "#e5e7eb")};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;

  &:hover {
    border-color: ${(props) => (props.$isSelected ? "#3b82f6" : "#cbd5e1")};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Reference = styled("span")`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UpdateDot = styled("span")`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
`;

const CardBody = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Label = styled("span")`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Value = styled("span")`
  font-size: 0.75rem;
  font-weight: 500;
  color: #1a1a1a;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FailureReason = styled("p")`
  margin: 0;
  font-size: 0.6875rem;
  color: #991b1b;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Status = styled("span")<{ $status: string }>`
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    if (
      props.$status === "pending_creation" ||
      props.$status === "creation_in_flight" ||
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
      props.$status === "creation_in_flight" ||
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
