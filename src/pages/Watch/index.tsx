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

  const { videoId } = useParams();

  const { data: currentVideo } = useVideoByPkQuery({
    variables: {
      id: videoId,
    },
  });

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

        {recommendVides?.videos.map((video) => (
          <Grid item xs={4}>
            <div className={styles.cardPadding}>
              <Link
                to={`/watch/${video.id}`}
                style={{ textDecoration: "none" }}
              >
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
