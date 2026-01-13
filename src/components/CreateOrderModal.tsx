import { styled } from "goober";
import { useState } from "react";
import { useOrders } from "../providers/orders.provider";
import { faker } from "@faker-js/faker";
import { PARCEL_SIZES, type ParcelSize } from "../constants/parcel.constants";

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

  // Order fields
  const [merchantReference, setMerchantReference] = useState("");

  // Recipient fields
  const [recipient, setRecipient] = useState<{
    name: string;
    address1: string;
    address2: string;
    postal_code: string;
    city: string;
    country: string;
  } | null>(null);

  // Parcel fields
  const [selectedSize, setSelectedSize] = useState<ParcelSize>("M");

  if (!isOpen) return null;

  const handleGenerateRecipient = () => {
    setRecipient({
      name: faker.person.fullName(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      postal_code: faker.location.zipCode(),
      city: faker.location.city(),
      country: faker.location.countryCode(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient) {
      return;
    }

    setIsSubmitting(true);

    try {
      const parcel = PARCEL_SIZES[selectedSize];
      await createOrder({
        merchant_reference: merchantReference,
        recipient: {
          name: recipient.name,
          address1: recipient.address1,
          address2: recipient.address2 || undefined,
          postal_code: recipient.postal_code,
          city: recipient.city,
          country: recipient.country,
        },
        parcel: {
          weight_grams: parcel.weight_grams,
          length_cm: parcel.length_cm,
          width_cm: parcel.width_cm,
          height_cm: parcel.height_cm,
        },
      });
      onClose();

      // Reset form
      setMerchantReference("");
      setRecipient(null);
      setSelectedSize("M");
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
              placeholder="ORD-2024-001"
              autoFocus
            />
          </Field>

          <Section>
            <SectionHeader>
              <SectionTitle>Recipient</SectionTitle>
              <GenerateButton type="button" onClick={handleGenerateRecipient}>
                Generate Recipient
              </GenerateButton>
            </SectionHeader>

            {recipient ? (
              <AddressDisplay>
                <AddressName>{recipient.name}</AddressName>
                <AddressLine>{recipient.address1}</AddressLine>
                {recipient.address2 && (
                  <AddressLine>{recipient.address2}</AddressLine>
                )}
                <AddressLine>
                  {recipient.city}, {recipient.postal_code}
                </AddressLine>
                <AddressLine>{recipient.country}</AddressLine>
              </AddressDisplay>
            ) : (
              <EmptyState>
                Click "Generate Recipient" to create a test recipient
              </EmptyState>
            )}
          </Section>

          <Section>
            <SectionTitle>Parcel Size</SectionTitle>

            <SizeSelector>
              {(["S", "M", "L"] as ParcelSize[]).map((size) => (
                <SizeButton
                  key={size}
                  type="button"
                  $active={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  <SizeLabel>{size}</SizeLabel>
                  <SizeDimensions>
                    {PARCEL_SIZES[size].length_cm}×{PARCEL_SIZES[size].width_cm}
                    ×{PARCEL_SIZES[size].height_cm}cm
                  </SizeDimensions>
                  <SizeWeight>{PARCEL_SIZES[size].weight_grams}g</SizeWeight>
                </SizeButton>
              ))}
            </SizeSelector>
          </Section>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting || !recipient}>
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
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
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
  gap: 0.5rem;
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

const Section = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const SectionHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const SectionTitle = styled("h3")`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const GenerateButton = styled("button")`
  padding: 0.375rem 0.75rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  &:active {
    background: #f3f4f6;
  }
`;

const AddressDisplay = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: white;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
`;

const AddressName = styled("div")`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
`;

const AddressLine = styled("div")`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const EmptyState = styled("div")`
  padding: 2rem 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  font-style: italic;
`;

const SizeSelector = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const SizeButton = styled("button")<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: ${(props) => (props.$active ? "#3b82f6" : "white")};
  color: ${(props) => (props.$active ? "white" : "#1a1a1a")};
  border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "#d1d5db")};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#2563eb" : "#f9fafb")};
    border-color: ${(props) => (props.$active ? "#2563eb" : "#9ca3af")};
  }
`;

const SizeLabel = styled("span")`
  font-size: 1rem;
  font-weight: 700;
  color: inherit;
`;

const SizeDimensions = styled("span")`
  font-size: 0.75rem;
  color: inherit;
  opacity: 0.85;
`;

const SizeWeight = styled("span")`
  font-size: 0.7rem;
  color: inherit;
  opacity: 0.7;
`;
