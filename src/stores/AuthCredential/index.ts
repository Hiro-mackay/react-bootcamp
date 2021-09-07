import { atom } from "recoil";

export type AuthCredentialType = string | undefined;

export const AuthCredential = atom<AuthCredentialType>({
  key: "AuthCredential",
  default: undefined,
});
