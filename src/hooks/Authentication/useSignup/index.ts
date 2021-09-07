import { useRef, useState } from "react";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // エラーが発生したら全てここに格納する
  const [error, setError] = useState<Error>();

  // サインアップの処理が実行されている間、trueになる。
  const [loading, setLoading] = useState<boolean>(false);

  // userを追加するためのGraohQL Mutation Hooks
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  // 実際のサインアップのロジック
  const signup = async () => {
    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value
    ) {
      // 一つでも値が入っていないフォームがあったら、処理を中断
      // 最終的にここで、エラー処理を入れてユーザーにエラーを表示する
      return;
    }

    try {
      setLoading(true);
      // Firebaseのサインアップ処理を実行
      const { user } = await fireSignup({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (!user?.uid) {
        throw new Error("ユーザーの登録に失敗しました。");
      }

      // Hasuraにuserを作成する
      const apolloResponse = await insertMutation({
        variables: {
          id: user.uid,
          name: nameRef.current.value,
          email: emailRef.current.value,
        },
      });

      if (apolloResponse.data?.insert_users_one?.id) {
        // `/`へリダイレクト
      } else {
        throw new Error("ユーザーの登録に失敗しました。");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup,
    error,
    loading,
  };
};
