import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { Link } from "react-router-dom";

// 追加
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

export const DashboardHeader = () => {
  const styles = useStyles();

  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  return (
    // color="inherit" : 背景を白色に
    // elevation={0} : 影(box-shadow)を無くす
    <AppBar elevation={0} color="inherit">
      {/* 
        <Toolbar>に"justifyContent: "space-between"のCSSを追加
      */}
      <Toolbar className={styles.between}>
        {/* 
          <IconButton>とLogoを<div>で囲み、<div>にflexを付与
        */}
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          {/* 
            <Link>コンポーネントで、ホームにルーティングするリンクを追加
            `to`にルーティングの相対パスを指定します。
          */}
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>

        {/* 
          検索バーの表示
        */}
        <SearchBar />

        {/* 
          2つの<IconButton>を<div>で囲み、<div>にflexを付与
        */}
        <div className={styles.flex}>
          {/*
            ユーザーがログインしていれば、ユーザー用のデザインを表示
            未ログインであれば「ログインボタン」を表示
          */}
          {globalUser ? (
            <>
              {/* 
                新規動画作成のアイコンボタンを追加
              */}
              <Link to="/upload">
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </Link>
              {/* 
                プロフィールアイコンを追加
              */}
              <IconButton className={styles.profileIcon}>
                <Avatar />
              </IconButton>
            </>
          ) : (
            <Button variant="outlined" color="primary" href="/login">
              ログイン
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
