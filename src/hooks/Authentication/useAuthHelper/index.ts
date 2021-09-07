import { useState } from "react";

// どのタイプのエラーなのかを管理するための型
// main: 認証全体での、ネットワークエラーやそのサーバー側のエラーを格納
// name: Name入力フォームに関するエラー
// email: Email入力フォームに関するエラー
// password: Password入力フォームに関するエラー
export type ErrorState = "main" | "name" | "email" | "password";

export const useAuthHelper = () => {
  // 複数のエラーを同時に管理できるようにするためのstate
  // Mapは { key : value }の形でオブジェクトを管理できるJavascriptのデータ構造
  // ただのObjectと違い、便利なメソッドが用意されている。
  const [error, setError] = useState<Map<ErrorState, string>>(new Map());

  // ローディング処理も合わせて共通化
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorHandler = () => {
    // エラーをセットする
  };

  const authExecute = async () => {
    // バリデーションの確認を行う
    // バリデーションが問題なければ、認証ロジックを実行
    // 成功すれば、リダイレクト処理
    // エラーがあれば、エラーをセットして処理を中断
  };

  return {
    authExecute,
    loading,
    error,
    setErrorHandler,
  };
};
