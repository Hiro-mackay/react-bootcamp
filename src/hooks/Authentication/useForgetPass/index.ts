import { useRef, useState } from "react";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { forgetPass } from "../../../utils/Firebase/forgetPass";

export const useForgetPass = () => {
  // ユーザーが入力した値を読み取るための`ref`
  const emailRef = useRef<HTMLInputElement>(null);

  const [sendSuccess, setSendSuccess] = useState(false);

  const formValidation = (setError: SetErrorFn) => {
    // Emailフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      return true;
    }

    // バリデーションが有効か無効化を返す
    return false;
  };

  const sendEmail = async () => {
    await forgetPass(emailRef.current?.value || "");
    setSendSuccess(true);
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, loading } = useAuthHelper(
    sendEmail,
    formValidation
  );

  return {
    ref: {
      emailRef,
    },
    loading,
    error,
    sendEmail: authExecute,
    sendSuccess,
  };
};
