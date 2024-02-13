import styled from "styled-components";
import { Button } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";
import { responsive } from "@/shared/styles/responsive";
import { NETWORK_NAME } from "@/shared/utils/constants";
import { useWallet } from "@/features/Wallet/useWallet";

export default function GreetingsWidget() {
  const { wallet, connectToWallet, loading, wrongNetwork, switchNetwork } =
    useWallet();

  return (
    <Container>
      <Title>Send Etherum across the world</Title>
      <Subtitle>
        Explore the crypto world. Buy and sell cryptocurrencies easily.
      </Subtitle>
      {loading ? (
        <LoaderContainer>
          <Loader withText />
        </LoaderContainer>
      ) : wrongNetwork ? (
        <Button onClick={switchNetwork}>
          Switch network to {NETWORK_NAME}
        </Button>
      ) : !wallet ? (
        <Button onClick={connectToWallet}>Connect your account</Button>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media ${responsive.tablet} {
    text-align: end;
    align-items: flex-end;
  }
`;

const Title = styled.h1``;

const Subtitle = styled.h2``;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
