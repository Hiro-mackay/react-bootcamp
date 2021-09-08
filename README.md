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
- [ ] Firebase Storage に動画をアップロード
- [ ] GraphQL リクエストを実装
- [ ] Apollo Clinet のキャッシュを対策する

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
  - [Firebase Authentication から JWT トークンを取得](#firebase-authentication-から-jwt-トークンを取得)
    - [Firestore を確認して user のドキュメントが作成されるまで待機](#firestore-を確認して-user-のドキュメントが作成されるまで待機)
    - [トークンに Hasura カスタムクレームが追加されたら、GraphQL でユーザー情報を insert](#トークンに-hasura-カスタムクレームが追加されたらgraphql-でユーザー情報を-insert)
    - [GraphQL のヘッダーに JWT トークンを追加](#graphql-のヘッダーに-jwt-トークンを追加)
  - [Hasura の GraphQL ヘッダーに JWT を実装](#hasura-の-graphql-ヘッダーに-jwt-を実装)
    - [Firestore を確認して user のドキュメントが作成されるまで待機](#firestore-を確認して-user-のドキュメントが作成されるまで待機)
    - [トークンに Hasura カスタムクレームが追加されたら GraphQL でユーザー情報を insert](#トークンに-hasura-カスタムクレームが追加されたらgraphql-でユーザー情報を-insert)
    - [GraphQL のヘッダーに JWT トークンを追加](#graphql-のヘッダーに-jwt-トークンを追加)
    - [クレームを追加するためにアカウントを作成し直す](#クレームを追加するためにアカウントを作成し直す)
  - [Hasura のハマリポイント](#hasura-のハマリポイント)
    - [Hasura で JWT を使用するためには、Hasura のエンドポイントを保護する必要があります。](#hasura-で-jwt-を使用するためにはhasura-のエンドポイントを保護する必要があります)
    - [headers に X-Hasura-Admin-Secret が含まれる場合は、JWT 認証はスキップされます。](#headersにx-hasura-admin-secretが含まれる場合はjwt認証はスキップされます)
    - [Hasura で JWT を送信する際にはカスタムクレームを https://hasura.io/jwt/claims で設定する必要があります。](#hasura-で-jwt-を送信する際にはカスタムクレームをhttpshasuraiojwtclaimsで設定する必要があります)
    - [JWT のカスタムクレームには x-hasura-default-role, x-hasura-allowed-roles が含まれている必要があります。](#jwt-のカスタムクレームにはx-hasura-default-role-x-hasura-allowed-rolesが含まれている必要があります)
    - [ユーザーのロールをクライアント側で指定するには。](#ユーザーのロールをクライアント側で指定するには)
    - [JWT には Hasura で認識可能な独自のカスタムクレーム値を設定できます。](#jwt-には-hasura-で認識可能な独自のカスタムクレーム値を設定できます)
- [Firebase Storage に動画をアップロード](#firebase-storage-に動画をアップロード)
  - [ログインしているユーザーのみアップロードを許可する](#ログインしているユーザーのみアップロードを許可する)
    - [ログインしているユーザーにのみ、アップロード画面へのリンクを表示する。](#ログインしているユーザーにのみ、アップロード画面へのリンクを表示する)
    - [未ログインでアップロード画面を表示したらログインを促す](#未ログインでアップロード画面を表示したらログインを促す)
    - [未ログインでアップロード画面を表示したらログインを促す](#未ログインでアップロード画面を表示したらログインを促す)
  - [ブラウザからファイルを選択する](#ブラウザからファイルを選択する)
  - [選択したファイルを Firebase Storage にアップロードする](#選択したファイルをfirebase-storageにアップロードする)
  - [動画のメタデータをデータベースに保存する](#動画のメタデータをデータベースに保存する)
- [GraphQL リクエストを実装](#graphql-リクエストを実装)
  - [video データの取得](#video-データのリストを取得)
  - [Firebase Storage から動画を取得する](#firebase-storage-から動画を取得する)
  - [Firebase Storage のルールを書き換えてサムネイルを取得する](#firebase-storageのルールを書き換えてサムネイルを取得する)
- [Apollo Clinet のキャッシュを対策する](#apollo-clinet-のキャッシュを対策する)

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

しかし、この方法でアプリケーションを構築することはほぼなく、`useState`はあくまでローカルな `state`を管理するために使用するようにしましょう。

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

[Diff - Recoil をアプリケーションに追加する](https://github.com/Hiro-mackay/react-bootcamp/commit/a37b75f7c017f95d8b8dc6ca1ee73e17d7a34694)

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

[Diff - ロゴにリンクを追加する](https://github.com/Hiro-mackay/react-bootcamp/commit/b12fe31f607d80bdfcadcb1677f8650b26e880c4)

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

[Diff - サイドバーにリンクを追加する](https://github.com/Hiro-mackay/react-bootcamp/commit/602de8b7732aca0a945b45cc51d35faf7f04cd89)

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

[Diff - graphql のクエリーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/1e92db1c77fae2701beae9d34404a2d4a37ab435)

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

[Diff - useSignup を追加する](https://github.com/Hiro-mackay/react-bootcamp/commit/bb3e545d5c96ee6e8b4613272e52cae9a4dca0de)

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

[Diff - 認証の処理の共通化](https://github.com/Hiro-mackay/react-bootcamp/commit/dfa69058d8ae190f7403ba2ed8e1132ba6e10cb5)

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
    setErrorHandler
  };
};

```

認証ロジックの共通ロジックとして、それぞれの認証ロジックから呼び出す`useAuthHelper`という名前の`Hooks`を用意しました。

これはまだ雛形です。

コメントに書いてある処理を、先ほど作成した`useSignup`から共通ロジックに渡すことで、`useAuthHelper`Hooks を完成させていきます。

完成形のコードを先にお見せします。

[Diff - useAuthHelper 処理の詳細](https://github.com/Hiro-mackay/react-bootcamp/commit/fe2fa6da75c449c95e82f3899c5092c518c88eb4)

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
    } catch (error : any) {
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

これが何が嬉しいかは後々わかるので、まずはこの `useAuthHelper`を使用して、`useSignup`を完成させましょう。

[Diff - useSignup 処理実装](https://github.com/Hiro-mackay/react-bootcamp/commit/db34962de5e73efd6c1ef574829e7ca0f40e097c)

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

[Diff - signup コンポーネントに hooks を実装](https://github.com/Hiro-mackay/react-bootcamp/commit/ea813af74e3513f94ce194fa4e71382cb62c5101)

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

`/signup`にアクセスして処理を確認してみましょう。

うまく処理が実行できていれば、何も入力しない状態のフォームは赤色にエラー文が表示されます。

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

[Diff - useLogin フックを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/a57d4f3a8e69699ed8b0db6d7a3c623c9c7393cd)

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

ではこの`Hooks`を`<Login>`コンポーネントから呼び出します。

[Diff - Login コンポーネントに hook を実装](https://github.com/Hiro-mackay/react-bootcamp/commit/e7bf2abfc05cee0d7f3f7606e839a45a5a3bb9ee)

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

[Diff - useSignout フックを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/29f67e093407979ed39a3209205a693f0f1475c9)

```TS
// src/hooks/Authentication/useSignout/index.tsを作成

import { useNavigate } from "react-router-dom";
import { signout as fireSignout } from "../../../utils/Firebase/signout";

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

[Diff - Signout コンポーネントを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/909d116ec9bfa9747278a5c9017096979ce6ef08)

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

[Diff - ルーティングに/signout を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/a28860ecc695f02281eb3b6e79736feb48c4991d)

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
        { path: "signup", element: <Signup /> },

        // 追加！！
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

[Diff - Signout コンポーネントに Hooks を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/c1ddc4341bda38b16e8e6e34d017a8aa5aa548c4)

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

[Diff - useForgetPass フックを作成](https://github.com/Hiro-mackay/react-bootcamp/commit/28e084a60531920b74d054530d08e4de31621d09)

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

[Diff - ForgetPassForm コンポーネントに Hooks を実装](https://github.com/Hiro-mackay/react-bootcamp/commit/5a2b7955495327d8c60a7b3d688d32754f447cd5)

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

[Diff - AuthStateListener コンポーネントでプロバイダーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/acc5925318a1d20eda1c7d07d952c3998b582791)

```TSX
// src/providers/AuthStateListener/index.tsxを作成

import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { fireAuth } from "../../utils/Firebase/config";

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

[Diff - root コンポーネントに AuthStateListener プロバイダーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/8e91edb8a8f055bec6097606b6d7cfe130454450)

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

[Diff - User Atom を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/7b8497ee19002a17eaea8982651b6f6c2ddb81d1)

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

[Diff - AuthCredential Atom を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/2d456e28b5f8a652d901ec5d7ec98538f3231433)

```TS
// src/stores/AuthCredential/index.tsを作成

import { atom } from "recoil";

export type AuthCredentialType = string | undefined;

export const AuthCredential = atom<AuthCredentialType>({
  key: "AuthCredential",
  default: undefined,
});
```

合わせて、認証及び、アカウントの取得のローディング完了しているかの`Loaded Atom`を作成します。

[Diff - Loaded Atom を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/07075023171f5b2005812caf90080c4f8de22da8)

```TS
// src/stores/AuthCredentialLoaded/index.tsを作成

import { atom } from "recoil";

export type AuthCredentialLoadedType = boolean;

export const AuthCredentialLoaded = atom<AuthCredentialLoadedType>({
  key: "AuthCredentialLoaded",
  default: false,
});
```

```TS
// src/stores/AccountLoaded/index.tsを作成

import { atom } from "recoil";

export type AccountLoadedType = boolean;

export const AccountLoaded = atom<AccountLoadedType>({
  key: "AccountLoaded",
  default: false,
});

```

上記の「Atom」を監視して、`Credential`の変更があればユーザー情報の変更を行う`GlobalAccount`と言う Provider を作成します。

[Diff - GlobalAccout プロバイダーを追加する](https://github.com/Hiro-mackay/react-bootcamp/commit/73b7a322280b73477db43084b5757dd3817f47ce)

```TSX
// src/providers/GlobalAccount/index.tsxを作成

import { useEffect, PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useUserByIdLazyQuery } from "../../utils/graphql/generated";
import { signout } from "../../utils/Firebase/signout";
import { AuthCredential } from "../../stores/AuthCredential";
import { AuthCredentialLoaded } from "../../stores/AuthCredentialLoaded";
import { AccountLoaded } from "../../stores/AccountLoaded";

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

  // Accountのローディング状態を管理
  const setAccountLoaded = useSetRecoilState(AccountLoaded);

  useEffect(() => {
    // Authenticationのローディング終わっており
    if (authLoaded) {
      // credentialにIDが格納されており
      if (credential) {
        // Apollo Clientがローディング中で、ユーザー情報を未取得であれば
        if (!apolloLoding && !globalUser?.id) {
          // ユーザー情報の取得開始
          setAccountLoaded(false);
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
      // Accountのローディングを完了
      setAccountLoaded(true);
    }
  }, [authLoaded, apolloData]);

  useEffect(() => {
    // GraphQLからのエラーがあった場合は、
    // Recoilをudefinedで更新し、
    // ユーザーにログアウトさせる。
    if (apolloError?.message) {
      console.error(apolloError?.message);
      setGlobalUser(undefined);
    }
  }, [apolloError]);

  return <>{children}</>;
};

```

`GlobalAccout`を`src/index.tsx`に読み込ませます。

読み込ませる位置は、`AuthStateListener`よりも下の階層です。

[Diff - root コンポーネントに GlobalAccout プロパイダーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/4152d51b1e36285ee802ad6b34f02fd74e64dbc5)

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

[Diff - AuthStateListener で credential を取得](https://github.com/Hiro-mackay/react-bootcamp/commit/bd248c3644cd513379293032f744eb16b718a2a5)

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
      // uidが存在→つまり認証が済んでいるユーザーであればuidを格納する
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

[Diff - ログイン状態でヘッダーのデザインを変更する](https://github.com/Hiro-mackay/react-bootcamp/commit/6771da8af277adae214f1440af2bad9b97ccaeb8)

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

[Diff - 新規アカウント登録のバグを修正](https://github.com/Hiro-mackay/react-bootcamp/commit/df37f2409d9495d31b5a793070f8cbc3bd67a25e)

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

また、`signout`のバグは、GlobalAccount にデータをセットできるタイミングを修正します。

[Diff - サインアウトのバグを解消](https://github.com/Hiro-mackay/react-bootcamp/commit/877ad6c995f175777bfb8dd12486271d57311614)

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

  useEffect(() => {
    if (authLoaded) {
      if (credential) {
        if (!apolloLoding && !globalUser?.id ) {
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

反対に、5 分などにすると、JWT は頻繁に再生成する必要がありますが、流出したときのリスクは上記より小さくなります。（それでも、5 分となればデータを抜け取れそうですが）

このようなトレードオフの元、JWT の有効期限を厳密に操作することで、セキュリティの高低をつけることができます。

ちなみに、JWT はジョットと発音するみたいです。

- ### Hasura で JWT トークンを認証できるように設定

では JWT の概要がわかったところで、実際に Hasura ではどのように JWT を使っていけばいいのかをご説明していきます。

Hasura の JWT のアーキテクチャを端的に表すとこのような画像になります。

![hasura jwt architecture](https://hasura.io/docs/latest/_images/jwt-auth1.png)

画像右側に認証サーバー、今回の場合であれば Firebase Authentication から JWT を生成してもらい、その JWT を GraphQL のリクエストの Header に乗せて、Hasura にリクエストを飛ばすことで Hasura が勝手に JWT を認証してくれ、有効な JWT か無効な JWT かを識別します。

なので私達が行うこととしては、、Hasura で JWT 用の設定を行うこと、Hasura の JWT 識別ルールに則った JWT データを Firebase Authentication で生成できるようにすること GraphQl のリクエストに JWT を乗せること、の３つです。

Hasura 特有の JWT ルールさえ理解できてしまえば、難しいことはありません。

一個づつ設定していきましょう。

Hasura の JWT は、ハマリポイントが多くあるので、そちらも確認しながら設定を行っていきます。

> Hasura のドキュメントが古くなっていたため、今までの方法では JWT の設定ができなくなっていました。
> 以下の新しい方法で設定を行ってください
> すでに Heroku の方に設定を行なっている場合は、Herokuno 設定は削除しても問題ありません。

<details>

<summary>古いバージョンのHasuraのJWT設定</summary>

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

`YOUR_HASURA_GRAPHQL_ADMIN_SECRET`をあなたの Hasura シークレットキーに置き換えてください。

![heroku jwt settings](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/heroku_jwt_settings.png?raw=true)

</details>

Hsaura の[コンソール画面](#https://cloud.hasura.io/projects)にアクセスします。

今回のプロジェクトの`⚙マーク`から設定を開きます。

![hasura dashboard console](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_dashboard_console.png?raw=true)

`Env Var`というタブを選択します。

![hasura env var](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_env_var.png?raw=true)

`New Env Var`から JWT の設定を反映させます。

![hasura new env var](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_new_env_var.png?raw=true)

- HASURA_GRAPHQL_JWT_SECRET  
  {
  "type":"RS256",
  "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  "audience": "firebase-project-id",
  "issuer": "https://securetoken.google.com/firebase-project-id"
  }

`firebase-project-id`をあなたの[ Firebase のプロジェクト ID ](https://firebase.google.com/docs/projects/learn-more?hl=ja#find_the_project_id)に変更してください。

- HASURA_GRAPHQL_UNAUTHORIZED_ROLE  
  anonymous

最終的にこのような設定になっていれば問題ありません。

![hasura jwt success](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_jwt_success.png?raw=true)

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
         { id : { \_eq : X-Hasura-User-Id } }
  - Column select permissions (Toggle All)
    - [x] email
    - [x] id
    - [x] name
    - [x] profile_photo_url
    - [x] created_at
    - [x] updated_at

![users user insert permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_insert_permission.png?raw=true)

合わせて`select`、`update`、`delete`も設定します

- select
  - Row select permissions
    - [x] Without any checks
  - Column select permissions (Toggle All)
    - [x] email
    - [x] id
    - [x] name
    - [x] profile_photo_url
    - [x] created_at
    - [x] updated_at

![users user select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
    - [x] With same custom check as insert
    - Post-update check
    - [x] With same custom check as insert, pre update
  - Column select permissions (Toggle All)
    - [x] email
    - [ ] id
    - [x] name
    - [x] profile_photo_url
    - [ ] created_at
    - [ ] updated_at

![users user update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_user_update_permission.png?raw=true)

`delete`のパーミッションは設定しません。

user を削除してしまうと、動画に紐付いている`owner_id`が行方不明になってしまうため、削除はできないようにします。

続いて、同じく`users`テーブルの`anonymous`ロールのパーミッションを設定していきます。

`anonymous`に付与するパーミッションは`select`のみです。

- select
  - Row select permissions
    - [x] Without any checks
  - Column select permissions (Toggle All)
    - [x] email
    - [x] id
    - [x] name
    - [x] profile_photo_url
    - [x] created_at
    - [x] updated_at

![users anonymous select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/users_anonymous_select_permission.png?raw=true)

これで`users`テーブルのパーミッションの設定は完了です。

- #### videos テーブルのパーミッションを設定

続いて、`videos`テーブルのパーミッションの設定を行います。

- insert
  - [x] With custom check:  
         { owner_id : { \_eq : X-Hasura-User-Id }}
  - Column select permissions (Toggle All)
    - [x] duration
    - [x] views
    - [x] description
    - [x] id
    - [x] owner_id
    - [x] thumbnail_url
    - [x] title
    - [x] video_url
    - [ ] created_at
    - [ ] updated_at

![videos user insert permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_insert_permission.png?raw=true)

- select
  - Row select permissions
    - [x] Without any checks
  - Column select permissions (Toggle All)
    - [x] duration
    - [x] views
    - [x] description
    - [x] id
    - [x] owner_id
    - [x] thumbnail_url
    - [x] title
    - [x] video_url
    - [x] created_at
    - [x] updated_at

![videos user select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
      - [x] With same custom check as insert
    - Post-update check
      - [x] With same custom check as insert, pre update
  - Column select permissions (Toggle All)
    - [x] duration
    - [x] views
    - [x] description
    - [ ] id
    - [ ] owner_id
    - [x] thumbnail_url
    - [x] title
    - [ ] video_url
    - [ ] created_at
    - [ ] updated_at

![videos user update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_update_permission.png?raw=true)

- delete
  - Row select permissions
    - [x] Without any checks

![videos user delete permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_user_delete_permission.png?raw=true)

続いて、`anonymous`にパーミッションを設定して行きます。

`videos`では、`select`と`update`をパーミッションを設定します。

- select
  - Row select permissions
    - [x] Without any checks
  - Column select permissions (Toggle All)
    - [x] duration
    - [x] views
    - [x] description
    - [x] id
    - [x] owner_id
    - [x] thumbnail_url
    - [x] title
    - [x] video_url
    - [x] created_at
    - [x] updated_at

![videos anonymous select permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_anonymous_select_permission.png?raw=true)

- update
  - Row select permissions
    - Pre-update check
      - [x] Without any checks (Same as select)
    - Post-update check
      - [x] Without any checks (Same as select, pre update)
  - Column select permissions (Toggle All)
    - [ ] duration
    - [x] views
    - [ ] description
    - [ ] id
    - [ ] owner_id
    - [ ] thumbnail_url
    - [ ] title
    - [ ] video_url
    - [ ] created_at
    - [ ] updated_at

![videos anonymous update permission](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/videos_anonymous_update_permission.png?raw=true)

これで全てのパーミッションの設定ができました。

- ### Firebase Authentication から JWT トークンを取得

Hasura の設定が完了したところで、Firebase で JWT トークンを使用できるようにしていきます。

Firebase では、特段設定しなくとも、JWT トークンを自動で設定してくれます。

しかし、Firebase が自動で設定してくれる JWT トークンの情報だけでは、Hasura でのトークン認証ができません。

Hasura で JWT トークンによる認証を行うためには、Hasura 用の JWT トークンの設定を Firebase に追加する必要があります。

JWT トークンには、必ず必要なトークン情報と任意で追加できる情報（カスタムクレーム）があります。

このカスタムクレームに対して、Hasura 用の認証トークン情報を埋め込みます。

しかし、クライアント側からでは、カスタムクレームの埋め込みができません。

そこで、Firebase Functions という Firebase のサービスを使用して、いわゆるサーバーサイド処理としてこのカスタムクレームの埋め込みを行います。

ここからは、Firebase Functions の設定を行い、カスタムクレームの設定用の処理を記述していきます。

- #### Firebase Functions の設定

Firebase Functions を使用するためには、Firebase の利用プランを「フリープラン」から「従量課金プラン」に変更する必要があります。

従量課金プランと書いていますが、従量課金プランにしてもフリープランの際に確保されているリソースが無くなるわけではありません。

つまり、フリーラプン内でのリソースの使用は今まで通り無料で使用することができ、そのフリープラン内でのリソース使用量を超えた分にだけ課金される方式になっています。

もちろん Firebase Function にも無料使用枠がせってされています。

英語ですが、公式のドキュメントにどのくらいの無料枠が設定されているかが確認できます。

[Firebase 料金表](https://firebase.google.com/pricing?hl=ja#cloud-functions)

- Firebase Functions の無料枠
  - 関数の呼び出し : 最初の 200 万回/月
  - コンピューティング時間 : 400,000 GB 秒/月 または 200,000 GHz 秒/月
  - 送信データ（上り）: 5 GB / 月

上記の詳しい情報は[Cloud Functions の料金](https://cloud.google.com/functions/pricing?hl=ja)からそれぞれのリソースがどのようなものなのかの情報があります。

上記の無料枠を見てわかる通り、個人開発やチュートリアルレベルのアプリケーションでは十分に事足りるリソースが割り当ててあります。

なので、従量課金と言いつつ、今回は知らない間に課金されていることは無いのでご安心ください。

では早速、Functions の設定を行っていきましょう。

Firebase のコンソールから Firebase Functions を選択します。

![firebase functions console](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_functions_console.png?raw=true)

「プロジェクトのアップグレード」という項目があるので、プロジェクトを従量課金プランに変更します。

![firebase functions upgrade](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_functions_upgrade.png?raw=true)

GCP の設定画面が開くので、必要な情報を入力して、「購入を確定」します。

確定後、Firebase Functions のコンソールを選択すると予算アラートの設定画面が出るので、心配な方は、課金が一定金額以上になった時にメールに通知が来るようにアラートを設定しておきましょう。

全てが完了したら、Firebase Functions の画面から「使ってみる」から Firebase Functions の開発コンソール画面に移動します。

これで、Firebase Functions の開発からデプロイまでができるようになりました。

それでは、実際にソースコードを記述して、Firebase Functions にデプロイしてみましょう。

Firebase には、CLI ツールが用意されており Firebase Functions のデプロイは、`firebase-tools`という CLI ツールを用いてデプロイします。

`firebase-tools`をインストールします。

```bash
# ターミナル（コマンドプロンプト）

npm install -g firebase-tools

# or

yarn global add firebase-tools

```

`npm`の場合は`-g`オプションを、`yarn`の場合は`global`オプションをつけることで、グローバルなパッケージを操作します。

グローバルなパッケージをインストールすると、ターミナル全体でそのパッケージを使用することができます。

これで、`firebase`コマンドをターミナルで打つことで、`firebase-tools`を呼び出せます。

次に、ターミナル（コマンドプロンプト）上で Firebase にログインします。

ここでログインすることで、Firebase 上で作成しているプロジェクトと、`firebase-tools`をコネクトし、特定のプロジェクトにデプロイを行えるようにします。

```bash
# ターミナル(コマンドプロンプト)
firebase login

Allow Firebase to collect CLI usage and error reporting information? (Y/n) Y

```

コマンド実行後、ブラウザが開かれるので、Firebase でプロジェクトを作成したアカウントでログインします。

Firebase Tool へのアクセスを「許可」して、Firebase プロジェクトを CLI で使えるようにします。

次に、React アプリケーションのディレクトリに、`firebase-tools`のセットアップを行い、Firebase のバックエンド開発を行えるようにします。

```bash
# ターミナル（コマンドプロンプト）

firebase init

? Which Firebase features do you want to set up for this directory? Press Space to select features, t
hen Enter to confirm your choices.
 ◯ Realtime Database: Configure a security rules file for Realtime Database and (optionally) provisio
n default instance
 ◯ Firestore: Configure security rules and indexes files for Firestore
❯◉ Functions: Configure a Cloud Functions directory and its files
 ◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
(Move up and down to reveal more choices)


? Please select an option: (Use arrow keys)
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Dont set up a default project


? Select a default Firebase project for this directory: (Use arrow keys)
❯ react-bootcamp-78947 (react-bootcamp)

? What language would you like to use to write Cloud Functions?
  JavaScript
❯ TypeScript

? Do you want to use ESLint to catch probable bugs and enforce style? (Y/n) Y

? Do you want to install dependencies with npm now? (Y/n) Y

.
.
.

added 404 packages, and audited 405 packages in 25s

58 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!

```

上記のように、`firebase init`で firebase のセットアップを行うと、CLI で対話的にプロジェクトのセットアップを行います。

先頭から、

- `Functions`の選択
- 作成済みのプロジェクトの選択
- firebase のプロジェクトを確認
- Typescript でコードを作成する
- ESLint によるリンターを設定
- パッケージのインストールをすぐに実行する

と言う設定になっています。

選択を行いたいときは、キーボードの矢印キーで操作し、任意の場所でキーボードのスペースを押すと選択できます。

自動で`firebase`のセットアップが完了し、プロジェクトに`firebase`用のファイルとディレクトリ（./functions）が生成されます。

`./functions`の中には Firebase Functions の開発に必要なコードが揃っています。

それでは早速、`./functions`ディレクトリにソースコードを記述していきましょう。

今回、`functions`に作成していくコードは「アカウントが作成されたら、トークンに Hasura 用のカスタムクレームを追加する」というコードです。

[Diff - firebase functions を設定してコードを記述する](https://github.com/Hiro-mackay/react-bootcamp/commit/08ae336a999944d9fc63f8c7e62b1e20dafb7ae5)

```TS
// functions/src/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// firebaseの初期化
admin.initializeApp(functions.config().firebase);

/**
 * Firebase FunctionsにprocessSignUpと言う名前の関数を作成
 * `functions.auth.user().onCreate`で、Authenticationでuserが作成された時に実行される関数を定義
 */
exports.processSignUp = functions.auth.user().onCreate((user) => {
  // Hasura用のカスタムクレームの作成
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  // userのトークンにカスタムクレームを追加する
  return admin.auth().setCustomUserClaims(user.uid, customClaims);
});

```

上記が、トークンにカスタムクレームを追加するためのコアコードです。

とここで、VS Code 等を使用している際には、ファイル内にエラーが発生していると思われます。

![firebase vscode eslinter error](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_vscode_eslinter_error.png?raw=true)

このエラーは、ESlint によるエラーです。

ESlint は、JavaScript のための静的検証ツールです。

コードを実行する前にバグやエラーをチェックしてくれたり、フォーマットのスタイルを統一してくれたりします。

この ESLint ですが、今回のように`create react app`で作成した React アプリと Firebase のプロジェクトを同じ階層に作成すると、それぞれのリンターが競合して今回のようエラーが発生します。

これを解決するには簡単で、`functions/.eslintrc.js`のファイル内の最初の行の`module.`を削除するだけで解決します。

[Diff - firebase/.eslintrc.jsのmoduleを削除](https://github.com/Hiro-mackay/react-bootcamp/commit/4610fa249a957a928a511ed89b7a999a6c97f652)

```js
// functions/.eslintrc.js

// 「module.」を削除する
exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
  },
};
```

これで、無意味なエラーで悩まされることは無くなりました。

それでは、先ほど作成した`functions`のコードを見ていきましょう。

特に難しいことをしているコードでなく、コメントに記載してある処理を記述しています。

`functions`の開発も Firebase が便利なライブラリーを用意してくれているおかげで簡単にコードを書くことができます。

では、このコードをデプロイして使えるように...の前に、実はこのコードはまだ完成ではありません。

カスタムクレームの作成は以上で完了なのですが、「カスタムクレームの追加が完了したことをクライアントに伝える機構」がありません。

この`processSignUp`関数は完全に非同期で処理が実行され、クライアント側からはこの処理が終了したかどうかを知る術がありません。

そのため、クライアントには関数が実行される前の認証情報、つまり「Hsaura のカスタムクレームが付与されていない状態のトークン」が返されます。

Firebase の仕様によりトークンが変更されても、そのトークンが有効になるのは次にユーザー認証が実行された時になります。

そのため、クライアント側ではこの関数が実行し終わったどうかを随時確認して、終了していたら再度認証を行いカスタムクレームが追加された状態のトークンを取得する必要があります。

これを実現するためには、`functions`が終了したら、サーバーサイド側からデータベースを作成・更新を行い、クライアント側はデータベースが作成されているかどうかで処理が終了したかを判断します。

![functions add claims re-auth](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/functions_add_claims_re-auth.png?raw=true)

まずは、`functions`側の処理を完成させます。

`functions`側では、カスタムクレームの追加が完了したら、`firestore`という Firebase に用意されているドキュメント指向のデータベースにデータを保存します。

`firestore`は、オブジェクト型のデータ構造を持っており、柔軟にデータ構造を変えてデータを保存できます。

今回のアプリケーションでは、さらりとしか使わないので、詳細は割愛します。

[Diff - firebase functions に firebase store の処理を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/cd8f9a482e21ec310ba7eb373c00339b99939835)

```TS
// functions/src/index.ts


import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// firebaseの初期化
admin.initializeApp(functions.config().firebase);

/**
 * Firebase FunctionsにprocessSignUpと言う名前の関数を作成
 * `functions.auth.user().onCreate`で、Authenticationでuserが作成された時に実行される関数を定義
 */
exports.processSignUp = functions.auth.user().onCreate((user) => {
  // Hasura用のカスタムクレームの作成
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  // userのトークンにカスタムクレームを追加する
  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // カスタムクレームの追加が完了したら

      // firestoreに"user.uid"に`refreshTime`という名前のタイムスタンプを作成します。
      // クライアントは、このデータが作成されるまで待ちます。
      // firestoreは、`coolection`の名前と、`doc`の文字列が判別すれば同じデータにアクセスできる
     return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ refreshTime: admin.firestore.FieldValue.serverTimestamp() });
    });
});
```

以上で`functions`の処理は完成です。

- #### Cloud Firestore の設定

合わせて、Firestore の設定もしてしまいましょう。

Firebase のコンソール画面から、`Firestore Database`の項目を選択し、「データベースの作成」から Firestore を開始します。

![firestore console init](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firestore_console_init.png?raw=true)

「本番環境」で開始します。

> テストモードで開始すると、特定の期間内を過ぎると全てのアクセスを拒否する設定がデフォルトになっています。  
> また後ほどルールを変更しないといけないため、本番環境で一気通貫で設定してしまいます。

![firestore enviroment mode](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firestore_enviroment_mode.png?raw=true)

ロケーションは、`asia-northeast1`を選択します。

> デフォルトで選択されている場合はそのままで

![firestore location select](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firestore_location_select.png?raw=true)

ここまで設定したら、Firestore のコンソール画面が表示されます。

現在、「本番環境モード」になっているため、デフォルトで全てのリクエストを拒否する設定になっています。

「ルール」の「書き込み権限」を`functions`にのみ許可し、「読み込み権限」を認証済みユーザーにのみ許可します。

```JS
// Firestore ルール

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // readは、認証が済んでいるユーザーにのみ許可します。
      allow read : if request.auth != null && request.auth.uid == userId;
      // `functions`では、Firebase AdminSDKを使用してstoreにアクセスします。Admin SDKではルールを`false`にしても、アクセスを明示的に許可または拒否することはできません。
      allow create, update: if false;
    }
  }
}
```

![firestore rules](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firestore_rules.png?raw=true)

「公開」でルールをデプロイします。

以上で Firebase 側の設定は完了です。

後はローカルの`functions`のコードを`build`して、リモートに`deploy`します。

まずは`build`から始めますが、このまま`build`すると、Typescript の設定が React の Typscript と競合してエラーを吐きます。

そこで、`functions`の`tsconfig.json`を変更します。

[Diff - firebase の tsconfig.js の設定を修正](https://github.com/Hiro-mackay/react-bootcamp/commit/6c8ccb4d3d2ae4095b99fe179e7222f83d56c01e)

```json
// functions/tsconfig.json

{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "lib",
    "sourceMap": true,
    "strict": true,
    "target": "es2017",
    // 追加
    "typeRoots": ["node_modules/@types"]
  },
  "compileOnSave": true,
  "include": ["src"]
}
```

これで、エラーを出すことなくコードを`build`することができます。

```bash
# ターミナル（コマンドプロンプト）

cd functions && npm run build && cd ../

# or

cd functions && yarn build && cd ../

```

`build`したコードを`deploy`します。

```bash
# ターミナル（コマンドプロンプト）

cd functions && npm run deploy && cd ../

# or

cd functions && yarn deploy && cd ../

```

> おそらくこの React Bootcamp で環境構築をされた方は、`node`のバージョンを`v16.6.1`でインストールされていると思います。
> しかし、`firebase-tools`を使用する際には`node`のバージョンが`v14`にする必要があります。
> 今のままでは、上記のコマンドはエラーを吐きます。
> そこで m、node を`v14.17.5 `のバージョンでインストールします。
> インストール方法は、[bootcamp-1](#https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-1#pc-%E3%81%AB-react-%E3%81%AE%E7%92%B0%E5%A2%83%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B)をご確認ください。

`deploy`には時間がかかります。

`✔ Deploy complete!`と表示されれば完了です。

ちなみに、`functions`が正しくデプロイされているか確認するためには、Firebase Functions コンソールで、`deploy`した関数と一致するか確認します。

![firebase functions deploy](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_functions_deploy.png?raw=true)

- ### Hasura の GraphQL ヘッダーに JWT を実装

続いて、JWT トークンのクライアント側の実装を行います。

クライアントの処理の概観は、「Firestore を確認して user のドキュメントが作成されるまで待機」「トークンに Hasura カスタムクレームが追加されたら、GraphQL でユーザー情報を insert」「GraphQL のヘッダーに JWT トークンを追加」します。

大きく 3 つの処理に分けることができます。

- ### Firestore を確認して user のドキュメントが作成されるまで待機

`signup`の処理が終わった直後に、トークンの生成が終了すまで待機するコードを新しく作ります。

[Diff - カスタムクレームの確認用処理を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/01e8230ea60ae2e8622ff48424577c3cdddfcf55)

```TS
// src/hooks/Authentication/useSignup/checkAuthToken.tsを作成

import { firestore, fireAuth } from "../../../utils/Firebase/config";

export const checkAuthToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // `userId`のドキュメントをリッスンします。
    // onSnapshotでリッスンすると、返り値としてリッスンをリセットする関数が返される。
    // unsubscribeを実行することで、ドキュメントのリッスンを取りやめます。
    const unsubscribe = firestore
      .collection("users")
      .doc(userId)
      // onSnapshotでドキュメントの変更をリッスンします。
      .onSnapshot(
        // データの中身が変更されたことを検出するためには、`includeMetadataChanges`オプションを有効にします。
        { includeMetadataChanges: true },
        async (doc) => {
          if (!doc.exists) return;
          // トークンを取得
          const idToken = await fireAuth.currentUser?.getIdTokenResult();

          // トークンがあり、Hasuraカスタムクレームが追加されているか
          if (
            idToken?.token &&
            idToken?.claims["https://hasura.io/jwt/claims"]
          ) {
            // 追加されていれば、リッスンをしセットし、
            // トークンを返します。
            unsubscribe();
            resolve(idToken?.token);
          }
        },
        reject
      );
  });
};

```

と、ここで`Firebase/config`には、`firestore`を用意してないので、作成しましょう。

[Diff - firebase storage のパッケージを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/7b31e82a2590325d47bc4870e68e8dd2968a846e)

```TS
// src/utils/Firebase/config.ts

import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCm8ZVPFvB4O5YVyNqA-16zWrRpbxd0RVQ",
  authDomain: "react-bootcamp-78947.firebaseapp.com",
  projectId: "react-bootcamp-78947",
  storageBucket: "react-bootcamp-78947.appspot.com",
  messagingSenderId: "236750478038",
  appId: "1:236750478038:web:fc2e6a6e2f856cae1c4777",
};
firebase.initializeApp(firebaseConfig);
export const fireAuth = firebase.auth();
export const storage = firebase.storage();

// firestoreのfirebaseモジュール
export const firestore = firebase.firestore();

export default firebase;
```

`firestore`用のライブラリを使用できるように変更しました。

これで、「Firestore を確認して user のドキュメントが作成されるまで待機」という処理を記述しました。

- #### トークンに Hasura カスタムクレームが追加されたら GraphQL でユーザー情報を insert

続いて、「トークンに Hasura カスタムクレームが追加されたら、GraphQL でユーザー情報を insert」の処理を記述します。

ここでは、先ほど作った関数`checkAuthToken`を`sognup`内で`await`するだけで実現できます。

[Diff - サインアップでトークンの取得処理を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/ac34b03e7cce30fac83a9b3a2371412887310090)

```TS
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
import { checkAuthToken } from "./checkAuthToken";

export type SignupPropsType = {
  name: string;
} & FireSignupType;

export const useSignup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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

    // 追加
    // アカウントにトークンが設定されるまで待機
    await checkAuthToken(user.uid);

    const apolloResponse = await insertMutation({
      variables: {
        id: user.uid,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
      },
    });

    if (apolloResponse.data?.insert_users_one?.id) {
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

GraphQL での`mutation`手前で、`await checkAuthToken(user.uid)`してトークンの生成を待機します。

- #### GraphQL のヘッダーに JWT トークンを追加

最後に、トークンを GraphQL のリクエストヘッダー、つまり Apollo Client でトークンが使用できるようにします。

Apollo Provider のコードを編集したいのですが、`index.tsx`内で`Provider`が乱立しており、非常に見通しが悪いコードになっています。

そこで、`index.tsx`から Apollo Client の`Provider`を抜き出し、コードを分割します。

[Diff - Apollo Client の provider を分離](https://github.com/Hiro-mackay/react-bootcamp/commit/a9767e723eb305c1b189526eb4c6b4073cfb213d)

```TSX
// src/providers/ApolloClient/index.tsxを作成

// src/index.tsからApollo Clientのコードをに抜き出す
import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { PropsWithChildren } from "react";

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
  cache: new InMemoryCache()
});

export const ApolloProvider = ({ children }: PropsWithChildren<{}>) => {
  return <Provider client={apolloClient}>{children}</Provider>;
};

```

移転した Apollo Client を`src/index.tsx`から呼び出します。

[Diff - Apollo Provider を root コンポーネントから呼び出す](https://github.com/Hiro-mackay/react-bootcamp/commit/d795a4357c4805d109c409937b30a120622cdcb3)

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from "./GlobalStyle";
import { RecoilRoot } from "recoil";
import { AuthStateListener } from "./providers/AuthStateListener";
import { GlobalAccout } from "./providers/GlobalAccount";

// 追加
import { ApolloProvider } from "./providers/ApolloClient";


const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        {/*
        追加・変更
      */}
        <ApolloProvider>
          <AuthStateListener>
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

これまでの ApolloClient では、`header`に hasura のシークレットキーを直接設定していました。

このシークレットキーを、JWT トークンで置き換えることで、シークレットキーを使用することなく、Hasura からデータを取得できるようになります。

`<ApolloProvider>`のコードを変更して、`headers`にトークンを格納する処理を追加します。

[Diff - Apollo Client の headers にトークンを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/546df071bf15b645d0199277540a3a3d95f79217)

```TSX
// src/providers/ApolloClient/index.tsx

import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { PropsWithChildren } from "react";

// 追加
import { fireAuth } from "../../utils/Firebase/config";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_END_POINT_ORIGIN,
});

const authLink = setContext(async () => {
  const token = await fireAuth.currentUser?.getIdToken(true);

  // Bearerトークンでトークンを送信する
  // headersのプロパティは`Authorization`
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return { headers };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export const ApolloProvider = ({ children }: PropsWithChildren<{}>) => {
  return <Provider client={apolloClient}>{children}</Provider>;
};
```

`setContext`にて、`headers`の`Authorization`に Bearer トークンとして JWT の認証情報を付与してリクエストを送信します。

`setContext`に、`headers`に、`Authorization`に、` Bearer トークン`に、`jwt`に、とたくさんの横文字が出てきました。

それぞれの技術仕様を説明しようとすると、また 1 ページドキュメントが出来上がるので、それぞれ何をするモノかを軽くご説明します。

- `setContext` : ApolloLink を生成。server にリクエストを送信する前に、リクエストを改造できるやつ（ざっくり)
- `headers` : HTTP リクエストのヘッダー。ヘッダーは、リクエストに情報を付与できるデータ
- `Authorization` : HTTP 認証要求ヘッダー。HTTP ヘッダーの中で、認証情報を格納するためのプロパティ
- `Bearerトークン` : OAuth 2.0 の認可機構。認証情報がどのような形で送られてくるかを明示するための「規格」。[ RFC 6750 ](http://tools.ietf.org/html/rfc6750)で定義される。

`setContext`は Apollo Client 特有の関数で、主にリクエストの`headers`を変更するときに使用します。

`Authorization`と`Bearerトークン`の関係は、`Authorization`の方がより大きな概念です。

`Authorization`はサーバー側で認証とアクセス制御（つまり認可）を行うための規格です。

その`Authorization`で送る認証情報の「方法」としての`Bearerトークン`があります。

トークンの認証方式は様々なものがあるため、[Basic 認証、Digest 認証、Bearer 認証、OAuth 認証方式について](https://architecting.hateblo.jp/entry/2020/03/27/130535)などを確認すると理解が深まるかもしれません。

今回のアプリケーションでは、Firebase で認証した情報を JWT で「トークン化」して、リクエストの`headers`に`Bearerトークン`の規格で認証情報をサーバーに送信し、サーバーは認証情報から認可を行います。

認可の実態は、前の項で皆さんが設定したパーミッションそのものです。

Hasura は、リクエストの中に含まれている`Bearerトークン`を識別し、実際にその認証のアクセス制御をパーミッションを見ながら制御します。

ソースコードと、背景にあるフローを確認することで、ここまでやってきたことがなんとなく繋がってきたのではないでしょうか。

以上で、アプリケーションをセキュアに開発できるようになる方法が分かりました。

- #### クレームを追加するためにアカウントを作成し直す

ここでは、Hasura のトークンを設定する前にアカウントを作成していた場合、そのアカウントにはクレームの設定が行われていません。

`Firebase Functions`でクレームを追加するようの関数を作成しても良いですが、今回は付与するべきアカウントが少ないので、アカウントの作り直しで対応します。

もし、Hasura のトークンの設定より前にアカウントを登録されていない場合は、この項目は[飛ばして構いません](#hasura-のハマリポイント)

`Firebase Authentication`で登録済みのアカウントを削除する方法は非常に簡単です。

firebase のコンソールから、`Authentication`を選択し、登録済みのアカウントの右端「︙」から「アカウントを削除」からアカウントを削除できる。

![firebase delete account](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_delete_account.png?raw=true)

トークンが付与されていない可能性があるアカウントを全て削除します。

もし、気になる方は`Hasura`側の`users`テーブルに保存されているユーザーも削除します。

新しく`/signup`からアカウントを作成すると、トークンが付与されたアカウントが作成できます。

本番環境で運用する場合は、`Functions`で作成済みのアカウントに対してクレームを付与する関数を作成し、外部的にクレームを作成できるようにするのがいいでしょう。

- ### Hasura のハマリポイント

ここまでで、Apollo Client と Hasura の認証・認可の方法を見てきました。

コードを見るだけでも、だいぶ複雑です。

しかし、それ以上に、Hasura で暗黙的に決定されている項目設定が多いため、ここまで学んだ方法を別のコードに展開したときに沼にハマる可能性が高いです。

そこで、Hasura の認証・認可を実装する際にハマりやすいポイントと、解決方法を以下にご紹介します。

ぜひ、今後の Hasura 開発にお役立ていただければと思います。

> 設定自体は、Hasura 特有なものですが、その背景にある技術仕様は広く使われている技術です。  
> 今回と違う構成で構築したアプリケーションでも、似たような技術が使用されると思われますので、ぜひご参考にしてください。

- #### Hasura で JWT を使用するためには、Hasura のエンドポイントを保護する必要があります。

[公式ドキュメント](https://hasura.io/docs/latest/graphql/core/deployment/securing-graphql-endpoint.html)

設定するデータベースや環境によっては保護する方法が異なりますが、今回の Heroku の構成では、[Heroku の`Env Vars`を設定します](#hasura-で-jwt-トークンを認証できるように設定)

- #### `headers`に`X-Hasura-Admin-Secret`が含まれる場合は、`JWT`認証はスキップされます。

[公式ドキュメント](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#introduction)

前の項で`headers`に`Authorization`を設定しましたが、この時に、`x-hasura-admin-secret`を削除しないままアプリケーションを動かすと、`x-hasura-admin-secret`が優先されます。

つまり、せっかく`Authorization`による認証を追加されても実際は`x-hasura-admin-secret`で認証を行なっているので、セキュアなリクエストができなくなります。

- #### Hasura で JWT を送信する際にはカスタムクレームを`https://hasura.io/jwt/claims`で設定する必要があります。

[公式ドキュメント](#https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#the-spec)

Hasura に送信される JWT には`https://hasura.io/jwt/claims`という名前のカスタムクレーム値を設定する必要が上がります。

`https://hasura.io/jwt/claims`が無い JWT は、Hasura で無効な認証として拒否されます。

- #### JWT のカスタムクレームには`x-hasura-default-role`, `x-hasura-allowed-roles`が含まれている必要があります。

[公式ドキュメント](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#tl-dr)

[Firebase Functions の設定](#firebase-functions-の設定)で設定したカスタムクレームの設定を確認してみてください。

```TS
// Hasura用のカスタムクレームの作成
const customClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.uid,
  },
};
```

ここで、「x-hasura-default-role」と「x-hasura-allowed-roles」を設定しています。

これは任意の値ではなく、必ず設定しなければいけない値になります。

- `x-hasura-default-role` : ユーザーのデフォルトのロール
- `x-hasura-allowed-roles` : ユーザーに許可されるロールのリスト

`x-hasura-default-role`は、最初に設定されるロール、つまり`user`ロールを設定します。

`x-hasura-default-role`は、`x-hasura-allowed-roles`内に含まれる値である必要があります。

`x-hasura-allowed-roles`は、Hasura のパーミッション設定で設定した`Role`の種類と同じです。

- #### ユーザーのロールをクライアント側で指定するには。

上記で、デフォルトのロールと、許可されるロールのリストの設定はできましたが、アプリケーションで必要なロールは指定できていません。

Hasura では、リクエストの`headers`に、`x-hasura-role`を付与することでロールを指定できます。

例えば以下のようなカスタムクレーム設定があるとします。

```TS
const customClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user","admin"],
    "x-hasura-user-id": user.uid,
  },
};
```

アプリケーション側の設定で、以下のようにリクエストヘッダーを設定するとします。

```TS
const authLink = setContext(async () => {
  const token = await fireAuth.currentUser?.getIdToken(true);

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      // ロールを指定する
      "x-hasura-role": "admin",
    },
  };
});
```

`Authorization`を指定した`headers`と同じ場所で、"x-hasura-role"を指定することで、そのユーザーにはそのロールがしてされます。

ここでは、`admin`、つまり管理者ロールが付与されます。

このリクエストは、Hasura 側で`admin`として構成されるロールのパーミッションのもと認可が行われます。

もちろん、`x-hasura-role`のロールは、`x-hasura-allowed-roles`に含まれている必要があります。

- #### JWT には Hasura で認識可能な独自のカスタムクレーム値を設定できます。

上記までは、必ず JWT に含まれていなければいけない構成値です。

その他に、オプション値として任意の値を設定し、Hasura の認可ロジックで使用できる構成を作成できます。

今回のカスタムクレームの構成では、`x-hasura-user-id`がオプションのクレーム値になります。

```TS
// Hasura用のカスタムクレームの作成
const customClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.uid,
  },
};
```

この値は、実際に Hasura でパーミッションを設定する際に使用しました。

他にも、所属企業 ID として`x-hasura-org-id`としてユーザーのパーミッション設定をすることができます。

その他、Hasura で JWT 認証を行う際の構成やユースケースは[公式のドキュメント](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html)にまとまっています。

- #### Hasura の公式ドキュメントが古い場合がある

残念ながら、Hasura の公式ドキュメントですら情報が古い場合があります。

さらに Hsaura は日本語の情報も少ないです。

Hasura の Github や海外の記事など、英語の情報源に臆することなく情報を取得していく必要があります。

幸いなことに、Goole 翻訳などを使うことで簡単に英語の記事も日本語と読むことができます。

日本語記事では、どうしても情報の新鮮度や正しさにズレがある場合があります。

なるべく公式のドキュメントを網羅的にアクセスして、必要な情報を取得するスキルが必要です。

## Firebase Storage に動画をアップロード

データベースへのデータのアクセスができるようになったので、次は、動画をストレージにアップロードする処理を実装していきます。

今回のアプリケーションでファイルをアップロードする先として、`Firebase Storage`を使用します。

`Firebase Storage`は、`AWS`で言うところの`S3`とほぼ同じサービスで、ファイルなどを保存するのに適したストレージになっています。

`Firebase Storage`はライブラリが作り込まれているため、特段の学習を必要とすることなく直感的にファイルをアップロード/ダウンロードすることがことができます。

動画をアップロードするためのフローを以下にまとめます。

1. ログインしているユーザーのみアップロードを許可する
2. ブラウザからファイルを選択する
3. 選択したファイルを`Firebase Storage`にアップロードする
4. 動画のメタデータをデータベースに保存する

動画のアップロードは`/upload`というパスから行い、これからの記述は主に`<Upload>`コンポーネントを編集していきます。

アップロード処理の実態は、`Hooks`でまとめ、コンポーネントからは`Hooks`を呼び出すだけにし、処理の詳細は`Hooks`に記述していきます。

- ### ログインしているユーザーのみアップロードを許可する

今回のアプリケーションでは、ログインしていないユーザーには動画のアップロードを行えないようにしていきます。

これを実現するためには、二つの実装が必要です。

1. ログインしているユーザーにのみ、アップロード画面へのリンクを表示する。
2. 未ログインでアップロード画面を表示したらログインを促す

- #### ログインしているユーザーにのみ、アップロード画面へのリンクを表示する

アップロード画面へのリンクは、画面のヘッダーのアイコンに埋め込みます。

![upload header link](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/upload_header_link.png?raw=true)

`DashboardHeader`に記述されているヘッダーのコンポーネントを修正して、`/upload`画面に飛べるようにします。

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

export const DashboardHeader = () => {
  const styles = useStyles();
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
          {globalUser ? (
            <>
              {/*
                リンクを追加
              */}
              <Link to="/upload">
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </Link>
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

これで、どこからでもすぐにアップロード画面に行くことができます。

- #### 未ログインでアップロード画面を表示したらログインを促す

続いて、未ログインのユーザーがアップロード画面にアクセスしたら、ログイン画面にリダイレクトする処理を書きます。

仮に、前項の未ログイン時にボタンリンクを表示しないという設計にしていても、URL に直接アクセスすることでアップロード画面を表示することが可能です。

その場合の対応として、未ログイン状態で`/uoload`にアクセスしたら、ログイン画面にリダイレクトを行う処理を書きます。

処理の流れとしては、

1. アカウントが Loading 中かどうかチェック
2. アカウントが読み込まれていれば、そのまま表示
3. アカウントが読み込まれていなければ、`/login`にリダイレクトする

実際にコードに落とし込んでいきます。

[Diff - 未ログインでアップロード画面を表示したらログインを促す](https://github.com/Hiro-mackay/react-bootcamp/commit/f13667743c779f1d5695a3b9b97daf143559122c)

```TSX
// src/pages/Upload/index.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  // 追加
  CircularProgress,
} from "@material-ui/core";
import { UploadForm } from "./UploadForm";
import { VideoSelect } from "./VideoSelector";
import useStyles from "./style";

// 必要なライブラリーを追加
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { useEffect } from "react";
import { GlobalUser } from "../../stores/User";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const styles = useStyles();

  // recoilの値を使用
  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  // react routerを使用する
  const navigate = useNavigate();

  // アカウントが読み込まれていない、未ログインであれば`/login`へリダレクト
  useEffect(() => {
    if (accountLoaded) {
      if (!user?.id) {
        navigate("/login");
      }
    }
  }, [accountLoaded, user?.id]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      <DialogTitle>動画のアップロード</DialogTitle>
      <Divider />
      <DialogContent className={styles.body}>
        {/* アカウントが存在すれば、アップロードコンポーネントを表示 */}
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              <VideoSelect />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              <UploadForm />
            </Grid>
          </Grid>
        ) : (
          // ローディングコンポーネント表示
          <Grid container justifyContent="center">
            <CircularProgress size={50} />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
```

アップロード画面にアクセスしたら、まずはアカウントの読み込みを待機します。

アカウントの読み込みが終了したら、アカウントの有無でリダレクトを行うか、画面表示を行うかを処理しています。

- ### ブラウザからファイルを選択する

ブラウザからアップロードを行うファイルの選択を行ないます。

現在、ファイルを選択すると、`<VideoSelect>`コンポーネントで動画ファイルの取得とサムネイルの生成を行なっています。

しかし、ファイル群のアップロードを実行するのは、「動画をアップロード」ボタンがある`<UploadForm>`コンポーネントです。

つまり、`<VideoSelect>`のステートをなんらかの形で`<UploadForm>`に渡してあげる必要があります。

方法としては、コンポーネント間のステートを簡単に管理できる`Recoil`を用いることもできますが、`Recoil`ではアプリケーションのグローバルな値を管理する形にしたいです。

なので、ここでは、あくまでローカルステートの管理範囲として`useState`を用いて動画とサムネイルの二つのステートを管理します。

まずは、それぞれのステート管理を`<Upload>`コンポネートに移行して、親コンポーネントでのステート管理にします。

そして、`<VideoSelect>`と`<UploadForm>`のコンポーネントにファイルステートを渡します。

[Diff - アップロードコンポーネントでステートをファイルステートを管理](https://github.com/Hiro-mackay/react-bootcamp/commit/2ab326bcb5b86c668428397ff8e054989449e0b9)

```TSX
// src/pages/Upload/index.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { UploadForm } from "./UploadForm";
import { VideoSelect } from "./VideoSelector";
import useStyles from "./style";
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { useEffect, useState } from "react";
import { GlobalUser } from "../../stores/User";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const styles = useStyles();
  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  // 追加
  // ファイル管理用ローカルステート
  const [videoFile, setVideoFile] = useState<File>();
  const [thumbFile, setThumbFile] = useState<File>();

  const navigate = useNavigate();
  useEffect(() => {
    if (accountLoaded) {
      if (!user?.id) {
        navigate("/login");
      }
    }
  }, [accountLoaded, user?.id]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={true}>
      <DialogTitle>動画のアップロード</DialogTitle>
      <Divider />
      <DialogContent className={styles.body}>
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              {/*
                ステートをpropsとして渡す
              */}
              <VideoSelect
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                setThumbFile={setThumbFile}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              {/*
                ステートとセッターをpropsとして渡す。
              */}
              <UploadForm videoFile={videoFile} thumbFile={thumbFile} />
            </Grid>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <CircularProgress size={50} />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
```

これで、二つのコンポーネントでステートの共有ができるようになりました。

`<VideoSelect>`コンポーネントを修正して、親コンポーネントから渡される`props`を使用して動画とサムネイルのファイルを管理できるようにします。

[Diff - <VideoSelect>の処理を親コンポーネント用に修正](https://github.com/Hiro-mackay/react-bootcamp/commit/912dd5f9f71c595bf85b776a166b4976b3b5943f)

```TSX
// src/pages/Upload/VideoSelector/index.tsx

import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useStyles from "./style";


// 追加
// VideoSelectコンポーネントのプロップスとして、引数を型定義する
export type VideoSelectProps = {
  videoFile: File | undefined;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  setThumbFile: Dispatch<SetStateAction<File | undefined>>;
};


// 追加
// 親コンポーネントから、VideoSelectに渡される引数
export const VideoSelect = ({
  videoFile,
  setVideoFile,
  setThumbFile,
}: VideoSelectProps) => {
  const styles = useStyles();
  const [videoURL, setVideoURL] = useState<string>();
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);

  // 追加
  // 現在選択中のサムネイルの参照URLを格納する
  const [selectThumbURL, setSelectThumbURL] = useState<string>();

  const createThumbnail = (videoRefURL: string) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 0;
    };
    video.onseeked = () => {
      if (video.currentTime >= video.duration || !context) return;
      context.drawImage(video, 0, 0);
      setThumbnailURLs((prev) => [...prev, canvas.toDataURL("image/jpeg")]);
      video.currentTime += Math.ceil(video.duration / 3);
    };
    video.src = videoRefURL;
    video.load();
  };


  // 追加
  // サムネイルを選択して、
  // 1. 参照URLを`selectThumbURL`に格納
  // 2. 参照URLから画像ファイルを生成し、`setThumbFile`でファイルを親コンポーネントに渡す
  const selectedThumb = (url: string) => {
    //  参照URLを`selectThumbURL`に格納
    setSelectThumbURL(url);

  // 参照URLから画像ファイルを生成し、`setThumbFile`でファイルを親コンポーネントに渡す
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const thumb = new File([blob], "thumb.jpeg");
        setThumbFile(thumb);
      });
  };


  // `file`を親コンポーネントから渡される`videoFile`に変更
  // `setFile`を親コンポーネントから渡される`setVideoFile`に変更
  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      setVideoFile(event.currentTarget.files[0]);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  useEffect(() => {
    if (videoFile) {
      const videoURL = URL.createObjectURL(videoFile);
      setVideoURL(videoURL);
      createThumbnail(videoURL);
    }
  }, [videoFile]);

  // 追加
  // サムネイルが生成_`されたら、最初のサムネイルを必ず選択にする
  // これで、サムネイルが選択されずに動画をアップロードすることを防ぐ
  useEffect(() => {
    if (thumbnailURLs.length && thumbnailURLs[0] !== selectThumbURL) {
      selectedThumb(thumbnailURLs[0]);
    }
  }, [thumbnailURLs]);

  return (
    <div className={styles.root}>

      {videoURL && (
        <div className={styles.full}>
          <CardMedia component="video" src={videoURL} controls />

          <Typography className={styles.textPadding}>サムネイル</Typography>
          <Grid container spacing={2} className={styles.thumbnailContent}>
            {thumbnailURLs.map((url) => {
              return (
                <Grid item xs={4}>
                  <CardMedia

                    // 追加
                    // サムネイルのスタリングを`useStyles`に移行
                    // サムネイル用のスタリングと選択中のサムネイルのスタリングを追加
                    className={`${styles.thumbnail} ${
                      url === selectThumbURL ? styles.selectedThumb : ""
                    }`}
                    image={url}

                    // 追加
                    // サムネイル画像を押したら、その画像をサムネイルとして選択する
                    onClick={() => {
                      selectedThumb(url);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <input type="file" hidden ref={inputRef} onChange={selectedFile} />
      {!videoURL && (
        <Button variant="contained" color="primary" onClick={handleClick}>
          ファイルを選択
        </Button>
      )}
    </div>
  );
};
```

スタリングを修正します。

```TS
// src/pages/Upload/VideoSelector/style.ts
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  thumbnailContent: {
    paddingBottom: 30,
  },
  full: {
    width: "100%",
  },

  // 追加
  thumbnail: {
    paddingTop: "56.25%",
    cursor: "pointer",
  },

  // 追加
  selectedThumb: {
    border: "2px solid red",
  },
});

```

これで、選択した動画及びサムネイルのファイルを、親コンポーネントに渡すことができました。

この親コンポーネントに渡されるファイルを使って、`<UploadForm>`コンポーネントで実際にファイルのアップロード処理を行なっていきます。

- ### 選択したファイルを Firebase Storage にアップロードする

それでは実際にファイルを`Firebase Storage`にアップロードする処理を実装していきます。

動画のアップロードは、`Hooks`としてまとめあげます。

`useVideoUpload`という名前の`Hooks`を作成していきます。

`useVideoUpload`では`Firebase Storage`へのアップロードの他に、Hasura への動画のアップロードも行なっていきます。

アップロードに必要な処理は全てのこの`useVideoUpload`にまとめて記述していく形になります。

まずは、動画とサムネイルを`Firebase Storage`にアップロードする処理を記述していきます。

[Diff - useVideoUpload で Firebase storage へのアップロードを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/8361b5745a3884ff6d88ce62004b9a0461e16a8f)

```TS
// src/hooks/VideoUpload/index.ts を作成

import { useState } from "react";
import { storage } from "../../utils/Firebase/config";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // Firebase Storageにファイルをアップロードする処理
  const uploadStorage = (id: string, file: File, path: string) => {
    // ファイルから拡張子を抜き出す
    const exe = file.name.split(".").pop();

    // `ref`でファイルのパスを指定する。
    // → PCのディレクトリと同じ考え方。ref('videos/video.mp4')とすれば、videosという階層にvideo.mp4を作成する
    //
    // putでファイルのアップロードを実際に行う
    // `ref`で指定したパスに対して、ファイルの実態をアップロードする
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    // 処理が始まったら、ローディング中にする
    setLoading(true);

    // try-catch構文でPromise(アップロード処理)のエラーをキャッチする
    try {
      // 動画のアップロード処理
      // 動画は全て`videos`と言う階層に保存される
      const videoUploadTask = await uploadStorage(
        file.video.name,
        file.video,
        "videos"
      );

      // 画像サムネイルのアップロード処理
      // 画像サムネイルは全て`thumbnails`に保存される
      const thumbnailUploadTask = await uploadStorage(
        file.thumbnail.name,
        file.thumbnail,
        "thumbnails"
      );
    } catch (error) {
      // アップロードの途中でエラーが発生したら、処理を中断して、ここに記述される処理が行われる

      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      // 全ての処理が完了したら、ローディングをfalseにする
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
  };
};

```

`Firebase Storage`へのファイルのアップロードは以上のコードだけで実現可能です。

アップロードの実態は、`storage.ref(`${path}/${id}.${exe}`).put(file);`で実際にファイルのアップロードを行なっています。

アップロードはこれで完了しましたが、まだこのコードには問題があります。

それは、`uploadStorage`関数に対して、`id`という引数にファイルの名前を渡している箇所です。

```TS
const videoUploadTask = await uploadStorage(
  file.video.name, // 問題あり！！
  file.video,
  "videos"
);

const thumbnailUploadTask = await uploadStorage(
  file.thumbnail.name, // 問題あり！！
  file.thumbnail,
  "thumbnails"
);
```

このコードの何が問題かというと、`Firebase Storage`では同じ階層に同じ名前のファイルが存在すると、「上書き」保存をしてしまいます。

同じ名前のファイルを保存するたびに、古い動画は削除されてしまいます。

これを解決するために、ファイルにユニーク（一意）な ID を割り振ります。

そうすることで、ファイルの名前に左右されることなく、必ず違う名前のファイルとして`Firebase Storage`に保存することができます。

ユニークな ID を生成する方法はいくつかありますが、ここでは、一番簡単な方法として、`UUID`を用いた方法をご紹介します。

`UUID`とは、128 ビットのランダムの文字列を生成することで、衝突することがないユニークな値を生成するための技術です。

「ランダムなのに衝突しないの？」という疑問を持たれた方は、[こちらの資料が参考になります](https://zenn.dev/kiyocy24/articles/uuid-duplicate-time)

JavaScript で UUID による ID の生成を行うためには、ライブラリとして提供されているパッケージを使用します。

```bash
# ターミナル（コマンドプロンプト）
npm install uuid @types/uuid

# or

yarn add uuid @types/uuid
```

`uuid`パッケージをインストールしたら、先程の`useVideoUpload`でそれぞれのアップロードで uuid を生成して渡します。

[Diff - ファイルの名前をユニークな ID にする](https://github.com/Hiro-mackay/react-bootcamp/commit/b21e5e4c35db80110822f29e370296274a622330)

```TS
// src/hooks/VideoUpload/index.ts

import { useState } from "react";
import { storage } from "../../utils/Firebase/config";

// 追加
import { v4 as uuidv4 } from "uuid";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const uploadStorage = (id: string, file: File, path: string) => {
    const exe = file.name.split(".").pop();
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    setLoading(true);

    // 追加
    // 動画とサムネイルのそれぞれのuuidを生成する
    const videoName = uuidv4();
    const thumbName = uuidv4();

    try {
      const videoUploadTask = await uploadStorage(
        // 動画のファイル名として、uuidのID をファイル名にする
        videoName,
        file.video,
        "videos"
      );

      const thumbnailUploadTask = await uploadStorage(
        // サムネイルのファイル名として、uuidのID をファイル名にする
        thumbName,
        file.thumbnail,
        "thumbnails"
      );
    } catch (error) {
      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    error,
  };
};

```

これで、ファイルの名前を重複させることなく、ファイルを保存できるようになりました。

以上でファイルのアップロードが完了しました。

後は、アップロードしたファイルの参照を動画のタイトルと共に`Hasura`に保存するだけです。

- ### 動画のメタデータをデータベースに保存する

最後は、動画のメタデータの保存です。

`GraphQL`で`Hasura`に動画のメタデータを保存します。

`User`を作成した時と同じように、`Hasura`のコンソール画面から`video`テーブルにデータを保存する`mutation`クエリーを生成します。

```graphql
# 動画のメタデータを生成するクエリー
mutation InsertVideo(
  $id: String!
  $title: String!
  $description: String = ""
  $thumbnail_url: String!
  $video_url: String!
  $owner_id: String!
) {
  insert_videos_one(
    object: {
      id: $id
      title: $title
      description: $description
      video_url: $video_url
      thumbnail_url: $thumbnail_url
      owner_id: $owner_id
      duration: 0
      views: 0
    }
  ) {
    id
    title
    description
    video_url
    thumbnail_url
    owner_id
    duration
    views
    updated_at
    created_at
  }
}
```

```json
// QUERY VARIABLES

{
  "id": "videoId",
  "title": "title",
  "thumbnail_url": "thumb",
  "video_url": "video",
  "owner_id": "userid"
}
```

![hasura video mutation](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_video_mutation.png?raw=true)

`Execute Query(実行ボタン)`を押して、クエリーが問題なく実行されるか確認します。

エラーが出ていなければ、このクエリーをアプリケーションに移し替えます。

[Diff - 動画保存の GtaphQL クエリーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/86226c416720108426c45730408d1bde96589d94)

```graphql
# graphql/mutation/InsertVideo.graphqlを作成

# 動画のメタデータを生成するクエリー
mutation InsertVideo(
  $id: String!
  $title: String!
  $description: String = ""
  $thumbnail_url: String!
  $video_url: String!
  $owner_id: String!
) {
  insert_videos_one(
    object: {
      id: $id
      title: $title
      description: $description
      video_url: $video_url
      thumbnail_url: $thumbnail_url
      owner_id: $owner_id
      duration: 0
      views: 0
    }
  ) {
    id
    title
    description
    video_url
    thumbnail_url
    owner_id
    duration
    views
    updated_at
    created_at
  }
}
```

`codegen`のスクリプトを実行して、クエリーから`Hooks`を生成します。

といきたいところですが、今のままでは、`InsertVideo`の`Hooks`を作成することができません。

原因は、`codegen.js`にて、`InsertVideo.graphql`のファイルを参照する記述ができていないためです。

`codegen.js`で、新しく作られる`.graphql`ファイルも自動で全て参照する設定に書き換えます。

[Diff - codegen スクリプトでのクエリー参照を全てのクエリーファイルにする](https://github.com/Hiro-mackay/react-bootcamp/commit/9d862a1ee94fee1f4a1671e2b71f99de48c5644e)

```js
// script/codegen.js

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
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
```

これで、これから`.graphql`を新しく作成しても、自動で`codegen.js`で参照されるようになります。

それでは、`codegen`スクリプトを実行して`Hooks`を作成します。

```bash
# ターミナル（コマンドプロンプト）

npm run codegen

```

`InsertVideo`の`Hooks`が生成されたので、`useVideoUpload`でそうがのメタデータを保存する処理を実装します。

[Diff - useVideoUpload に GraphQL 処理を追加](https://github.com/Hiro-mackay/react-bootcamp/commit/a492c36457f0a58f4b79728dbe86834a22e21094)

```TS
// src/hooks/VideoUpload/index.ts

import { useEffect, useState } from "react";
import { storage } from "../../utils/Firebase/config";
import { v4 as uuidv4 } from "uuid";

// 追加
import { useInsertVideoMutation } from "../../utils/graphql/generated";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // 動画のメタデータを保存するGraphQLMutation
  const [mutation, { error: apolloError }] = useInsertVideoMutation();

  // `video`の`ownerId`のために、userのidを取得する
  const user = useRecoilValue(GlobalUser);


  const uploadStorage = (id: string, file: File, path: string) => {
    const exe = file.name.split(".").pop();
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    // 追加
    // ユーザーが読み込まれていない、未ログインであれば処理を中断する
    if (!user?.id) {
      return;
    }

    setLoading(true);
    const videoId = uuidv4();
    const thumbId = uuidv4();

    // 動画のIDを生成する
    const videoId = uuidv4();

    try {
      const videoUploadTask = await uploadStorage(
        videoName,
        file.video,
        "videos"
      );

      const thumbnailUploadTask = await uploadStorage(
        thumbName,
        file.thumbnail,
        "thumbnails"
      );

      // 追加
      // 動画のメタデータを保存する
      const res = await mutation({
        variables: {
          id: videoId,
          title,
          description,
          video_url: videoUploadTask.ref.fullPath,
          thumbnail_url: thumbnailUploadTask.ref.fullPath,
          owner_id: ownerId,
        },
      });

      // 追加
      // 全ての処理が終わったら、動画のメタデータを返す
      return res.data?.insert_videos_one;

    } catch (error) {
      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      setLoading(false);
    }
  };

  // 追加
  // Apollo Clientのエラーをキャッチする
  useEffect(() => {
    if (apolloError) {
      console.error(apolloError);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    }
  }, [apolloError]);

  return {
    upload,
    loading,
    error,
  };
};
```

これで、`useVideoUpload`で動画をアップロードする処理が完成しました。

この`Hooks`を`<UploadForm>`コンポーネントで呼び出すことで、動画のアップロードの処理を完成させていきます。

[Diff - アップロード処理を<UploadForm>コンポーネントに実装](https://github.com/Hiro-mackay/react-bootcamp/commit/a0d0b4f760f2274a7def663e9fecfd71fa9f2d09)

```TSX
// src/pages/Upload/UploadForm/index.tsx

import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { useVideoUpload } from "../../../hooks/VideoUpload";
import { GlobalUser } from "../../../stores/User";
import useStyles from "./style";


// 追加
// UploadFormコンポーネントのプロップスとして、引数を型定義する
export type UploadFormProps = {
  videoFile: File | undefined;
  thumbFile: File | undefined;
};

// 追加
// 親コンポーネントから、UploadFormに渡される引数
export const UploadForm = ({ videoFile, thumbFile }: UploadFormProps) => {
  const styles = useStyles();

  // リダイレクト用関数
  const navigate = useNavigate();

  // videoをアップロードする際の、ownerIdのためのuserId
  const user = useRecoilValue(GlobalUser);

  // ユーザー入力を受け取る`ref`変数
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // エラーを表示する用のステート
  const [errorMessage, setErrorMessage] = useState<Error>();

  // 動画をアップロードするためのHooks
  const { upload, loading, error: uploadError } = useVideoUpload();

  // 「動画をアップロード」ボタンをクリックしたら実行する関数
  const submit = () => {
    setErrorMessage(undefined);

    if (!user?.id) {
      return setErrorMessage(new Error("ログインされていません。"));
    }

    if (!videoFile || !thumbFile) {
      return setErrorMessage(new Error("ファイルを選択してください。"));
    }

    if (!titleRef.current?.value) {
      return setErrorMessage(new Error("タイトルをしてください。"));
    }

    upload({
      file: {
        video: videoFile,
        thumbnail: thumbFile,
      },
      title: titleRef.current.value,
      description: descRef.current?.value,
      ownerId: user.id,
    }).then((data) => {
      // 動画のアップロードが成功すれば、`home`URLにリダイレクト
      if (data?.id) {
        navigate("/");
      }
    });
  };

  // Hooksからのエラーを受け取り、画面表示用のエラーステートに渡す。
  useEffect(() => {
    setErrorMessage(uploadError);
  }, [uploadError]);

  return (
    <>
      <label className={styles.label}>
        <Typography variant="body2">タイトル</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"

          // 追加
          inputRef={titleRef}
        />
      </label>

      <label className={styles.label}>
        <Typography variant="body2">説明</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          multiline
          rows={4}

          // 追加
          inputRef={descRef}
        />
      </label>

      {errorMessage?.message && (
        <label className={styles.label}>
          <Typography align="center" color="error">
            {errorMessage?.message}
          </Typography>
        </label>
      )}


      {
        // エラーがあれば表示
        errorMessage?.message && (
          <label className={styles.label}>
            <Typography color="error">{errorMessage.message}</Typography>
          </label>
        )
      }

      <div className={styles.butotn}>
        <Button
          variant="contained"
          color="primary"
          // 追加
          // ローディング中のボタンを無効化
          disabled={loading}

          // 追加
          // アップロードを実行
          onClick={submit}
        >
          {/* アップロード中の表示を切り替える */}
          {loading ? "アップロード中" : "動画をアップロード"}
        </Button>
      </div>
    </>
  );
};


```

画面表示を確認して、動画がアップロードされているか見てみましょう。

![video upload component](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/video_upload_component.gif?raw=true)

アップロード処理は完了したみたいですが、本当にアップロードされているかはまだわかりませんね。

次の章で、アップロードされた動画を閲覧できるようにしましょう。

## GraphQL リクエストを実装

いよいよ実装も、終盤になってまいりました。

残っている実装は、先ほどアップロードした動画を実際に画面上で再生できるようにすることです。

と言いつも、難しいことはありません。

GraphQL によるデータの取得と、`Firebase Storage`からファイルの参照を取得して、画像または動画を表示する処理を実装します。

- ### video データのリストを取得

まずは、動画再生画面に行くまでに、動画一覧を表示し、カードをクリックすると再生画面に遷移する機能を実装します。

動画の一覧表示は、`/`の URL で表示されるカードが一覧で表示されているページで、実際にアップロードされている動画のメタデータを取得して表示します。

早速、データベースに保存されているデータを取得しきます。

例の如く、`Hasura`で動画のメタデータを取得する`query`を作成して、アプリケーションに適用します。

![Hasura video query](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_video_query.png?raw=true)

`Execute Query(実行ボタン)`を押して、クエリーが問題なく実行されていれば、アプリケーションに移し替えます。

[Diff - Videos クエリーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/541a74c451da139be35ab2a82bffeb8ab41b22be)

```graphql
# graphql/query/Videos.graphqlを作成

query Videos {
  videos {
    id
    title
    description
    thumbnail_url
    video_url
    owner_id
    duration
    views
    updated_at
    created_at
  }
}
```

また、`codegen`スクリプトを実行して、`Hooks`を作成します。

```bash
# ターミナル（コマンドプロンプト）
npm run codegen

# or

yarn codegen
```

`<Home>`コンポーネントで、動画のメタデータを取得する機能を実装します。

動画一覧表示機能は、`GraphQL`の`query`を実行すると共に、`Firebase Storage`からサムネイルを取得する必要があります。

データの取得の前に、コンポーネントがデータを受け取れるように修正を加えます。

`VideoCard`、`HeaderTitle`、`SubHeaderContent`のコンポーネントに、それぞれ親コンポーネントから`props`を受け取るように変更します。

[Diff - HeaderTitle で props を表示できるようにする](https://github.com/Hiro-mackay/react-bootcamp/commit/3f2cbc99b638fb37a38f18fa41562717592978cd)

```TSX
// src/components/VideoCard/HeaderTitle/index.tsx

import { Typography } from "@material-ui/core";
import useStyles from "./style";

// 追加
export type HeaderTitleProps = {
  title: string;
};

// 親コンポーネントからタイトルを受け取る
export const HeaderTitle = ({ title }: HeaderTitleProps) => {
  const styles = useStyles();

  return (
    <Typography className={styles.root} variant="subtitle1" component="h3">

      {
        // 追加
        // タイトルを表示
        title
      }
    </Typography>
  );
};

```

[Diff - SubHeaderContent で props を表示できるようにする](https://github.com/Hiro-mackay/react-bootcamp/commit/5fa42fb87938eed124fb54c90dfaf38b2f444aa0)

```TSX
// src/components/VideoCard/SubHeaderContent/index.tsx

import { Typography } from "@material-ui/core";

// 追加
export type SubHeaderContentProps = {
  owner: string;
  views: number;
  created: Date;
};

// 親コンポーネントから、投稿者情報、再生回数、アップロード日時を受け取ります。
export const SubHeaderContent = ({
  owner,
  views,
  created,
}: SubHeaderContentProps) => {


  return (
    <>
      <Typography variant="body2">
        {
          // 追加
          // 投稿者情報
          owner
        }
      </Typography>
      <Typography variant="body2">
        {
          // 追加
          // 再生回数
          views
        } views {
          // 追加
          // 投稿時間を表示
          new Date(created).toLocaleDateString()
        }
      </Typography>
    </>
  );
};
```

[Diff - VideoCard で props を表示できるようにする](https://github.com/Hiro-mackay/react-bootcamp/commit/70ad6d2e0bc83f430af7c97684299710b281c642)

```TSX
// src/components/VideoCard/index.tsx

import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import useStyles from "./style";
import { useEffect, useState } from "react";

// 追加
// 子コンポーネントの型定義を使用して、冗長な書き方を防ぐことができる
export type VideoCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

// propsを親から受け取る
export const VideoCard = ({
  fetcher,
  title,
  owner,
  created,
  views,
}: VideoCardProps) => {
  const styles = useStyles();

  // 追加
  // 動画のサムネイルのURLを格納する
  const [imageSrc, setImageSrc] = useState<string>();

  // 追加
  useEffect(() => {
    // 関数の実態は、`Firebase Storage`からサムネイル用のダウンロードリンクを取得する
    // ここでは、関数の内部構成を知ることなく、実行すると`Promise<string | undefined>`が返される関数であることでしか知らない
    // コンポーネントから画像取得の詳細を隠しつつも、非同期な画像の取得を実現する
    fetcher().then(setImageSrc);
  });

  return (
    <Card className={styles.root} elevation={0} square>
      <CardMedia
        className={styles.media}

        // 追加
        // 画像があればサムネイルを表示
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      {/*
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        className={styles.header}
        avatar={<Avatar />}

        // 追加
        // `Card`の`HeaderTitle`には`title`を渡す
        title={<HeaderTitle title={title} />}

        // 追加
        // `Card`の`SubHeaderContent`には、`owner`、`views`、`created`を渡す
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};
```

`<VideoCard>`コンポーネントは親コンポーネントから`props`を受け取るだけで、画面表示ができるようになりました。

では、実際に親コンポーネントでデータを取得し、`<VideoCard>`に流す処理を記述していきます。

[Diff - 動画リストを読み込む](https://github.com/Hiro-mackay/react-bootcamp/commit/7a12b9dc8bb80d6274cb4e920b9d28a9f196b885)

```TSX
// src/pages/Home/index.tsx

import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { VideoCard } from "../../components/VideoCard";

// 追加
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";
import { Link } from "react-router-dom";

export const Home = () => {

  // videoを取得する`query`
  const { data, error } = useVideosQuery();

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Grid container spacing={2}>

        {/*
          `query`で取得した動画データを表示する
        */}
        {data?.videos.map((video) => (
          <Grid item xs={3}>

            {/*
              カードをクリックしたら、プレイヤー画面を表示します。
            */}
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>

              {/*
                `<VideoCard>`には、先ほど指定されていたpropsを流し込みます
              */}
              <VideoCard
                title={video.title}
                // ownerは投稿者の名前を入れたいが、現段階では、名前を取得することができない
                owner={video.owner_id}
                views={video.views}
                created={video.created_at}

                // <VideoCard> で非同期的に画像を取得するための関数
                fetcher={() => storage.ref(video.thumbnail_url).getDownloadURL()}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

```

以上で大枠の動画リストに表示ができるようになります。

しかし、一点、修正しなければならない箇所があります。

`<VideoCard>`の props に、`owner={video.owner_id}`が渡されている点です。

ここはデザインにもある通り、投稿者の名前が表示されるところです。

しかし、現段階では、`useVideosQuery`のクエリーでは、投稿者のユーザー情報を取得することができません。

`owner_id`からユーザーを再度取得しても良いですが、２度手間です。

ここでは、Hasura 側で、動画のメタデータと同じクエリーでユーザーを取得できるようにします。

Hasura のコンソール画面で、`videos`テーブルから`Relationships`というタブで、動画の ID に対するユーザー ID を紐付けます。

![hasura video relationship user](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_video_relationship_user.png?raw=true)

「Save」を押すことで、リレーションを作成することができます。

このリレーションをどのように使うかをご説明します。

また、Hasura のコンソール画面で、`API`タブのクエリーを実行できる画面から、`videos`の`query`に`owner`という項目が増えているのがわかると思います。

![hasura explorer owner](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_explorer_owner.png?raw=true)

この`owner`を使用して、`videos`を取得すると同時に、動画に紐づいているユーザー情報を獲得することができます。

![hasura video owner query](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/hasura_video_owner_query.png?raw=true)

このクエリーで、`Query Videos`を修正します。

```graphql
# graphql/query/Videos.graphql
query Videos {
  videos {
    id
    title
    description
    thumbnail_url
    video_url
    views
    duration
    # 編集、追加
    owner {
      id
      email
      name
      profile_photo_url
      updated_at
      created_at
    }
    created_at
  }
}
```

最後に`codegen`スクリプトを実行して`Hooks`を作成します。

```bash
npm run codegen

# or

yarn codegen

```

これで、`videos`クエリーと同じリクエストでユーザー情報を獲得できます。

`Home`コンポーネントに戻って、ユーザーの名前を表示しましょう

[Diff - ビデオカードに投稿者の名前を表示](https://github.com/Hiro-mackay/react-bootcamp/commit/f214f40b14bcdf4df0b36b635f99fc32ed734603)

```TSX
// src/pages/Home/index.tsx

import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../../components/VideoCard";
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  const { data, error } = useVideosQuery();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      {/* 取得したデータを表示してみる */}
      <Grid container spacing={2}>
        {data?.videos.map((video) => (
          <Grid item xs={3}>
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              <VideoCard
                title={video.title}

                // 修正
                // owner?.nameは`undefined`である可能性があるため、`undefined`である場合は、空文字を渡すようにしています。
                owner={video.owner?.name || ''}
                views={video.views}
                created={video.created_at}
                fetcher={() =>
                  storage.ref(video.thumbnail_url).getDownloadURL()
                }
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
```

> 現段階で画面表示しようとストエラーが発生するかもしれません。  
> 原因は、`VideoHorizontalCard`で、`HeaderTitle`と`SubHeaderContent`に props を渡していないためです。  
> 次の章で、この問題は解決しますが、今画面表示で確認したい場合は、`VideoHorizontalCard`の`HeaderTitle`と`SubHeaderContent`をコメントアウト、もしくは削除すると画面表示できるようになります。

- ### Firebase Storage から動画を取得する

続いて、動画プレイヤー画面でデータの取得処理を行なっていきます。

と言いつつも、やることは先ほどと変わりません。

`Hasura`で`query`を作成し、`codegen`で`Hooks`を作成し、コンポーネントでデータを取得するだけです。

早速、`Hasura`でクエリーを作成しましょう。

ここで作成するクエリーは、`ID`で一致する動画を取得するクエリーです。

使用する`query`は、`video_by_pk`です。

![vudeo pk query](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/vudeo_pk_query.png?raw=true)

先ほどの`Videos`というクエリーは、保存されている全ての動画を取得するのに対し、こちらの`VideoByPk`は`id`と一致する動画を取得します。

よって、`query variables`でも`id`を指定しています。

アプリケーションに反映させて、`codegen`スクリプトを実行しましょう。

[Diff - VideoByPk クエリーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/57a0765271bf7ae50514ad6f6eb8f6c2af57e78f)

```graphql
# graphql/query/VideoByPk.graphqlを作成

query VideoByPk($id: String!) {
  videos_by_pk(id: $id) {
    id
    title
    thumbnail_url
    video_url
    views
    duration
    description
    owner {
      id
      name
      profile_photo_url
      email
      updated_at
      created_at
    }
    updated_at
    created_at
  }
}
```

`codegen`スクリプトの実行

```bash
npm run codegen

# or

yarn codegen
```

作成された`Hooks`で、動画プレイヤーを完成させます。

まずは、コンポーネントでデータを表示できるように修正を加えます。

[Diff - VideoPlayerCard で props を表示する](https://github.com/Hiro-mackay/react-bootcamp/commit/ccc83012a5692350f1a8e7ba0f98c9b774a2f2f4)

```TSX
// src/pages/Watch/VideoPlayerCard/index.tsx

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import useStyles from "./style";

// 親コンポーネントから渡されるpropsの型
export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  date: Date | undefined;
  fetcher: () => Promise<string | undefined>;
};

// 親コンポーネントから渡されるprops
export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  date,
  fetcher,
}: VideoPlayerCardProps) => {
  const styles = useStyles();

  // 動画のダウンロードリンクURLを格納するためのステート
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    // Firebas Storageから動画のダウンロードリンクを取得する
    fetcher().then(setSrc);
  });

  return (
    <Card className={styles.transparent} elevation={0} square>
      {/*
        追加
        srcに動画のパスを指定する
      */}
      <CardMedia component="video" controls src={src} />

      <CardContent className={styles.paddingHorizontalLess}>
        <Typography component="h2" variant="h6">
          {title}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {/*
            追加
            動画の視聴回数と動画のアップロード日を表示
          */}
          {views} 回視聴 • {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </CardContent>

      <Divider />

      {/*
        追加
        title を投稿者の名前を表示する
      */}
      <CardHeader
        className={styles.paddingHorizontalLess}
        avatar={<Avatar />}
        title={ownerName}
        subheader="0 subscribers"
      />

      {/* 説明文エリア */}
      <CardContent className={styles.descPadding}>{description}</CardContent>
    </Card>
  );
};
```

これで、アップロードした動画の再生が行えるようになりました。

あとは、プレイヤーの右側に表示されるなんちゃってレコメンド機能をつければ完成です。

リコメンド機能は本来、動画のメタデータや視聴履歴を分析して最適な動画をリコメンドしますが、今回は、アップロードされている表示動画以外の全ての動画を表示することで擬似的にリコメンド機能を実装します。

早速、表示動画以外の全ての動画を取得するクエリーを作成します。

[Diff - RecommendVideos クエリーを追加](https://github.com/Hiro-mackay/react-bootcamp/commit/db54d82c46ae4b24c260aebd4950f23de3c85a5c)

```graphql
# graphql/query/RecommendVideos.graphqlを作成

query RecommendVideos($currentVideoId: String!) {
  videos(where: { id: { _neq: $currentVideoId } }) {
    id
    title
    description
    thumbnail_url
    video_url
    views
    duration
    owner {
      id
      name
      profile_photo_url
      updated_at
      email
      created_at
    }
    created_at
    updated_at
  }
}
```

`codegen`スクリプトを実行

```bash
npm run codegen

# or

yarn codegen
```

`VideoHorizontalCard`コンポーネントを修正して、データを表示できるようにします。

[Diff - VideoHorizontalCard で props を表示する](https://github.com/Hiro-mackay/react-bootcamp/commit/f81388cfadf9bad9d64f40e8c3d82bff93eff1f4)

```TSX
// src/components/VideoHorizontalCard/index.tsx

import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { useEffect, useState } from "react";
import { HeaderTitle, HeaderTitleProps } from "../VideoCard/HeaderTitle";
import {
  SubHeaderContent,
  SubHeaderContentProps,
} from "../VideoCard/SubHeaderContent";
import useStyles from "./styles";


// 親コンポーネントから渡されるpropsの型
export type VideoHorizontalCardProps = {
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

// 親コンポーネントから渡されるprops
export const VideoHorizontalCard = ({
  title,
  owner,
  views,
  created,
  fetcher,
}: VideoHorizontalCardProps) => {
  const styles = useStyles();

  // 追加
  // サムネイルのダウンロードリンクのステート
  const [src, setSrc] = useState<string>();


  // 追加
  useEffect(() => {
    // サムネイルのダウンロードリンクを取得する関数
    fetcher().then(setSrc);
  });

  return (
    <Card
      className={`${styles.root} ${styles.transparent}`}
      elevation={0}
      square
    >
      <div className={styles.thumbnail}>

        {/*
          修正
          取得したサムネイルのダウンロードリンクを参照する
        */}
        <CardMedia className={styles.media} image={src} title="Thumbnail" />
      </div>

      {/*
        `Home`で作成した<HeaderTitle>と<SubHeaderContent>を流用する
      */}
      <CardHeader
        className={styles.contentPadding}

        // 追加
        // タイトルを表示
        title={<HeaderTitle title={title} />}

        // 追加
        // 投稿者名、再生回数、作成日時を表示
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};

```

あとは、親コンポーネントから必要なデータを取得して、props に流し込みます。

[Diff - 動画再生コンポーネントを完成](https://github.com/Hiro-mackay/react-bootcamp/commit/8e2ee091508d0be52f9c99bd5232b221d9e22f45)

```TSX
// src/pages/Watch/index.tsx

import { Container, Grid } from "@material-ui/core";
import { VideoPlayerCard } from "./VideoPlayerCard";
import useStyles from "./style";
import { VideoHorizontalCard } from "../../components/VideoHorizontalCard";
import { useParams } from "react-router";
import {
  useRecommendVideosQuery,
  useVideoByPkQuery,
} from "../../utils/graphql/generated";
import { storage } from "../../utils/Firebase/config";
import { Link } from "react-router-dom";

export const Watch = () => {
  const styles = useStyles();

  // 追加
  // URLから再生する動画のIDを取得する
  const { videoId } = useParams();


  // 追加
  // 再生する動画を取得する
  const { data: currentVideo } = useVideoByPkQuery({
    variables: {
      id: videoId,
    },
  });

  // 追加
  // リコメンドの動画を取得する
  const { data: recommendVides } = useRecommendVideosQuery({
    variables: {
      currentVideoId: videoId,
    },
  });

  return (
    <Container className={styles.root}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        {/*
          追加
          再生する動画の情報を渡す
        */}
          <VideoPlayerCard
            title={currentVideo?.videos_by_pk?.title}
            description={currentVideo?.videos_by_pk?.description}
            views={currentVideo?.videos_by_pk?.views}
            ownerName={currentVideo?.videos_by_pk?.owner?.name}
            date={currentVideo?.videos_by_pk?.created_at}
            fetcher={async () => {
              if (currentVideo?.videos_by_pk?.video_url) {
                return storage
                  .ref(currentVideo.videos_by_pk.video_url)
                  .getDownloadURL();
              }
              return undefined;
            }}
          />
        </Grid>


        {/*
          追加
          リコメンドの動画を一覧表示

        */}
        {recommendVides?.videos.map((video) => (
          <Grid item xs={4}>
            <div className={styles.cardPadding}>

              {/*
                動画プレイヤーを表示するためのリンク
              */}
              <Link
                to={`/watch/${video.id}`}
                style={{ textDecoration: "none" }}
              >

                {/*
                  カードの表示に必要なデータをpropsに渡す
                */}
                <VideoHorizontalCard
                  title={video.title}
                  views={video.views}
                  owner={video.owner?.name || ""}
                  created={video.created_at}
                  fetcher={() =>
                    storage.ref(video.thumbnail_url).getDownloadURL()
                  }
                />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

```

以上で、アップロードした動画のデータを取得して再生することができるようになりました。

- ### Firebase Storage のルールを書き換えてサムネイルを取得する

サーバーへの動画のアップロードが完了したことで、動画を視聴できるようになりました。

しかし、今のままでは、ログイン済みのアカウントでしか Storage にあるファイルを取得できません。

理由は、`Firebase Storage`のパーミッションでルールで、ログイン済みのアカウントでしか、Sotage のファイルにアクセスできないようになっているためです。

そこで、`Firebase Storage`のルールを書き変えて、読み取りは誰でもできるようにルールを変更します。

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /thumbnails/{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
    match /videos/{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
  }
}
```

![firebase storage rules](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/firebase_storage_rules.png?raw=true)

`/signout`でログアウトした状態で動画を見ても、しっかりファイルが取得されているのがわかります。

- ## Apollo Clinet のキャッシュを対策する

ここまでで、動画のアップロード、動画のメタデータの取得、動画の再生の一連の処理を実装が完了しました。

これで、アプリケーションとして完成、といきたいところですが一つ重要なバグがあります。

それは Apollo Client のキャッシュ機構に起因するバグです。

Apollo Client では、強力なキャッシュ機構が備え付けられています。

このキャッシュ機構のおかげで、Apollo Clinet では無駄なリクエストを飛ばすことなく、データを取得することができます。

普通に使う分には非常に便利な機能ではあるのですが、データを作成・更新する際には、そのデータがキャッシュに反映されずに正しい情報が表示されません。

その証拠に、動画をアップロードしても、アップロードした動画が一覧に反映されていないことがわかると思います。

![upload hidden cache](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/upload_hidden_cache.gif?raw=true)

Apollo Client では、データを作成・更新・削除などの`mutation`クエリーを使用する際は、Apollo Client のキャッシュにデータが変更されたことを通知する必要があります。

Apollo Client のキャッシュの仕組みは、深ぼると非常に面白いトピックです。

ここでは、ざっくりと簡単にご説明しますが、本番環境で運用していくとなるとしっかりその仕組みを理解しておく必要があります。

Apollo Client のキャッシュは、`{ key : value }`の形でブラウザに保存されます。

Apollo Client では、キャッシュにデータが保存されている保存されれている場合は、サーバにリクエストを送信せずに、キャッシュのデータを使用します。

この時、冒頭で説明した場合では、データを追加したときにキャッシュが更新されず、かつアプリケーションはキャッシュのみしかデータを読み取りません。

その結果、新しく作成したデータが画面に表示されずに、ブラウザを再読み込むをするとやっと表示されるようになっています。

これを解決するためにはデータ追加後もアプリケーションに対して、サーバーにデータを再フェッチするよう明示する必要があります。

このように Apollo Client では、データを変更した後に、特定のクエリーに対してキャッシュを更新する必要があるということを明示的に指定しなければなりません。

このキャッシュを更新する方法は、Apollo Client でいくつかの方法が用意されています。

しかし、どの方法を使うかは、アプリケーションやデータによって変化します。

一つの考え方としては、そのデータがどれだけ最新情報を必要とするかを要点としておくのがいいかもしれません。

[Apollo Client に用意されているキャッシュの更新方法については、ここで詳しく開設されています。](https://yigarashi.hatenablog.com/entry/apollo-client-cache-mutation)

今回は、動画をアップロードした後に、どのクエリーのキャッシュを更新したいかが明確なため、`mutaion`でデータを追加後に、キャッシュを更新したいクエリーを明示的に指定します。

Apollo Client の`refetchQueries`という機能を使います。

[Diff - アップロード時に Apollo Client のキャッシュをリフレッシュする](https://github.com/Hiro-mackay/react-bootcamp/commit/4851146bd9189f29804c6c9e542abcf3114107e0)

```TSX
// src/hooks/VideoUpload/index.ts

import { useEffect, useState } from "react";
import { storage } from "../../utils/Firebase/config";
import { v4 as uuidv4 } from "uuid";
import {
  useInsertVideoMutation,
  VideosDocument,
} from "../../utils/graphql/generated";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

type UploadProps = {
  file: {
    thumbnail: File;
    video: File;
  };
  title: string;
  description?: string;
  ownerId: string;
};

export const useVideoUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  // 追加
  // 動画をApolloでアップロードする`mutation`に対して、キャッシュ更新を指定
  // 今回は、`Videos`というクエリーを指定しています。
  const [mutation, { error: apolloError }] = useInsertVideoMutation({
    refetchQueries: [{ query: VideosDocument }],
  });

  const user = useRecoilValue(GlobalUser);

  const uploadStorage = (id: string, file: File, path: string) => {
    const exe = file.name.split(".").pop();
    return storage.ref(`${path}/${id}.${exe}`).put(file);
  };

  const upload = async ({ file, title, description, ownerId }: UploadProps) => {
    if (!user?.id) {
      return;
    }
    setLoading(true);
    const videoName = uuidv4();
    const thumbName = uuidv4();
    const videoId = uuidv4();

    try {
      const videoUploadTask = await uploadStorage(
        videoName,
        file.video,
        "videos"
      );
      const thumbnailUploadTask = await uploadStorage(
        thumbName,
        file.thumbnail,
        "thumbnails"
      );

      const res = await mutation({
        variables: {
          id: videoId,
          title,
          description,
          video_url: videoUploadTask.ref.fullPath,
          thumbnail_url: thumbnailUploadTask.ref.fullPath,
          owner_id: ownerId,
        },
      });
      return res.data?.insert_videos_one;
    } catch (error) {
      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apolloError) {
      console.error(apolloError);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    }
  }, [apolloError]);

  return {
    upload,
    loading,
    error,
  };
};


```

`refetchQueries`は、`mutation`の後に特定のクエリーを再フェッチする必要があることがわかっているときに、そのクエリーを指定します。

`refetchQueries`には、いずれかの要素の配列が入ります。

- gql 関数で解析された DocumentNode オブジェクト
- 文字列として以前に実行したクエリの名前

今回は一つ目の方法を用いて、クエリーを指定します。

DocumentNode オブジェクトは、`codegen`スクリプトで自動的に生成されています。

探し方としては、`gql`という関数で生成されている、`xxxxDocument`という名前のオブジェクトです。

ここでは、`Videos`というクエリーに対して、`gql`で生成された Document オブジェクトを`useInsertVideoMutation`で指定しています。

以上の 1 行を追加するだけで、動画のキャッシュ問題が解決されます。

![mutation video cache success](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-4/document/assets/mutation_video_cache_success.gif?raw=true)

ここまでで、アップロードから、動画の一覧表示、動画の再生までの一連の処理を実装が完了しました。
