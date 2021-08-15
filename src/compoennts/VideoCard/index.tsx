import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle } from "./HeaderTitle";
import { SubHeaderContent } from "./SubHeaderContent";
import useStyles from "./style";

export const VideoCard = () => {
  const styles = useStyles();
  return (
    // elevation={0} : Cardの影を削除する
    <Card className={styles.root} elevation={0} square>
      {/* 
        サムネイルの表示
        今回はno-image.jpgという画像を作成し、デフォルトのサムネイルとした。
        このno-image.jpgを使いたい方は、/public/staticから自由にダウンローそしてください。
      */}
      <CardMedia
        className={styles.media}
        image="/static/no-image.jpg"
        title="Thumbnail"
      />

      {/* 
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        title={<HeaderTitle />}
        subheader={<SubHeaderContent />}
      />
    </Card>
  );
};
