import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// firebaseの初期化
admin.initializeApp(functions.config().firebase);

/**
 * Firebase FunctionsにprocessSignUpと言う名前の関数を作成
 * `functions.auth.user().onCreate`で、Authenticationでuserが作成された時に実行される関数を定義
 */
exports.processSignUp = functions.auth.user().onCreate((user) => {
  // Hasura用のカスタムクレームの作成
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  // userのトークンにカスタムクレームを追加する
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ refreshTime: admin.firestore.FieldValue.serverTimestamp() });
    });
});
