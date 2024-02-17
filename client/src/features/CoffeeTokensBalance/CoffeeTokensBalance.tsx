import { ContractTransactionResponse } from "ethers";
import toast from "react-hot-toast";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Loader } from "@/shared/ui/Loader";
import { useContracts } from "@/features/Contracts";
import { useAccount } from "@/features/Account";

interface IProps {
  transactionHash: ContractTransactionResponse | null;
  setTransactionHash: Dispatch<
    SetStateAction<ContractTransactionResponse | null>
  >;
}

export function CoffeeTokensBalance({
  transactionHash,
  setTransactionHash,
}: IProps) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [transactionProcessing, setTransactionProccessing] = useState(false);

  const { tokenMarketplaceContract } = useContracts();
  const { getBalance } = useAccount();

  const getCoffeBalance = useCallback(async () => {
    if (!tokenMarketplaceContract) return;
    try {
      setLoading(true);
      const result = await tokenMarketplaceContract.getBalance();
      setBalance(Number(result));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [tokenMarketplaceContract]);

  useEffect(() => {
    getCoffeBalance();
  }, [getCoffeBalance]);

  useEffect(() => {
    const processTransaction = async () => {
      if (!transactionHash) return;

      try {
        setTransactionProccessing(true);

        await transactionHash.wait();

        await Promise.all([getCoffeBalance(), getBalance()]);

        toast.success("Transaction success, coffee tokens arrived");
      } finally {
        setTransactionProccessing(false);
        setTransactionHash(null);
      }
    };

    processTransaction();
  }, [transactionHash, getCoffeBalance]);

  return (
    <Container>
      {!initialLoading && (
        <>
          Balance: <Balance>{balance} CFT</Balance>
        </>
      )}
      {(initialLoading || loading || transactionProcessing) && (
        <Loader size={20} />
      )}
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Balance = styled.span`
  font-weight: 700;
`;
