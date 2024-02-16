import { ThemeToken } from "@/shared/types/ThemeToken";

const defaultTheme = {
  primaryColor: "rgb(33, 33, 33)",
  secondaryColor: "#fff",
  tertiaryColor: "#fff",
  pageBg: "#fff",
  borderColor: "rgba(12, 13, 15, 0.7)",
};

const darkTheme = {
  primaryColor: "#fff",
  secondaryColor: "rgb(33, 33, 33)",
  tertiaryColor: "#007bff",
  pageBg: "rgb(33, 33, 33)",
  borderColor: "#838383",
};

export const themes = {
  [ThemeToken.Default]: defaultTheme,
  [ThemeToken.Dark]: darkTheme,
};
