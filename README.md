# ReactBootcamp 第一回勉強会後の開発ドキュメント

<details>
<summary>前回までのBootcamp</summary>

> 次回までの目標
>
> - [x] React のデザインシステムを理解し、アプリの見た目を整えよう！

> 今週のやることリスト
>
> - [x] React のコンポーネントの概念を理解する
> - [x] React の State とライフサイクルについて理解する
> - [x] React のデザインスシテムについて理解する
> - [x] Youtube アプリの構築に必要なコンポーネントの設計
> - [x] 必要ライブラリーのインストール
> - [x] デザインの前に、ルーティングを作成
> - [x] Header のデザインを作成
> - [x] Sidebar のデザイン作成
> - [x] ビデオカードのデザイン作成
> - [x] 動画再生画面のデザイン作成
> - [x] 動画アップロード画面のデザイン作成

</details>

## 次回までの目標

- [ ] インフラを構築して、ユーザーの認証とデータの保存ができるようにしよう

## 今週のやることリスト

- [ ] Bootcamp のインフラアーキテクチャ
- [ ] Firebase Authentication について
- [ ] Firebase Storage について
- [ ] Hasura について
- [ ] GraphQL について
- [ ] Firebase の設定
- [ ] React で Firebase を呼び出す
- [ ] React で認証を実装
- [ ] React でアップローダーを実装
- [ ] Hasura と GraphQL の設定
- [ ] React で GraphQL(Apollo Client の構築)
- [ ] GraphQL Code Generator で爆速開発
- [ ] JWT トークンで GraphQL をセキュアに

### 目次

