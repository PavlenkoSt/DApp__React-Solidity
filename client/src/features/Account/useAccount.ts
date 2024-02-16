import { useStrictContext } from "@/shared/utils/strictContext";
import { AccountContext } from "./index";

export const useAccount = () => {
  return useStrictContext(AccountContext);
};
