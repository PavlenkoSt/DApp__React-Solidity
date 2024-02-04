import styled from "styled-components";
import Logo from "@/shared/icons/Logo";
import { ThemeToken } from "@/shared/types/ThemeToken";
import { responsive } from "@/shared/styles/responsive";
import { useThemeToken } from "@/features/ThemeSwitcher";
import { useWallet } from "@/features/Wallet/useWallet";
import { shortAddress } from "@/shared/utils/helpers";
import { NETWORK_NAME } from "@/shared/utils/constants";
import { Loader } from "@/shared/ui/Loader";

export default function CreditCardWidget() {
  const { token } = useThemeToken();
  const { wallet, balance, wrongNetwork, loading } = useWallet();

  return (
    <Container $dark={token === ThemeToken.Dark}>
      <Logo width={30} height={30} />
      <Footer>
        {loading ? (
          <LoadingContainer>
            <Loader color="#fff" />
          </LoadingContainer>
        ) : wrongNetwork ? (
          <WrongNetwork>
            Wrong network. Please switch to <b>{NETWORK_NAME}</b>
          </WrongNetwork>
        ) : (
          <>
            {wallet !== null && (
              <Address>Address: {shortAddress(wallet)}</Address>
            )}
            {balance !== null && <Balance>{balance} Ethereum</Balance>}
          </>
        )}
      </Footer>
    </Container>
  );
}

const Container = styled.div<{ $dark: boolean }>`
  width: 250px;
  height: 150px;
  background: ${(props) =>
    props.$dark
      ? `radial-gradient(
    circle,
    rgba(138, 101, 117, 1) 0%,
    rgba(97, 124, 156, 1) 100%
    )`
      : `radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
    )`};
  border-radius: 15px;
  box-shadow: 0px 0px 32px -2px rgba(0, 0, 0, 0.54);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${responsive.mobileL} {
    width: 320px;
    height: 200px;
  }
`;

const Footer = styled.div`
  margin-bottom: 10px;
`;

const Address = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Balance = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const WrongNetwork = styled.div``;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
