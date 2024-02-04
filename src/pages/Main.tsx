import styled from "styled-components";
import GreetingsWidget from "@/widgets/GreetingsWidget";
import CreditCardWidget from "@/widgets/CreditCardWidget";
import CreateTransactionWidget from "@/widgets/CreateTransactionWidget";
import { PageContainer } from "@/shared/ui/PageContainer";
import { responsive } from "@/shared/styles/responsive";

export default function Main() {
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
      <CreateTransactionWidget />
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

const GretContainer = styled.div`
  flex: 1;
`;

const CardContainer = styled.div`
  flex: 1;
`;
