import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import RouterProvider from "./RouterProvider";
import ThemeTokenProvider from "./ThemeTokenProvider";
import WagmiProvider from "./WagmiProvider";

export default function Providers() {
  return (
    <ThemeTokenProvider>
      <ThemeProvider>
        <WagmiProvider>
          <ToastProvider>
            <RouterProvider />
          </ToastProvider>
        </WagmiProvider>
      </ThemeProvider>
    </ThemeTokenProvider>
  );
}
