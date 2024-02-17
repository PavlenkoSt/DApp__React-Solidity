import styled from "styled-components";
import { Loader } from "@/shared/ui/Loader";
import { useCoffeeTokenBalance } from "@/features/Contracts";

export function CoffeeTokensBalance() {
  const { balance, isLoading } = useCoffeeTokenBalance();

  return (
    <Container>
      {isLoading ? (
        <Loader size={20} />
      ) : (
        <>
          Balance: <Balance>{balance} CFT</Balance>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Balance = styled.span`
  font-weight: 700;
`;
