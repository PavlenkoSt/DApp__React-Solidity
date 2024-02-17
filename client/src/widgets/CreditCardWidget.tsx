import styled from "styled-components";
import toast from "react-hot-toast";
import { GrRefresh } from "react-icons/gr";
import { FiCopy } from "react-icons/fi";
import Logo from "@/shared/icons/Logo";
import { ThemeToken } from "@/shared/types/ThemeToken";
import { responsive } from "@/shared/styles/responsive";
import { shortAddress } from "@/shared/utils/helpers";
import { Loader } from "@/shared/ui/Loader";
import { useThemeToken } from "@/features/ThemeSwitcher";
import { useAccount } from "@/features/Account";

const NETWORK_NAME = import.meta.env.VITE_NETWORK_NAME;

export default function CreditCardWidget() {
  const { token } = useThemeToken();
  const { wallet, balance, wrongNetwork, loading, getBalance } = useAccount();

  const copyWallet = () => {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet);
    toast.success("Wallet address copied");
  };

  const actualizeBalance = async () => {
    try {
      await getBalance();
      toast.success("Balance has been updated");
    } catch (e) {
      toast.error("Something went wrong. Try reload page");
    }
  };

  return (
    <Container $dark={token === ThemeToken.Dark}>
      <Header>
        <Logo width={30} height={30} />
        {!!wallet && <Refresh onClick={actualizeBalance} />}
      </Header>
      <Footer>
        {loading ? (
          <LoadingContainer>
            <Loader color="#fff" withText />
          </LoadingContainer>
        ) : wrongNetwork ? (
          <WrongNetwork>
            Wrong network. Please switch to <b>{NETWORK_NAME}</b>
          </WrongNetwork>
        ) : (
          <>
            {wallet !== null && (
              <Address onClick={copyWallet}>
                Address: {shortAddress(wallet)} <FiCopy />
              </Address>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Refresh = styled(GrRefresh)`
  cursor: pointer;
  font-size: 1rem;
`;

const Footer = styled.div`
  margin-bottom: 10px;
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

const WrongNetwork = styled.div``;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
