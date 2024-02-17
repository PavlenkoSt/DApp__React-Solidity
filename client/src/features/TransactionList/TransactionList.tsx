import styled, { useTheme } from "styled-components";
import { Loader } from "@/shared/ui/Loader";
import { responsive } from "@/shared/styles/responsive";
import { useReadAllTransactions } from "@/features/Contracts";
import { Transaction } from "./index";

export function TransactionList() {
  const theme = useTheme();

  const { transactions, isLoading, isError } = useReadAllTransactions();

  return (
    <Container>
      {isLoading ? (
        <Loader color={theme.primaryColor} withText />
      ) : isError ? (
        <EmptyMessage>Something went wrong</EmptyMessage>
      ) : !transactions?.length ? (
        <EmptyMessage>No transactions yet</EmptyMessage>
      ) : (
        <TransactionsContainer>
          {transactions.map((transaction, idx) => (
            <Transaction
              transaction={transaction}
              key={transaction.timestamp || idx}
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
