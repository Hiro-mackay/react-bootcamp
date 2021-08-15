import { Container, Grid } from "@material-ui/core";
import { VideoCard } from "../../compoennts/VideoCard";

export const Home = () => {
  return (
    // 全ての要素をContainerで囲むことで、デザインが「整う」 
    <Container>

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
