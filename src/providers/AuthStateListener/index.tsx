import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { fireAuth } from "../../utils/Firebase/config";

export const AuthStateListener = ({ children }: PropsWithChildren<{}>) => {
  useEffect(() => {
    const unsubscriber = fireAuth.onAuthStateChanged(async (credential) => {
      const uid = credential?.uid;
    });
    return unsubscriber;
  });
  return <>{children}</>;
};
