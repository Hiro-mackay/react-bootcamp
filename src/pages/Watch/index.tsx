import { Container, Grid } from "@material-ui/core";
import { VideoPlayerCard } from "./VideoPlayerCard";
import useStyles from "./style";
import { VideoHorizontalCard } from "../../components/VideoHorizontalCard";
import { useParams } from "react-router";
import {
  useRecommendVideosQuery,
  useVideoByPkQuery,
} from "../../utils/graphql/generated";
import { storage } from "../../utils/Firebase/config";
import { Link } from "react-router-dom";

export const Watch = () => {
  const styles = useStyles();

  // 追加
  // URLから再生する動画のIDを取得する
  const { videoId } = useParams();

  // 追加
  // 再生する動画を取得する
  const { data: currentVideo } = useVideoByPkQuery({
    variables: {
      id: videoId,
    },
  });

  // 追加
  // リコメンドの動画を取得する
  const { data: recommendVides } = useRecommendVideosQuery({
    variables: {
      currentVideoId: videoId,
    },
  });

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
          {/*
          再生する動画の情報を渡す
        */}
          <VideoPlayerCard
            title={currentVideo?.videos_by_pk?.title}
            description={currentVideo?.videos_by_pk?.description}
            views={currentVideo?.videos_by_pk?.views}
            ownerName={currentVideo?.videos_by_pk?.owner?.name}
            date={currentVideo?.videos_by_pk?.created_at}
            fetcher={async () => {
              if (currentVideo?.videos_by_pk?.video_url) {
                return storage
                  .ref(currentVideo.videos_by_pk.video_url)
                  .getDownloadURL();
              }
              return undefined;
            }}
          />
        </Grid>
        {/*
          追加
          リコメンドの動画を一覧表示
        */}
        <Grid item xs={4}>
          {recommendVides?.videos.map((video) => (
            <div className={styles.cardPadding}>
              {/*
                動画プレイヤーを表示するためのリンク
              */}
              <Link
                to={`/watch/${video.id}`}
                style={{ textDecoration: "none" }}
              >
                {/*
                  カードの表示に必要なデータをpropsに渡す
                */}
                <VideoHorizontalCard
                  title={video.title}
                  views={video.views}
                  owner={video.owner?.name || ""}
                  created={video.created_at}
                  fetcher={() =>
                    storage.ref(video.thumbnail_url).getDownloadURL()
                  }
                />
              </Link>
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
