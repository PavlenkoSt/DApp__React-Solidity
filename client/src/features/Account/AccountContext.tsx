import { ReactNode, useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { createStrictContext } from "@/shared/utils/strictContext";

const NETWORK_ID_HEX = import.meta.env.VITE_NETWORK_ID_HEX;

export const AccountContext = createStrictContext<{
  wallet: string | null;
  connectToWallet: () => Promise<void>;
  switchNetwork: () => Promise<void>;
  getBalance: () => Promise<void>;
  loading: boolean;
  balance: null | number;
  wrongNetwork: boolean;
}>();

interface IProps {
  children: ReactNode;
}

export function AccountContextProvider({ children }: IProps) {
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

  const getBalance = useCallback(async () => {
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
  }, [wallet]);

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = connectToWallet;
    const onChainChanged = () => window.location.reload();

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);

    return () => {
      if (!window.ethereum) return;

      window.ethereum.off("accountsChanged", onAccountsChanged);
      window.ethereum.off("chainChanged", onChainChanged);
    };
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <AccountContext.Provider
      value={{
        wallet,
        loading,
        balance,
        wrongNetwork,
        connectToWallet,
        switchNetwork,
        getBalance,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
