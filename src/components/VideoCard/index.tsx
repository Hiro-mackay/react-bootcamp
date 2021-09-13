import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import useStyles from "./style";
import { useEffect, useState } from "react";

// 子コンポーネントの型定義を使用して、冗長な書き方を防ぐことができる
export type VideoCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

export const VideoCard = ({
  fetcher,
  title,
  owner,
  created,
  views,
}: VideoCardProps) => {
  const styles = useStyles();

  // 動画のサムネイルのURLを格納する
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    // 関数の実態は、`Firebase Storage`からサムネイル用のダウンロードリンクを取得する
    // ここでは、関数の内部構成を知ることなく、実行すると`Promise<string | undefined>`が返される関数であることでしか知らない
    // コンポーネントから画像取得の詳細を隠しつつも、非同期な画像の取得を実現する
    fetcher().then(setImageSrc);
  });

  return (
    // elevation={0} : Cardの影を削除する
    // square: border-radiusを削除する
    <Card className={styles.root} elevation={0} square>
      {/* 
        サムネイルの表示
        今回はno-image.jpgという画像を作成し、デフォルトのサムネイルとした。
        このno-image.jpgを使いたい方は、/public/staticから自由にダウンローそしてください。
      */}
      <CardMedia
        className={styles.media}
        // 画像があればサムネイルを表示
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      {/* 
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        // `Card`の`HeaderTitle`には`title`を渡す
        title={<HeaderTitle title={title} />}
        // `Card`の`SubHeaderContent`には、`owner`、`views`、`created`を渡す
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};
