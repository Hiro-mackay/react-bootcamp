import { Card, CircularProgress, Typography } from "@material-ui/core";
import useStyles from "./style";
export const Signout = () => {
  const styles = useStyles();
  return (
    <Card className={styles.root} variant="outlined">
      <CircularProgress className={styles.margin} size={70} thickness={4} />
      <Typography variant="h6">ログアウト中</Typography>
    </Card>
  );
};
