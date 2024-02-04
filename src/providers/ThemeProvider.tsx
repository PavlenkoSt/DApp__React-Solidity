import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { themes, useThemeToken } from "@/features/ThemeSwitcher";
import { GlobalStyle } from "@/shared/styles/global";

interface IProps {
  children: ReactNode;
}

// Must be wrapped in ThemeTokenProvider
export default function ThemeProviderWrapper({ children }: IProps) {
  const { token } = useThemeToken();
  const theme = themes[token];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
