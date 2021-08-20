import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";

export const VideoPlayerCard = () => {
  const styles = useStyles();

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
      <CardMedia
        component="video"
        controls
        src="/static/production ID_4763824.mp4"
      />

      {/* タイトル表示エリア */}
      <CardContent className={styles.paddingHorizontalLess}>
        {/* 
          `Typography`コンポーネントは、テキストコンポーネントを簡単に作ることができます。
          今回、componentには`h2`を、`variant`には`h6`を指定しています。
          これは、HTMLタグは`<h2>`を使いスタリングは、Material-UIで用意されているh6用のスタリングを使うよう指示しています。
          <h2>タグ使いたいけど、フォントサイズなどはh6でのサイズを使いたい場合などに便利です。
        */}
        <Typography component="h2" variant="h6">
          Organization Admin Settings: Dashboard overview [1/7]
        </Typography>

        {/* 
          color="textSecondary"はMaterial-UIでデフォルトで設定されているtextSecondaryという名前のカラーを指定しています。
          独自のカラーを使いたい場合は、下記を参考にカスタマイズが必要です。
          https://material-ui.com/customization/color/#color-tool
        */}
        <Typography variant="body2" color="textSecondary">
          10,094,526 回視聴 • 2018/08/06
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
        title="Movieclips Trailers"
        subheader="104K subscribers"
      />

      {/* 説明文エリア */}
      <CardContent className={styles.descPadding}>
        Find your absolutely beautiful and serene place and listen to nature
        sounds, birds signing and relaxing water sounds with breathtaking views
        of Mount Shuksan. It’s 8-hour 4k video of discovery and peace. Download
        it for your personal use and transform your 4K TV into a source of
        relaxation and restoration.
      </CardContent>
    </Card>
  );
};
