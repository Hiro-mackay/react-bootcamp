import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard";
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  const { data, error } = useVideosQuery();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      {/* 取得したデータを表示してみる */}
      <Grid container spacing={2}>
        {data?.videos.map((video) => (
          <Grid item xs={3}>
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              <VideoCard
                title={video.title}
                owner={video.owner?.name || ""}
                views={video.views}
                created={video.created_at}
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
