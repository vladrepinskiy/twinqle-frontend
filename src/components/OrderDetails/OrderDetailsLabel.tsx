import { styled } from "goober";
import type { Order } from "../../types/order";

interface OrderDetailsLabelProps {
  order: Order;
}

export const OrderDetailsLabel = ({ order }: OrderDetailsLabelProps) => {
  if (!order.label_pdf_base64) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>Label</SectionTitle>
      <Button type="button">Download Label PDF</Button>
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

const Button = styled("button")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  background: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #2563eb;
  }
`;
