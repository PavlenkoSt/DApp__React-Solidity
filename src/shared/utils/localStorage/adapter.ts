import { LSKeys } from "./LSKeys";

export const adapter = {
  set: (key: LSKeys, val: string) => localStorage.setItem(key, val),
  get: (key: LSKeys) => localStorage.getItem(key),
  delete: (key: LSKeys) => localStorage.removeItem(key),
};
