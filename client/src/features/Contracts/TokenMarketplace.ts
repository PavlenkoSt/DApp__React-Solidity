import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { useState } from "react";
import toast from "react-hot-toast";

import TokenMarketplace from "@/entities/contracts/artifacts/contracts/TokenMarketplace.sol/TokenMarketplace.json";
import { tokenMarketplace } from "@/entities/contracts/contractAddresses.json";
import { ITransactionHash } from "@/shared/types/TransactionHash";

const contractConfig = {
  address: tokenMarketplace as ITransactionHash,
  abi: TokenMarketplace.abi,
};

const useCoffeeTokenPrice = () => {
  const { data: price } = useReadContract({
    ...contractConfig,
    functionName: "priceInWei",
  });

  return { price: String(price) };
};

export const useCoffeeTokenBalance = () => {
  const {
    data: balance,
    isLoading,
    isFetching,
    isFetched,
    refetch,
  } = useReadContract({
    ...contractConfig,
    functionName: "getBalance",
  });

  return {
    balance: String(balance),
    isLoading: isLoading || (isFetching && !isFetched),
    refetch,
  };
};

export const useWritePurchaseTokens = () => {
  const { data: hash, writeContract, error, isPending } = useWriteContract();

  const { price } = useCoffeeTokenPrice();
  const { refetch } = useCoffeeTokenBalance();

  const { address } = useAccount();

  const [lastMinedHash, setLastMinedHash] = useState("");

  useWatchContractEvent({
    ...contractConfig,
    eventName: "TokenPurchase",
    args: {
      buyer: address,
    },
    onLogs: (logs) => {
      const lastTransactionHash = logs?.[0]?.transactionHash;
      if (
        lastTransactionHash &&
        lastTransactionHash === hash &&
        lastMinedHash !== hash
      ) {
        setLastMinedHash(hash);
        refetch();
        toast.success(`Purchased CFT`);
      }
    },
  });

  const purchase = async ({ amount }: { amount: string }) => {
    const value = (Number(price) * +amount) as unknown as bigint;

    writeContract({
      ...contractConfig,
      functionName: "purchaseTokens",
      args: [amount],
      value,
    });
  };

  return { purchase, hash, error, isPending };
};
