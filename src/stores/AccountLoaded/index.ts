import { atom } from "recoil";

export type AccountLoadedType = boolean;

export const AccountLoaded = atom<AccountLoadedType>({
  key: "AccountLoaded",
  default: false,
});
