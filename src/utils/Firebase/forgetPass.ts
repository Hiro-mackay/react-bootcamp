import { fireAuth } from "./config";

export const forgetPass = (email: string) =>
  fireAuth.sendPasswordResetEmail(email);
