import { makeStyles } from "@material-ui/core";

// ./Home/style.tsにも全く同じ定数を宣言したことを覚えている方がいるかもしれません。
// この場合、`src/utils.ts`のようなファイルを作成してこの`APP_BAR`という定数を一つにまとめると、仮にこの定数の値を変更したい時など、一箇所のみ変えれば良いだけなので楽になります。
const APP_BAR = 64;

export default makeStyles({
  // 要素を画面全体のサイズに調整する
  root: {
    minHeight: "100%",
  },

  main: {
    paddingTop: APP_BAR + 30,
  },
});
