import firebase from "firebase";

// Firebase コンソールの「プロジェクトの設定」>「SDK の設定と構成」から「構成」を選択し、そのままコピペ
const firebaseConfig = {
  apiKey: "AIzaSyCm8ZVPFvB4O5YVyNqA-16zWrRpbxd0RVQ",
  authDomain: "react-bootcamp-78947.firebaseapp.com",
  projectId: "react-bootcamp-78947",
  storageBucket: "react-bootcamp-78947.appspot.com",
  messagingSenderId: "236750478038",
  appId: "1:236750478038:web:fc2e6a6e2f856cae1c4777",
};

// firebaseパッケージをAPI Keyで初期化
// Firebaseコンソールでさksウエイ他アプリとReactを紐づける処理
firebase.initializeApp(firebaseConfig);

// 認証用のfirebaseモジュール
export const fireAuth = firebase.auth();

// ストレージ用のfirebaseモジュール
export const storage = firebase.storage();

// firestoreのfirebaseモジュール
export const firestore = firebase.firestore();

// 初期化済みのfirebaseパッケージを確実に使用するためのexport defaultでfirebaseパッケージをexport
export default firebase;
