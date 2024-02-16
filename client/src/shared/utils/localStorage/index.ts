import { ThemeToken } from "@/shared/types/ThemeToken";
import { LSKeys } from "./LSKeys";
import { adapter } from "./adapter";

export const getThemeFromLS = () => {
  return adapter.get(LSKeys.Theme) as ThemeToken | null;
};
export const setThemeToLS = (val: ThemeToken) => {
  adapter.set(LSKeys.Theme, val);
};