- [Bootcamp のインフラアーキテクチャ](#bootcamp-のインフラアーキテクチャ)
  - [構成理由 1:開発工数の削減](#開発工数の削減)
  - [構成理由 2:なるべく本番環境に近い構成](#なるべく本番環境に近い構成)
  - [構成理由 3:枯れた技術を踏襲しつつ、トレンドにもノッていく](#枯れた技術を踏襲しつつトレンドにもノッていく)
- [Firebase Authentication について](#firebase-authentication-について)
- [Firebase Storage について](#firebase-storage-について)
- [Hasura について](#hasura-について)
- [GraphQL について](#graphql-について)
- [Firebase の設定](#firebase-の設定)
- [React で Firebase を呼び出す](#react-で-firebase-を呼び出す)
- [React で認証を実装](#react-で認証を実装)
- [React でアップローダーを実装](#react-でアップローダーを実装)
- [Hasura と GraphQL の設定](#hasura-と-graphql-の設定)
- [React で GraphQL](#react-で-graphql)
- [GraphQL Code Generator で爆速開発](#graphql-code-generator-で爆速開発)
- [JWT トークンで GraphQL をセキュアに](#jwt-トークンで-graphql-をセキュアに)

# ReactBootcamp 第三回目勉強会ドキュメント

第三回目は、React から少し離れて、インフラ周りを重点的に構築して、アプリケーションのバックエンド側の構築をしていきます。

とはいえ、サーバーレスなアプリケーション構築を目指していくので、基本的にバックエンド側のコードを書くことはありません。

様々なサービスをうまく使って、工数の少ないアプリケーション開発を目指していきます。

わからないこと、疑問点、ドキュメントやソースコードの間違いなどは下記 Discord にてメッセージお願いします。

[React Bootcamp Discord](https://discord.gg/rCAVXFvEPJ)

## Bootcamp のインフラアーキテクチャ

[第一回目勉強会](https://youtu.be/BzPGDSeJfdM)でもご説明した通り、Bootcamp アプリケーションのインフラは下記のようなサービスを用いて構築していきます。

- Firebase : BaaS
  - Authentication : ユーザー認証
  - Storage : 動画の保存場所
- Hasura : サーバーレスな GraphQL サーバー
  - GraphQL : API のスキーマ
- Heroku : PaaS
  - PostgreSQL : データベースの実態

![bootcamp infra list](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/bootcamp_infra_list.jpg?raw=true)

それぞれのクラウドは以下のようなアーキテクチャで関連しています。

![bootcamp infra architecture](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/bootcamp_infra_architecture.jpg?raw=true)

データの保存場所としての Hasura と Heroku、ユーザーの認証のための Firebase Authentication、動画を保存する外レージとしての Firebase Storage と言う形で、それぞれを必要に応じて呼び出し分ける形にしています。

今回、このような構成にした理由が 3 つあります。

1.  開発工数の削減
2.  なるべく本番環境に近い構成
3.  枯れた技術を踏襲しつつ、トレンドにもノッていく

- ### 開発工数の削減

今回は、React での開発に集中したいので、バックエンド側の構築は全てサーバーレスな設計で組みました。

特に個人開発の場合は、リソース（時間とお金）が限られているので、最低限の時間で構築できるかつ、Free プランが充実している構成で構築しました。

今回取り上げたサービスは全て Web コンソールが用意されております。

そのため、ターミナルを開いてコマンドを打ったり、ソースコードを書いて環境構築をしたりと言った煩わしい作業から全て開放されます。

それぞれのサービスを使うときは、ブラウザ上でポチポチ設定を選択するだけで、本番環境の構築まで完了します。

これらのサービスを使うことで、もちろん開発のコードを書くスピードも上がりますが、それ以上にインフラ周りの基盤が安定させることができます。

特にセキュリティやスケーリングなどの問題は、それだけで専門のエンジニアが必要なほど深く重い領域です。

それらのことを考えなくても、ある程度のセキュリティを担保されることはエンジニアとしては非常にありがたいですね。

- ### なるべく本番環境に近い構成

今回は、エッジケースでの環境構築をなるべく避けました。

どう言うことかというと、React での開発でよく見かけるインフラのアーキテクチャでは全て Firebase で構築する構成が見受けられます。

今回で言うと、Hasura を用いている箇所が Firebase に置き換えらている構成です。

しかし、Firebase でのデータベース管理では、`NoSQL`と言う`RDB`ではないデータベースの選択肢しかありません。

これの何がいけないかというと、ほとんどの企業では`RDB`を用いたデータベース管理をしているのにも関わらず、「`NoSQL`でアプリを構築できます！」では通用しないということです。

もちろん`NoSQL`を用いてプロダクトを開発している企業はたくさんありますが、それでもその企業の一体どれほどが Firebase を用いているのでしょうか？

このように、Firebase を用いたデータベース管理では、Firebase でのみのデータベースの管理の仕方しか学ぶことができません。

そのため、今回は特定のサービスになるべく依存せずに、広く使われている技術を用いてインフラを整備していきます。

> それでも、サーバーレスな構成を選ぶ以上、何かしらのサービスに依存した環境になってしまいます。  
> それぞれのサービスを選ぶ上で、変更容易性がどれほどあるかを考えながら構築することが必要です。

- ### 枯れた技術を踏襲しつつトレンドにもノッていく

今回の構成で一番のポイント GraphQL を用いた構成になっていることではないでしょうか。

GraphQL はここ数年でたくさんの運用事例が生まれ、`Github`や`Airbnb`、`Netflix`などの巨大企業が GraphQL での開発を進めています。

もう既に GraphQL は、革新的な技術からスタンダードな技術へと変貌を遂げつつあります。

とは言え、まだまだ「枯れた技術」の域まではいっていなく、今後も「トレンディングな技術」としてたくさんの導入事例が生まれてくる技術であると思っています。

GraphQL の裏では、昔ながらの RDB である`PostgreSQL`を採用し、完全に「枯れた技術」も採用しています。

全てを新しいトレンディングな技術にするのではなく、枯れた技術も使いながら今の時代に生きるエンジニアとしての力をつけれればと思います。

## Firebase について

早速、今回使用するインフラのサービスを説明していきます。

それぞれの説明が不要な場合は、[Firebase の設定](#firebase-の設定)から実際の環境の構築を行なっていってください。

- ### Firebase とは

> Google「君らサービス開発する時、毎回似たようなもの用意したり作るでしょ？それもうやっといたから。まとめて Firebase って呼ぶわ。」  
> Google「サーバを持ってない？必要ならマシン貸すよ。もしサーバを管理したくないならソースコードだけくれたらそれで勝手にホスティングしてオートスケールするよ」  
> Google「お金？個人の趣味範囲なら要らんよ」
>
> 引用：[わかる！Firebase ～全てのサービスをおつまみ紹介～](https://qiita.com/dogwood008/items/fa95b62ad151f823af70)

Firebase とは、Google が提供するアプリケーションのバックエンド処理を一手に引き受けてくれる Cloud サービスです。

アプリケーション開発で必要になってくるバックエンドの処理を全て一つのプラットフォーム上に統合することで、開発者はバックエンドの処理を意識することなくフロントの開発に専念できるようになります。

いわゆる「サーバーレス」と呼ばれるアーキテクチャであり、「Baas」という名前のサービスです。

- ### Firebase により提供されるサービス

Firebase にはたくさんのバックエンド処理が用意されています。

- [Authentication](https://firebase.google.com/docs/auth?authuser=0) : 認証サービス
  - メールでログインしたり、Google でログインしたり、Github でログインしたりできる
- [Cloud Firestore](https://firebase.google.com/docs/firestore?authuser=0) : NoSQL ライクな firebase 専用のデータベース
  - いわゆるデータベースでできることは大体できる
- [Cloud Storage](https://firebase.google.com/docs/storage?authuser=0) : ストレージ、ファイルの保存ができる
  - 低コストのファイル置き場。
- [Hosting](https://firebase.google.com/docs/hosting?authuser=0) : 静的ファイルのホスティング、主に HTML や JS をホスティングする
  - Web ページのホスティングが可能。もちろん React のアプリもホスティング可能
- [Cloud Functions](https://firebase.google.com/docs/functions?authuser=0) : サーバーレスでサーバー処理を実行する
  - AWS でいうところの Lambda。Node.js で処理を書いてデプロイするだけでバックエンド処理が完成

上記以外にも本当にたくさんの機能群が用意されております。

他の機能を確認したい人は[こちら](https://firebase.google.com/docs?authuser=0)から確認できます。

- ### どのくらい便利なのか

この Firebase、例えば React にログイン機能を実装したい場合、たったの 3 ステップでアプリケーションにログインの機能をつけるとことができます。

> Firebase セットアップの詳細は[Firebase の設定](#firebase-の設定)をご覧ください。

1. Firebase のセットアップ

[firebase のコンソール](https://console.firebase.google.com/u/0/)にアクセスして、ご自身の Google アカウントでログインするだけでプロジェクトの作成が可能になります。

![step1 firebase setup](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/step1_firebase_setup.png?raw=true)

2. Firebase API キーの取得

プロジェクトの作成が完了した後に、この Firebase プロジェクトにアクセスするための API キーを取得する事ができます。

![step2 firebase api key](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/step2_firebase_api_key.png?raw=true)

3. React で Firebase を呼び出す。

API キーを React で読み込み、`firebase`のライブラリを使用するだけで、もうログインの機能が実装完了しました。

![step3 firebase login](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/step3_firebase_login.png?raw=true)

たったのこの 3 ステップでアプリケーションにログイン機能を実装することができました。

この恐ろしいほど早い実装が Firebase の威力です。

ただ単純に機能を実装するためには、これだけの簡単さで実装することができます。

今回の Bootcamp ではここから少し踏み込んで、エラー処理やリダイレクト機能を組み込むことで、より使いやすいプロダクトにしていきます。

- ### 驚異の無料枠

もう一つ、Firebase を語る上で、外せないのがその無料枠の規模です。

大抵、クラウド系のサービスは無料枠が設けられていることがほとんどですが、その中でも Firebase は群を抜いて無料枠が充実しています。

[Firebase の料金表](https://firebase.google.com/pricing?hl=ja)

![firebase pricing](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_pricing.png?raw=true)

例えば、今回の認証について、1 ヶ月間に 1 万回の認証までは無料で運用する事ができます。

そして、課金が必要なトラクションになったとしても、1 認証あたり 6 円と急に課金が跳ね上がるといった心配もありません。

ここでも、Google 帝国のパワーは健在です。

## Hasura について

Hasura とは、GraphQL サーバーを簡単に構築するサービスです。

Hasura の説明の前に、GraphQL の説明を先にしたほうが理解が早いかもしれません。

- ### GraphQL について

GraphQL とは、Facebook が開発している Web API のための規格です。

その実態は、「クエリ言語」と「スキーマ言語」からなります。

技術詳細の前に、GraphQL と RESTfull API との比較を行うことでその概観を把握していきます。

- ### GraphQL と RESTfull API

今までの WEB 開発では、フロントエンドとバックエンドの橋渡しとして REST API を用いた方法でデータのやり取りをしていました。

例えば、`user`データをバックエンドから取得しようとすると、`/user`という API のエンドポイントに`Request`を送信することで、`user`データを取得していました。

![RESTfull api architecture](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/restfull_api_architecture.png?raw=true)

上記であれば、エンドポイントが`user`と`video`の 2 つなのでまたシンプルです。

これが、10 個、50 個とエンドポイントが増えていった場合どうなるでしょうか。

開発も運用もかなり複雑になることが想像できるかと思います。

では、反対に GraphQL の場合、どうなるか見ていきましょう。

![GraphQL architecture](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/graphql_architecture.png?raw=true)

GraphQL ではエンドポイントがただ一つのみ提供されます。

クライアントからは、この唯一提供されるエンドポイントに対して`Request`を送るのみでデータを取得できます。

- ### GraphQL のメリット

GraphQL 最大のメリットは、データの型がしっかり定義されているので、クライアントとサーバー間の食い違いが減少します。

例えば、`User`というデータを取る時、クライアントでもサーバーでも同じ`User`の型を参照する事ができます。

RESTful API での`user`取得

![rest fetch user](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/rest_fetch_user.png?raw=true)

GraphQL API での`user`取得

![graphql fetch user](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/graphql_fetch_user.png?raw=true)

[GraphQL について](#graphql-について)で`「その実態は、「クエリ言語」と「スキーマ言語」からなります。」`と説明しました。

この「クエリ」と「スキーマ」というものをクライアントとサーバーで共有することで、全く同じデータソースのもとデータのやり取りを行うことができます。

クライアントは、どの「クエリ」と「スキーマ」を指定して取得するかに注意すればよく、そのデータを実際にどのように取得するかは GraphQL サーバーに全て一任することができます。

また、サーバーは「クエリ」と「スキーマ」のルールに則ってさえいれば、データを実際にどのように取得するかは開発者に任せられます。

GraphQL では「クエリ」と「スキーマ」が唯一信頼できるデータソースとしてクライアントとサーバーに秩序をもたらします。

また、GraphQL は「秩序ある神エンドポイント`/graphql`」API を提供します。

GraphQL は、RESTful API のようにデータソースごとに無限にエンドポイントを生やすということをすることなく、ただ唯一信頼できる「エンドポイント」と「データソース」を提供します。

他にもたくさんの RESTful API にはないメリットが存在します。

そちらに関しては、ネットの記事のほうが詳しく記載されているので、気になる方は下記をご確認ください。

[アプリ開発の流れを変える「GraphQL」は REST とどう違うのか比較してみた](https://www.webprofessional.jp/rest-2-0-graphql/)

[REST と比較 GraphQL について調べてみた。](https://www.slideshare.net/atsu666/rest-graphql-75297436)

- ### そんな GraphQL を簡単に構築できるのが Hasura です

上記までで、GraphQL を導入するメリットをご理解いただけたと思います。

そんな便利な GraphQL ですが、GraphQL 自体はあくまで「規格」です。

なので、GraphQL が実装されたサーバーを用意しないと、GraphQL を使用することはできません。

GraphQL サーバーの構築に必要なのは、「GraphQL のエンドポイントの作成」「データベースの構築」「クエリやスキーマの実際のデータベースへの処理」「エラー処理」などなどが必要になります。

お気づきの方もおられるかもしれませんが、「GraphQL」は決してバックエンド処理を「書かなくて良い」銀の弾丸なのではなく、あくまでバックエンドとフロントエンドの開発のエクスペリエンスを高めるものでしかありません。

そんな GraphQL を「銀の弾丸」に進化させるサービスが今回使用する Hasura です。

初めに Hasura の説明で`「GraphQL サーバーを簡単に構築するサービスです。」`とご説明しました。

そうです、Hasura はこの便利な GraphQL を簡単に構築する事ができるサービスです。

GraphQL を本当に意味で、バックエンド処理を書かなくて良い銀の弾丸にしてくれるサービスなのです。

- ### Hasura のメリット

Hasura は、簡単に GraphQL サーバーを構築できるサービスなのですが、その中でも嬉しい機能がたくさん用意されています。

1. Web だけで完結

Hasura には Web コンソールが用意されています。

これにより、ブラウザ上で全ての操作が可能になっています。

2. データベースの管理までしてくれる

GraphQL は、あくまでデータフェッチ用のプロキシサーバーでしかなく、データベースの管理は別途必要になります。

Hasura であれば、このデータベースの管理まで自動化してくれています。

Web コンソール上でポチポチするだけで、データベースの構築からテーブルの操作、カラムの管理まで全て Hasura 内で完結させることも可能です。

3. 無料枠がある

Hasura にも無料枠が存在する

無料の条件は「1 分間に 60 リクエストまで」です。

Firebase と比べると、本番環境でユーザーに触ってもらい初めたらすぐに有料プランへのアップデートが必要そうな条件です。

しかし、それまでのテスト段階の開発では、プロダクトをテストしながら実際に動作させる分には十分な枠が用意されています。

4. もとはオープンソースなので、Hasura のエコシステムは Github に

じつは、Hasura はオープンソースとして提供されているので、Wen コンソール経由ではなく、[Hasura Engine](https://github.com/hasura/graphql-engine)で自身で Hsaura を構築することも可能です。

そのため、Hsaura のバグや質問は Github に集約されており、普通のクラウドサービスよりバグ FIX がしやすくなっています。

5. データベースレベルでのセキュリティ

Hasura はパーミッション設定もコンソール上で簡単に構築できます。

フロントエンドエンジニアは SQL を操作することに慣れていない事が多いので、SQL を触らずにデータベースの設定ができることは大変嬉しいですね。

## Firebase の設定

## React で Firebase を呼び出す

## React で認証を実装

## React でアップローダーを実装

## Hasura と GraphQL の設定

## React で GraphQL

## GraphQL Code Generator で爆速開発

## JWT トークンで GraphQL をセキュアに
