import { Button, Card, TextField, Typography } from "@material-ui/core";
import useStyles from "./style";

export const ForgetPassForm = () => {
  const styles = useStyles();
  return (
    <Card className={styles.root} variant="outlined">
      {/* タイトルコンポーネント */}
      <Typography className={styles.margin} component="h1" variant="h5">
        パスワードの再発行
      </Typography>

      {/* メールアドレスフィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>メールアドレス</Typography>
        <TextField
          type="email"
          required
          size="small"
          fullWidth
          variant="outlined"
        />
      </label>

      {/* Submitボタン */}
      <div className={styles.margin}>
        <Button variant="contained" color="primary">
          再発行
        </Button>
      </div>

      <div>
        <Button href="#link" color="primary">
          ログインはこちら
        </Button>
      </div>
    </Card>
  );
};
