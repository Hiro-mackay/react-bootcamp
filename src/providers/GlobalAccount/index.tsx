import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";
import { signout } from "../../utils/Firebase/signout";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";

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

  const query = (id: string) => {
    if (!apolloLoding) {
      // ユーザー情報の取得開始
      userQuery({ variables: { id } });
    }
  };

  useEffect(() => {
    // Authenticationのローディング終わっており
    if (authLoaded) {
      // credentialにIDが格納されており
      if (credential) {
        // ユーザー情報を未取得であれば
        if (!globalUser?.id) {
          // ユーザー情報の取得開始
          query(credential);
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
      if (apolloData?.users_by_pk?.id && credential) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    // GraphQLからのエラーがあった場合は、
    // Recoilをudefinedで更新し、
    // ユーザーにログアウトさせる。
    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
      signout();
    }
  }, [apolloError]);

  return <>{children}</>;
};
