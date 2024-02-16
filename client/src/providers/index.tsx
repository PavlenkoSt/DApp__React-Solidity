import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import RouterProvider from "./RouterProvider";
import ThemeTokenProvider from "./ThemeTokenProvider";
import WalletProvider from "./WalletProvider";

export default function Providers() {
  return (
    <ThemeTokenProvider>
      <ThemeProvider>
        <WalletProvider>
          <ToastProvider>
            <RouterProvider />
          </ToastProvider>
        </WalletProvider>
      </ThemeProvider>
    </ThemeTokenProvider>
  );
}
