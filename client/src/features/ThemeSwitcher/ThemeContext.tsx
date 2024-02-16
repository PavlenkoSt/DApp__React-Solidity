import { ReactNode, useState } from "react";
import { ThemeToken } from "@/shared/types/ThemeToken";
import { getThemeFromLS } from "@/shared/utils/localStorage";
import { createStrictContext } from "@/shared/utils/strictContext";

export const ThemeContext = createStrictContext<{
  token: ThemeToken;
  setToken: (token: ThemeToken) => void;
}>();

const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

interface IProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: IProps) {
  const [token, setToken] = useState<ThemeToken>(
    getThemeFromLS() || (systemDark ? ThemeToken.Dark : ThemeToken.Default)
  );

  return (
    <ThemeContext.Provider value={{ token, setToken }}>
      {children}
    </ThemeContext.Provider>
  );
}
