import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Logo } from "../../components/Logo";
import { useLogin } from "../../hooks/Authentication/useLogin";
import useStyles from "./style";
export const Login = () => {
  const styles = useStyles();

  // ログインのHooks
  const { ref, error, loading, login } = useLogin();

  return (
    <Card className={styles.root} variant="outlined">
      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>

      <Typography className={styles.margin} component="h1" variant="h5">
        ログイン
      </Typography>

      {/* エラーメッセージを表示 */}
      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

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

      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>パスワード</Typography>
        <TextField
          type="password"
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したemailRefを渡してフォームの値を取得する。
          inputRef={ref.passwordRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("password")}
          // エラーの詳細のフォームの下部に表示する
          helperText={error.has("password") ? error.get("password") : ""}
        />
      </label>

      <div className={styles.margin}>
        <Button
          variant="contained"
          color="primary"
          // ローディング中はボタンを押せないようにする
          disabled={loading}
          // ボタンをクリックしたら認証処理を実行する
          onClick={login}
        >
          {/* ローディング中のテキストを変更する */}
          {loading ? "ログイン中" : "ログイン"}
        </Button>
      </div>

      {/* 新規作成画面にリダイレクトできるようにリンクを入れましょう。 */}
      <div>
        <Button href="/signup" color="primary">
          アカウント作成はこちら
        </Button>
      </div>

      {/* パシワードリセット画面にリダイレクトできるようにリンクを入れましょう。 */}
      <div>
        <Button href="/forget" color="primary">
          パスワードを忘れた場合はこちら
        </Button>
      </div>
    </Card>
  );
};
