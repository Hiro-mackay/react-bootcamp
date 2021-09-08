import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { login as fireLogin } from "../../../utils/Firebase/login";

export const useLogin = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // リダイレクト用の関数
  const navigate = useNavigate();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    // Emailフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }

    // Passwordフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }
    // バリデーションが有効か無効化を返す
    return invalidValidation;
  };

  // 実際のサインアップのロジック
  const login = async () => {
    // Firebaseのサインアップ処理を実行
    const { user } = await fireLogin({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ログインに失敗しました。");
    }

    navigate("/");
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, loading } = useAuthHelper(login, formValidation);

  return {
    ref: {
      emailRef,
      passwordRef,
    },
    login: authExecute,
    error,
    loading: loading,
  };
};
