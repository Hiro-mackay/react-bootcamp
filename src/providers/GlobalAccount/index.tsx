import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";
import { AccountLoaded } from "../../stores/AccountLoaded";

export const GlobalAccout = ({ children }: PropsWithChildren<{}>) => {
  // ユーザー情報取得用のQuery関数
  const [
    userQuery,
    { data: apolloData, error: apolloError, loading: apolloLoding },
  ] = useUserByIdLazyQuery();

  // Recoilのユーザー情報の「Atom」とAuthenticationの「Atom」
  const [globalUser, setGlobalUser] = useRecoilState(GlobalUser);
  const credential = useRecoilValue(AuthCredential);
  const authLoaded = useRecoilValue(AuthCredentialLoaded);

  // Accountのローディング状態を管理
  const setAccountLoaded = useSetRecoilState(AccountLoaded);

  useEffect(() => {
    // Authenticationのローディング終わっており
    if (authLoaded) {
      // credentialにIDが格納されており
      if (credential) {
        // Apollo Clientがローディング中で、ユーザー情報を未取得であれば
        if (!apolloLoding && !globalUser?.id) {
          // ユーザー情報の取得開始
          setAccountLoaded(false);
          userQuery({ variables: { id: credential } });
        }
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [credential, authLoaded]);

  useEffect(() => {
    // onAuthStateChangedのロードが終了したタイミングで、
    // ユーザー情報が取れていれば、Recoilを更新し、
    // 取れていなければ、Recoilをundefinedにする
    if (authLoaded && !apolloLoding) {
      // Credentialにidが格納されていなければデータは格納できない。
      if (apolloData?.users_by_pk?.id && credential) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
      // Accountのローディングを完了
      setAccountLoaded(true);
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    // GraphQLからのエラーがあった場合は、
    // Recoilをudefinedで更新する。
    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
    }
  }, [apolloError]);

  return <>{children}</>;
};
