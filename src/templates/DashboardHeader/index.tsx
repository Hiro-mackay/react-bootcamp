import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";

// export defaultしているので、import側でuseStylesと命名します。
// 命名はなんでも構いませんが、一貫して全て同じ名前にすることで、カスタム用のCSSを使用していることを明示します。
import useStyles from "./style";

// codegenで生成したコードをimportします。
import { useUserByIdQuery } from "../../utils/graphql/generated";
import { useEffect } from "react";

export const DashboardHeader = () => {
  // 一度、useStylesを実行して、CSSを生成します。
  const styles = useStyles();

  //GraphQLの`Query`を発行して、Hasuraのエンドポイントにリクエストを飛ばし、返り値を取得するまでが、この3行に詰まっています。
  const { data, error } = useUserByIdQuery({
    variables: { id: "testid" },
  });

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data]);

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
          "useStyles"の値は、CSSモジュールと全く同じような使い方で、使用すすることができます。
          例えば、仮に、後になって"Material-UI"をやめて独自のデザインを取り入れた時も、CSSモジュールでリプレイスしやすいような形にしています。
        */}
          <div className={styles.logo}>
            <Logo />
          </div>
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
            データが取得されたら、`data`内に`Schema`と同じ名前のオブジェクトの中にデータが格納されます。
            データがないときは表示されません。
          */}
          <IconButton>
            <Typography>{data?.users_by_pk?.name}</Typography>
          </IconButton>

          {/* 
          新規動画作成のアイコンボタンを追加
        */}
          <IconButton>
            <VideoCallIcon />
          </IconButton>

          {/* 
          プロフィールアイコンを追加
        */}
          <IconButton className={styles.profileIcon}>
            <Avatar />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
