module.exports = {
  schema: {
    [process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN]: {
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY,
      },
    },
  },
  documents: [
    // ファイル名を`*`に変更することで、ディレクトリの全ての`.graphql`を参照するようにする
    "graphql/query/*.graphql",
    "graphql/mutation/*.graphql",
  ],
  generates: {
    "src/utils/graphql/generated.ts": {
      // typescript-react-apolloを追記
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      // 生成するコードの設定
      config: {
        withHooks: true,
      },
    },
  },
};
