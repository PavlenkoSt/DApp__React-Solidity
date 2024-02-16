import { ContractsContextProvider } from "@/features/Contracts/ContractContext";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ContractsProvider(props: IProps) {
  return <ContractsContextProvider {...props} />;
}
