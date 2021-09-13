import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useStyles from "./style";

// VideoSelectコンポーネントのプロップスとして、引数を型定義する
export type VideoSelectProps = {
  videoFile: File | undefined;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  setThumbFile: Dispatch<SetStateAction<File | undefined>>;
};

// 親コンポーネントから、VideoSelectに渡される引数
export const VideoSelect = ({
  videoFile,
  setVideoFile,
  setThumbFile,
}: VideoSelectProps) => {
  const styles = useStyles();

  // これは、動画表示用のURLを格納します。
  // URLは文字列なので、string型を指定しています。
  const [videoURL, setVideoURL] = useState<string>();

  // サムネイルの画像URLを格納する配列state
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);

  // 現在選択中のサムネイルの参照URLを格納する
  const [selectThumbURL, setSelectThumbURL] = useState<string>();

  // サムネイルを生成する関数
  const createThumbnail = (videoRefURL: string) => {
    // サムネイル生成のための準備
    // canvasというタグを使って、<video>のビューを転写する
    // 詳しく知りたい方はhttps://shanabrian.com/web/javascript/canvas-image.php
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // <video>の動画の読み込みが終わったら、<canvas>に<video>と同じサイズに
    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 0;
    };

    // video.currentTime が変更されるたびに呼び出される関数(onseeked)を指定する
    // video.currentTimeの時のvideoのビュー表示を<canvas>に転写して画像を生成
    // video.currentTime が動画の最後になるまで繰り返す
    video.onseeked = () => {
      if (video.currentTime >= video.duration || !context) return;

      //  <video>のビューを<canvas>に転写
      context.drawImage(video, 0, 0);

      // 配列のstateを更新する
      // prev: 変更前のstateの値
      // [...prev,canvas.toDataURL("image/jpeg")]
      // →以前のstateを値を保ちつつ、新しい値を配列に挿入している
      // イメージとしては、array.append(value)
      // 詳しくは：https://zenn.dev/gunners6518/articles/4c06488cfa402e
      setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
      video.currentTime += Math.ceil(video.duration / 3);
    };

    // 動画の読み込み
    video.src = videoRefURL;
    video.load();
  };

  // サムネイルを選択して、
  // 1. 参照URLを`selectThumbURL`に格納
  // 2. 参照URLから画像ファイルを生成し、`setThumbFile`でファイルを親コンポーネントに渡す
  const selectedThumb = (url: string) => {
    //  参照URLを`selectThumbURL`に格納
    setSelectThumbURL(url);

    // 参照URLから画像ファイルを生成し、`setThumbFile`でファイルを親コンポーネントに渡す
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const thumb = new File([blob], "thumb.jpeg");
        setThumbFile(thumb);
      });
  };

  // ファイルを選択した後に、`setFile`を使用して`file`に選択されたファイルを格納。
  // `selectedFile`を`<input />`から呼び出すことで処理を実行します。
  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      setVideoFile(event.currentTarget.files[0]);
    }
  };

  // 「<input type="file" hidden />を直接参照」するための変数
  // これはReact特有の機能で、inputRef.currentに指定した値を代入できます。
  // 今回は、inputRef.currentに<input type="file" hidden />の参照が入ります。
  //
  // <HTMLInputElement>はTypescriptの機能で、HTMLInputElementは型です。
  // inputRefには、HTMLInputElement（<input>のHTML要素の型）が入りますよ、ということを型定義しています。
  const inputRef = useRef<HTMLInputElement>(null);

  // <Button>がクリックされた時に実行する関数を定義します。
  const handleClick = () => {
    // `<Button>`クリック時に、`<input type="file" hidden />`を直接参照して、ファイル選択のイベントを発火させる
    // inputRef.currentを通して、`<input />`への参照にアクセスして、click()という関数を呼んでいます。
    //
    // current?.clickの`?`は、Typescript特有の記法です。
    // inputRef.currentに対して`<input />`への参照が「あったら呼び出す」、「なかったらスルーする」という書き方ができます。
    inputRef.current?.click();
  };

  // useEffectは、第2引数に指定した変数が変更されたら、第1引数の関数を実行します。
  useEffect(() => {
    // ファイルが空の場合は、実行しない
    if (videoFile) {
      // URL.createObjectURLは、ファイルを引数に受け取り、<video>タグで読み込み可能なローカルURLを生成します。
      // URL.createObjectURLで生成されたURLを<video>のsrcにわたすことでファイルを動画で表示できます。
      const videoURL = URL.createObjectURL(videoFile);
      setVideoURL(videoURL);
      createThumbnail(videoURL);
    }

    // file変数が変更されるのを監視する
    // fileはstateで宣言された変数でなければ、変更の検知はされない。
  }, [videoFile]);

  // サムネイルが生成_`されたら、最初のサムネイルを必ず選択にする
  // これで、サムネイルが選択されずに動画をアップロードすることを防ぐ
  useEffect(() => {
    if (thumbnailURLs.length && thumbnailURLs[0] !== selectThumbURL) {
      selectedThumb(thumbnailURLs[0]);
    }
  }, [thumbnailURLs]);

  return (
    <div className={styles.root}>
      {/* 
          これは、React流の`if文`です。
          if(videoURL){<CardMedia />}と同じ意味を成します。
          JSX内では`if文`が使用できないため、このような特殊な書き方をしています。

          <CardMedia />のVideoPlayerCardコンポーネントで使用し書き方と同じです。
        */}
      {videoURL && (
        <div className={styles.full}>
          <CardMedia component="video" src={videoURL} controls />

          <Typography className={styles.textPadding}>サムネイル</Typography>
          <Grid container spacing={2} className={styles.thumbnailContent}>
            {thumbnailURLs.map((url) => {
              return (
                <Grid item xs={4}>
                  <CardMedia
                    // 追加
                    // サムネイルのスタリングを`useStyles`に移行
                    // サムネイル用のスタリングと選択中のサムネイルのスタリングを追加
                    className={`${styles.thumbnail} ${
                      url === selectThumbURL ? styles.selectedThumb : ""
                    }`}
                    image={url}
                    // 追加
                    // サムネイル画像を押したら、その画像をサムネイルとして選択する
                    onClick={() => {
                      selectedThumb(url);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}

      {/*
          inputRefに、 <input type="file" hidden />の参照を渡しています。
          useRefで作成した関数を、"ref"にわたすことで、そのHTML要素に直接アクセスできるようになります。
          Reactで、HTML要素を操作したい時に頻出する書き方です。
        */}
      {/* 
          <input/>の入力値が変更されたら、onChangeが実行されます。
          selectedFileには、onChangeからChangeEvent<HTMLInputElement>という型の引数が渡されます。
        */}
      <input type="file" hidden ref={inputRef} onChange={selectedFile} />

      {/* 
          <Button />に対して、クリックされた時に実行する関数を渡しています。
          <Button>クリック時にhandleClickの`inputRef.current?.click()`が実行されます。
        */}
      {!videoURL && (
        <Button variant="contained" color="primary" onClick={handleClick}>
          ファイルを選択
        </Button>
      )}
    </div>
  );
};
