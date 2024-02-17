import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  http,
  createConfig,
  WagmiProvider as WagmiProviderComponent,
} from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const config = createConfig({
  chains: [sepolia, localhost],
  transports: {
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
  connectors: [injected()],
});

const queryClient = new QueryClient();

interface IProps {
  children: ReactNode;
}

export default function WagmiProvider({ children }: IProps) {
  return (
    <WagmiProviderComponent config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProviderComponent>
  );
}
