import { responsive } from "@/shared/styles/responsive";
import styled from "styled-components";

export default function GreetingsWidget() {
  return (
    <Container>
      <Title>Send Etherum across the world</Title>
      <Subtitle>
        Explore the crypto world. Buy and sell cryptocurrencies easily.
      </Subtitle>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  @media ${responsive.tablet} {
    text-align: end;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Subtitle = styled.h2``;
