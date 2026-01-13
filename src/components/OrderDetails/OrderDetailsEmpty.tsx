import { styled } from "goober";

export const OrderDetailsEmpty = () => {
  return (
    <Container>
      <Icon
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </Icon>
      <Title>No Order Selected</Title>
      <Description>
        Select an order from the list to view its details
      </Description>
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
`;

const Icon = styled("svg")`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  color: #d1d5db;
`;

const Title = styled("h3")`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
`;

const Description = styled("p")`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;
