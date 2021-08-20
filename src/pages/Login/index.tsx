import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Logo } from "../../components/Logo";
import useStyles from "./style";
export const Login = () => {
  const styles = useStyles();
  return (
    <Card className={styles.root} variant="outlined">
      {/* ロゴコンポーネント */}
      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>

      {/* タイトルコンポーネント */}
      <Typography className={styles.margin} component="h1" variant="h5">
        ログイン
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

      {/* パスワードフィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>パスワード</Typography>
        <TextField
          type="password"
          required
          size="small"
          fullWidth
          variant="outlined"
        />
      </label>

      {/* Submitボタン */}
      <div className={styles.margin}>
        <Button variant="contained" color="primary">
          ログイン
        </Button>
      </div>

      <div>
        <Button href="#link" color="primary">
          アカウント作成はこちら
        </Button>
      </div>
      <div>
        <Button href="#link" color="primary">
          パスワードを忘れた場合はこちら
        </Button>
      </div>
    </Card>
  );
};
