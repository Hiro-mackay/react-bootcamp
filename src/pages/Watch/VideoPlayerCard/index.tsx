import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyles from "./style";

// 親コンポーネントから渡されるpropsの型
export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  date: Date | undefined;
  fetcher: () => Promise<string | undefined>;
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  date,
  fetcher,
}: VideoPlayerCardProps) => {
  const styles = useStyles();

  // 動画のダウンロードリンクURLを格納するためのステート
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    // Firebas Storageから動画のダウンロードリンクを取得する
    fetcher().then(setSrc);
  });

  return (
    // `box-shadow`と`border-radius`を除去
    <Card className={styles.transparent} elevation={0} square>
      {/* 
        ビデオプレイヤー

        CardMediaは、画像の他に動画,音声などのメディア系コンポーネントの作成もできます。
        メディアの指定は、`component`というプロパティに指定のメディアコンポーネント`img`,`video`,`audio`などのHTMLタグを指定するだけです。
        そして、`src`にメディアのパスを指定すると画面に表示されます。
        そして、今回はビデオプレイヤーに操作用のコントローラーを表示させたいので、`controls`というプロパティを指定しています。
        (`controls`はMaterial-UI特有のプロパティではなく、<video>HTMLタグのプロパティです。)
      */}
      <CardMedia component="video" controls src={src} />

      {/* タイトル表示エリア */}
      <CardContent className={styles.paddingHorizontalLess}>
        {/* 
          `Typography`コンポーネントは、テキストコンポーネントを簡単に作ることができます。
          今回、componentには`h2`を、`variant`には`h6`を指定しています。
          これは、HTMLタグは`<h2>`を使いスタリングは、Material-UIで用意されているh6用のスタリングを使うよう指示しています。
          <h2>タグ使いたいけど、フォントサイズなどはh6でのサイズを使いたい場合などに便利です。
        */}
        <Typography component="h2" variant="h6">
          {title}
        </Typography>

        {/* 
          color="textSecondary"はMaterial-UIでデフォルトで設定されているtextSecondaryという名前のカラーを指定しています。
          独自のカラーを使いたい場合は、下記を参考にカスタマイズが必要です。
          https://material-ui.com/customization/color/#color-tool
        */}
        <Typography variant="body2" color="textSecondary">
          {views} 回視聴 • {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </CardContent>

      {/* タイトル下の横線 */}
      <Divider />

      {/* 
        stylesの適用
      */}
      <CardHeader
        className={styles.paddingHorizontalLess}
        avatar={<Avatar />}
        title={ownerName}
        subheader="0 subscribers"
      />

      {/* 説明文エリア */}
      <CardContent className={styles.descPadding}>{description}</CardContent>
    </Card>
  );
};
