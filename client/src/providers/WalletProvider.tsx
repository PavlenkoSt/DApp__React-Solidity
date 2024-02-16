import { WalletContextProvider } from "@/features/Wallet/WalletContext";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function WalletProvider(props: IProps) {
  return <WalletContextProvider {...props} />;
}
