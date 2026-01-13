import { styled } from "goober";
import type { Order } from "../../types/order";

interface OrderDetailsShipmentInfoProps {
  order: Order;
}

export const OrderDetailsShipmentInfo = ({
  order,
}: OrderDetailsShipmentInfoProps) => {
  return (
    <>
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
          {order.tracking_code && (
            <Field>
              <FieldLabel>Tracking Code</FieldLabel>
              <FieldValue>{order.tracking_code}</FieldValue>
            </Field>
          )}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Recipient Information</SectionTitle>
        <Grid>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldValue>{order.recipient_name}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Address</FieldLabel>
            <FieldValue>
              {order.recipient_address1}
              {order.recipient_address2 && `, ${order.recipient_address2}`}
            </FieldValue>
          </Field>
          <Field>
            <FieldLabel>City</FieldLabel>
            <FieldValue>{order.recipient_city}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Postal Code</FieldLabel>
            <FieldValue>{order.recipient_postal_code}</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Country</FieldLabel>
            <FieldValue>{order.recipient_country}</FieldValue>
          </Field>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Parcel Details</SectionTitle>
        <Grid>
          <Field>
            <FieldLabel>Weight</FieldLabel>
            <FieldValue>{order.parcel_weight_grams}g</FieldValue>
          </Field>
          <Field>
            <FieldLabel>Dimensions (L×W×H)</FieldLabel>
            <FieldValue>
              {order.parcel_length_cm} × {order.parcel_width_cm} ×{" "}
              {order.parcel_height_cm} cm
            </FieldValue>
          </Field>
        </Grid>
      </Section>
    </>
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
