import { useState } from "react";
import { styled } from "goober";
import type { Order } from "../../types/order";

interface OrderDetailsDocumentsProps {
  order: Order;
}

export const OrderDetailsDocuments = ({
  order,
}: OrderDetailsDocumentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!order.label_pdf_base64 && !order.signature_png_base64) {
    return null;
  }

  // Helper to ensure data URL format (backend may already include prefix)
  const getDataUrl = (data: string, mimeType: string) => {
    return data.startsWith("data:") ? data : `data:${mimeType};base64,${data}`;
  };

  return (
    <Container>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <SectionTitle>Documents</SectionTitle>
        <ToggleIcon $isOpen={isOpen}>▶</ToggleIcon>
      </Header>

      {isOpen && (
        <Content>
          {order.label_pdf_base64 && (
            <Section>
              <SubTitle>Shipping Label</SubTitle>
              <PdfViewer
                src={getDataUrl(order.label_pdf_base64, "application/pdf")}
                title="Shipping Label"
              />
            </Section>
          )}

          {order.signature_png_base64 && (
            <Section>
              <SubTitle>Signature</SubTitle>
              <SignatureImage
                src={getDataUrl(order.signature_png_base64, "image/png")}
                alt="Delivery signature"
              />
            </Section>
          )}
        </Content>
      )}
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

const Header = styled("button")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #fafafa;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

const SectionTitle = styled("h3")`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const ToggleIcon = styled("span")<{ $isOpen: boolean }>`
  font-size: 0.75rem;
  color: #6b7280;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "90deg" : "0deg")});
`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Section = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubTitle = styled("h4")`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
`;

const PdfViewer = styled("iframe")`
  width: 100%;
  height: 500px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

const SignatureImage = styled("img")`
  max-width: 300px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #fafafa;
`;
