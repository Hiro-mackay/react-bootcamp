import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard";
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  // videoを取得する`query`
  const { data, error } = useVideosQuery();

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    // 全ての要素をContainerで囲むことで、デザインが「整う」
    <Container>
      <Grid container spacing={2}>
        {/*
          `query`で取得した動画データを表示する
        */}
        {data?.videos.map((video) => (
          <Grid item xs={3}>
            {/*
              カードをクリックしたら、プレイヤー画面を表示します。
            */}
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              {/*
                `<VideoCard>`には、先ほど指定されていたpropsを流し込みます
              */}
              <VideoCard
                title={video.title}
                // ownerは投稿者の名前を入れたいが、現段階では、名前を取得することができない
                owner={video.owner?.name || ""}
                views={video.views}
                created={video.created_at}
                // <VideoCard> で非同期的に画像を取得するための関数
                fetcher={() =>
                  storage.ref(video.thumbnail_url).getDownloadURL()
                }
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
