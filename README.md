# ReactBootcamp 開発ドキュメント

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
- [ ] Hasura の設定
- [ ] データベースの設計
- [ ] Hsaura でデータを作成する
- [ ] React で GraphQL
- [ ] GraphQL Code Generator で爆速開発
- [ ] JWT トークンで GraphQL をセキュアに

### 目次

- [Bootcamp のインフラアーキテクチャ](#bootcamp-のインフラアーキテクチャ)
  - [構成理由 1:開発工数の削減](#開発工数の削減)
  - [構成理由 2:なるべく本番環境に近い構成](#なるべく本番環境に近い構成)
  - [構成理由 3:枯れた技術を踏襲しつつ、トレンドにもノッていく](#枯れた技術を踏襲しつつトレンドにもノッていく)
- [Firebase について](#firebase-について)
  - [Firebase により提供されるサービス](#firebase-により提供されるサービス)
  - [どのくらい便利なのか](#どのくらい便利なのか)
  - [驚異の無料枠](#驚異の無料枠)
- [Hasura について](#hasura-について)
  - [GraphQL について](#graphQL-について)
  - [GraphQL と RESTfull API](#graphql-と-restfull-api)
  - [GraphQL のメリット](#graphql-のメリット)
  - [そんな GraphQL を簡単に構築できるのが Hasura です](#そんな-graphql-を簡単に構築できるのが-hasura-です)
  - [Hasura のメリット](#hasura-のメリット)
- [GraphQL について](#graphql-について)
- [Firebase の設定](#firebase-の設定)
- [React で Firebase を呼び出す](#react-で-firebase-を呼び出す)
  - [firebase パッケージのインストール](#firebase-パッケージのインストール)
  - [firebase API Key の設定](#firebase-api-key-の設定)
  - [](#)
- [React で認証を実装](#react-で認証を実装)
- [React でアップローダーを実装](#react-でアップローダーを実装)
- [Hasura の設定](#hasura-の設定)
- [データベースの設計](#データベースの設計)
  - [必要なデータの洗い出し](#必要なデータの洗い出し)
  - [データのリレーションを設計](#データのリレーションを設計)
  - [データの正規化](#データの正規化)
- [Hsaura でデータを作成する](#Hsaura-でデータを作成する)
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

![step2 firebase API Key](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/step2_firebase_api_key.png?raw=true)

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

![GraphQL architecture](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/graphql_api_architecture.png?raw=true)

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

では早速、Firebase の設定に入っていきたいと思います。

と言いつつも Firebase は説明が不要なほど簡単にプロジェクトの作成が可能です。

手順通りに進めて、Firebase のプロジェクトを作成していきましょう。

まずは、Firebase のコンソールにアクセスしみましょう。

もし初めてアクセスされる方は、ログイン画面が表示されるので、ご自身の Google アカウントでログインしてください。

[Firebase コンソール](https://console.firebase.google.com/u/1/)

![google login](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/google_login.png?raw=true)

![firebase console](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_console.png?raw=true)

「プロジェクトの作成」から作成を開始ましょう。

![firebase create project name](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_create_project_name.png?raw=true)

プロジェクト名に適当な名前を入力して、規約に同意するをチェックして、「続行」を押します。

次の画面は、アプリケーションに Google アナリティクスの設定になります。

アプリケーションを運用していく上では必須の機能ですが、今回はデモアプリということで設定ぜずに進めて言います。

もちろん設定して頂いても構いません。

![firebase create analytics](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_create_analytics.png?raw=true)

続行でプロジェクトの作成が開始します。

![firebase create pendeing](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_create_pendeing.png?raw=true)

新しいプロジェクトの準備が完了したら、「続行」で Firebase プロジェクトのコンソールが出来上がります。

![firebase project console](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_project_console.png?raw=true)

ここまでで、Firebase の設定が完了しました。

次にやることは、Web アプリケーション用の「アプリ」を作成していくことができます。

Firebase には、Web 以外にも Andorid や iOS からもデータベースなどの機能が使えるようになっています。

そのため、それぞれのプラットフォーム用に「アプリ」を作成して、プラットフォーム用の`API Key`を作成する必要があります。

今回は Web のみの使用なので、Web 用の「アプリ」を作成していきます。

プロジェクトコンソールの歯車マークから「プロジェクトを設定」を選択します。

![firebase config](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_config.png?raw=true)

プロジェクトの様々な情報が表示されたページが表示され、そのページの下部に「アプリ」作成用の場所が用意されています。

![firebase config web app](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_config_web_app.png?raw=true)

まだ「アプリ」が作成されていないので、アプリを作成していきましょう。

「iOS」「Android」「Web」| 「Unity」の順番でそれぞれのプラットフォーム用の「アプリ」作成ボタンが用意されています。

今回は「Web」の`</>`というボタンを選択します。

そうすると「アプリ」作成画面が表示されます。

先ほどと同じように適当な名前を入力して「アプリを登録」でアプリを作成します。

※Firebase Hosting はいつでも作成できるので今は選択しなくても大丈夫です。

![firebase web create](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_web_create.png?raw=true)

アプリの登録が完了すると、「Firebase SDK の追加」という項目が表示されます。

ここに表示されている情報が、React から Firebase を呼び出すために必要な情報になっています。

後からいつでも確認できるので、一旦「コンソールに進む」でコンソールに戻りましょう。

コンソールに戻ると「SDK の設定と構成」に先ほどと同じ情報が記載されています。

![firebase config api key](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_config_api_key.png?raw=true)

「プロジェクトの設定」>「SDK の設定と構成」から SDK 用の API Key などの情報をいつでも確認できます。

ここまでで Firebase のセットアップが完了しました。

次から実際に React のアプリケーションに Firbase を追加していきたいと思います。

## React で Firebase を呼び出す

React から Firebase を呼び出すためには二つの準備が必要です。

1. firebase パッケージのインストール
2. API Key の設定

まずは、firebase のパッケージのインストールから初めていきます。

- ### firebase パッケージのインストール

firebase パッケージのインストールは`Material-UI`をインストールした時と全く同じ要領でインストールできます。

```bash
npm install firebase
```

以上です！

- ### firebase API Key の設定

続いて、Firebase の API Key を React に設定していきます。

API Key は先ほどの Firebase コンソールの「プロジェクトの設定」>「SDK の設定と構成」から取得していきます。

まずは、firebase のセットアップ処理 React のアプリケーションに作成していきます。

React プロジェクトに以下のファイルを作成して処理を書いてください。

```TS
// src/utils/Firebase/config.tsを作成

// Firebase コンソールの「プロジェクトの設定」>「SDK の設定と構成」から「構成」を選択し、そのままコピペ
const firebaseConfig = {
  apiKey: "AIzaSyCm8ZVPFvB4O5YVyNqA-16zWrRpbxd0RVQ",
  authDomain: "react-bootcamp-78947.firebaseapp.com",
  projectId: "react-bootcamp-78947",
  storageBucket: "react-bootcamp-78947.appspot.com",
  messagingSenderId: "236750478038",
  appId: "1:236750478038:web:fc2e6a6e2f856cae1c4777",
};
```

この API Key を React で読み込んで firebase を React で初期化します。

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

// firebaseパッケージをAPI Keyで初期化
// Firebaseコンソールでさksウエイ他アプリとReactを紐づける処理
firebase.initializeApp(firebaseConfig);

// 認証用のfirebaseモジュール
export const fireAuth = firebase.auth();

// ストレージ用のfirebaseモジュール
export const storage = firebase.storage();

// 初期化済みのfirebaseパッケージを確実に使用するためのexport defaultでfirebaseパッケージをexport
export default firebase;
```

ここまでで、React で firebase を使用する準備ができました。

と、ここで、「API Key をハードコーディングしていいのか！？」と思われた方がいるかもしれません。

結論から言うと、「大丈夫」です。

理由として、Google がこの Firebase の構成を public な状態で運用することを前提として設計しているからです。

それが垣間見えるのが、Firebase の環境構成の Google のドキュメントです。

![firebase public env](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_public_env.png?raw=true)

これは HTML から CDN を通して Firebase を使用する構成例です。

天下の Google 様がドキュメントで公開したらまずい構成を公開で設定するよう指示するでしょうか？

いや、しない！

と言うことで、もう少し詳しく説明すると、Firebase では「パーミッション」を設定することで、どのようなユーザーが Firebase のリソースにアクセスするかを制限することができます。

なので、仮に第三者が API Key を使用しても、許可されていなければリソースにアクセスすることができません。

とは言え、例えば、アカウントの新規作成をされてしまえば、そのアカウントの範囲内であればリソースへのアクセスがされてしまいます。

そういったことを制限するための方法も、Firebase では用意されています。

詳しくはこちらの「[Firebase の API キーは公開しても大丈夫だよ](https://shiodaifuku.io/articles/txEgArhm4Z2BOzrd0IKJ#%E3%82%82%E3%81%86%E3%81%A1%E3%82%87%E3%81%A3%E3%81%A8%E5%AE%89%E5%85%A8%E3%82%92%E7%A2%BA%E4%BF%9D%E3%81%97%E3%81%9F%E3%81%84%E4%BA%BA%E5%90%91%E3%81%91%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84)」をご確認ください。

そもそも、アプリケーションをパブリックにデプロイしている時点で、どのような形であれ「全ての通信やリソースへのアクセスは可能」です。

そんな中で、API Key を「見えない」ように隠したぐらいでセキュリティが確保されたと思うなよ、と言うことですね。

本当にセキュリティを確保したい場合は、「そもそもバレても大丈夫だよね」と言う構成にして、バレてもリソースにアクセスされない構成にすることが大事です。

> とはいえ全てのサービスがそのような構成にしているわけでは無いので、ドキュメントをよく読み、公開しても大丈夫な情報かを確認する必要があります。

## React で認証を実装

React で認証機能を使う前に、Firebase で認証機能を使えるように設定しなければなりません。

また、Firebase のプロジェクトコンソールから「Authentication」のコンソールに移動します。

「構築」>「Authentication」

![firebase authentication](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_authentication.png?raw=true)

「始める」を押すとログインに使用するプロバイダーを選択する画面になります。

このプロバイダとは、例えばアプリケーション内に Google によるログインや、Github ログインができるようにするための設定です。

一覧に載っているプロバイダであれば、認証に使用することができます。

とりあえず今回は、メールアドレスによる認証ができるようにします。

「メール/パスワード」の横にあるペンマークを押して、メールアドレス認証を有効にします。

![enable email auth](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/enable_email_auth.png?raw=true)

保存を押すとメールアドレスによる認証を有効にします。

これで React からメールアドレス認証ができるようになりました。

では早速、ログイン、サインアップ、ログアウトなどの機能を実装していきましょう。

ここでは、ログインなどのコアの機能を実装し、実際にユーザーからの入力に合わせてログインするといったことは、次週以降実装していきます。

まずはログイン機能から実装していきます。

Firebase の処理は、後から、Firebase 以外のログイン機能に移行するという可能性を考えて、アプリケーションのロジックから一歩離れた位置で実装します。

この実装にすることで、アプリケーションのロジック側から「何か知らんけど、メールアドレスとパスワードを渡すと認証が終わる」といった状態にします。

→ つまり、アプリケーションのロジックから Firebase の処理を隠しています。

```TS
// src/utils/Firebase/login.tsを作成
// loginのコード

// firebaseのauthをimport
import { fireAuth } from "./config";

// ログインに必要な引数の型を定義しています。
// login()関数では、引数にFireLoginTypeの型、つまり文字型の`email`と`passward`が必要になります。
export type FireLoginType = {
  email: string;
  passward: string;
};

/**
 * ログイン処理の実態です。
 * firebaseのログイン処理をラップしているだけです。
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const login = ({ email, passward }: FireLoginType) =>
  fireAuth.signInWithEmailAndPassword(email, passward);


```

以上で、ログインの実態は完成しました。

あとはロジック側からこの処理を呼び出すだけで、全てのログイン処理が完了します。

ロジックからは、firebase の初期化や呼び出しを意識することなくログイン処理を実行できます。

合わせて、サインアップ処理とログアウト処理を書いていきましょう。

```TS
// src/utils/Firebase/signup.tsを作成
// signupのコード

// firebaseのauthをimport
import { fireAuth } from "./config";

// サインアップに必要な引数の型を定義しています。
// signup()関数では、引数にFireSignupTypeの型、つまり文字型の`email`と`passward`が必要になります。
export type FireSignupType = {
  email: string;
  passward: string;
};

/**
 * サインアップ処理の実態です。
 * firebaseのサインアップ処理をラップしているだけです。
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const signup = ({ email, passward }: FireSignupType) =>
  fireAuth.createUserWithEmailAndPassword(email, passward);

```

続いて、ログアウトです。

```TS
// src/utils/Firebase/signout.tsを作成
// signoutのコード

import { fireAuth } from "./config";

export const signout = () => fireAuth.signOut();
```

ログアウトはさらにシンプルな実装になっていますね。

一つ処理を忘れていました。

ユーザーがパスワードを忘れた場合にパスワードをリセットする用のメールを送信する処理です。

```TS
// src/utils/Firebase/forgetPass.tsを作成
// forgetPassのコード

import { fireAuth } from "./config";

/**
 * パスワードリセット用のメールを送信する関数
 * @param email メールアドレス
 * @returns
 */
export const forgetPass = (email: string) =>
  fireAuth.sendPasswordResetEmail(email);
```

ここまでで、認証に必要な全てのコア処理の実装が完了しました。

あとは、アプリケーションのロジックからこれらの処理を呼び出し、成功時の処理や失敗時のエラーハンドリングを行うことで、認証機能が完成します。

具体的なロジック処理は次週以降実装していきます。

## React でアップローダーを実装

続いて、Firebase のストレージを設定していきます。

Authentication と同じように設定していきます。

「Firebase コンソール」>「構築」>「Storage」からストレージの設定を行います。

![firebase config storage](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_config_storage.png?raw=true)

「始める」を押すと、設定が開始されます。

まず初めに出てくる設定項目はストレージのセキュリティについてです。

これは、ストレージのリソースにどのようなユーザーユーザーはアクセスできるかのルールを設定します。

デフォルトでは、認証されたユーザーがストレージへのアップロードとダウンロードが許可されています。

今は設定できないのでまた後ほど設定します。

「次へ」で次に進みます。

![firebase config storage rule](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_config_storage_rule.png?raw=true)

次の設定は、リージョンの設定です。

これは、世界中に存在するサーバーのどこを使用するかを設定します。

処理時間い影響が出てくるので、なるべくユーザーの近いところに置くことをお勧めします。

- asia-northeast1 : 東京
- asia-northeast2 : 大阪

[その他のリージョン情報](https://firebase.google.com/docs/firestore/locations?hl=ja)

今回は東京(asia-northeast1)を選択します。

![firebase storage region](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_storage_region.png?raw=true)

「完了」でストレージの構築が開始されます。

終了するとストレージのコンソールが表示されます。

ここに全てのファイルリソースをを格納していきます。

![firebase storage console](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_storage_console.png?raw=true)

先に、ストレージのセキュリティを設定しておきましょう。

コンソールの上部に「Rules」という項目があるので、ここからルールを設定していきます。

![firebase storage rurles](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_storage_rurles.png?raw=true)

初めに説明した通り、デフォルトでは認証されたユーザーのみがファイルのアップロードを許可されています。

今回のアプリケーションでユーザーがアップロードするファイルは以下の通りです。

```
.
├── videos
│   └── [videoId].mp4
└── thumbnails
    └── [thumbnailId].png
```

ユーザーは、動画のアップロード/ダウンロードとサムネイル画像のアップロード/ダウンロードができます。

しかし、ここで、「アップロード」処理はログイン済みのユーザーだけに限定したいです。

そこで、ログイン済みのユーザーには、アップロード/ダウンロードを許可し、ログインしていないユーザーにはダウンロードのみを許可したいです。

この条件を Firebase Storage に反映していきます。

結論だけ記載すると以下のようなルールにします。

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read;
      allow write: if request.auth != null
    }

    match /thumbnails/{allPaths=**} {
      allow read;
      allow write: if request.auth != null
    }
  }
}
```

![firebase storage rules edit](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/firebase_storage_rules_edit.png?raw=true)

`match /b/{bucket}/o `がこのストレージ全体のパスを指定しています。

`match /videos/{allPaths=**} `が、ストレージ内の`/videos`内のディレクトリに存在する全てのファイルとディレクトリを指定しています。

その中で、`allow read`は全てのリクエストを許可しています。

反対に、`allow write: if request.auth != null`はリクエストがログインされたユーザーのみ許可する形にしています

firebase storage では、リソースにアクセスするときに、自動的に request に様々なデータを付与してリクエストを開始します。

例えば、ログイン済みのユーザーからのリクエストであれば、自動的に`request.auth`に認証情報が格納されます。

今回はこの情報の有無を確認して、ログイン済みユーザーであるかを確認して条件分岐しています。

`thumbnails`も同じような条件で記述しています。

これで、ログイン済みのユーザーのみがアップロードが許可され、他の未認証ユーザーは読み込みのみのセキュリティルールを構築できました。

続いて、React でこの Firebase Storage を呼び出します。

```TS
// src/utils/Firebase/storage.ts

// firebase のstorageをimport
import { storage } from "./config";

/**
 * 必要最低限のアップロード用関数
 * @param ref : アップロードするファイルの参照を指定する。例：'videos/example.mp4'
 * @param file : アップロードするファイルそのもの
 * @returns firebase.storage.UploadTask を返す
 */
export const uploader = (ref: string, file: File) =>
  storage.ref().child(ref).put(file);

/**
 * 必要最低限のダウンロード用関数
 * downloader()で取得したURLは、<video src={url}>とすることで、ファイルを直接ダウンロードすることなく、メディアを表示できる。
 * @param ref : ダウンロードするファイルの参照を指定する。例：'videos/example.mp4'
 * @returns string  ファイルをダウンロードするためのURLを返す。
 */
export const downloader = (ref: string) =>
  storage.ref().child(ref).getDownloadURL();

```

こちらも後ほど、アプリケーションのロジックから呼び出す形で使用します。

## Hasura の設定

続いて、Hasura の設定をいきます。

Hsaura は下記の URL からアクセスできます。

[Hasura](https://hasura.io/)

![hasura lp](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_lp.png?raw=true)

「Get Started in 30 seconds」からアカウントを作成していきます。

「Google」「Github」のどちらかでアカウントを登録できます。

![hasura login](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_login.png?raw=true)

HasuraCloud が初期プロジェクトを作成します。

`Your project is ready`になるまで待機して、「Launch Console」をクリックして、ブラウザーで Hasura コンソールを開きます。

![hasura lunch console](https://hasura.io/docs/latest/_images/create-project1.png)

Hasura のコンソールが表示されたら「Data」>「Manage」> 「Connect Database」でデータベースを作成します。

![hasura connect db](https://hasura.io/docs/latest/_images/connect-db-console1.png)

今回は`Heroku`で作成したデータベースを Hasura で使いたいので、「Create Heroku Database」を選択します。

「Create Database」から新しい Heroku データベースを作成していきます。

![hasura create heroku](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_create_heroku.png?raw=true)

そうすると、Heroku のログイン画面が出ます。

アカウントをお持ちの方はログインを、持っていない方は新規登録でアカウントを作成してください。

![heroku login](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/heroku_login.png?raw=true)

ログインが完了したら、「Connect」ボタンを押して Heroku と Hasura を接続します。

成功すれば Hasura の方で、データベースが作成されます。

![hasura success db](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_success_db.png?raw=true)

右上の「View Database」でデータベースを確認できます。

![hasura table home](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_table_home.png?raw=true)

ここまでで Hasura の設定は終了です。

## データベースの設計

続いて、実際にデータベースにテーブルを作成していきます。

[テーブルとは？となっている人はこちら](https://wa3.i-3-i.info/diff528db.html)

テーブルを作っていくためには、アプリケーション全体のデータベースの設計を考えないといけません。

データベースの設計はアプリケーションが停止してユーザーがいなくなるまで永遠と使い続けるものです。

そのため、本番環境にデプロイするようなアプリケーションでは、慎重にデータベースを作成していきます。

データベースの設計の手順は以下のような形で進めていくと考えています。

1. 必要なデータの洗い出し
2. データのリレーションを設計
3. データの正規化

データベースの設計手順については、それだけで本が出るほどの概念で、アプリケーションの規模やチームのルールにより変わります。

そうは言っても、上記の 3 つの手順は大体どんなチームで必ずやっていることと思います。

そのため、ここでは必要最低限のデータベース運用ができるようにしていきます。

- ### 必要なデータの洗い出し

まずは、このアプリケーションでどのようなデータを使っていくかいきましょう。

このときに役に立つのが、アプリケーションのデザインです。

デザインを見れば、どこでどんな情報を必要とされているかを見ることができます。

その、どこでどんな情報が必要とされているかを確認するのがデータの洗い出しと言っても過言ではありません。

本来であれば、仕様書からデータ構造を洗い出すようなことをするとは思うのですが、個人開発の域では、デザインからのユーザーのユースケースを観察し、データを構造化していくと言う方法でも問題ないと思っています。

と言うことで早速、どのようなデータを必要としているかを見ていきましょう。

まずは、ログイン画面、サインアップ画面から分かる通り、ユーザー情報は必ず必要そうですね。

![login signup](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/login_signup.png?raw=true)

ユーザー情報で必要そうなデータには何がありそうでしょうか？

- メールアドレス
- 名前

上記二つはマストで必要でしょう。

他に、

- プロフィール画像

といったデータを持たせることができるでしょうか。

では次を見てみましょう。

これは動画を一覧で表示している画面です。

![applicatio home](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/applicatio_home.png?raw=true)

パッとみた感じでこのようなデータが必要そうです。

- タイトル
- サムネイル画像
- 投稿者の名前
- 投稿者のプロフィール画像
- 再生回数
- 再生時間
- アップロード日

これだけの情報が必要そうです。

また、動画を表示している画面はもう一つあります。

![watch page](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/watch_page.png?raw=true)

上記のデータに合わせてこのような情報が必要そうです。

- 動画
- 説明
- ユーザー登録者数

他の画面を見てもこれ以上のデータは必要なさそうなので、これでデータの洗い出しが完了しました。

まとめてみましょう。

#### User

- メールアドレス
- 名前
- プロフィール画像

#### Video

- タイトル
- 説明
- 動画
- サムネイル画像
- 投稿者の名前
- 投稿者のプロフィール画像
- 再生回数
- 再生時間
- ユーザー登録者数
- アップロード日

今回はシンプルなデータ構造になりそうですね。

- ### データのリレーションを設計

では次に洗い出したデータのリレーション、つまり関係性を考えていきます。

リレーション設計のポイントは、同じデータソースにアクセスしているかを見るとわかりやすいと思います。

例えば、`Video`のデータは、投稿者の名前や投稿者のプロフィール画像といったデータを持っています。

この投稿者というデータは、名前が違いますが、`User`のことを指していることはなんとなく分かるのではないでしょうか。

つまり、`User`によって`Video`がアップロードされるので、`Video`の投稿者は`User`ということになりますね。

このように[必要なデータの洗い出し](#必要なデータの洗い出し)で抽出したデータ同士の関係性を考えることで、データがどのようにつながり合っているかを設計します。

今回は、データが二つしか無いので、リレーションも 1 つだけとなるため、上記だけで終わります。

- ### データの正規化

最後に正規化についてです。

RDB を考える上で、避けては通れないものであるのに、一番何を言っているかわからない概念です。

そこでここでは、説明の正しさよりも、わかりやすさを重視して、少し強引な説明をさせていただきます。

より深く正規化について理解したい方は、本などで理解を深めて頂ければと思います。

正規化とは、一言で言ってしまえば、「データの整理」だと思っています。

つまり、今まで[必要なデータの洗い出し](#必要なデータの洗い出し)と[データのリレーションを設計](#データのリレーションを設計)で作ったデータ構造を実際にデータベースで使えるように整理することです。

基本は、「繰り返しの排除」と「グルーピング」です。

まずは、「繰り返しの排除」です。

今回のデータ構造で、繰り返し出てくるデータがありそうですね。

#### User

- 名前
- プロフィール画像

#### Video

- 投稿者の名前
- 投稿者のプロフィール画像

ぞれぞれのデータで、`User`の名前とプロフィール画像が重複しています。

これは一つにまとめたいですね。

なぜなら、`User`の名前を変更したら、`Video`の投稿者の名前もわざわざ変更しないといけないからです。

`User`の名前を変更したら、`Video`の投稿者の名前も変更されつようにしたいですね。

しかし、今のままでは、このデータ構造を作ることはできません。

`Video`のデータから、自身の投稿者がどの`User`なのかを識別する方法がありません。

名前で`User`を探してみますか？

それでは同姓同名の`User`が見つかってしまいそうですね。

これを解決するために、データに`ID`と呼ばれるそのデータ固有のユニークな情報を付与してみましょう

#### User

- ID ←New!
- 名前
- プロフィール画像

#### Video

- ID ←New!
- 投稿者の名前
- 投稿者のプロフィール画像

これで、`Video`は`User`の ID がわかれば、誰が投稿者かわかりそうですね。

データ構造を整理しましょう。

#### User

- ID
- メールアドレス
- 名前
- プロフィール画像

#### Video

- ID
- タイトル
- 説明
- 動画
- サムネイル画像
- 投稿者の ID
- 再生回数
- 再生時間
- ユーザー登録者数
- アップロード日

いいですね！

> ちなみに、データベースの設計では、必ずデータには ID をつけるので洗い出しの段階で ID の情報を入れておいたりします。

他に、整理できそうなデータはあるでしょうか？

1 箇所ありそうですね

#### Video

- ユーザー登録者数

この情報は`User`のデータに持たせた方がいい情報ですね。

動画ごとに、投稿者の登録者数を保存するというのはよくわからないデータ構造になってしまいます。

では最後に、整理が終わったらデータ構造見てみましょう

#### User

- ID
- メールアドレス
- 名前
- プロフィール画像
- ユーザー登録者数

#### Video

- ID
- タイトル
- 説明
- 動画
- サムネイル画像
- 投稿者の ID
- 再生回数
- 再生時間
- アップロード日

<details>
<summary> ユーザー登録者数について（実際のテーブルには反映しません。）</summary>

`User`にユーザー登録者数という情報を持たせていますが、登録者数のデータを持ちたい場合このようなデータ構造では、登録者数の管理を行うことが難しいです。

そのため、ユーザー登録者数ようのテーブルを作り、そちらで登録者数を管理するのが定石です。

しかし、今回のアプリケーションでは、「チャンネル登録」を実装しないでの、ここのデータ設計をしてしまうと混乱の元になりかねません。

よって、`User`テーブルからは「ユーザー登録者数」の情報を削除します。

もしここの設計をした場合は、[こちらの情報](https://hit.hateblo.jp/entry/2016/05/09/131806)などが参考になります。

</details>

### Hsaura でデータを作成する

では上記で作成したデータ構造を実際に Hasura で作成していきましょう。

とはいえ、難しいことは何もなくブラウザでポイポチしていくだけです。

「Create Table」からテーブルを作成していきます。

> 左側のナビゲーションバーの`public`からこの画面にいくことができます。

![hasura table home](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/hasura_table_home.png?raw=true)

最初は`User`テーブルから作っていきます。

打ち込む内容は以下です。

- Table Name : users
- Columns  
  id - Text - [x]Unique  
  name - Text  
  profile_photo_url - Text  
  created_at - Timestamp - now()  
  updated_at - Timestamp - now()
- Primary Key : id

![create user table](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/create_user_table.png?raw=true)

上記データが入力できたら、下部の「Add Table」でテーブルを作成します。

ちなみに、`created_at`と`updated_at`は下記のように「+ Frequently used columns」を押すと、エイリアスが用意されています。

![frequently used columns](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/frequently_used_columns.png?raw=true)

<details>
<summary> エラーが出て、コンソールに反映されない場合</summary>

作成したデータをコンソールに反映させます。

もう一度`public`に戻って、`users`テーブルを`Track`します。

![users track](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/users_track.png?raw=true)

</details>

コンソールに`users`が登録されたかと思います。

続いて、`Video`テーブル作ってしまいましょう。

同じように`public`から「Create Table」で`videos`テーブルを作成していきます。

- Table Name : videos
- Columns  
  id - Text - [x]Unique  
  title - Text  
  description - Text  
  owner_id - Text  
  video_url - Text  
  views - Integer  
  duration - Integer  
  created_at - Timestamp - now()  
  updated_at - Timestamp - now()
- Primary Key : id

![create videos table](https://github.com/Hiro-mackay/react-bootcamp/blob/bootcamp-3/assets/create_videos_table.png?raw=true)

これでデータベースの作成は完了しました。

## React で GraphQL

ここまでで、GraphQL とデータベースの構築が完了しました。

では、この作ったデータベースに実際に React 側からデータを作成したり、読み込んだりしましょう。

まずは、一番シンプルな方法で、Hasura に GraphQL のリクエストを送信して見ます。

方法としては、Javascript の`fetch`関数を用いて、`POST`リクエストを Hasura に送信します。

`Home`コンポーネントで`fetch`関数の処理を記述して、データを取得してみましょう。

と、その前にデータベースに読み取るデータを作成しなくては、読み取るデータがない状態でリクエストを送信しないといけません。

Hasura で`users`テーブルにテスト用のデータを挿入しておきましょう。

Hasura でデータを挿入する方法はいくつかありますが、`Data`タブから直接入力するのが一番早いのでこちらでデータを作成します。

Hasura のコンソール画面から、「Data」>「users」>「Insert Row」からテストデータを入力していきます。

- id : id1
- name : test
- profile_photo_url : (空白)
- created_at : (空白)
- updated_at : (空白)

![insert users data]()

「Save」でデータを保存します。

`users`のテーブルに今作成したデータが入っています。

![users test column]()

ではこの`users`データを React で読み込んでみたいと思います。

![users test column]()

どのコンポーネントでも構いませんが、とりあえず、`Home`コンポーネントで Hasura のデータを読み込んでみましょう。

[Diff コード]()

[完成コード]()

> コードをコピペしてドキュメントに転載する方法はミスが多発しているので、今回からこのような形で、Github の昨日を最大限使って行こうと思います。
> Diff コードは実際にどこのソースを変更したのかを確認できます。

## GraphQL Code Generator で爆速開発

## JWT トークンで GraphQL をセキュアに
