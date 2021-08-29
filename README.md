# ReactBootcamp 開発ドキュメント

<details>
<summary>前回までのBootcamp</summary>

> ## 次回までの目標
>
> - [x] インフラを構築して、ユーザーの認証とデータの保存ができるようにしよう
>
> ## 今週のやることリスト
>
> - [x] Bootcamp のインフラアーキテクチャ
> - [x] Firebase Authentication について
> - [x] Firebase Storage について
> - [x] Hasura について
> - [x] GraphQL について
> - [x] Firebase の設定
> - [x] React で Firebase を呼び出す
> - [x] React で認証を実装
> - [x] React でアップローダーを実装
> - [x] Hasura の設定
> - [x] データベースの設計
> - [x] Hsaura でデータを作成する
> - [x] React で GraphQL
> - [x] GraphQL Code Generator で爆速開発
> - [x] JWT トークンで GraphQL をセキュアに

</details>

## 次回までの目標

- [ ] ロジックを組んでプロダクトを完成させよう！

## 今週のやることリスト

- [ ] React でロジックを組むとは
- [ ] カスタム Hooks の使い方]
- [ ] グローバルステートの管理
- [ ] Recoil を用いたステート管理
- [ ] Recoil のセットアップ
- [ ] ルーティング処理の追加
- [ ] 認証機能の実装
  - [ ] 新規アカウント登録の実装
  - [ ] ログインの実装
  - [ ] ログアウトの実装
  - [ ] パスワード忘れの処理実装
  - [ ] 自動認証機能の実装
  - [ ] 認証情報の管理
- [ ] JWT トークンで Hsaura のリクエストをセキュアに
  - [ ] JWT トークンとは
  - [ ] Hasura で JWT トークンを認証できるように設定
  - [ ] Hasura でパーミッションを設定してセキュアなデータベースを設定
    - [ ] users テーブルのパーミッションを設定
    - [ ] videos テーブルのパーミッションを設定
  - [ ] Firebase Authentication から JWT トークンを取得
  - [ ] Hasura の GraphQL ヘッダーに JWT を実装
- [ ] Firebase Storage に動画をアップロード
- [ ] GraphQL リクエストを実装
  - [ ] user データの作成と取得
  - [ ] video データの作成
  - [ ] video データの取得
  - [ ] Firebase Storage から動画を取得する

### 目次

