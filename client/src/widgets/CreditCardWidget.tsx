import { useAccount } from "wagmi";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import Logo from "@/shared/icons/Logo";
import { Loader } from "@/shared/ui/Loader";
import { ThemeToken } from "@/shared/types/ThemeToken";
import { responsive } from "@/shared/styles/responsive";
import { shortAddress } from "@/shared/utils/helpers";
import { useThemeToken } from "@/features/ThemeSwitcher";
import { useCurrentBalance } from "@/features/Account";

const NETWORK_NAME = import.meta.env.VITE_NETWORK_ID;

export default function CreditCardWidget() {
  const { token } = useThemeToken();

  const { address, isConnecting, chainId } = useAccount();
  const { eth, balance } = useCurrentBalance();

  const isWrongNetwork = String(chainId) !== String(NETWORK_NAME);

  const copyWallet = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Wallet address copied");
  };

  return (
    <Container $dark={token === ThemeToken.Dark}>
      <Header>
        <Logo width={30} height={30} />
      </Header>
      <Footer>
        {isConnecting ? (
          <LoadingContainer>
            <Loader color="#fff" withText />
          </LoadingContainer>
        ) : isWrongNetwork ? (
          <></>
        ) : (
          <WalletInfo>
            {address !== null && (
              <Address onClick={copyWallet}>
                Address: {shortAddress(address || "")} <FiCopy />
              </Address>
            )}
            {balance.isSuccess && <Balance>{eth} Ethereum</Balance>}
          </WalletInfo>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Footer = styled.div`
  margin-bottom: 10px;
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Address = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  float: left;
  cursor: pointer;
`;

const Balance = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
