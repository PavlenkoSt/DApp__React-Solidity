import styled from "styled-components";
import { TransactionForm } from "@/features/SendTransaction";

export default function CreateTransactionWidget() {
  return (
    <Container>
      <Title>Send Ethereum</Title>
      <TransactionForm />
    </Container>
  );
}

const Container = styled.div`
  background-color: rgba(133, 133, 133, 0.3);
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -0 rgba(0, 0, 0, 0.54);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;
