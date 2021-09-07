import { useState } from "react";
import { storage } from "../../utils/Firebase/config";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // Firebase Storageにファイルをアップロードする処理
  const uploadStorage = (id: string, file: File, path: string) => {
    // ファイルから拡張子を抜き出す
    const exe = file.name.split(".").pop();

    // `ref`でファイルのパスを指定する。
    // → PCのディレクトリと同じ考え方。ref('videos/video.mp4')とすれば、videosという階層にvideo.mp4を作成する
    //
    // putでファイルのアップロードを実際に行う
    // `ref`で指定したパスに対して、ファイルの実態をアップロードする
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    // 処理が始まったら、ローディング中にする
    setLoading(true);

    // try-catch構文でPromise(アップロード処理)のエラーをキャッチする
    try {
      // 動画のアップロード処理
      // 動画は全て`videos`と言う階層に保存される
      const videoUploadTask = await uploadStorage(
        file.video.name,
        file.video,
        "videos"
      );

      // 画像サムネイルのアップロード処理
      // 画像サムネイルは全て`thumbnails`に保存される
      const thumbnailUploadTask = await uploadStorage(
        file.thumbnail.name,
        file.thumbnail,
        "thumbnails"
      );
    } catch (error) {
      // アップロードの途中でエラーが発生したら、処理を中断して、ここに記述される処理が行われる

      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      // 全ての処理が完了したら、ローディングをfalseにする
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
  };
};
