import { useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import toast from "react-hot-toast";

import TransactionsContract from "@/entities/contracts/artifacts/contracts/Transactions.sol/Transactions.json";
import { transactions } from "@/entities/contracts/contractAddresses.json";
import { ITransaction } from "@/features/TransactionList";
import { shortAddress } from "@/shared/utils/helpers";
import { ITransactionHash } from "@/shared/types/TransactionHash";

const contractConfig = {
  address: transactions as ITransactionHash,
  abi: TransactionsContract.abi,
};

export const useReadAllTransactions = () => {
  const { data, isLoading, isError, refetch } = useReadContract({
    ...contractConfig,
    functionName: "getAllTransactions",
  });

  return {
    transactions: [...((data || []) as ITransaction[])].reverse(),
    isLoading,
    isError,
    refetch,
  };
};

export const useWriteTransaction = () => {
  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const { address } = useAccount();

  const [lastMinedHash, setLastMinedHash] = useState("");

  useWatchContractEvent({
    ...contractConfig,
    eventName: "Transfer",
    args: {
      from: address,
    },
    onLogs: (logs) => {
      const lastTransactionHash = logs?.[0]?.transactionHash;
      if (
        lastTransactionHash &&
        lastTransactionHash === hash &&
        lastMinedHash !== hash
      ) {
        toast.success(`Transaction ${shortAddress(hash)} has been mined`);
        setLastMinedHash(hash);
      }
    },
  });

  const sendTransaction = async ({
    toAddress,
    amount,
    keyword,
    message,
  }: {
    toAddress: string;
    amount: string;
    keyword: string;
    message: string;
  }) => {
    const value = parseEther(amount, "wei");

    writeContract({
      ...contractConfig,
      functionName: "setTransaction",
      args: [toAddress, keyword, message],
      value,
    });
  };

  return { sendTransaction, hash, error, isPending };
};
