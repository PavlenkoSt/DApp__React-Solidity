import styled from "styled-components";
import { CoffeeTokensForm } from "@/features/BuyCoffeTokens";
import { CoffeeTokensBalance } from "@/features/CoffeeTokensBalance/CoffeeTokensBalance";

export default function CoffeeTokensWidget() {
  return (
    <Container>
      <Title>Coffee tokens</Title>
      <CoffeeTokensBalance />
      <Title>Buy coffee tokens</Title>
      <CoffeeTokensForm />
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
