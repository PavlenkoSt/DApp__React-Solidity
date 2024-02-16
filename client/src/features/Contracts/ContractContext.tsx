import { ethers } from "ethers";
import toast from "react-hot-toast";
import { ReactNode, useEffect, useState } from "react";
import { createStrictContext } from "@/shared/utils/strictContext";
import { getTransactionContract } from "@/entities/contracts";
import { useAccount } from "../Account";

export const ContractsContext = createStrictContext<{
  transactionContract: ethers.Contract | null;
}>();

interface IProps {
  children: ReactNode;
}

export function ContractsContextProvider({ children }: IProps) {
  const { wallet } = useAccount();

  const [transactionContract, setTransactionContract] =
    useState<ethers.Contract | null>(null);

  useEffect(() => {
    const loadTransactionContract = async () => {
      try {
        const contract = await getTransactionContract();
        setTransactionContract(contract);
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
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
}
