import { styled } from "goober";
import type { Order } from "../../types/order";
import { OrderDetailsHeader } from "./OrderDetailsHeader";
import { OrderDetailsShipmentInfo } from "./OrderDetailsShipmentInfo";
import { OrderDetailsTimeline } from "./OrderDetailsTimeline";
import { OrderDetailsDocuments } from "./OrderDetailsDocuments";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <Container>
      <OrderDetailsHeader order={order} />
      <OrderDetailsShipmentInfo order={order} />
      <OrderDetailsTimeline order={order} />
      <OrderDetailsDocuments order={order} />
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 800px;
`;
