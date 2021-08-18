import { Container, Grid } from "@material-ui/core";
import { VideoPlayerCard } from "./VideoPlayerCard";
import useStyles from "./style";
import { VideoHorizontalCard } from "../../compoennts/VideoHorizontalCard";

export const Watch = () => {
  const styles = useStyles();
  return (
    // 全体のデザインを整えるためのコンテナー
    // 詳細：https://material-ui.com/ja/components/container/
    <Container className={styles.root}>
      {/* 
        カラムデザインを実現させるためのコンポーネント
        これがないとカラムにならない
      */}
      <Grid container spacing={2}>
        {/* 
          カラムの実態
          全体が"12"とした場合のカラム配置を設定できる
          例えば、下記は全体を"12"とした場合の、比率が"9:3"となるようにカラムの幅を指定している。
        */}
        <Grid item xs={8}>
          <VideoPlayerCard />
        </Grid>
        <Grid item xs={4}>
          <div className={styles.cardPadding}>
            <VideoHorizontalCard />
          </div>
          <div className={styles.cardPadding}>
            <VideoHorizontalCard />
          </div>
          <div className={styles.cardPadding}>
            <VideoHorizontalCard />
          </div>
          <div className={styles.cardPadding}>
            <VideoHorizontalCard />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
