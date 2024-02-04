import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import RouterProvider from "./RouterProvider";
import ThemeTokenProvider from "./ThemeTokenProvider";

export default function Providers() {
  return (
    <ThemeTokenProvider>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider />
        </ToastProvider>
      </ThemeProvider>
    </ThemeTokenProvider>
  );
}
