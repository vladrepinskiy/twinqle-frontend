import { styled } from "goober";
import type { Order } from "../../types/order";

interface OrderDetailsShipmentInfoProps {
  order: Order;
}

export const OrderDetailsShipmentInfo = ({
  order,
}: OrderDetailsShipmentInfoProps) => {
  return (
    <Section>
      <SectionTitle>Shipment Information</SectionTitle>
      <Grid>
        <Field>
          <FieldLabel>Order ID</FieldLabel>
          <FieldValue>{order.id}</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Carrier</FieldLabel>
          <FieldValue>{order.carrier}</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Barcode</FieldLabel>
          <FieldValue>{order.barcode}</FieldValue>
        </Field>
        {order.carrier_shipment_id && (
          <Field>
            <FieldLabel>Carrier Shipment ID</FieldLabel>
            <FieldValue>{order.carrier_shipment_id}</FieldValue>
          </Field>
        )}
      </Grid>
    </Section>
  );
};

const Section = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled("h3")`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const Field = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const FieldLabel = styled("span")`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const FieldValue = styled("span")`
  font-size: 0.9375rem;
  color: #1a1a1a;
  word-break: break-all;
`;
