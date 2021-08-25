import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { VideoCard } from "../../components/VideoCard";

// GraphQLのコア
// QueryやSchemaを書くことで、GraphQLにどのようなデータを取得させるのか、更新させるのかを指示する
const query = `
query User {
  users {
    id
    name
    profile_photo_url
    created_at
    updated_at
  }
}
`;

let called = false;

export const Home = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // ステートが更新されると、コンポーネントも更新されるためuseEffect内の関数も呼び出される。
    // 無限ループを防ぐために、一度関数を呼んだら複数呼ばないようにする。
    if (!called) {
      // Hasuraのコンソールに記載されているGraphQLエンドポイント
      fetch("https://sacred-lioness-92.hasura.app/v1/graphql", {
        // GraphQLは必ずPOSTリクエストを投げる
        method: "post",

        // 認証のためのリクエストヘッダー
        // Hasuraはheadersに記載されている認証情報で、リクエストが許可されているかを判断する
        // 今回はAdminのsecret keyを記載しているのでHasura内の全てのリソースにアクセスできる。
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "BLze2Sz1OBdZeDFhIHgmoxrk67cdMA8EpId1KK86Y39QiHVAV7VJBe30vTVo5Ea7",
        },

        // GraphQLのリクエスト内容の本体
        // bodyに`query`や値を格納して、GraphQLにどのような処理をしてほしいか指示を出す
        body: JSON.stringify({ query }),
      }).then(async (res) => {
        called = true;

        // `fecth`関数の定型文
        // レスポンスを`json()`えフォーマットすることでJavaScriptで扱えるオブジェクトにする
        const json = await res.json();

        // GraphQLは、Responseに`errors`を含んだ状態でエラーを返す。
        // なので、通常のPromiseでエラーハンドリングで`catch`しようとすると、GraphQLではErrorを特定するができない。
        if (json?.errors) {
          console.error(json.errors);
        }

        // Graphqlは必ず、`data`という名前のメソッドの中にデータを格納してくる
        if (json?.data?.users.length) {
          // リクエストで送った、Queryに対応した形でデータが返される。
          // 今回は全ての`users`を取得するqueryを生成したので、配列でデータが格納されている。
          const user = json.data.users[0];

          // `fetch`したデータをステートに保存
          setUser(user);
        }
      });
    }
  });

  return (
    // 全ての要素をContainerで囲むことで、デザインが「整う」
    <Container>
      {/* 取得したデータを表示してみる */}
      {user?.name}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>

        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
        <Grid item xs={3}>
          <VideoCard />
        </Grid>
      </Grid>
    </Container>
  );
};
