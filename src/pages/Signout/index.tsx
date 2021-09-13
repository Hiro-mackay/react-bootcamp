import { Card, CircularProgress, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSignout } from "../../hooks/Authentication/useSignout";
import useStyles from "./style";

export const Signout = () => {
  const styles = useStyles();
  const { signout } = useSignout();

  // ページを表示したタイミングで、signout処理を実行するための処理
  useEffect(() => {
    signout();
  });

  return (
    <Card className={styles.root} variant="outlined">
      <CircularProgress className={styles.margin} size={70} thickness={4} />
      <Typography variant="h6">ログアウト中</Typography>
    </Card>
  );
};
