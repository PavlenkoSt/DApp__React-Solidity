import { ethers } from "ethers";
import toast from "react-hot-toast";
import { ReactNode, useEffect, useState } from "react";
import { createStrictContext } from "@/shared/utils/strictContext";
import {
  getTokenMarketplaceContract,
  getTransactionContract,
} from "@/entities/contracts";
import { useAccount } from "@/features/Account";

export const ContractsContext = createStrictContext<{
  transactionContract: ethers.Contract | null;
  tokenMarketplaceContract: ethers.Contract | null;
}>();

interface IProps {
  children: ReactNode;
}

export function ContractsContextProvider({ children }: IProps) {
  const { wallet } = useAccount();

  const [transactionContract, setTransactionContract] =
    useState<ethers.Contract | null>(null);
  const [tokenMarketplaceContract, setTokenMarketplaceContract] =
    useState<ethers.Contract | null>(null);

  useEffect(() => {
    const loadTransactionContract = async () => {
      try {
        const contract = await getTransactionContract();
        setTransactionContract(contract);
        const tokenMarketplace = await getTokenMarketplaceContract();
        setTokenMarketplaceContract(tokenMarketplace);
      } catch (e) {
        toast.error("Error loading transaction contract");
      }
    };

    loadTransactionContract();
  }, [wallet]);

  return (
    <ContractsContext.Provider
      value={{
        transactionContract,
        tokenMarketplaceContract,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
}
