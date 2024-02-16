import { createLazyFileRoute } from "@tanstack/react-router";
import { TransactionList } from "@/features/TransactionList";
import { PageContainer } from "@/shared/ui/PageContainer";

export const Route = createLazyFileRoute("/transactions/")({
  component: Transactions,
});

function Transactions() {
  return (
    <PageContainer>
      <TransactionList />
    </PageContainer>
  );
}
