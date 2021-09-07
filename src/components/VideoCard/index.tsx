import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import useStyles from "./style";
import { useEffect, useState } from "react";

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
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
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
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      {/* 
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        title={<HeaderTitle title={title} />}
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};
