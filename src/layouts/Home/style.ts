import { makeStyles } from "@material-ui/core";

// Sidebarの幅を固定
const SIDEBAR_WIDTH = 240;

const APP_BAR = 64;

export default makeStyles({
  // レイアウト全体のレイアウト
  root: {
    display: "flex",
    minHeight: "100%",
  },

  sidebar: {
    paddingTop: APP_BAR,

    // 幅を指定
    width: SIDEBAR_WIDTH,
  },
  main: {
    paddingTop: APP_BAR + 30,

    // 横並び時に最大まで幅を大きさせる
    flexGrow: 1,
  },
});
