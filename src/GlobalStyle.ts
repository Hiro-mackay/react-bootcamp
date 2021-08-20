import { withStyles } from "@material-ui/styles";

export default withStyles({
  // アプリケーションの全体の高さを全てに指定
  "@global": {
    html: {
      width: "100%",
      height: "100%",
    },
    body: {
      width: "100%",
      height: "100%",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },

    // おまけで追加
    img: { display: "block", maxWidth: "100%" },
  },
})(() => null);
