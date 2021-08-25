import { Container, Grid } from "@material-ui/core";
import { VideoCard } from "../../components/VideoCard";

export const Home = () => {
  return (
    <Container>
      {/* 取得したデータを表示してみる */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>

        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
      </Grid>
    </Container>
  );
};
