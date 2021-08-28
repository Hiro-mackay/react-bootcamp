import { Button, Card, TextField, Typography } from "@material-ui/core";
import { useForgetPass } from "../../hooks/Authentication/useForgetPass";
import useStyles from "./style";

export const ForgetPassForm = () => {
  const styles = useStyles();

  const { ref, sendEmail, sendSuccess, loading, error } = useForgetPass();

  return (
    <Card className={styles.root} variant="outlined">
      {/* タイトルコンポーネント */}
      <Typography className={styles.margin} component="h1" variant="h5">
        パスワードの再発行
      </Typography>

      {/* エラーメッセージを表示 */}
      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

      {/* メールアドレスフィールド */}
      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>メールアドレス</Typography>
        <TextField
          type="email"
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したemailRefを渡してフォームの値を取得する。
          inputRef={ref.emailRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("email")}
          // エラーの詳細のフォームの下部に表示する
          helperText={error.has("email") ? error.get("email") : ""}
        />
      </label>

      {sendSuccess && (
        <Typography className={styles.margin} color="primary">
          ✔︎メールの送信が完了しました。
        </Typography>
      )}

      {/* Submitボタン */}
      <div className={styles.margin}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={sendEmail}
        >
          {loading ? "メールを送信中" : "再発行メールを送信"}
        </Button>
      </div>

      <div>
        <Button href="/login" color="primary">
          ログインはこちら
        </Button>
      </div>
    </Card>
  );
};
