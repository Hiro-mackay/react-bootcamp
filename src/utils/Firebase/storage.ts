import { storage } from "./config";

/**
 * 必要最低限のアップロード用関数
 * @param ref : アップロードするファイルの参照を指定する。例：'videos/example.mp4'
 * @param file : アップロードするファイルそのもの
 * @returns firebase.storage.UploadTask を返す
 */
export const uploader = (ref: string, file: File) =>
  storage.ref().child(ref).put(file);

/**
 * 必要最低限のダウンロード用関数
 * downloader()で取得したURLは、<video src={url}>とすることで、ファイルを直接ダウンロードすることなく、メディアを表示できる。
 * @param ref : ダウンロードするファイルの参照を指定する。例：'videos/example.mp4'
 * @returns string  ファイルをダウンロードするためのURLを返す。
 */
export const downloader = (ref: string) =>
  storage.ref().child(ref).getDownloadURL();
