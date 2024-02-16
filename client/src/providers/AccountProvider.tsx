import { AccountContextProvider } from "@/features/Account/AccountContext";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function AccountProvider(props: IProps) {
  return <AccountContextProvider {...props} />;
}
