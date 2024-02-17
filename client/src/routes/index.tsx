import styled from "styled-components";
import { createFileRoute } from "@tanstack/react-router";
import CreateTransactionWidget from "@/widgets/CreateTransactionWidget";
import CreditCardWidget from "@/widgets/CreditCardWidget";
import GreetingsWidget from "@/widgets/GreetingsWidget";
import CoffeeTokensWidget from "@/widgets/CoffeeTokensWidget";
import { PageContainer } from "@/shared/ui/PageContainer";
import { responsive } from "@/shared/styles/responsive";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageContainer>
      <Top>
        <GretContainer>
          <GreetingsWidget />
        </GretContainer>
        <CardContainer>
          <CreditCardWidget />
        </CardContainer>
      </Top>
      <Forms>
        <CreateTransactionWidget />
        <CoffeeTokensWidget />
      </Forms>
    </PageContainer>
  );
}

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  align-items: center;
  @media ${responsive.tablet} {
    flex-direction: row;
    gap: 60px;
  }
`;

const Forms = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media ${responsive.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const GretContainer = styled.div`
  flex: 1;
`;

const CardContainer = styled.div`
  flex: 1;
`;
