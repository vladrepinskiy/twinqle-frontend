import { styled } from "goober";
import type { Order } from "../../types/order";
import { formatDate } from "../../utils/format.util";

interface OrderDetailsTimelineProps {
  order: Order;
}

export const OrderDetailsTimeline = ({ order }: OrderDetailsTimelineProps) => {
  return (
    <Section>
      <SectionTitle>Timeline</SectionTitle>
      <Grid>
        <Field>
          <FieldLabel>Created</FieldLabel>
          <FieldValue>{formatDate(order.created_at)}</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Last Updated</FieldLabel>
          <FieldValue>{formatDate(order.updated_at)}</FieldValue>
        </Field>
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
