import { ContractsContext } from "./index";
import { useStrictContext } from "@/shared/utils/strictContext";

export const useContracts = () => {
  return useStrictContext(ContractsContext);
};
