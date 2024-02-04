import { useStrictContext } from "@/shared/utils/strictContext";
import { ThemeContext } from "./index";

export const useThemeToken = () => {
  return useStrictContext(ThemeContext);
};
