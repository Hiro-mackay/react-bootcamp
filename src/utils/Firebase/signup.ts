import { fireAuth } from "./config";

// サインアップに必要な引数の型を定義しています。
// signup()関数では、引数にFireSignupTypeの型、つまり文字型の`email`と`passward`が必要になります。
export type FireSignupType = {
  email: string;
  passward: string;
};

// ログイン処理の実態です。
// firebaseのログイン処理をラップしているだけです。
export const signup = ({ email, passward }: FireSignupType) =>
  fireAuth.createUserWithEmailAndPassword(email, passward);
