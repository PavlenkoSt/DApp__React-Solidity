import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export const useCurrentBalance = () => {
  const { address } = useAccount();
  const balance = useBalance({
    address,
  });

  return {
    wei: balance.data?.value ? String(balance.data.value) : "0",
    eth: balance.data?.value ? formatEther(balance.data.value) : "0",
    balance,
  };
};
