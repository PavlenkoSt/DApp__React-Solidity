import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import RouterProvider from "./RouterProvider";
import ThemeTokenProvider from "./ThemeTokenProvider";
import AccountProvider from "./AccountProvider";
import ContractsProvider from "./ContractsProvider";

export default function Providers() {
  return (
    <ThemeTokenProvider>
      <ThemeProvider>
        <AccountProvider>
          <ContractsProvider>
            <ToastProvider>
              <RouterProvider />
            </ToastProvider>
          </ContractsProvider>
        </AccountProvider>
      </ThemeProvider>
    </ThemeTokenProvider>
  );
}
