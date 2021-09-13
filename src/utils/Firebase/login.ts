import { fireAuth } from "./config";

// ログインに必要な引数の型を定義しています。
// login()関数では、引数にFireLoginTypeの型、つまり文字型の`email`と`passward`が必要になります。
export type FireLoginType = {
  email: string;
  password: string;
};

/**
 * ログイン処理の実態です。
 * firebaseのログイン処理をラップしているだけです。
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const login = ({ email, password }: FireLoginType) =>
  fireAuth.signInWithEmailAndPassword(email, password);
