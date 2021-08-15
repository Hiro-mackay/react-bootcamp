import { makeStyles } from "@material-ui/core";

// カスタム用のCSSを生成してくれる、@material-uiの機能
export default makeStyles({
  between: {
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
  },
  logo: {
    width: 100,
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
  },
  profileIcon: {
    padding: 0,
    width: 44,
    height: 44,
    marginLeft: 10,
  },
});