- [React でロジックを組むとは](#react-でロジックを組むとは)
- [カスタム Hooks の使い方](#カスタム-hooksの使い方)
- [グローバルステートの管理](#グローバルステートの管理)
- [Recoil を用いたステート管理](#recoil-を用いたステート管理)
- [Recoil のセットアップ](#recoil-のセットアップ)
- [ルーティング処理の追加](#ルーティング処理の追加)
- [認証機能の実装](#認証機能の実装)
  - [新規アカウント登録の実装](#新規アカウント登録の実装)
  - [ログインの実装](#ログインの実装)
  - [ログアウトの実装](#ログアウトの実装)
  - [パスワード忘れの処理実装](#パスワード忘れの処理実装)
  - [自動認証機能の実装](#自動認証機能の実装)
  - [認証情報の管理](#認証情報の管理)
- [JWT トークンで Hsaura のリクエストをセキュアに](#jwt-トークンで-hsaura-のリクエストをセキュアに)
  - [JWT トークンとは](#jwt-トークンとは)
  - [Hasura で JWT トークンを認証できるように設定](#hasura-で-jwt-トークンを認証できるように設定)
  - [Hasura でパーミッションを設定してセキュアなデータベースを設定](#hasura-でパーミッションを設定してセキュアなデータベースを設定)
    - [users テーブルのパーミッションを設定](#users-テーブルのパーミッションを設定)
    - [videos テーブルのパーミッションを設定](#videos-テーブルのパーミッションを設定)
  - [Firebase Authentication から JWT トークンを取得]
  - [Hasura の GraphQL ヘッダーに JWT を実装]
- [Firebase Storage に動画をアップロード]
- [GraphQL リクエストを実装]
  - [user データの作成と取得]
  - [video データの作成]
  - [video データの取得]
  - [Firebase Storage から動画を取得する]

# ReactBootcamp 第三回目勉強会ドキュメント

第三回目は、React から少し離れて、インフラ周りを重点的に構築して、アプリケーションのバックエンド側の構築をしていきます。

いよいよ最後の勉強会コンテンツとなりました、第四回目 React Bootcamp を始めていきます。

第四回目は、いよいよロジックの実装に入っていきます。

このロジックの実装が完成すると、このアプリケーションは実際に触って動かせるアプリケーションになります。

早速、アプリケーションに命を吹き込んでいきましょう。

わからないこと、疑問点、ドキュメントやソースコードの間違いなどは下記 Discord にてメッセージお願いします。

[React Bootcamp Discord](https://discord.gg/rCAVXFvEPJ)

## React でロジックを組むとは

デザインも完了し、インフラの準備も完了し、いよいよ React のロジックの構築に入っていきたいと思います。

React では、ロジックを組むために便利な API が提供されています。

それが`Hooks`と呼ばれるものです。

`Hooks`とは、接頭語に`use`と付けられた関数は全て React が`Hooks`として、認識してくれます。

そうです、皆さんが今までずっと使ってきた`useState`や`useEffect`も`Hooks`です。

React では、React 特有の機能を、この`Hooks`を用いて提供されます。

先程から出ている、`useState`は React のステート管理のための機能ですし、`useEffect`は React のライフサイクルに関与するための関数を提供します。

そして、React ではこの`Hooks`を呼び出せる範囲を制限しています。

`Hooks`を呼び出せる場所は

- コンポーネントの内部
- 他の`Hooks`の内部

上記ふたつの場合でのみ、`Hooks`関数は呼び出すことができます。

そして、エンジニアはこれら`Hooks`を、カスタム Hooks として独自の`Hooks`を作成し、ロジックを記述していきます。

カスタム Hooks は`useState`や`useEffect`とは違い、React がデフォルトで提供していない`Hooks`を独自に開発することができるようになっている React の機能です。

このカスタム Hooks では、`Hooks`の呼び出し制限のルールの元、`useState`や`useEffect`を呼び出すことができます。

これで、React の機能を使いつつも、自身のアプリケーションに必要なロジックを記述していくことが可能です。

と、ここまででお気づきの方もいるかもしれませんが、このカスタム Hooks も、内部的に React の機能を使わないのであれば、カスタム Hooks として作成する必要はありません。

つまり、ロジック内に`useState`や`useEffect`が一切に出てこないような関数は、普通の JavaScript で関数を作るようにふつうに関数を作成し、アプリケーション内で使用できます。

第三回目勉強会で、Firebase のロジックを`utils`ディレクトリに全て記述しました。

この時、ロジックには一切のカスタム Hooks を使用していません。

これは、Firebase を呼び出すために、React の機能を使用する必要がないため、普通の関数として定義されています。

React のロジックは、基本的にはカスタム Hooks を作成することで React 特有の機能を使いながらロジックを組みます。

その中で、React の機能を使わないようなロジックは、カスタム Hooks ではないプレーンな JavaScript 関数として定義、使用ができます。

## カスタム Hooks の使い方

カスタム Hooks を使うのに、特別なライブラリーも設定も必要ありません。

Hooks は、関数の名前の最初に、`use`という接頭語をつけるだけで React が自動的に Hooks として認識してくれます。

`use`をつけた関数内では、先程の説明の通り、`useState`や`useEffect`、はたまた別の独自の Hooks 関数を使用することができます。

例えば、ログインを行う関数を Hooks で作成する場合は、`useLogin`という名前の関数を作成するだけで、関数内で`useState`などの React の機能が使用できるようになります。

```TS
// サンプルコードです。

const useLogin = () => {
  // ログイン用のステート管理
  const [state, setState] = useState()

  // 実際のログイン処理用の関数
  const login = () => {
    // ログイン処理
  }

  // useLoginの返り値
  return {
    state: loginState,
    setState: setLoginState,
    login: login
  }
}
```

そして、上記を実際にコンポーネントで使用する場合は以下のように、簡単に使用することができます。

```TSX
// サンプルコードです。

const LoginComponent = () => {
  const {state, setState, login} = useLogin()

  return <Component>
    {/*
      ログイン用のコンポーネント等
    */}
    <ChildComponent />

    {/*
      ログインを実行するボタン
    */}
    <Button onClick={login}>ログインする</Button>

  </Component>

}
```

これの何が便利かというと、`ログイン`に必要な処理を全て`useLogin`という関数の中に隠蔽されており、`<LoginComponent>`はログイン処理の詳細を知らなくてもログイン処理ができるという点です。

今はログインだけの簡単な処理しかないため簡潔な記述で済んでおりますが、処理が増えてくるとコンポーネント内の処理のための記述が膨大な量になります。

そこで、コンポーネント内の処理を、`Hooks`に分割することでそれぞれの処理が何をしているかをわかりやすく、簡潔になるようにしていきます。

コンポーネントが「見た目デザイン」を分割することで再利用性と可読性を高めたのに対し、`Hooks`は「ロジック」を分割することで再利用性と可読性を高めるために使用します。

ちなみに、関数の中で一切の React 特有の機能（主に`Hooks`）を使用しない場合は、無理に処理を`Hooks`化する必要はなく、通常の Javascript 関数で処理を記述します。

## グローバルステートの管理

Hooks の作成方法がわかったところで、もう一つ React 開発で重要な概念をご説明いたします。

それはグローバルステートの管理についてです。

これまで、コンポーネントが持つステート管理に`useState`という関数を使用してステートを作成しました。

しかし、この`useState`のみではステート管理に限界が訪れます。

特に大変なのは、ルーティング処理を行うときです。

`/login`というルーティングで認証を行い、`/home`というルーティングで認証したユーザーの情報を使いたいということが起こったとします。

`/login`内にて`useState`で作成した`state`を`/home`に渡すことはできません。

なので、`/home`では`state`の共有という方法以外でユーザー情報を取得する必要があります。

このときに、グローバルステートという概念を取り入れると、`/login`で取得したユーザー情報を`state`を通して`/home`で使用できるようなります。

グローバルステートを使用する方法としては以下の 3 つがあります。

- `useState`での管理
- `useContext`での管理
- 外部ライブラリでの管理

一つづつメリットデメリットを見ていきます。

- ### `useState`での管理

`useState`で無理矢理に管理する方法です。

この方法では、ルートコンポーネント（src/index.tsx など）でアプリケーション全体で管理したい`state`を全て管理し、`props`によるバケツリレーで下位のコンポーネントに`state`を逐一渡していきます。

しかし、この方法でアプリケーションを構築することはほぼなく、` useState``はあくまでローカルな `state`を管理するために使用するようにしましょう。

- ### `useContect`での管理

続いて、React 内で用意されている`useContext`を使用してグローバルステートを管理する方法です。

この方法を用いると、新たにライブラリーを使用することなく React の機能のみでグローバルステートの管理ができるようになります。

実際のアプリケーション開発でも使用されることもあり、十分に使用に耐えうるアプリケーションを実装ができます。

しかし、`useContext`は必要最低限の機能しか提供されていないため、例えば、コードの記述量が後述するライブラリを使用した方法より冗長になりやすく、パフォーマンスチューニングなどもライブラリーを使用した方が早いなどのデメリットがあります。

なので、使い所としては、ライブラリを使いたくないであったり、アプリケーション全体よりかは小さいスコープでのグローバルステートの管理をしたいときなどに適しています。

- ### 外部ライブラリでの管理

最後は、最も多く使用されるケースが多い、外部ライブラリを使用した方法での管理です。

React でのグローバステートの管理のために作成されたライブラリはたくさんありますが、その中でも人気/注目を集めているライブラリは以下のライブリです。

- Redux
- MobX
- Recoil

この中で`redux`が一番の Github スター数を誇っており、使用ユースケースも一番多いです。

それもそのはず、React がこの世界にデプロイされると同じ時期にこの Redux もデプロイされており、React 共に成長してきたと言っても過言ではありません。

当時は、React にすらグローバルステートを管理する有用な方法が用意されておらず、Redux を使うのがマストな状況でした。

しかし、Redux は学習コストが高く、独自のアーキテクチャを設計しているので、初学者がすぐに使い始めるにはハードルが高いライブラリーでした。

そんな中、React ステート管理の界隈に鳴り物入りで登場したのが、`Recoil`というライブラリでした。

このライブラリは、それまでのステート管理にあった、ライブラリ特有のアーキテクチャを学習する必要がほぼなく、いくつかの API を覚えるだけですぐに使い始めることができます。

その使い方は、`useState`とほぼ同じような使い方が可能で、そのパフォーマンスも非常に高いです。

今までのライブラリーと比較すると、本当に React のエコシステム内で気持ちよく書けるために最適化されています。

ただ、他のライブラリーと比較すると、その歴史が浅く、リリースが経ってから 2 年ほどしか経っていません。

そんな歴史の浅いライブラリーがなぜ、Redux などの歴史が古く多くのユースケースを抱えるライブラリーと比較されるのかを疑問に思われるかもしれません。

一つに、Recoil が Facebook をバックグラウンドに控えるライブラリーであるという点です。

つまり React の開発主体である Facebook が、主体となって開発しているライブラリーが Recoil なのです。

内部的にも、React の開発に携わっているコントリビュータが、Recoil の開発にも携わっていたりします。

だからと言って、Recoil が非推奨にならないとは言い切れませんが、それでも、コミュニティの盛り上がりやコントリビュータを鑑みると、十分にアプリケーション開発に耐えるライブラリーだと感じています。

今回は、そんな旬なライブラリーを使用していきます。

## Recoil を用いたステート管理

Recoil は一言で言ってしまえば、「`useState`でグローバルステートの管理ができるようにしたライブラリー」であると言えます。

その記述方法は非常に`useState`と似ており、簡単にグローバルステートの管理ができます。

Recoil を使用するために覚えるべき概念は、「Atom」と「Selector」のたった二つです。

その中でも基本的には「Atom」だけ使い方が分かれば問題ありません。

早速、Recoil のコードを見ていきます。

まずは、「Atom」を作成します。

```TS
// これはサンプルコードです。
import { atom } from 'recoil';

type UserType= {
  id: string,
  email: string
}

export const UserAtom = atom<UserType>({
  key: 'UserAtom',
  default: undefined
})

```

「Atom」とは作成したい`state`の「変数宣言」のようなものです。

例えば、この例では、`User`と言うステートを宣言しています。

その`User`にどのような値が入るかを`UserType`で型定義しています。

今回は`User`には`id`、`email`が格納される想定です。

そして、`atom`関数を使用して実際に`state`を生成しています。

`atom()`で`key`と`default`を指定しています。

`key`は、`state`を管理するために必要な値で、アプリケーション全体で一意にする必要があります。

`key`については、ユーザーが実際に使用することはなく、Recoil のライブラリーが内部的に使用する値です。

`default`は、「Atom」に最初に入る値を指定しています。

これで、「Atom」」の生成が完了しました。

> コードを見るとわかる通り、Recoil は Typescript での開発を前提に作成されています。  
> Recoil で Atom を初期化すると、そのほとんどは undefined で初期化することになります。  
> この時に、Typescript を使わないとどんなデータを入れるかを全く明示することなく開発を進めることになります。  
> そうなると、どんなデータでも Atom に格納することができるようになるので、バグの温床になります。  
> Recoil は Typescript での開発に非常に相性がいいライブラリーです。

では実施にこの「Atom」をしてみます。

```TSX
// これはサンプルコードです。
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserAtom } from './UserAtom'

const Component = () => {
  // UserAtomの、stateとsetStateを呼び出す
  const [user, setUser] = useRecoilState(UserAtom)

  //  UserAtomの、stateのみ呼び出す
  const userOnlyState = useRecoilValue(UserAtom)

  //  UserAtomの、setStateのみ呼び出す
  const userOnlySet = useSetRecoilState(UserAtom)

  return <div>
    {/* some component */}
  </div>
}
```

先ほど作成した`Atom`に対して、Recoil 専用の関数を呼び出して`state`を使用しています。

ここで、Recoil 専用の関数`useRecoilState`、`useRecoilValue`、`useSetRecoilState`を使用しました。

これらの関数では関数が生成するものがそれぞれ異なっています。

`useRecoilState`は、`useState`と全く同じ挙動をし、`state`と、それをアップデートする用の`setState`を生成します。

`useRecoilValue`は、`state`のみを生成し、アップデート用の`setState`関数は生成しません。

反対に、`useSetRecoilState`は、アップデート用の`setState`関数のみを生成し、`state`は生成しません。

なぜ、Recoil はこのような形で関数をわけているのでしょうか？

まず、`useRecoilValue`を使用すると、そのコンポーネントではその`state`を変更することができないことを明示することができます。

変更ロジックを含まないコンポーネントであるのに、アップデート用の関数が生成されることは、バグの作成や意図しない処理を記述する恐れがあります。

`useRecoilValue`では、`state`しか作成しないことによってこのような無駄な記述やバグを未然に防ぐとこができます。

次に、`useSetRecoilState`はアップデート関数のみを生成することで、コンポーネントはその`state`を参照せずにアップデートしか行わないことを明示します。

また、`useSetRecoilState`に限っては、上記に合わせてもう一つメリットがあります。

それは、コンポーネントの無駄な更新（再レンダリング）を防ぐことができます。

React では、`state`の更新を検知して、コンポーネントを再レンダリングするかを評価します。

`useSetRecoilState`を使用すると、`setState`のみを生成するので、コンポーネントは`state`の変更検知を行わなくなります。

そのため、例えば、`state`の更新は行うけど、`state`の値は画面表示する必要は無いようなコンポーネントにおいて、無駄な再レンダリングを抑制することができます。

これは、React のパフォーマンスチューニングにおいて初めに行うチューニングであり、React の最適化の主たる領域になります。

Recoil では、これを簡単に行えるように設計されています。

React である程度アプリケーションの構築ができるようになった後は、このようなパフォーマンスチューニングや最適化について知見を深めると、よりエンジニアとしてのレベル感が上がるのでは無いのでしょうか。

## Recoil のセットアップ

では、Recoil の概要が掴めたところで、実際に Recoil のセットアップを行いましょう。

と言いつつも、毎度のことながら、ライブラリをインストールして`Provider`コンポーネントを`index.tsx`で読み込みます。

Recoil のインストール

```bash
# ターミナル（コマンドプロンプト）
npm install recoil

# or

yarn add recoil
```

Recoil から`Provider`を import して、`src/index.tsx`に読み込みます。

[Diff - ]()

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from "./GlobalStyle";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// RecoilのProviderをimport
import { RecoilRoot } from "recoil";

const theme = createTheme();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN,
});

const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    {/*
      Recoilを初期化し、アプリケーション全体でRecoilを使用できるようにする
    */}
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <CssBaseline />
            <GlobalStyle />
            <RootRouter />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
```

これで、アプリケーションのどこからでも、Recoil を呼び出せるようになりました。

## ルーティング処理の追加

本格的なロジック部分に入っていく前に、先にサイドバーからルーティング処理をできるようにしましょう。

左上のロゴと、サイドバーの「ホーム」をクリックすると、ルーティング`/`に飛ぶようにリンクを追加します。

まずは、左上のログのリンクを追加します。

[Diff - ]()

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar,Avatar,IconButton,Toolbar,Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { useUserByIdQuery } from "../../utils/graphql/generated";

// react-router-domからルーティングのリンク用のコンポーネントをimport
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  const styles = useStyles();
  const { data } = useUserByIdQuery({
    variables: { id: "testid" },
  });

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
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
        <SearchBar />
        <div className={styles.flex}>
          <IconButton>
            <Typography>{data?.users_by_pk?.name}</Typography>
          </IconButton>
          <IconButton>
            <VideoCallIcon />
          </IconButton>

          <IconButton className={styles.profileIcon}>
            <Avatar />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

```

ロゴに`/`のルーティングに飛ぶようなリンクを追加できました。

サイドバーの方にもリンクを追加していきましょう。

```TSX
// src/templates/Sidebar/index.tsx

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import useStyles from "./style";

// react-router-domからLinkをimport
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const styles = useStyles();

  return (
    // ListのcomponentにLinkを指定
    // Linkのtoと同じように、Listにtoを指定する
    <List className={styles.root} component="nav">
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="トレンド" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary="登録チャンネル" />
      </ListItem>
    </List>
  );
};
```

これで、ホームに戻るリンクが挿入できました。

## 認証機能の実装

では早速、認証のロジックを記述していきたいと思います。

認証から作成する理由やルールは特段ありませんが、ユーザーの認証状態によって変化するコンポーネントやロジックがあるため、認証から作成することで検証がしやすくなるため、認証から作成していきます。

その前に一つ、お詫びと訂正があります。

第三回目で作成した`users`と言うテーブルにて、`email`とカラムを作成していませんでした。

今回のアプリケーションでは無くても問題なくアプリケーションを動作させることはできますが、しかし、実環境では確実に訂正して、`users`に`email`カラムを追加すると思い、あえて修正したいと思います。

Hasura のプロジェクトコンソールから、`users`テーブルから`Modify`タブを選択していただき、`Columns`に新しく`email`と言うテキストカラムを追加します。

![add email columns](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/add_email_columns.png?raw=true)

合わせて、`Query`に`email`カラムを追加します。

[Diff - ]()

```graphql
# graphql/mutation/InsertUser.graphql
mutation InsertUser($id: String!, $name: String!, $email: String!) {
  insert_users_one(
    object: { id: $id, name: $name, email: $email, profile_photo_url: "" }
  ) {
    id
    name
    email
    profile_photo_url
    created_at
    updated_at
  }
}
```

```graphql
# graphql/query/users.graphql
query UserById($id: String!) {
  users_by_pk(id: $id) {
    id
    name
    email
    profile_photo_url
    updated_at
    created_at
  }
}
```

ターミナル（コマンドプロンプト）で codegen を実行して新しくコードを自動生成します。

```bash
# ターミナル（コマンドプロンプト）
npm run codegen

# or

yarn codegen
```

もしエラーで追加できない時は、一度、`users`に追加されているデータを削除して、下記のように何も表示されなくなってから、再度`email`カラムを作成してみてください。

![empty users rows](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/empty_users_rows.png?raw=true)

追加しなくてもアプリケーションは動きますが、これからは`email`カラムがある前提がコードを書いていくので、適宜読み替えて実装してください。

- ### 新規アカウント登録の実装

アカウントの新規登録から作成していきたいと思います。

新規アカウント登録のロジックを描く場所として、`useSignup`という Hooks を作成します。

新規アカウント登録に必要なロジックとしては、以下のようなロジックが必要そうです。

- Firebase の`createUserWithEmailAndPassword`でアカウントを作成する
- 入力値が正しくなければ、エラーを表示する（バリデーション）
- 作成が成功したら、Hsaura にユーザーデータを Insert する
- Hasura の処理が終わったら、`/`にリダイレクトする。
- エラーがあったら、処理を中断して、メッセージを表示する。

ここで、処理を書き始めてもいいですが、せっかくなので、後述する「ログイン」や「ログアウト」、「パスワード忘れ」のロジックでも使用できる汎用ロジックとして分割しようと思います。

具体的に何を何をするかと言うと、「認証の処理が終了したら所定のルーティングにリダイレクトされる。バリデーションミスやエラーがあれば表示する」というロジックは全ての認証ロジックで共通しているので共通化していきます。

まずは共通化を何も考えずに、`useSignup`を記述していきます。

[Diff - ]()

```TS
// src/hooks/Authentication/useSignup/index.tsを作成

import { useRef, useState } from "react";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // エラーが発生したら全てここに格納する
  const [error, setError] = useState<Error>();

  // サインアップの処理が実行されている間、trueになる。
  const [loading, setLoading] = useState<boolean>(false);

  // userを追加するためのGraohQL Mutation Hooks
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  // 実際のサインアップのロジック
  const signup = async () => {

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value
    ) {
      // 一つでも値が入っていないフォームがあったら、処理を中断
      // 最終的にここで、エラー処理を入れてユーザーにエラーを表示する
      return;
    }

    try {
      setLoading(true);
      // Firebaseのサインアップ処理を実行
      const { user } = await fireSignup({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (!user?.uid) {
        throw new Error("ユーザーの登録に失敗しました。");
      }

      // Hasuraにuserを作成する
      const apolloResponse = await insertMutation({
        variables: {
          id: user.uid,
          name: nameRef.current.value,
          email: emailRef.current.value,
        },
      });

      if (apolloResponse.data?.insert_users_one?.id) {
        // `/`へリダイレクト
      } else {
        throw new Error("ユーザーの登録に失敗しました。");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup,
    error,
    loading,
  };
};

```

細かな処理はコメントを読んでいただくとして、特徴的な記述をしている箇所だけで細く説明します。

今回、サインアップに必要な値(メールアドレスやパスワード)を`state`管理にせずに、`useRef`を用いた参照管理を行なっています。

このような管理にした理由として、

- `state`と`setState`の二つを返すという煩わしさから解放
- 使用側のコンポーネントで、ref をコンポーネントに渡すだけで値の表示と更新ができる
- 無駄な再レンダリングを抑制できる

といったメリットがあるため、このような書き方にしました。

> 詳しくこの方法のメリットを知りたい方は、`useRef`で作成した部分を`useState`で作成してみて、これから作成していくコードを記述してみてください。  
> コードの記述量が増えてしまうのがわかると思います。

このコードから、他の認証ロジックでも使用できる箇所を共通化します。

再度確認になりますが、共通化するロジックは「入力値のバリデーションを確認して、正常であれば、認証を行い、リダイレクトする。エラーなどがあれば処理中断してエラーメッセージを表示する」です。

まずは、共通化する部分を独立して作成します。

[Diff - ]()

```TS
// src/hooks/Authentication/useAuthHelper/index.tsを作成

import { useState } from "react";

// どのタイプのエラーなのかを管理するための型
// main: 認証全体での、ネットワークエラーやそのサーバー側のエラーを格納
// name: Name入力フォームに関するエラー
// email: Email入力フォームに関するエラー
// password: Password入力フォームに関するエラー
export type ErrorState = "main" | "name" | "email" | "password";

export const useAuthHelper = () => {
  // 複数のエラーを同時に管理できるようにするためのstate
  // Mapは { key : value }の形でオブジェクトを管理できるJavascriptのデータ構造
  // ただのObjectと違い、便利なメソッドが用意されている。
  const [error, setError] = useState<Map<ErrorState, string>>(new Map());

  // ローディング処理も合わせて共通化
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorHandler = () => {
    // エラーをセットする
  };

  const authExecute = async () => {
    // バリデーションの確認を行う

    // バリデーションが問題なければ、認証ロジックを実行

    // 成功すれば、リダイレクト処理

    // エラーがあれば、エラーをセットして処理を中断
  };

  return {
    authExecute,
    loading,
    error,
  };
};

```

認証ロジックの共通ロジックとして、それぞれの認証ロジックから呼び出す`useAuthHelper`という名前の`Hooks`を用意しました。

これはまだ雛形です。

コメントに書いてある処理を、先ほど作成した`useSignup`から共通ロジックに渡すことで、`useAuthHelper`Hooks を完成させていきます。

完成形のコードを先にお見せします。

[Diff - ]()

```TS
// src/hooks/Authentication/useAuthHelper/index.ts

import { useState } from "react";

// どのタイプのエラーなのかを管理するための型
// main: 認証全体での、ネットワークエラーやそのサーバー側のエラーを格納
// name: Name入力フォームに関するエラー
// email: Email入力フォームに関するエラー
// password: Password入力フォームに関するエラー
export type ErrorState = "main" | "name" | "email" | "password";

export type SetErrorFn = (name: ErrorState, message: string) => void;


/**
 * useAuthHelper()をするときに、呼び出し元からそれぞれの処理の実態を注入する
 *
 * @param executeProcess 実際に認証処理の実態を外部から追加する
 * @param formValidation バリデーションチェックの実態を外部から追加する
 * @returns
 */
export const useAuthHelper = (
  executeProcess: () => Promise<void>,
  formValidation: (setError: SetErrorFn) => boolean
) => {
  // 複数のエラーを同時に管理できるようにするためのstate
  // Mapは { key : value }の形でオブジェクトを管理できるJavascriptのデータ構造
  // ただのObjectと違い、便利なメソッドが用意されている。
  const [error, setError] = useState<Map<ErrorState, string>>(new Map());

  // ローディング処理も合わせて共通化
  const [loading, setLoading] = useState<boolean>(false);

  const setErrorHandler: SetErrorFn = (name, message) => {
    setError((prev) => new Map(prev.set(name, message)));
  };

  const authExecute = async () => {
    // 認証を実行したら、一度エラー文をリセットする
    // これをしないと不要なエラーメッセージが画面に表示されたままになってしまう。
    setError(new Map());

    // バリデーションの確認を行う
    const invalidValidation = formValidation(setErrorHandler);

    // バリデーションが問題あれば処理を中断
    if (invalidValidation) return;

    // 処理が開始したらローディング中
    setLoading(true);

    try {
      // 認証ロジックを実行
      // 成功すれば、リダイレクト処理（この処理はここでは書いてありません。）
      await executeProcess();
    } catch (error) {
      // エラーがあれば、エラーをセットして処理を中断
      setErrorHandler("main", error.message);
    } finally {
      // 処理が終了したら、ローディングはfalse
      setLoading(false);
    }
  };

  return {
    authExecute,
    loading,
    error,
    setErrorHandler
  };
};
```

だいぶ何をしているかわからないことをするコードになってきました。

その感覚は間違っていなく、今ここで行なっていることは、処理の抽象化を行なっています。

つまり、認証ロジック内で共通で実行される処理を摘出して抽象化しているため、「何をしているかわからない」が正しい感覚になります。

例えば、`formValidation`や`executeProcess`のロジックはどれだけ読み解いても何をしているかわからないですよね？

このように、何をしているかわからないものを増やすことで、その処理内で「責任を持つ箇所」が明確になり、例えばデバッグや処理の拡張がしやすくなるメリットがあります。

ここでは、「バリデーションの確認を行なって、問題なければ認証処理を実行する」ということを言葉通り実行しています。

`useAuthHelper`は、バリデーションの実態や認証処理の実態を知ることなく、認証に必要な「フロー」を実行することができます。

これが何が嬉しいかは後々わかるので、ますはこの `useAuthHelper`を使用して、`useSignup`を完成させましょう。

[Diff - ]()

```TS
// src/hooks/Authentication/useSignup/index.ts

import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // リダイレクト用の関数
  const navigate = useNavigate();

  // userを追加するためのGraohQL Mutation Hooks
  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    // Nameフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!nameRef.current?.value) {
      setError("name", "名前が入力されていません。");
      invalidValidation = true;
    }

    // Emailフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }

    // Passwordフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }

    // バリデーションが有効か無効化を返す
    return invalidValidation;
  };

  // 実際のサインアップのロジック
  const signup = async () => {
    // Firebaseのサインアップ処理を実行
    const { user } = await fireSignup({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ユーザーの登録に失敗しました。");
    }

    // Hasuraにuserを作成する
    const apolloResponse = await insertMutation({
      variables: {
        id: user.uid,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
      // `/`へリダイレクト
      navigate("/");
    } else {
      throw new Error("ユーザーの登録に失敗しました。");
    }
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, setErrorHandler, loading } = useAuthHelper(
    signup,
    formValidation
  );

  // GraphQLのエラーがあったら、ここでキャッチして、エラー処理を行う
  // 今回は、エラーメッセージを表示するだけ。
  useEffect(() => {
    if (apolloError?.message) {
      setErrorHandler("main", apolloError.message);
    }
  }, [apolloError]);

  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup: authExecute,
    error,
    loading,
  };
};

```

どこがどのように変わったかは、`Diff`をご覧ください。

注目するポイントは、`formValidation`と`signup`関数を`useAuthHelper`の引数として渡している点です。

これで、`useAuthHelper`は`formValidation`と`executeProcess`が実態化された状態で内部で処理できるようになります。

`useAuthHelper`から返される`authExecute`が実際にサインアップする際に使用する関数です。

では、この`useSignup`を使用して、実際に`<Signup>`コンポーネントで処理を書いてみましょう。

[Diff - ]()

```TSX
// src/pages/Signup/index.tsx

import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Logo } from "../../components/Logo";
import useStyles from "./style";

// import
import { useSignup } from "../../hooks/Authentication/useSignup";

export const Signup = () => {
  const styles = useStyles();

  // useSignup Hooksを使用
  const { ref, error, loading, signup } = useSignup();

  return (
    <Card className={styles.root} variant="outlined">
      <div className={`${styles.logo} ${styles.margin}`}>
        <Logo />
      </div>
      <Typography className={styles.margin} component="h1" variant="h5">
        新規アカウント登録
      </Typography>

      {/*
        エラーメッセージを表示
        ErrorをMapで管理しているので、簡単にエラーがあるかどうかを確認できる
        */}
      {error.has("main") && (
        <Typography className={styles.margin} color="error">
          {error.get("main")}
        </Typography>
      )}

      <label className={`${styles.label} ${styles.margin}`}>
        <Typography>名前</Typography>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          // useRefで作成したnameRefを渡してフォームの値を取得する。
          inputRef={ref.nameRef}
          // エラーがあれば、フォームのデザインをerror用に変更させる
          error={error.has("name")}
          // エラーの詳細のフォームの下部に表示する
          helperText={error.has("name") ? error.get("name") : ""}
        />
      </label>

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
          onClick={signup}
        >
          {/* ローディング中のテキストを変更する */}
          {loading ? "アカウント作成中" : "新規作成"}
        </Button>
      </div>

      {/*
        ついでに、ログイン画面にリダイレクトできるようにリンクを入れましょう。
      */}
      <div>
        <Button href="/login" color="primary">
          ログインはこちら
        </Button>
      </div>
    </Card>
  );
};

```

変更の詳細は、`Diff` をご覧ください。

処理のコードが長くなってきたので、それぞれの処理を順番に追っていくと理解が深まるかもしれません。

ポイントとしては、フォームの値の管理を`state`ではなく、`useRef`を使用しているので、`<textField>`に対して渡すだけで、値の表示や値のセットが自動で完了しています。

これを`state`で管理しようとすると、`state`の反映と`setState`による値の瀬戸が必要になります。

また副次的に、フォームに値を入力する体にコンポーネントの再レンダリングが走るのでパフォーマンス的にもあまりよろしくありません。

usRef を用いるだけで、これらの課題を解決することができます。

ちなみに、うまく処理が実行できていれば、何も入力しない状態のフォームは赤色にエラー文が表示されます。

![signup validation process](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/signup_validation_process.gif?raw=true)

また、全ての処理が不具合なく動くとこのように、サインアップが成功し、ユーザーが作成され、`/`にリダイレクトされます。

![success signup](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/success_signup.gif?raw=true)

あっという間にアカウント作成が完成しました。

- ### ログインの実装

サクサクとログイン機能も作っていきましょう。

考え方とやることは先程の`Signup`とほぼ同等です。

なので、ここでは細かい技術詳細は省き、コードを一気にお見せします。

つまづいた方は、適宜`Signup`を確認しながら進めてみてください。

`useLogin`の作成

[Diff - ]()

```TSX
// src/hooks/Authentication/useLogin/index.tsを作成

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { login as fireLogin } from "../../../utils/Firebase/login";

export const useLogin = () => {
  // ユーザーが入力した値を読み取るための`ref`
  // それぞれのrefに<input />要素の直接の参照を格納する
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // リダイレクト用の関数
  const navigate = useNavigate();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;

    // Emailフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }

    // Passwordフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }

    // バリデーションが有効か無効化を返す
    return invalidValidation;
  };

  // 実際のサインアップのロジック
  const login = async () => {
    // Firebaseのサインアップ処理を実行
    const { user } = await fireLogin({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ログインに失敗しました。");
    }

    navigate("/");
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, loading } = useAuthHelper(login, formValidation);

  return {
    ref: {
      emailRef,
      passwordRef,
    },
    login: authExecute,
    error,
    loading: loading,
  };
};

```

注意点として、`Signup`との変更点として、リダイレクト処理に変更があります。

これは、Apollo Client の使用上、query をリクエストしてデータを取得するときに呼び出した関数に対してレスポンスが返ってくるわけではなく、`Hooks`関数の方から取得する`data`で取得したデータを参照できます。

なので、`login`関数内ではリダイレクト処理を含まずに、`useEffect`による`data`のステート変更を検出する形で、リダイレクトを行うかどうかを評価しています。

ではこの`Hooks`を`<Login>`コンポーネントから呼び出します。

[Diff - ]()

```TSX
// src/pages/Login/index.tsx

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

```

こちらは、`<Sginup>`の時とほぼ同じです。

それぞれ所定の位置に入れるだけで完了です。

エラーメッセージの表示

![login validation process](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/login_validation_process.gif?raw=true)

ログイン処理

![success login](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/success_login.gif?raw=true)

いい感じですね！

- ### ログアウトの実装

ログアウトの処理は、2 パターンの実装ができると考えており、

- ログアウトボタンが押されたらその場でログアウトする
- ログアウトボタンを押すとログアウト用のページに飛び、そこでログアウトを行う。

個人的には、2 つ目の方法がいいと思っており、1 つ目の方法は、ログアウトボタンがある箇所全部でログアウトのロジックを書かなければなりません。

しかし、２つ目の方法であれば、ルーティング処理でリダイレクトを行うだけで、あとはそのページでログアウト処理を一括で行ってくれます。

そのためここでは、`<Signout>`というコンポーネントを作成して、ログアウトを実装します。

ではまずは例のごとく、`useSignout`を作成します。

[Diff - ]()

```TS
// src/hooks/Authentication/useSignout/index.tsを作成

import { useNavigate } from "react-router-dom";
import { signout as fireSignout } from "../../../utils/Firebase/signout";
import { useAuthHelper } from "../useAuthHelper";

export const useSignout = () => {
  const navigate = useNavigate();

  const signout = async () => {
    await fireSignout();
    navigate("/");
  };

  return {
    signout
  };
};
```

`useSignout`を呼び出したいところですが、まだ`<Signout>`コンポーネントを作成していないので、作りましょう。

[Diff - ]()

```TS
// src/pages/Signout/style.tsを作成

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    width: "95%",
    maxWidth: 550,
    padding: "50px 70px",
    textAlign: "center",
  },
  margin: {
    marginBottom: 40,
  },
});
```

```TSX
// src/pages/Signout/index.tsxを作成
import { Card, CircularProgress, Typography } from "@material-ui/core";
import useStyles from "./style";
export const Signout = () => {
  const styles = useStyles();
  return (
    <Card className={styles.root} variant="outlined">
      <CircularProgress className={styles.margin} size={70} thickness={4} />
      <Typography variant="h6">ログアウト中</Typography>
    </Card>
  );
};

```

ルーディングに`<Signout >`を追加します。

[Diff - ]()

```TSX
// src/Route.tsx

import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Watch } from "./pages/Watch";
import { Login } from "./pages/Login";

// import
import { Signup } from "./pages/Signup";

// <ForgetPassForm>import
import { ForgetPassForm } from "./pages/ForgetPassForm";
import { Signout } from "./pages/Signout";

export const RootRouter = () => {
  return useRoutes([
    {
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "upload", element: <Upload /> },
      ],
    },

    {
      element: <SideLessHomeLayout />,
      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videoId", element: <Watch /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <Login /> },

        // 追加！！
        { path: "signup", element: <Signup /> },
        { path: "signout", element: <Signout /> },
        { path: "forget", element: <ForgetPassForm /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};

```

最後に、`<Signout>`に`useSignout`を追加します。

[Diff - ]()

```TSX
// src/pages/Signout/index.tsx
import { Card, CircularProgress, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSignout } from "../../hooks/Authentication/useSignout";
import useStyles from "./style";

export const Signout = () => {
  const styles = useStyles();

  const { signout } = useSignout();

  // ページを表示したタイミングで、signout処理を実行するための処理
  useEffect(() => {
    signout();
  });

  return (
    <Card className={styles.root} variant="outlined">
      <CircularProgress className={styles.margin} size={70} thickness={4} />
      <Typography variant="h6">ログアウト中</Typography>
    </Card>
  );
};

```

- ### パスワード忘れの処理実装

パスワード忘れの際の処理も忘れてはいけません。

パスワード忘れコンポーネントは作成ずみのなので、`Hooks`だけ作成していきましょう。

[Diff - ]()

```TS
// src/hooks/Authentication/useForgetPass/index.tsを作成

import { useRef, useState } from "react";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";
import { forgetPass } from "../../../utils/Firebase/forgetPass";

export const useForgetPass = () => {
  // ユーザーが入力した値を読み取るための`ref`
  const emailRef = useRef<HTMLInputElement>(null);

  const [sendSuccess, setSendSuccess] = useState(false);

  const formValidation = (setError: SetErrorFn) => {
    // Emailフォームのバリデーションチェック
    // 今回はシンプルにするために、入力が空でないかだけ確認する
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      return true;
    }

    // バリデーションが有効か無効化を返す
    return false;
  };

  const sendEmail = async () => {
    await forgetPass(emailRef.current?.value || "");
    setSendSuccess(true);
  };

  // useAuthHelperを使用して、実際に認証に使用する関数を生成する
  const { authExecute, error, loading } = useAuthHelper(
    sendEmail,
    formValidation
  );

  return {
    ref: {
      emailRef,
    },
    loading,
    error,
    sendEmail: authExecute,
    sendSuccess,
  };
};

```

`Hooks`をコンポーネントから呼び出しましょう

[Diff - ]()

```TSX
// src/pages/ForgetPassForm/index.tsx
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

```

以上で、再発行メールがメールアドレス宛に届きます。

Firebase は再発行用のページをデフォルトで作成しており、開発者がそれを作らなくても、ユーザーがパスワードを再発行できるようにしています。

こちらのページをカスタマイズすることも可能なのでぜひ、興味のあるかたは触ってみてください。

![success forget pass](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/success_forget_pass.png?raw=true)

- ### 自動認証機能の実装

最後に、Firebase 特有の便利な機能として、自動ログイン機能というものがあります。

どういったものかと言うと、ユーザーが一度ログインすると、一定期間、ユーザーがログインをしなくても Firebase がそのユーザーの認証情報を送信してくれる機能です。

もう少しわかりやすくすると、毎回ログインしなくても Gmail が使用できるアレです。

firebase はこんな機能も、関数一個で簡単に使用することができます。

早速実装していきましょう。

今回の Firebase 自動ログイン機能の実装は今までと変わり、`<Provider>`を作成して、`src/index.tsx`で呼び出します。

今回、まだ`<Provider>`を置くディレクトリを決めていなかったので、`providers`と言うディレクトリを作成していきます。

[Diff - ]()

```TSX
// src/providers/AuthStateListener/index.tsxを作成

import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { fireAuth } from "../utils/Firebase/config";

export const AuthStateListener = ({ children }: PropsWithChildren<{}>) => {
  useEffect(() => {
    const unsubscriber = fireAuth.onAuthStateChanged(async (credential) => {
      const uid = credential?.uid;
    });
    return unsubscriber;
  });
  return <>{children}</>;
};
```

`onAuthStateChanged`関数は、Firebase の認証情報が変更されると自動的に呼び出される関数になっています。

例えば、ユーザーがログインすると`onAuthStateChanged`が呼び出され、`credential`にはログインされたユーザーの情報が格納されます。

次に、ユーザーが再びサイトを訪れると`onAuthStateChanged`が呼び出され、同じように`credential`にユーザーの情報が格納されています。

これにより、ユーザーはわざわざログインをしなくとも、認証が取れた状態を実現できます。

反対にユーザーの認証が取れていないと、この`onAuthStateChanged`で渡される`credential`にはユーザー情報は一切格納されません。

アプリケーションは、`onAuthStateChanged`の値を確認するだけでユーザーの認証状態を確認することができます。

あとは、この`AuthStateListener`を`src/index.tsx`で読み込ませていきます。

[Diff - ]()

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from "./GlobalStyle";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RecoilRoot } from "recoil";

// import
import { AuthStateListener } from "./providers/AuthStateListener";

const theme = createTheme();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN,
});
const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          {/*
            ユーザーの認証情報を読む込み
          */}
          <AuthStateListener>
            <BrowserRouter>
              <CssBaseline />
              <GlobalStyle />
              <RootRouter />
            </BrowserRouter>
          </AuthStateListener>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

```

これで、アプリケーションをブラウザ上で立ち上げるたびに、ユーザーの認証状態を監視する機能を盛り込みました。

- ### 認証情報の管理

これで、ログインからユーザーの認証情報のデータまでのロジックを書き上げました。

あとは、この「認証情報」を Recoil で管理して、アプリケーション全体でユーザー情報として扱えるようにします。

まずは、Recoil の「Atom」を生成します。

Recoil の`Atom`周りは、`stores`と言うディレクトリを作成し、全ての「Atom」をここで管理します。

[Diff - ]()

```TS
// src/stores/User/index.tsxを作成

import { atom } from "recoil";
import { Users } from "../../utils/graphql/generated";


// Pickはある型から特定のプロパティのみを抜き出し、新しい型を生成するTypescriptの機能
export type GlobalUserType =
  | Pick<
      Users,
      | "id"
      | "name"
      | "email"
      | "profile_photo_url"
      | "created_at"
      | "updated_at"
    >
  | undefined;

// keyはユニークとなるように命名する
export const GlobalUser = atom<GlobalUserType>({
  key: "GlobalUser",
  default: undefined,
});

```

[Recoil の章](#recoil-を用いたステート管理)にて説明した通り、「Atom」に入るデータの方を決め、その型を元に「Atom」を初期化しています。

今回は、せっかく codegen でデータベースとデータの型を共有しているので、自動生成された型から、「Atom」の型を定義しています。

これで、GraphQL で取得してくるデータと、アプリケーション全体で使用するユーザーが型安全に運用することができます。

では、この「Atom」に認証情報からユーザーのデータを格納していきます。

今回は、認証情報からユーザーのデータを取得するのに、ユーザー情報取得用の`Provider`を作成して、都度認証情報のステート変更を監視しながら、認証情報の変化に追随できるユーザー情報取得ロジックを書いていきます。

設計としては、`AuthStateListener`で取得できる`uid`という値をこのユーザー情報取得 Provider(`<GlobalAccount>`)で変更を検出し、`uid`があればユーザー情報の取得を行い、無ければユーザー情報の「Atom」を undefined で更新します。

`uid`は`AuthStateListener`と`GlobalAccount`でそれぞれ操作したいので、新しく「Atom」として管理します。

[Diff - ]()

```TS
// src/stores/AuthCredential/index.tsを作成

import { atom } from "recoil";

export type AuthCredentialType = string | undefined;

export const AuthCredential = atom<AuthCredentialType>({
  key: "AuthCredential",
  default: undefined,
});
```

合わせて、`GlobalAccount`内で、`AuthCredential`が`undefined`であることが、「ローディング中故に`undefined`なのか」「ロードされてなお`undefined`なのか」を識別するために、`AuthCredentialLoaded`と言う「Atom」も作成します。

[Diff - ]()

```TS
// src/stores/AuthCredentialLoaded/index.tsを作成

import { atom } from "recoil";

export type AuthCredentialLoadedType = boolean;

export const AuthCredentialLoaded = atom<AuthCredentialLoadedType>({
  key: "AuthCredentialLoaded",
  default: false,
});
```

上記の「Atom」を監視して、`Credential`の変更があればユーザー情報の変更を行う`GlobalAccount`と言う Provider を作成します。

[Diff - ]()

```TSX
// src/providers/GlobalAccount/index.tsxを作成

import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";
import { signout } from "../../utils/Firebase/signout";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";

export const GlobalAccout = ({ children }: PropsWithChildren<{}>) => {
  // ユーザー情報取得用のQuery関数
  const [
    userQuery,
    { data: apolloData, error: apolloError, loading: apolloLoding },
  ] = useUserByIdLazyQuery();

  // Recoilのユーザー情報の「Atom」とAuthenticationの「Atom」
  const [globalUser, setGlobalUser] = useRecoilState(GlobalUser);
  const credential = useRecoilValue(AuthCredential);
  const authLoaded = useRecoilValue(AuthCredentialLoaded);

  useEffect(() => {
    // Authenticationのローディング終わっており
    if (authLoaded) {
      // credentialにIDが格納されており
      if (credential) {
        // Apollo Clientがローディング中で、ユーザー情報を未取得であれば
        if (!apolloLoding && !globalUser?.id) {
          // ユーザー情報の取得開始
          userQuery({ variables: { id: credential } });
        }
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [credential, authLoaded]);

  useEffect(() => {
    // onAuthStateChangedのロードが終了したタイミングで、
    // ユーザー情報が取れていれば、Recoilを更新し、
    // 取れていなければ、Recoilをundefinedにする
    if (authLoaded && !apolloLoding) {
      if (apolloData?.users_by_pk?.id) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    // GraphQLからのエラーがあった場合は、
    // Recoilをudefinedで更新し、
    // ユーザーにログアウトさせる。
    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
      signout();
    }
  }, [apolloError]);

  return <>{children}</>;
};

```

`GlobalAccout`を`src/index.tsx`に読み込ませます。

読み込ませる位置は、`AuthStateListener`よりも下の階層です。

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from "./GlobalStyle";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RecoilRoot } from "recoil";
import { AuthStateListener } from "./providers/AuthStateListener";

// 追加
import { GlobalAccout } from "./providers/GlobalAccount";

const theme = createTheme();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN,
});

const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET_KEY,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <AuthStateListener>
            {/*
            ユーザー情報を読む込み
          */}
            <GlobalAccout>
              <BrowserRouter>
                <CssBaseline />
                <GlobalStyle />
                <RootRouter />
              </BrowserRouter>
            </GlobalAccout>
          </AuthStateListener>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

```

続いて、`AuthStateListener`で`credential`に id を格納するための処理を追加します。

[Diff - ]()

```TSX
// src/providers/AuthStateListener/index.tsx
import { useEffect, PropsWithChildren } from "react";
import { useSetRecoilState } from "recoil";
import { fireAuth } from "../../utils/Firebase/config";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";

export const AuthStateListener = ({ children }: PropsWithChildren<{}>) => {
  // Authenticationの状態を格納するための「Atom」
  const setCredential = useSetRecoilState(AuthCredential);
  const setLoaded = useSetRecoilState(AuthCredentialLoaded);

  useEffect(() => {
    const unsubscriber = fireAuth.onAuthStateChanged(async (credential) => {
      // uidが存在→つまり認証が済んでいるユーザーであれなuidを格納する
      setCredential(credential?.uid || undefined);

      // onAuthStateChangedが呼ばれたのでtrueをセット
      setLoaded(true);
    });

    // これはonAuthStateChangedを停止する用の関数
    // useEffectの返り値に関数を指定すると、ReactはそのuseEffectがアンマウントされた時、つまりコンポーネントが表示されなくなったらreturnに指定された関数を実行します。
    // この場合、AuthStateListenerはProviderとしてアプリケーションのRootで呼んでいるのでアプリケーションを閉じたときに実行される
    return unsubscriber;
  });

  return <>{children}</>;
};
```

以上で、認証情報からユーザー情報を取得するためのロジックが完成しました。

色々コードを書いていますが、認証が承認されていれば、GraphQL でデータを取得してきて `GlobalAccount` を更新し、認証が承認されていなければ、`GlobalAccount` を undefined で更新しています。

Recoil により、ユーザー情報を管理できるようになったことで、大きく変わる部分があります。

それが`<DashboardHeader>`の右上の部分です。

現在はアバターと動画追加用のボタンが表示されており、本来であれば認証されていない時は表示したくない情報です。

なので、ここのロジックを変更します。

[Diff - ]()

```TSX
// src/templates/DashboardHeader/index.tsx

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
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          {/*
            ユーザーがログインしていれば、ユーザー用のデザインを表示
            未ログインであれば「ログインボタン」を表示
          */}
          {globalUser ? (
            <>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
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

```

ここまでで、ユーザーの認証ができました。

ここで二つバグがあります。

- 新規アカウント登録した後にリダイレクトした先で、ユーザー情報がうまく取れていないと言うバグ
- ログアウトしたのに、アカウントが取得されているバグ

一つ目のバグの原因は、`useSignup`で GraphQL によりユーザー情報が作成されるより前に、`GlobalAccount`でユーザー情報を取得しているためです。

二つ目のバグも似たような理由で、タイミングの問題でログアウト時に GraphQL が呼び出されるというバグがあるためです。

一つ目のバグは、`useSignup`の中で`mutation`したデータを`GlobalUser`に確実に格納することで解決します。

[Diff - ]()

```TSX
// src/hooks/Authentication/useSignup/index.ts

import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { GlobalUser } from "../../../stores/User";
import { FireSignupType } from "../../../utils/Firebase/signup";
import { signup as fireSignup } from "../../../utils/Firebase/signup";
import { useInsertUserMutation } from "../../../utils/graphql/generated";
import { SetErrorFn, useAuthHelper } from "../useAuthHelper";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // mutationで作成するデータを格納
  const setGlobalUser = useSetRecoilState(GlobalUser);


  const [insertMutation, { error: apolloError }] = useInsertUserMutation();

  const formValidation = (setError: SetErrorFn) => {
    let invalidValidation = false;
    if (!nameRef.current?.value) {
      setError("name", "名前が入力されていません。");
      invalidValidation = true;
    }
    if (!emailRef.current?.value) {
      setError("email", "メールアドレスを入力してください。");
      invalidValidation = true;
    }
    if (!passwordRef.current?.value) {
      setError("password", "パスワードを入力してください。");
      invalidValidation = true;
    }
    return invalidValidation;
  };

  const signup = async () => {
    const { user } = await fireSignup({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    if (!user?.uid) {
      throw new Error("ユーザーの登録に失敗しました。");
    }

    const apolloResponse = await insertMutation({
      variables: {
        id: user.uid,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
      // GraphQLでデータが作成された後に確実にデータを格納する
      setGlobalUser(apolloResponse.data?.insert_users_one);


      navigate("/");
    } else {
      throw new Error("ユーザーの登録に失敗しました。");
    }
  };

  const { authExecute, error, setErrorHandler, loading } = useAuthHelper(
    signup,
    formValidation
  );
  useEffect(() => {
    if (apolloError?.message) {
      setErrorHandler("main", apolloError.message);
    }
  }, [apolloError]);
  return {
    ref: {
      nameRef,
      emailRef,
      passwordRef,
    },
    signup: authExecute,
    error,
    loading,
  };
};

```

また、`signout`のバグは、GlobalAccount にデータをセットできるラミングを修正することで修正できます。

```TSX
// src/providers/GlobalAccount/index.tsx

import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";
import { signout } from "../../utils/Firebase/signout";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";

export const GlobalAccout = ({ children }: PropsWithChildren<{}>) => {
  // ユーザー情報取得用のQuery関数
  const [
    userQuery,
    { data: apolloData, error: apolloError, loading: apolloLoding },
  ] = useUserByIdLazyQuery();

  // Recoilのユーザー情報の「Atom」とAuthenticationの「Atom」
  const [globalUser, setGlobalUser] = useRecoilState(GlobalUser);
  const credential = useRecoilValue(AuthCredential);
  const authLoaded = useRecoilValue(AuthCredentialLoaded);

  const query = (id: string) => {
    if (!apolloLoding) {
      userQuery({ variables: { id } });
    }
  };

  useEffect(() => {
    if (authLoaded) {
      if (credential) {
        if (!globalUser?.id) {
          query(credential);
        }
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [credential, authLoaded]);

  useEffect(() => {
    if (authLoaded && !apolloLoding) {

      // Credentialにidが格納されていなければデータは格納できない。
      if (apolloData?.users_by_pk?.id && credential) {
        setGlobalUser(apolloData.users_by_pk);
      } else {
        if (globalUser?.id) {
          setGlobalUser(undefined);
        }
      }
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {

    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
      signout();
    }
  }, [apolloError]);

  return <>{children}</>;
};
```

以上で、認証周りの動作が完成しました。

## JWT トークンで Hsaura のリクエストをセキュアに

ここまでで、認証のロジックが完了して、ユーザーアカウントの管理ができるようになりました。

ここで、一つ、Hasura を含む、サーバー周りをセキュアな構成にして情報の流出や不審なアクセスがされないようにするための機能をご紹介します。

何をするかと言うと、クライアント側で行ったユーザー認証を、Hsaura にわたすことによって、データへのアクセス権などを Hasura 側で制限することができます。

例えば、今回のアプリケーションですと、動画のアップロードはログインしたユーザーのみに制限しています。

Hasura 側でこの認証情報を識別する方法を実装しないと、どれだけクライアント側で操作ができないようにしても、Hasura に直接リクエストを投げるとデータの作成ができてしまいます。

更に今の Bootcamp のアプリケーションには、Header に直接 Hasura のシークレットキーを載せてリクエストを飛ばしています。

これは、もう本当に非常に危険な状態で、リクエストの中身が見えてしまうと、一瞬でシークレットキーが盗まれてしまいます。

これを防ぐために、ユーザーの認証情報をシークレットキーの代わりに Header の付与することで、セキュアなリクエストを飛ばすことができます。

インフラレベルでリクエストを制限を設けることは、アプリケーション開発には大事なことです。

そこで、なかなか勉強コンテンツやチュートリアルでは教えられないセキュリティ周りの話もしていきたいと思います。

注意！！！

[JWT トークンで Hsaura のリクエストをセキュアに](#jwt-トークンで-hsaura-のリクエストをセキュアに)の章では、Firebase を従量課金プランにプランを変更する必要があります。

これは Firebase Functions というサービス使用する条件が、従量課金プランのプロジェクトであることが理由です。

とはいえ、課金されるのは 1 円に満たなく、本当にどれだけ使用しても 2~3 円を超えることはありません。

それでも、サーバーを有料プランにするのに抵抗がある方は、[この章を飛ばしてアプリケーション開発を続けてください。](#firebase-storage-に動画をアップロード)

- ### JWT トークンとは

では、Hasura にユーザーの認証情報をリクエストに含めるためにはどうすればいいのでしょうか。

この認証情報をリクエストに載せて送信するための技術が JWT と呼ばれるものです。

JWT は、JSON Web Token の略称であり、ユーザーの認証情報であったり、属性情報（Claim:クレーム）を JSON データ構造で表現した`トークン`です。

JWT のすごいところは、JSON データ構造として情報を持ちつつも、暗号化により電子署名付きの URL-safe（URL として利用出来る文字列）な JSON として使用できます。

電子署名を行っているため、JSON データの改竄チェックを行うことができます。

つまり認証トークンとして用いる場合は、そのユーザーが本当に信頼できるリソース源から認証を受けた個体か、そして、途中でトークンが改竄を受けていないかを確認することもできる優れものです。

この JWT、実際にどういったものかをお見せしていきます。

いきなりですが、JWT とはこれです。

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

この長い文字列の中に、ユーザーの認証情報や属性情報が格納されています。

JWT が実際にどのような JSON の値なのかを確認するためには、こちらの[jwt.io](https://jwt.io/)というサイトで確認する事ができます。

サイトでは、左側に JWT トークンを入力すると正しい JWT の構造を持っていれば、右側に実際の JSON データが表示されます。

見てお分かりの通り、JWT は簡単にエンコード、デコードができてしまいます。

なので、JWT 自体には秘匿性を担保する機構はなく、あくまで、信頼できるリソースから作られたという証明とトークンが改竄されていないかの確認しかできません。

JWT にしたから安心だ、ということはなく、JWT が漏れればもちろん、その認証ユーザーの権限が許す限りデータリソースへのアクセスは可能です。

これを防ぐために、JWT では有効期限を設けて、有効期限内でしか使用できない JWT を作成するような運用を取ります。

この時、有効期限を 1 時間にすれば、JWT の再生成頻度は下がり、ユーザーの UX は向上しますが、流出した時のリスクが高くなります。（１時間を長いととるか短いと取るかによりますが）

反対に、5 分などにすると、JWT は頻繁に再生成する必要がありますが、流出したときのリスクは上記より小さくなります。（それでも、5 分なればデータを抜け取れそうですが）

このようなトレードオフの元、JWT の有効期限を厳密に操作することで、セキュリティの高低をつけることができます。

ちなみに、JWT はジョットと発音するみたいです。

- ### Hasura で JWT トークンを認証できるように設定

では JWT の概要がわかったところで、実際に Hasura ではどのように JWT を使っていけばいいのかをご説明していきます。

Hasura の JWT のアーキテクチャを端的に表すとこのような画像になります。

![hasura jwt architecture](https://hasura.io/docs/latest/_images/jwt-auth1.png)

画像右側に認証サーバー、今回の場合ですと Firebase Authentication から JWT を生成してもらい、その JWT を GraphQL のリクエストの Header に乗せて、Hasura にリクエストを飛ばすことで Hasura が勝手に JWT を認証してくれ、有効な JWT か無効な JWT かを識別します。

なので私達が行うこととしては、、Hasura で JWT 用の設定を行うこと、Hasura の JWT 識別ルールに則った JWT データを Firebase Authentication で生成できるようにすること GraphQl のリクエストに JWT を乗せること、の３つです。

Hasura 特有の JWT ルールさえ理解できてしまえば、難しいことはありません。

一個づつ設定していきましょう。

Hasura の JWT は、ハマリポイントが多くあるので、そちらも確認しながら設定を行っていきます。

Hasura で JWT の設定するために、Heroku のコンソール画面から設定を行っていきます。

ご自身が Hasura のデータベースを作成した時に`connect`した Heroku アカウントで Heroku にログインします。

Hasura と Heroku のどのプロジェクトが紐付いているかを確認するためには、[Hasura の最初のプロジェクトコンソール](https://cloud.hasura.io/projects)から`⚙歯車マーク`から設定画面を開き、`Env vars`から`HEROKU_DATABASE_URL`と書かれているところをクリックすると Heroku のどのプロジェクト ID と紐付いているかを確認できます。

![hasura heroku projectid](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_heroku_projectid.png?raw=true)

Heroku で同じプロジェクト ID のコンソール画面をから、`Settings`から`Config Vars`を設定する。

- HASURA_GRAPHQL_JWT_SECRET  
  {
  "type":"RS256",
  "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  "audience": "firebase-project-id",
  "issuer": "https://securetoken.google.com/firebase-project-id"
  }

`firebase-project-id`をあなたの Firebase のプロジェクト ID に変更してください。

- HASURA_GRAPHQL_UNAUTHORIZED_ROLE  
  anonymous

- HASURA_GRAPHQL_ADMIN_SECRET  
  YOUR_HASURA_GRAPHQL_ADMIN_SECRET

![heroku jwt settings](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/heroku_jwt_settings.png?raw=true)

以上で Hasura 側での JWT の設定が完了しました。

- ### Hasura でパーミッションを設定してセキュアなデータベースを設定

Hasura にパーミッションを設定して、適切なユーザーが適切な権限を付与できるように設定していきます。

パーミッションは、データベースにあまり馴染みがない人は聞いたことがないかもしれません。

パーミッションは、「あなたはこれしていいけど、あなたはこれしたらだめ」というものを設定するものです。

パーミッションの設定は、`Role`に対して、`Permission`を付与するといった感じで使われます。

`Role`が「あなた」で、`Permission`が「これしていい/だめ」を設定します。

今回`Role`は「user(ログイン済みユーザー)」と「anonymous(未ログインユーザー)」を設定します。

それぞれの`Role`に、データベースのある操作（読み取り、作成、更新、削除）ができるかを設定するのが`Permission`です。

では早速、Hasura で生成済みのテーブルに対して、`Permission`を設定していきましょう。

- #### users テーブルのパーミッションを設定

まずは`users`テーブルから`Permission`を設定します。

Hasura のプロジェクトコンソールから`users`テーブルを表示します。

上部タブの`Permission`を選択します。

![hasura table permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_table_permission.png?raw=true)

insert : データの挿入を行う操作  
select : データを読み取る操作  
update : データをアップデートする操作  
delete : データを削除する操作

横軸を`Role`としてそれぞれのデータベース操作の`Permission`を設定します。

`user`ロールを作成して、`insert`にパーミッションを設定してみましょう。

「Enter new role」に「user」と入力して、`insert`の × をクリックすると設定を行い、`Save Permissions`で保存します。

- insert
  - [x] With custom check:
        {
        id : {
        \_eq : X-Hasura-User-Id
        }
        }
  - Column select permissions (Toggle All)  
     [x] email  
     [x] id  
     [x] name  
     [x] profile_photo_url  
     [x] created_at  
     [x] updated_at

![users user insert permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_insert_permission.png?raw=true)

合わせて`select`、`update`、`delete`も設定します

- select
  - Row select permissions  
     [x] Without any checks
  - Column select permissions (Toggle All)  
     [x] email  
     [x] id  
     [x] name  
     [x] profile_photo_url  
     [x] created_at  
     [x] updated_at

![users user select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
      [x] With same custom check as insert
    - Post-update check
      [x] With same custom check as insert, pre update
  - Column select permissions (Toggle All)  
     [x] email  
     [ ] id  
     [x] name  
     [x] profile_photo_url  
     [ ] created_at  
     [ ] updated_at

![users user update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_update_permission.png?raw=true)

`delete`のパーミッションは設定しません。

user を削除してしまうと、動画に紐付いている`owner_id`が行方不明になってしまうため、削除はできないようにします。

続いて、同じく`users`テーブルの`anonymous`ロールのパーミッションを設定していきます。

`anonymous`に付与するパーミッションは`select`のみです。

- select
  - Row select permissions  
     [x] Without any checks
  - Column select permissions (Toggle All)  
     [x] email  
     [x] id  
     [x] name  
     [x] profile_photo_url  
     [x] created_at  
     [x] updated_at

![users anonymous select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_anonymous_select_permission.png?raw=true)

これで`users`テーブルのパーミッションの設定は完了です。

- #### videos テーブルのパーミッションを設定

続いて、`videos`テーブルのパーミッションの設定を行います。

- insert
  - [x] With custom check:
        {
        owner_id : {
        \_eq : X-Hasura-User-Id
        }
        }
  - Column select permissions (Toggle All)  
     [x] duration  
     [x] views  
     [x] description  
     [x] id  
     [x] owner_id  
     [x] thumbnail_url  
     [x] title  
     [x] video_url  
     [ ] created_at  
     [ ] updated_at

![videos user insert permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_insert_permission.png?raw=true)

- select
  - Row select permissions  
     [x] Without any checks
  - Column select permissions (Toggle All)  
     [x] duration  
     [x] views  
     [x] description  
     [x] id  
     [x] owner_id  
     [x] thumbnail_url  
     [x] title  
     [x] video_url  
     [x] created_at  
     [x] updated_at

![videos user select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
      [x] With same custom check as insert
    - Post-update check
      [x] With same custom check as insert, pre update
  - Column select permissions (Toggle All)  
     [x] duration  
     [x] views  
     [x] description  
     [ ] id  
     [ ] owner_id  
     [x] thumbnail_url  
     [x] title  
     [ ] video_url  
     [ ] created_at  
     [ ] updated_at

![videos user update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_update_permission.png?raw=true)

- delete
  - Row select permissions  
     [x] Without any checks

![videos user delete permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_delete_permission.png?raw=true)

続いて、`anonymous`にパーミッションを設定して行きます。

`videos`では、`select`と`update`をパーミッションを設定します。

- select
  - Row select permissions  
     [x] Without any checks
  - Column select permissions (Toggle All)  
     [x] duration  
     [x] views  
     [x] description  
     [x] id  
     [x] owner_id  
     [x] thumbnail_url  
     [x] title  
     [x] video_url  
     [x] created_at  
     [x] updated_at

![videos anonymous select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_anonymous_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
      [x] With same custom check as insert
    - Post-update check
      [x] With same custom check as insert, pre update
  - Column select permissions (Toggle All)  
     [ ] duration  
     [x] views  
     [ ] description  
     [ ] id  
     [ ] owner_id  
     [ ] thumbnail_url  
     [ ] title  
     [ ] video_url  
     [ ] created_at  
     [ ] updated_at

![videos anonymous update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_anonymous_update_permission.png?raw=true)

これで全てのパーミッションの設定ができました。

- ### Firebase Authentication から JWT トークンを取得
- ### Hasura の GraphQL ヘッダーに JWT を実装
- ### Hasura のハマリポイント

## Firebase Storage に動画をアップロード

## GraphQL リクエストを実装

- ### user データの作成と取得
- ### video データの作成
- ### video データの取得
- ### Firebase Storage から動画を取得する
