import { ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import { createStrictContext } from "@/shared/utils/strictContext";
import { NETWORK_ID_HEX } from "@/shared/utils/constants";

export const WalletContext = createStrictContext<{
  wallet: string | null;
  connectToWallet: () => void;
  switchNetwork: () => void;
  loading: boolean;
  balance: null | number;
  wrongNetwork: boolean;
}>();

interface IProps {
  children: ReactNode;
}

export function WalletContextProvider({ children }: IProps) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);

  const wrongNetwork = currentNetwork !== NETWORK_ID_HEX;

  const connectToWallet = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please intall Metamask");
      }

      setLoading(true);
      const chainId = await window.ethereum.request<string>({
        method: "eth_chainId",
      });

      if (chainId) {
        setCurrentNetwork(chainId);

        if (chainId !== NETWORK_ID_HEX) throw new Error("Wrong chain id");
      }

      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });

      if (!accounts || !accounts[0]) throw new Error("Accounts not found");

      setWallet(accounts[0]);
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  };

  const switchNetwork = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please intall Metamask");
      }

      setLoading(true);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK_ID_HEX }],
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = connectToWallet;
    const onNetworkChanged = (networkId: string) => {
      const networkIdHex = "0x" + networkId;

      if (networkIdHex !== NETWORK_ID_HEX) {
        setBalance(null);
        setWallet(null);
      } else {
        connectToWallet();
      }

      setCurrentNetwork(networkIdHex);
    };

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on(
      "networkChanged",
      onNetworkChanged as (...args: unknown[]) => void
    );

    return () => {
      if (!window.ethereum) return;

      window.ethereum.off("accountsChanged", onAccountsChanged);
      window.ethereum.off("accountsChanged", onNetworkChanged);
    };
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (wallet && window.ethereum) {
        const balanceHex = await window.ethereum.request<string>({
          method: "eth_getBalance",
          params: [wallet, "latest"],
        });

        if (balanceHex) {
          const balanceEth = ethers.formatEther(balanceHex);
          setBalance(+balanceEth);
        }
      }
    };

    getBalance();
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectToWallet,
        loading,
        balance,
        wrongNetwork,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
