import { ReactNode } from "react";
import { ThemeContextProvider } from "@/features/ThemeSwitcher";

interface IProps {
  children: ReactNode;
}

export default function ThemeTokenProvider({ children }: IProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
