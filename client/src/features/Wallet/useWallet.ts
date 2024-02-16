import { useStrictContext } from "@/shared/utils/strictContext";
import { WalletContext } from "./index";

export const useWallet = () => {
  return useStrictContext(WalletContext);
};
