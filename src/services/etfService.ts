import { etfs, getEtf } from "@/lib/etf-data";

export const etfService = {
  list: () => etfs,
  get: getEtf
};
