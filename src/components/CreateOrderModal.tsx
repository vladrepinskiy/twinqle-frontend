import { styled } from "goober";
import { useState } from "react";
import { useOrders } from "../providers/orders.provider";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOrderModal = ({
  isOpen,
  onClose,
}: CreateOrderModalProps) => {
  const { createOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [merchantReference, setMerchantReference] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createOrder({ merchant_reference: merchantReference });
      onClose();
      setMerchantReference("");
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Create New Order</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="merchant_reference">
              Reference <Required>*</Required>
            </Label>
            <Input
              id="merchant_reference"
              type="text"
              value={merchantReference}
              onChange={(e) => setMerchantReference(e.target.value)}
              required
              placeholder="ORDER-12345"
              autoFocus
            />
          </Field>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Order"}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled("div")`
  background: white;
  border-radius: 0.75rem;
  max-width: 450px;
  width: 100%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled("h2")`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled("button")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f3f4f6;
    color: #1a1a1a;
  }
`;

const Form = styled("form")`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Field = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled("label")`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Required = styled("span")`
  color: #dc2626;
`;

const Input = styled("input")`
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #1a1a1a;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled("div")`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const CancelButton = styled("button")`
  padding: 0.625rem 1.25rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const SubmitButton = styled("button")`
  padding: 0.625rem 1.25rem;
  background: #3b82f6;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:active:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
