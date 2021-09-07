import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { GlobalUser } from "../../../stores/User";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { checkAuthToken } from "./checkAuthToken";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // リダイレクト用の関数
  const navigate = useNavigate();

  // mutationで作成するデータを格納
  const setGlobalUser = useSetRecoilState(GlobalUser);

  // userを追加するためのGraohQL Mutation Hooks
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    // Nameフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!nameRef.current?.value) {
      setError("name", "名前が入力されていません。");
      invalidValidation = true;
    }

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
  const signup = async () => {
    // Firebaseのサインアップ処理を実行
    const { user } = await fireSignup({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ユーザーの登録に失敗しました。");
    }

    // アカウントにトークンが設定されるまで待機
    await checkAuthToken(user.uid);

    // Hasuraにuserを作成する
    const apolloResponse = await insertMutation({
      variables: {
        id: user.uid,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
      // GraphQLでデータが作成された後に確実にデータを格納する
      setGlobalUser(apolloResponse.data?.insert_users_one);

      // `/`へリダイレクト
      navigate("/");
    } else {
      throw new Error("ユーザーの登録に失敗しました。");
    }
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, setErrorHandler, loading } = useAuthHelper(
    signup,
    formValidation
  );

  // GraphQLのエラーがあったら、ここでキャッチして、エラー処理を行う
  // 今回は、エラーメッセージを表示するだけ。
  useEffect(() => {
    if (apolloError?.message) {
      setErrorHandler("main", apolloError.message);
    }
  }, [apolloError]);

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup: authExecute,
    error,
    loading,
  };
};
