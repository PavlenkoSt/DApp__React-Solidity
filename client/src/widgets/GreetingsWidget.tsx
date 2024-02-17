import { useConnect, useAccount } from "wagmi";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Button } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";
import { responsive } from "@/shared/styles/responsive";

const NETWORK_NAME = import.meta.env.VITE_NETWORK_NAME;
const NETWORK_ID = import.meta.env.VITE_NETWORK_ID;

export default function GreetingsWidget() {
  const { isConnected, isConnecting, chainId, connector } = useAccount();

  const { connectors, connect } = useConnect();

  const isWrongChain = String(chainId) !== String(NETWORK_ID);

  const injectedConnector = connectors[0];

  const switchChain = async () => {
    if (!connector?.switchChain) return;

    try {
      await connector!.switchChain({ chainId: +NETWORK_ID });
    } catch (e) {
      toast.error("Something went wrong, try change chain manually");
    }
  };

  return (
    <Container>
      <Title>Send Etherum across the world</Title>
      <Subtitle>
        Explore the crypto world. Buy and sell cryptocurrencies easily.
      </Subtitle>
      {isConnecting ? (
        <LoaderContainer>
          <Loader withText />
        </LoaderContainer>
      ) : isWrongChain ? (
        <>
          {!connector?.switchChain ? (
            <div> Switch network to {NETWORK_NAME}</div>
          ) : (
            <Button onClick={switchChain}>
              Switch network to {NETWORK_NAME}
            </Button>
          )}
        </>
      ) : !isConnected ? (
        <Button onClick={() => connect({ connector: injectedConnector })}>
          Connect your account
        </Button>
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
