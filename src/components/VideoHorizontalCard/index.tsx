import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";
import { HeaderTitle, HeaderTitleProps } from "../VideoCard/HeaderTitle";
import {
  SubHeaderContent,
  SubHeaderContentProps,
} from "../VideoCard/SubHeaderContent";
import useStyles from "./styles";

// 親コンポーネントから渡されるpropsの型
export type VideoHorizontalCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

export const VideoHorizontalCard = ({
  title,
  owner,
  views,
  created,
  fetcher,
}: VideoHorizontalCardProps) => {
  const styles = useStyles();

  // サムネイルのダウンロードリンクのステート
  const [src, setSrc] = useState<string>();

  // 追加
  useEffect(() => {
    // サムネイルのダウンロードリンクを取得する関数
    fetcher().then(setSrc);
  });

  return (
    // elevation={0} : box-shadowの影を削除する
    // square: border-radiusを削除する
    //
    // 複数のスタイルを適用したい場合、このような形で記述します。
    // `${}`という記法を用いることで、変数の値を文字として展開できます。
    // 例：ten = 10 → `${ten}` == "10"
    // 詳しくはhttps://jsprimer.net/basic/data-type/#template-literal
    <Card
      className={`${styles.root} ${styles.transparent}`}
      elevation={0}
      square
    >
      {/* 
        サムネイル用のメディアコンポーネントを作成

        サムネイルを16:9で表示するために、`CardMedia`を<div>で囲み、widthプロパティを固定しています。
      */}
      <div className={styles.thumbnail}>
        {/*
          取得したサムネイルのダウンロードリンクを参照する
        */}
        <CardMedia className={styles.media} image={src} title="Thumbnail" />
      </div>

      {/*
        `Home`で作成した<HeaderTitle>と<SubHeaderContent>を流用する
      */}
      <CardHeader
        className={styles.contentPadding}
        title={<HeaderTitle title={title} />}
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};
