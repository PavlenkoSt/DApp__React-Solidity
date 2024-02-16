import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import toast from "react-hot-toast";
import { ethProvider } from "@/shared/utils/ethProvider";
import { Loader } from "@/shared/ui/Loader";
import { Transaction, ITransaction } from "./index";
import { responsive } from "@/shared/styles/responsive";
import { useContracts } from "../Contracts";

export function TransactionList() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const { transactionContract } = useContracts();

  useEffect(() => {
    if (!ethProvider || !transactionContract) return;

    const getTransactionsFromContract = async () => {
      try {
        setLoading(true);
        const transactions: ITransaction[] =
          await transactionContract.getAllTransactions();

        setTransactions(transactions);
      } catch (e) {
        toast.error("Something went wrong");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getTransactionsFromContract();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader color={theme.primaryColor} withText />
      ) : !transactions.length ? (
        <EmptyMessage>No transactions yet</EmptyMessage>
      ) : (
        <TransactionsContainer>
          {transactions.map((transaction, idx) => (
            <Transaction
              transaction={transaction}
              key={transaction[5] || idx}
            />
          ))}
        </TransactionsContainer>
      )}
    </Container>
  );
}

const Container = styled.div``;

const TransactionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media ${responsive.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  @media ${responsive.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
`;
