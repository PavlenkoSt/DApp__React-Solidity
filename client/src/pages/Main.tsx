import styled from "styled-components";
import GreetingsWidget from "@/widgets/GreetingsWidget";
import CreditCardWidget from "@/widgets/CreditCardWidget";
import { PageContainer } from "@/shared/ui/PageContainer";
import { responsive } from "@/shared/styles/responsive";

export default function Main() {
  return (
    <PageContainer>
      <Container>
        <GretContainer>
          <GreetingsWidget />
        </GretContainer>
        <CardContainer>
          <CreditCardWidget />
        </CardContainer>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
