# ReactBootcamp 第一回勉強会後の開発ドキュメント

<details>
<summary>前回まで</summary>

> 次回までの目標
>
> - [x] React の環境を構築し、React の使い方を掴む

> 今週のやることリスト
>
> - [x] PC に React の開発環境を構築する
> - [x] エディタをインストール（VS code 推奨）
> - [x] React プロジェクトの作成
> - [x] React を起動してみる
> - [x] React のソースコードを書いてみる

</details>

## 次回までの目標

- [ ] React のデザインシステムを理解し、アプリの見た目を整えよう！

## 今週のやることリスト

- [ ] React のコンポーネントの概念を理解する
- [ ] React の State とライフサイクルについて理解する
- [ ] React のデザインスシテムについて理解する
- [ ] Youtube アプリの構築に必要なコンポーネントの設計
- [ ] 必要ライブラリーのインストール
- [ ] デザインの前に、ルーティングを作成
- [ ] Header のデザインを作成
- [ ] Sidebar のデザイン作成
- [ ] ビデオカードのデザイン作成
- [ ] 動画再生画面のデザイン作成
- [ ] 動画アップロード画面のデザイン作成

# ReactBootcamp 第二回目勉強会ドキュメント

第二回目は、React 特有の概念や機能を理解しながら、実際のアプリケーションで使用する画面デザインを React でデザインしていきます。

わからないこと、疑問点、ドキュメントやソースコードの間違いなどは下記 Discord にてメッセージお願いします。

[React Bootcamp Discord](https://discord.gg/rCAVXFvEPJ)

## React のコンポーネントの概念を理解する

- ### コンポーネントとは
  > コンポーネントにより UI を独立した再利用できる部品に分割し、部品それぞれを分離して考えることができるようになります。　
  > 概念的には、コンポーネントは JavaScript の関数と似ています。（“props” と呼ばれる）任意の入力を受け取り、画面上に表示すべきものを記述する React 要素を返します。
  >
  > [コンポーネントと props - React Docs](https://ja.reactjs.org/docs/components-and-props.html)

コンポーネントとは、React でアプリを構築するために最初に出てくる概念です。

皆さんも実はすでにこのコンポーネントを記述し、実際に画面に表示しています。（[第一回目勉強会参照](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-1)）

第一回目勉強会で`index.tsx`と`App.tsx`というファイルを編集しました。

このうち、App.tsx がいわゆる`コンポーネント（Component）`と呼ばれるものです。

- ### Why コンポーネント？

ではなぜ React ではこのコンポーネントという概念が存在するのでしょうか？

それは、ソースコードの再利用性と凝集度※を高め、開発がしやすくメンテナンス性の高いコードを書くためです。

> ※ひとつの役割のためだけに存在しているコンポーネントは凝集度が高い。  
> 反対にいくつもの役割をこなしているコンポーネントは凝集度が低い。

例として、今回の React Bootcamp で作成する Youtube アプリのデザインを見ていきましょう。

![Youtube Mock](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_mock.png?raw=true)

このデザインでは、このような形で大きなコンポーネントグループに分けることができます。

![Youtube Component Group](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_component_mock.png?raw=true)

それぞれ、「Layout」「Header」「Sidebar」「Main」という大きなコンポーネントの塊にグルーピンを行いました。

このグルーピングで以下の 4 つのコンポーネントが生まれました

`Layout`：「Header」「Sidebar」「Main」をまとめ上げ、上記のようなデザインを表示するコンポーネント  
`Header`：ロゴや検索バーなどを表示するコンポーネント  
`Sidebar`：ナビゲーションバーなどを表示するコンポーネント  
`Main`：アプリケーションのメインとなるデザインを表示するコンポーネント

それぞれ、そのコンポーネントがどのような役割を持っているかが明確に伝わってきますね。

ここで、重要なのは、`Header`コンポーネントは Header が存在するデザインであれば、全てのページで同じ`Header`コンポーネントを流用できます。

例えば、下記のようなデザインの場合、

![Youtube Component sidebar](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_component_sidebar.png?raw=true)

Sidebar はなくなりましたが、`Header`は全く同じデザインですよね？

`Header`コンポーネントは、`Sidebar`コンポーネントがあるかどうか、`Main`コンポーネントのデザインがどうであるか、を全く気にすることなくどこでも同じ`Header`コンポーネントとして使用することができます。

このコンポーネントとして役割を「閉じ込めて」自身のコンポーネントのことだけを気にしていればいいという設計が React 最大の特徴であり、シンプルさを実現しています。

このような形で、React では`コンポーネント`と呼ばれるパーツをたくさん繋ぎ合わせていくことで一つの巨大なアプリケーションが構築できるように設計されています。

- ### コンポーネントの実態

では、そんなコンポーネントはどのようにしてソースコードの中に出てくるのでしょうか？

実は冒頭で説明した通り、皆さんは既にコンポーネントを作成しています。

[第一回目勉強会](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-1)でのソースコードを見てましょう。

```TSX:App.tsx
// src/App.tsx

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ReactBootcamp Youtube App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         第一回目勉強会
        </a>
      </header>
    </div>
  );
}

export default App;
```

`App.tsx`内で作成した`function App()`という関数が、コンポーネントの実態です。

コンポーネントを作成するためには、`function`内で`HTML要素`を`return`することで、コンポーネントとして使用できるようになります。

このとき`HTML要素`は、JavaScript 内で`HTML要素`をいい感じに取り扱えるようにする`JSX`という名前で呼ばれています。

そして、この JSX を取り扱うためにファイルを`.jsx`としています。

今回は、Typescript を使用してアプリケーションを構築していくので、`.jsx`ではなく`.tsx`というファイル名になっていますが、違いは JavaScript か、Typescript か、の違いだけです。

誤解を恐れずに言えば、この`jsx(tsx)`で書かれた`function`は全てコンポーネントであると言えます。

> もう少し厳密に言うと、`HTML要素`を返す`function`です。  
> `HTML要素`を返さない`function`はただの関数であり、`.jsx(.tsx)`内に書かれていてもコンポーネントではありません。

何がコンポーネントであって、何がコンポーネントでないか、はコードを書きながら覚えていけると思います。

まずは、`HTML要素`を return している`function`は、`コンポーネント`として覚えてもらって構いません。

## React の state とライフサイクルについて理解する

では、実際にコンポーネントを書いていこう、という前にもう一つ大事な概念をお話ししなければなりません。

それは`ステート（state)`と呼ばれる概念です。

- ### state とは？

state とは、一言で言ってしまえば`変数`です。

プログラムを書く際に、必ず皆さんが宣言するあの`変数`と全く同じ概念です。

しかし、React の`state`はかなり特徴的な書き方をします。

- ### state の実態

`state`の宣言の仕方は下記の通りです。

```TSX
// reactのライブラリから、useStateをimport
import { useState } from 'react';

// 初期値を0としたstateを宣言
// const state = 0 のイメージ
const [state, setState] = useState(0);

// 値を変更する場合
// state の値を 1 に変更
setState(1)

```

すごい特徴的で、初めて見る人にはめんどくさい変数宣言をするなと感じたかもしれません。

値を格納する変数と、その値を変更する関数の二つに分かれています。

なぜこんな冗長な書き方をするのかを次の章で解説します。

<details>
<summary><code>import { useState } from 'react'</code>とは？</summary>

これは、JavaScript(TypeScript)にてモジュールを使用する際に用いる構文です。

ES6 と呼ばれる JavaScript のバージョンで決められたモジュール読み込みの仕様です。

> ES6 の他にもいろいろなバージョンがあります。  
> [JavaScript のバージョン](https://www.tohoho-web.com/js/what.htm#version)

JavaScript では他のファイルで作成したプログラムを`モジュール`という名前で読み込み使用できる仕組みがあります

例えば、`import { useState } from 'react'`は`react`モジュールから`useState`関数を`import`しています。

`import`したら、そのファイル内では`useState`を使用することができます。

他のファイルから関数やオブジェクトを`import`したい場合は、呼び出されるモジュールから`export`を行わなければなりません。

```TS
// src/modules/module.ts
const ten = 10;

export const addTen = (value: number) => {
  return ten + value;
};
```

```TS
// src/modules/call.ts
import { addTen } from "./module";

// 10 + 10 = 20
const twenty = addTen(10);
```

`call.ts`からは`module.ts`で保存されている`addTen`をインポートすることができます。

反対に、`const ten`は`export`されていないので、`import`することができません。

また、`import`の方法は、はもう一つあります。

```TS
// src/modules/module.ts
const hundred = 100;

const addHundred = (value: number) => {
  return hundred + value;
};

export default addHundred;
```

```TS
// src/modules/call.ts
import myModuleFunction from "./module";

//  100 + 100 = 200
const twoHundred = myModuleFunction(100);
```

さっきとの違いは、`export default`でモジュールを`export`していることです。

`export default`で`export`したオブジェクトは、呼び出し側(call.ts)で自由に名前をつけて`import`することができます。

どちらかを使うかは、明確なルールはありませんが、`export default`は 1 ファイルで 1 個しかオブジェクトを`export`することができません。

以下のような書き方はできません。

```TS
export default Function1
export default Function2 //Error!!
```

ReactBootcamp では`export`構文のみでのエクスポートを徹底し、`export default`は特別な理由がない限り使わないようにします。

理由としては、`export default`ではどのようなオブジェクトが返されるかがインポート側で明示されおらずバグの元となります。

また、`export default`では、インポート側で名前を自由につけれるため、誤ってオブジェクトの意図しない名前をつけてしまったがために、間違った使い方をしてしまう可能性があります。

このような理由から、React Bootcamp では`export`を積極的に使っていきます。

</details>

<details>

<summary>JavaScript特有の変数代入 <code>const [state, setState] = useState(0)</code>とは？</summary>

変数を`[]`で囲んで宣言していますね。

`useState`は React 特有の関数ですが、`const [state, setState]`は JavaScript 特有の変数宣言です。

これは`分割代入`と呼ばれるものです。

分割代入とは、`配列`もしくは`オブジェクト`から個別の変数を取り出し、別個の変数に代入することを可能にする JavaScript の式です。

```TS
// one = 1
// two = 2
// three = 3
const num = [1, 2, 3]
const [one, two, three] = num


// オブジェクトの分割代入の場合は、プロパティ名と同じ変数名にする必要があります。
// ten = 10
// twenty = 20,
// thirty = 30
const { ten, twenty, thirty } = {
  one: 10,
  twenty: 20,
  thirty: 30
}
```

例えば、今回 `const [state, setState] = useState(0)`としている箇所では、以下のような処理が行われています。

```TS
// reactのどっかのファイルで
export function useState () {
  /**
   *
   * なんかの処理
   *
   *
   */

  return [state, setState]
}
```

※実際のソースコードをかなり簡略しているので、react のコードベースではもっと違った書き方をされています。

この時の`return`値が、`[]`で返されていますね。

`useState`で `return [state, setState]`を行なっているおかげで、`useState`を使う際に分割代入で値を受け取ることができます。

これで、複数の値やオブジェクトを返したい時などに簡単に`return`を行うことができます。

</details>

- ### Why state? ~ React のライフサイクル ~

なぜ React ではこのような冗長な変数宣言をしているのでしょうか？

それは、React が「state の値が変更されているかどうか」を判断して、画面表示を切り替えているからです。

そして、この`setState`と言う関数が「state の値が変更されているかどうか」と言う処理を呼び出しています。

> React では、render()と言う処理を内部的に呼ぶ出すことで画面の更新を行なっています。  
> 究極的には、この render()を呼び出せば画面の表示を強制的に更新することも可能、とも言えます（あまりそう言うことはしませんが。）

具体的に、どのような時に画面表示が切り替わり、そして切り替わらないのかを見ていきましょう。

ぜひ、実際にソースコードを書き直しながら画面を見てみてください。

```TS:App.tsx
// src/App.tsx

import "./App.css";
import { useState } from "react";

function App() {
  // new Date()は現在時刻を取得します。
  const [state, setState] = useState(new Date());

  return (
    <div className="App">
      <header className="App-header">
        {/*
          JSX内で変数を画面表示したい場合は、{}で変数を囲む必要があります。
        */}
        <p>{state.toLocaleTimeString()}</p>
      </header>
    </div>
  );
}

export default App;

```

上記コードに書き直し、`npm start`で react を起動してみましょう。

![React Clock Now](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/react_clock_now.png?raw=true)

画面を表示した時の時間が表示されました。

では、この真ん中の時計を動かしてみましょう。

```TS:App.tsx
import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState(new Date());

  // setIntervalは、第二引数に指定した数値(単位はミリ秒)ごとに中の関数を実行します。
  // 1秒(1000ミリ秒)ごとにseState(new Date())を実行する関数
  setInterval(() => {
    setState(new Date());
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <p>{state.toLocaleTimeString()}</p>
      </header>
    </div>
  );
}

export default App;
```

もう一度画面表示をしてみましょう。

爆速で時計が完成しました。

![React Clock](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/react_clock.gif?raw=true)

上記コードでは、1 秒ごとに`setState`で`state`の値を現在時刻で更新することで、画面表示が時計のように現在時刻を表示してくれます。

では反対に、下記のようなコードを書き直してみてください。

```TS:App.tsx
import "./App.css";

function App() {
  let state = new Date();

  setInterval(() => {
    state = new Date();
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <p>{state.toLocaleTimeString()}</p>
      </header>
    </div>
  );
}

export default App;
```

画面表示をしてみると行なっている処理は同じなのに、画面表示が更新されないことがわかります。

このように、React では`useState`を用いた`state`宣言と`setState`による更新を行わなければ画面表示の変更すらできません。

これは、React を使う上で”一番大事”な概念なのでしっかり覚えてください。

<details>
<summary><code>const</code>と<code>let</code>とは？</summary>

先程のソースコードで、`const`を使った変数宣言と、`let`を使った変数宣言が出てきました。

この二つには明確な違いがあります。

> const : 変数に値を再代入できません

> let : 変数に値の再代入ができます。

```TS
const name = "マッケイ"
// エラー！！！
name = "React"

let fruit = "りんご"
// OK！！
fruit = "もも"

```

思わぬ変数の値の変更が起きぬように、開発では積極的に`const`による変数宣言を使っていきます。

</details>

## React のデザインスシテムについて理解する

「React でデザインをしたいのですがどうすればいいですか？？」

では、React で画面表示をしていく方法に入っていきたいと思います。

今まで、React では`JSX`で書かれたコンポーネントで画面の表示をしていく方法を見てきました。

その際に、`JSX`の実態はただの`HTML`でした。

では、この`JSX`で書かれた`HTML`のデザインを整えるためには何が必要でしょうか？

そうです。`HTML`のデザインを整えると言えば`CSS`です。

React のアプリケーションの「ビュー」の実態は、`HTML`と`CSS`ただそれだけです。

なんと言うことでしょう。

`HTML`と`CSS`が書けてしまえば React アプリケーションのビューは書けてしまうのです。

つまり、React で「デザインをしたいのですがどうすればいいですか？？」という質問の答えは簡単です。

「CSS を書け！」

- ### React でデザインを行うために必要なもの

とはいえ、React で`CSS`を書くと言っても、様々な方法があります。

- CSS を使った昔ながらの方法
- CSS モジュールを使った方法
- CSS フレームワークを使った方法
- React 専用の UI フレームワークを使った方法
- CSS in JS を使った方法

一つずつ、見ていきましょう。

※今回使う方法と How to だけ知りたいという方はこちらまでスキップしてください。

- ### CSS を使った昔ながらの方法

こちらは、昔ながらのフロントエンドで用いられているグローバルな CSS ファイルに CSS を書いていく方法です。

React 以前のフロントエンド開発をしたことがある方は、この方法が一番馴染み深いと思います。

しかし、この方法は React ではもう使用しません。

理由は色々あるのですが、最も大きな理由は「コンポーネント指向の React との相性が最悪」ということです。

React は、コンポーネントという「箱」にコンポーネントに関係するものを閉じ込めることができるのに、グローバルな CSS ファイルで CSS を管理してしまうと、そのコンポーネントがどの CSS スタリングを使用しているのかの管理が煩雑になります。

なので、もし、React で CSS ファイルによるデザインを行いたい場合は次の`CSSモジュール`によってスタイルするのがスタンダードになっています。

ちなみに、`create-react-app`で作成したテンプレートプロジェクトはこのグローバルな CSS が用いられています。

- ### CSS モジュールを使った方法

React で CSS ファイルを用いたスタイリングを行うときは、もうほとんどこの方法を使用します。

先程のグローバルな CSS スタリングと何が違うのか実際の画面を見てもらおうと思います。

```TSX:App.tsx
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      {/*
        .App-headerではErrorが出るので、App.cssファイルの.App-headerを.AppHeaderに変更
      */}
      <header className={styles.AppHeader}>
        <p>React Bootcamp</p>
      </header>
    </div>
  );
}

export default App;
```

まずは、1 行目から`App.css`から`App.module.css`に変更されています。

CSS モジュールを使用するのに、特別な設定は何も必要ありません。

ただ、CSS のファイル名を`XXX.module.css`にするだけです。

そして、import 側からその`module.css`を`import from`します。

今回の場合、`styles`には`App.module.css`の css ファイルで書かれている CSS のオブジェクトが格納されています。

イメージとしては以下のような感じです。

```TS
/**
 * [key: string]は任意の文字列
 * 実際のオブジェクトとしては、
 * {
 *  App: "任意のcss文字列"
 *  AppHeader: "任意のcss文字列"
 * }
 */
type styles = {
  [key: string]: string;
};
```

そして、CSS の`class`を使いたい場所の`HTML要素`の`className`に`styles`に格納されている CSS を指定しています。

これで、例えば`<header>`要素には、`App.module.css`内の`.AppHeader`が指定されます。

とても簡単に CSS をいい感じにコンポーネントに閉じ込めることができるようになります。

他にも様々なメリットがありますが、それはまた後ほどご説明します。

- ### CSS フレームワークを使った方法

CSS フレームワークとは、あらかじめ様々なスタリングが用意されている CSS ファイルをインポートすることで、最小限のスタイリングでデザインを完成させることができるツールです。

有名なフレームワークで言うと、`Bootstrap`や`Tailwind`があります。

CSS フレームワークには、何百個と言うスタリング済み CSS が用意されており、その CSS を HTML 要素に指定するだけで、デザインが完成します。

例えば、人数が少ない開発チームや、デザイナーがいない開発チームでは、このような CSS フレームワークを使用することで、開発スピードを大幅に上げることができます。

有名な CSS フレームワーク

Tailwind : [https://tailwindcss.com/](https://tailwindcss.com/)

Bootstrap : [https://getbootstrap.com/](https://getbootstrap.com/)

Foundation : [https://get.foundation/](https://get.foundation/)

Semantic UI : [https://semantic-ui.com/](https://semantic-ui.com/)

最近では、React 界隈で Tailwind をデザインシステムに採用する動きがあります。

Tailwind には様々な CSS プロパティを`class`ベースで用意されており、それを組み合わせることで、あたかも HTML のマークアップ上で擬似的に CSS を記述してスタリングしているかのような開発体験を実現しています。

コミュニティも非常に活発に活動しており、これからのフロントエンドのトレンドとしては目が離せないフレームワークです。

- ### React 専用の UI フレームワークを使った方法

次は、React UI フレームワークを使ったデザインの方法です。

こちらは、先程の CSS フレームワークを用いたスタリングと非常に似ており、既にデザイン済みのスタイリングを用いてデザインを実装することができます。

しかし、UI フレームワークは CSS フレームワークとは異なり、React で運用することを念頭に置いたフレームワークになっています。

よって、UI フレームワークを用いれば、CSS フレームワークよりもさらに簡単にデザインを実装することができます。

有名なフレームワークでは以下のようなものがあります。

Material-UI : [https://material-ui.com/](https://material-ui.com/)

Chakra UI : [https://chakra-ui.com/](https://chakra-ui.com/)

React Bootstrap : [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)

Ant Design : [https://ant.design/](https://ant.design/)

この中では、`Material-UI`一強みたいなところがあり、Github スター数も`70k`と他を圧倒しています。

それもそのはず、Material-UI は Google が提唱している`[マテリアルデザイン](https://material.io/design)`に準拠したデザインシステムを取り入れています。

よって、`Material-UI`を用いた React 開発を行うと、どっかで見たことあるよなデザインを爆速で開発することができます。

いい感じのデザインでスピーディに開発したい場合は、`Material-UI`がおすすめです。

- ### CSS in JS を使った方法

最後はスタリング界の異端児、CSS in JS を使った方法です。

まず、CSS in JS が何かと言うと、CSS のスタリングを JS のファイル内に記述するスタリング手法です。

説明するより見た方が早いと思うので、下記の例を見てください。

```TSX
import styled from "styled-components";

// CSSによるスタイリング
const StyledButton = styled.button`
  background-color: black;
  font-size: 32px;
  color: white;
`;

function Component() {
  // コンポーネントとして、そのまま使用可能
  return <StyledButton> ログイン </StyledButton>;
}
```

JS と同じ場所に CSS の記述がされているのがわかると思います。

少しだけ詳しく解説すると、

このコードでは、`styled-components`と呼ばれる`CSS in JS`のライブラリを用いています。

そして、4 行目で`styled-components`の機能を使って、`button`要素に対して CSS を記述しています。

`styled`で作られたデザインは`コンポーネント`として使用することができます。

また、`CSS in JS`にはもう一つ便利な機能があります。

それは、CSS に変数を渡すことができる点です。

例えば以下のような形です。

```TSX
// "props"の中に引数が格納される
// 引数の値によってCSSを制御できる
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function Component() {
  // "primary"という引数をtrueとしてButtonに渡す
  return <Button primary={true}> ログイン </Button>;
}
```

CSS でデザインされたコンポーネントに対して、簡単に引数を渡し、デザインを変更することができるのが`CSS in JS`の特徴です。

- ### 結局どれ使えばいいんですか？？

ここまで、たくさんの React のデザインの方法について見てきました。

では、このたくさんあるデザインシステムの中からどれを採用していけばいいのでしょうか？

まず、初めに考えるべきことは、アプリケーションの目的です。

アプリ開発にはその目的に応じて様々な制約が課せられるものです。

短い期間での開発が必要か？  
既に大きなデザインシステムを使っているアプリのリプレイスか？  
独自のデザインスシテムの運用が必要か？  
どのようなエンジニアが集まっているか？

その中で、一番最適なデザインの方法を考えることがあなたにとってのベストプラクティスです。

例えば私の場合、開発しているアプリのデザインシステムを考えるときに「最速でいい感じのデザインを構築し、プロダクトの検証を素早く回さなければならない」と言う制約がありました。

つまり今回求められているのは、デザインの独自性や機能性ではなく、「触れるプロダクトをいかに早く構築するか」でした。

よって、デザインシステムを選ぶときも、いい感じのデザインがたくさんあり、かつ開発スピードが速くなるようなデザインシステムと言う要件を満たす「Meterial-UI」を採用しました。

このような形で、自身の置かれている状況や環境に合わせて柔軟にどのデザインシステムを採用するかを決めていく必要があります。

- ### 今回の ReactBootcamp では「UI フレームワーク」を使用

今回の ReactBootcamp では、Ui フレームワークの`Material-UI`を使ったデザインシステムを構築していきたいと思います。

`Material-UI`を採用する理由は以下の通りです。

- とにかく、開発スピードが爆速

`Material-UI`に用意されているデザイン済みをコンポーネントを使用すれば、一切のデザインを考慮することなくアプリを開発することができます。

- 手段にこだわらず、「動くもの」を作ることを目指す。

開発の目的は、ソースコードを生み出すことではなく、「動くもの」を作ること。

最速で動くものを作るためにはやはり、デザインフレームワークを使う以外の選択肢はありません。

- 既に十分な実績とコミュニティがある

`Material-UI`は、枯れた技術までいきませんが、ここ数年で着実にそのエコシステムを成熟させてきました。

今回のような小規模アプリ開発では困ることは、ほとんど出てこないでしょう。（少なくとも、エラーは書いた人のせいです。）

なので、今回は `Material-UI`を使用したデザインシステムを採用します。

## Youtube アプリの構築に必要なコンポーネントの設計

お待たせしました。

それでは、実際にアプリケーションのデザインを行なっていきましょう。

最初にコードを書いていく前に、どのようなデザインで、どのようなコンポーネントが必要そうかの見ていきます。

今回作成するデザインの完成形は以下の Figma 内に構築済みです。

[https://www.figma.com/file/xWjQFqQLjDZttAbUhps2EJ/?node-id=0%3A1](https://www.figma.com/file/xWjQFqQLjDZttAbUhps2EJ/?node-id=0%3A1)

これから上記のデザインを全て構築していきます。

- ### コンポーネントの設計に必要な考え方

コードを書いていくときに、ただ闇雲にデザインをコードに落とし込んで行っては、非常に開発のしずらいソースコードを生んでしまいます。

そこで、コンポーネントの設計を行うことで、わかりやすく、開発のしやすいコードを書いていくようにしていきます。

コンポーネントの設計に必要な考え方はシンプルです。

それは「デザインを共通化して、なるべくコードを書かなくて済むようなコンポーネントを作成する」ことです。

これがどう言うことか、見ていきましょう。

下記のデザインをまず見てください。

これは、アプリの`Home`となるページのデザインです。

![React Youtube Home](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_mock.png?raw=true)

例えばこのデザインでは、わかりやすく同じようなデザインが繰り返し使われていることが見て取れます。

これは、コンポーネントとして共通化して使い回しできるようにコードを書くべきですね。

![React Youtube Home Card](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_home_card.png?raw=true)

他にも、ページごとのデザインを見てみると、ここにも繰り返しデザインが現れています。

![React Youtube Page](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_component_sidebar.png?raw=true)

例えば、ページ上部の`Header`を共通化できそうです。

また他にも、`Sidebar`の共通化も行えそうですね。

このような形で、デザイン全体を見たときに、コンポーネントとして共通化できそうなデザインを抽出して、積極的にコンポーネント化していきます。

- ### ディレクトリ構造

上記で共通化したコンポーネントを実際に記述していくファイルを作成するには、フォルダ（ディレクトリ）で構造化することで、開発をしやすくすることができます。

しかし、残念ながら React にはどのようにディレクトリを作成すればいいか、というルールは存在しません。

よって、どのような形でディレクトリを構造化していくかは全て開発者に委ねられています。

React の開発者の間では、どのようなディレクトリ構造にするのがいいのかの議論は活発にされています。

ネットで検索してもたくさんのアイディアを見つけることができます。

その中で、今回は`Atomic Desgin`と呼ばれるデザイン手法を改良したものを取り入れていきたいと思います。

具体的なディレクトリ構造は以下のような形で開発をしていきます。

```
src
├── Route.tsx
├── index.tsx
├── compoennts
│   └── [Component Name]
│       └── index.tsx
├── layouts
│   └── [Layout Name]
│       └── index.tsx
├── pages
│   └── [Page Name]
│       └── index.tsx
│       └── [Component Name]
│           └── index.tsx
└── templates
    └── [Template Name]
        └── index.tsx
```

### Route.tsx

アプリケーションのルーティング処理を記述します。

### index.tsx

アプリケーションのエントリーポイントです。

必需品。

### components

汎用的に使用できるコンポーネントです。

ここでは、ロジックを記述指定はいけません。

例えば、データベースとの非同期通信や、アプリケーション内のデータの fetch を行なってはいけません。

データは全て、親コンポーネントから受けもらいます。

※ただし、そのコンポーネント内で閉じているデータは、例外的に`components`内で作成できます。

### layouts

ページのレイアウトデザインのためのコンポーネントです。

ページ全体でのデザインのレイアウトを共通化します。

### pages

特定のルーティングの Root となるコンポーネントです。

例えば、`/login`と言うルーディングに対して、`Login`と言うコンポーネントを作成して、`/login`のルーティングで必要なコンポーネントやロジックを呼び出します。

また、その`page`内でしか呼び出さないロジック(非同期通信など)群を持ったコンポーネントは、子階層に作成していく。

### templates

ロジック(非同期通信など)群を持ったコンポーネントです。

汎用的に使えるロジック群を持ったコンポーネントはここに作成します。

- ロジックを持たない汎用コンポーネント →`components`
- ロジックを持つ汎用コンポーネント →`templates`
- 特定の page でのロジックを持つコンポーネント →`pages`

と言うルールのもと、ディレクトリを分けていきます。

## 必要ライブラリーのインストール

開発に必要なライブラリーのインストールを行います。

合わせて`src`のディレクトリ内を以下のような構造になるように、不要なファイルを削除し、新たにディレクトリとファイル(.tsx ファイル)を作成してください。

```
├── Route.tsx
├── compoennts/
├── layouts/
├── index.tsx
├── pages/
└── templates/
```

「まとめてインストール」を使用すれば今回の勉強会で必要なライブラリを全てインストールすることができます。

- まとめてインストール用

```
npm install react-router-dom@next @types/react-router-dom history @material-ui/core @material-ui/icons

or

yarn add react-router-dom@next @types/react-router-dom history @material-ui/core @material-ui/icons
```

- 個別インストール用

> ルーティング用ライブラリ

`@next`をつけることで、最新ベータ版をインストールできます。

`react-router-dom`最新ベータ版(v6.0.0-beta.1)では非常に便利な機能が追加されており、ベータ版ですが今回の Bootcamp ではこのバージョンを使っていきます。

```
npm install react-router-dom@next @types/react-router-dom@next history

or

yarn add  react-router-dom@next @types/react-router-dom@next history
```

> Material-UI

React の UI フレームワークです。

使えるデザインコンポーネントは下記にまとまっています。このドキュメントと睨めっこしながら開発していきます。  
[https://material-ui.com/components/box/](https://material-ui.com/components/box/)

また、デザインフレームワークに合わせて、アイコンのライブラリも一緒にインストールしています。  
[https://material-ui.com/components/material-icons/](https://material-ui.com/components/material-icons/)

```
npm install @material-ui/core @material-ui/icons

or

yarn add @material-ui/core @material-ui/icons
```

## デザインの前に、ルーティングを作成

まずは、URL を開いたときに、それぞれのパスで表示するコンポーネントを作成していきます。

ルーティングには、`react-router-dom`を使用していきます。

まずは、`Route.tsx`を以下のように記述します。

```TSX
import { Navigate, useRoutes } from "react-router-dom";

// 下記のファイルはまだ作成されていないので、次項で作成する。
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";

export const RootRouter = () => {
  // useRoutesを使用することで、ルーティング用のコンポーネントをいい感じにライブラリが作成してくれる
  // v6.0.0-beta.1から追加された便利機能
  return useRoutes([

    // HeaderとSidebarがあるデザインのページ
    // elementに指定したコンポーネントをページのレイアウトデザインとして使用する

    {
      element: <HomeLayout />,

      // childrenでは、pathに指定したURLで、使用するコンポーネントを指定する
      children: [{ path: "/", element: <div>Home</div> }],
    },

    // Headerのみのデザインのページ
    {
      element: <SideLessHomeLayout />,
      children: [
         { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videId", element: <div>watch</div> }
      ],
    },

    // HeaderもSidebarもないページのデザイン
    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <div>ログイン</div> },
        { path: "signup", element: <div>新規作成</div> },
        { path: "forget", element: <div>パスワードリセット</div> },
        { path: "404", element: <div>Not Found</div> },

        // pathに"*"を指定することで、「全て」のURLとして指定する
        // Navigateを指定することで、リダイレクト処理
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};
```

`layouts`コンポーネントをまだ作成できいないので、作成します。

```TSX
// src/layouts/Home/index.tsx と言うファイルを作成する
// 以下は、index.tsxのコード
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/*
        <Outlet />を配置した箇所に、childrenコンポーネントが展開される
        childrenコンポーネントとは、Route.tsx内でchildren>elementで指定したコンポーネントである
      */}
      <Outlet />
    </div>
  );
};
```

```TSX
// src/layouts/SideLessHome/index.tsx と言うファイルを作成する
// 以下は、index.tsxのコード

import { Outlet } from "react-router-dom";

export const SideLessHomeLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
};
```

```TSX
// src/layouts/Simple/index.tsx と言うファイルを作成する
// 以下は、index.tsxのコード
import { Outlet } from "react-router-dom";

export const SimpleLayout = () => {
  return (
    <div>
      <h1>Simple</h1>
      <Outlet />
    </div>
  );
};
```

最後に、`index.tsx`に以下のコードを追加する。

```TSX
import React from "react";
import ReactDOM from "react-dom";
// BrowserRouterをインポート
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";

ReactDOM.render(
  <React.StrictMode>
    {/*
      この位置に<BrowserRouter>を挿入する
      これにより、react-router-domが初期化され、アプリケーションでreact-router-domが使用できるようになる
    */}
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

ここまでで、一度全てのファイルを保存して、`npm start`で React を起動してみましょう。

下記のようになれば成功です。

![React Router Dom](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/react_router_dom.png?raw=true)

上部のアドレスバーの URL を`/watch`や`/login`に変更して見てください。

画面の表示も変わっているのがわかると思います。

ここまでの[Github ソースコード](https://github.com/Hiro-mackay/react-bootcamp/tree/155a6ac3238de53e3c3ca1caad89945f3aede1d1)

## Material-UI の設定

Material-UI を使用するにあたって、少し設定が必要です。

と言っても、作業は簡単です。

`src/index.tsx`を下記のようにコードを変更します。

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";

// MaterialーUIの設定類をインポート
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

// Material-UIの「テーマ」を作成する。
// Material-UIのテーマ（色など）をカスタマイズする際には、createThemeの引数にカスタマイズ項目を渡す。
// 今回は何もカスタマイズしないので、何も指定していない。
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    {/*
      Material-UI用を初期化し、アプリケーション全体でMaterial-UIを使用できるようにする
    */}
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/*
          ブラウザの違いを吸収し、どのデバイスでは同じように表示する用のCSSを使用する
        */}
        <CssBaseline />
        <RootRouter />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

これで、`Material-UI`が有効化され、どこでも使用できるようになります。

## Header のデザインを作成

それでは、本格的にデザインの作成に入っていこうと思います。

まずは、様々なページで多用されている`Header`コンポーネントをさらに細かくコンポーネントに細分化していきます。

![Header Component](https://github.com/Hiro-mackay/react-bootcamp/blob/898fda0d5e492dcca294acefbd54b01c4bc694a2/assets/header_component.png?raw=true)

`Header`コンポーネントは、複数のページでロジックを内包したコンポーネントです。

なので、`Header`コンポーネントは、`src/templates/header`に構築していきます。

```TSX
// src/templates/DashboardHeader/index.tsxを作成
// index.tsxのコード
export const DashboardHeader = () => {
  return (
    <div>

    </div>
  );
};
```

`Material-UI`には、`AppBar`と呼ばれるコンポーネントで、Header のデザインが用意されています。

このコンポーネントを使って Header をデザインしていきましょう。

AppBar:[https://material-ui.com/components/app-bar/](https://material-ui.com/components/app-bar/)

```TSX
// src/templates/DashboardHeader/index.tsx
import { AppBar, Toolbar } from "@material-ui/core";

export const DashboardHeader = () => {
  return (
    <AppBar>
      <Toolbar>

      </Toolbar>
    </AppBar>
  );
};
```

これだけで、ページの上部に`Header`が現れます。

メニュー用のボタンとロゴを追加していきましょう。

```TSX
// src/templates/DashboardHeader/index.tsx
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const DashboardHeader = () => {
  return (
    <AppBar>
      <Toolbar>
        {/*
          アイコン用のボタンを配置
        */}
        <IconButton>
          <MenuIcon />
        </IconButton>

        {/*
          ロゴを配置
        */}
        <div>
          <Logo />
        </div>
      </Toolbar>
    </AppBar>
  );
};
```

ロゴ表示用のコンポーネントは、`Logo`としてコンポーネント化していきます。

```TSX
// src/components/Logo/index.tsxを作成
// index.tsx

export const Logo = () => {
  return <img src="" alt="Youtube Logo" />;
};
```

Logo には、Youtube のロゴを表示させたいので、`<img>`要素を置いています。

<img>で画像を表示させるためには、画像が必要です。

Youtube では、公式でロゴ画像を配布しているので、それを使わせてもらいましょう。

[Youtube のロゴをダウンロード](https://www.youtube.com/howyoutubeworks/resources/brand-resources/#logos-icons-and-colors)

`Full-Color Light Logo`をクリックすると、ロゴファイルの zip がダウンロードできます。

その中の`yt_logo_rgb_light.png`という画像を、このディレクトリの`/public/static/yt_logo_rgb_light.png`となるように画像を`public/static/`に置きます。

この画像を、React から呼び出してみましょう。

先ほどの、`src/components/Logo/index.tsx`のファイルで画像パスを指定します。

```TSX
// src/components/Logo/index.tsxを作成
// index.tsx

export const Logo = () => {
  // /publicディレクトリに格納されている画像を相対パスで指定できる。
  return <img src="/static/yt_logo_rgb_light.png" alt="Youtube Logo" />;
};
```

これで、<Logo>コンポーネントを呼び出せば自動で Youtube ロゴ画像が表示されるようになります。

`Header`部分のロゴ表示領域のコンポーネント構造が完成しました。

しかし、今のままでは、デザインとはかけ離れた表示になっています。

コンポーネントに引数を指定して、見た目を整えます。

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../../compoennts/Logo";

export const DashboardHeader = () => {
  return (
    // color="inherit" : 背景を白色に
    // elevation={0} : 影(box-shadow)を無くす
    <AppBar elevation={0} color="inherit">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <div>
          <Logo />
        </div>
      </Toolbar>
    </AppBar>
  );
};
```

しかし、プロパティを指定しても、デザインをするのには限界があります。

![Header miss design](https://github.com/Hiro-mackay/react-bootcamp/blob/898fda0d5e492dcca294acefbd54b01c4bc694a2/assets/header_miss_design.png?raw=true)

そこで、`styles.ts`というファイルを作り、ここにカスタム用のスタイリングを書き、既存のスタイリングを上書きします。

```TS
// src/templates/DashboardHeader/style.ts
import { makeStyles } from "@material-ui/core";

// makeStyles : カスタム用のCSSを生成してくれる、@material-uiの機能
export default makeStyles({
  logo: {
    width: 100,
  },
});
```

`style.ts`内で、`makeStyles`を使うことで、カスタム用の CSS を生成してくれます。

`style.ts`にカスタム用のスタリングを書くことで、`index.tsx`からスタリング用のソースコードがなくなり、見やすいソースコードを書くことができます。

`style.ts`は以下のように呼び出して使用します。

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../../compoennts/Logo";

// export defaultしているので、import側でuseStylesと命名します。
// 命名はなんでも構いませんが、一貫して全て同じ名前にすることで、カスタム用のCSSを使用していることを明示します。
import useStyles from "./style";

export const DashboardHeader = () => {
  // 一度、useStylesを実行して、CSSを生成します。
  const styles = useStyles();

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        {/*
          "useStyles"の値は、CSSモジュールと全く同じような使い方で、使用することができます。
        */}
        <div className={styles.logo}>
          <Logo />
        </div>
      </Toolbar>
    </AppBar>
  );
};
```

`<Logo>`のデザインも整えましょう。

```TS
// src/compoennts/Logo/style.tsを作成
// index.tsxのコード

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    maxWidth: "100%",
  },
});
```

```TSX
// src/compoennts/Logo/index.tsx

// ① カスタムスタイルをインポートして
import useStyles from "./style";

export const Logo = () => {
  // ② カスタムスタイルを生成し
  const styles = useStyles();

  return (
    <img
      // ③ スタイルを指定する
      className={styles.root}
      src="/static/yt_logo_rgb_light.png"
      alt="Youtube Logo"
    />
  );
};
```

Header のロゴ部分ができました。

![Logo Header](https://github.com/Hiro-mackay/react-bootcamp/blob/898fda0d5e492dcca294acefbd54b01c4bc694a2/assets/logo_header.png?raw=true)

引き続き、検索バーと右側プロフィール欄を作っていきましょう。

検索バーを作成します。

```TSX
// src/templates/DashboardHeader/SearchBar/index.tsxを作成
// <SearchBar>は現状"Header"でのみ使用しているので、`templates/DashboardHeader`に閉じ込めています。
// index.tsxのコード
import { InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBar = () => {
  return (
    // elevation={0} : 影を削除
    // variant="outlined" : 枠線を表示
    <Paper elevation={0} variant="outlined">
      {/*
        最初に表示していく文字。
        何も入力されていない検索バーに"検索"と表示されます。
      */}
      <InputBase placeholder="検索" />
      {/* 検索窓の横にある、検索アイコンを表示 */}
      <div>
        <SearchIcon />
      </div>
    </Paper>
  );
};
```

`<SearchBar>`のスタリング行います。

```TS
// src/templates/DashboardHeader/SearchBar/style.tsを生成
// styles.tsのコード
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    maxWidth: 700,
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  inputContainer: {
    marginLeft: 40,
  },
  input: {
    width: "100%",
  },
  searchIcon: {
    width: 80,
    height: 34,
    backgroundColor: "#F4F4F4",
    borderLeft: "1px solid #CCCCCC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": { opacity: 0.72 },
  },
});
```

```TSX
// src/templates/DashboardHeader/SearchBar/index.tsx

import { InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// カスタムスタイルをimport
import useStyles from "./style";

export const SearchBar = () => {
  // カスタムスタイルを生成
  const styles = useStyles();

  return (
    // スタイリングを指定
    <Paper className={styles.root} elevation={0} variant="outlined">
      <InputBase className={styles.input} placeholder="検索" />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </Paper>
  );
};

```

検索バーのスタリングが完了しました。

次は、`Header`の右側、アバター等が表示されているプロフィール欄を作ります。

```TSX
// src/templates/DashboardHeader/style.ts

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  logo: {
    width: 100,
  },

  // profileIconを追加
  profileIcon: {
    padding: 0,
    width: 44,
    height: 44,
  },
});
```

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar, Avatar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../compoennts/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <div className={styles.logo}>
          <Logo />
        </div>

        <SearchBar />

        {/*
          新規動画作成のアイコンボタンを追加
        */}
        <IconButton>
          <VideoCallIcon />
        </IconButton>

        {/*
          プロフィールアイコンを追加
        */}
        <IconButton className={styles.profileIcon}>
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
```

ここまでで、`<DashboardHeader>`のデザインがほぼ完成しました。

それでは、この`<DashboardHeader>`を画面に表示していきましょう。

`<DashboardHeader>`を呼び出すべき場所は、`Header`がデザイン内に含まれる`layout`コンポーネントです。

つまり、`src/layouts/Home/index.tsx`と`src/layouts/SideLessHome/index.tsx`のコンポーネントです。

では早速追加しましょう。

```TSX
// src/layouts/Home/index.tsx

import { Outlet } from "react-router-dom";

// DashboardHeaderをimport
import { DashboardHeader } from "../../templates/DashboardHeader";

export const HomeLayout = () => {
  return (
    <div>
      {/*
        DashboardHeaderコンポーネントを表示する
      */}
      <DashboardHeader />

      <Outlet />
    </div>
  );
};
```

```TSX
// src/layouts/SideLessHome/index.tsx

import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";

export const SideLessHomeLayout = () => {
  return (
    <div>
      {/*
        DashboardHeaderコンポーネントを表示する
      */}
      <DashboardHeader />

      <Outlet />
    </div>
  );
};
```

これで、`npm start`をして画面を表示してみましょう。

![Header left side](https://github.com/Hiro-mackay/react-bootcamp/blob/898fda0d5e492dcca294acefbd54b01c4bc694a2/assets/header_left_side.png?raw=true)

`HomeLayout`と`SideLessHomeLayout`が指定してある URL では Header が表示されているはずです！

ここで、全体的に左によっていますね。

中央にバランスよく表示されるようにしましょう。

```TS
// src/templates/DashboardHeader/style.ts

import { makeStyles } from "@material-ui/core";

// カスタム用のCSSを生成してくれる、@material-uiの機能
export default makeStyles({
  // 追加
  between: {
    justifyContent: "space-between",
  },

  // 追加
  flex: {
    display: "flex",
  },

  logo: {
    width: 100,
    display: "flex",
    alignItems: "center",

    // 追加
    marginLeft: 10,
  },
  profileIcon: {
    padding: 0,
    width: 44,
    height: 44,

    // 追加
    marginLeft: 10,
  },
});
```

```TSX
// src/templates/DashboardHeader/index.tsx

import { AppBar, Avatar, Grid, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../compoennts/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";

export const DashboardHeader = () => {
  const styles = useStyles();

  return (
    <AppBar elevation={0} color="inherit">
      {/*
        <Toolbar>に"between"のCSSを追加
      */}
      <Toolbar className={styles.between}>
        {/*
          <IconButton>とLogoを<div>で囲み、<div>にflexを付与
        */}
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>

        <SearchBar />

        {/*
          2つの<IconButton>を<div>で囲み、<div>にflexを付与
        */}
        <div className={styles.flex}>
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

![Header Completed](https://github.com/Hiro-mackay/react-bootcamp/blob/898fda0d5e492dcca294acefbd54b01c4bc694a2/assets/header_completed.png?raw=true)

[ここまでのソースコードはこちらから](https://github.com/Hiro-mackay/react-bootcamp/tree/15b65bca5956cae6193b9e07ebc5f29771b31ba1)

## Sidebar のデザイン作成

続いて、`Sidebar`のデザインです。

`Sidebar`のデザインはとても簡単に作成することができます。

まずは、`Sidebar`の一番元となるコンポーネントを作成していきます。

```TSX
// src/templates/Sidebar/index.tsxを作成
// Sidebarもロジックを含んだコンポーネントなため、`templates`以下にコンポーネントを作成します。

export const Sidebar = () => {
  return <div>Sidebar</div>;
};
```

`<div>`のみを返すコンポーネントを作成しました。

`Material-UI`では、今回のようなサイドバーのコンポーネントを簡単に実装できそうなコンポーネントが用意されています。

[Meterial-UI のサイドバーコンポーネント](https://material-ui.com/components/lists/#lists)

上記の`Lists`コンポーネントを使用して、`Sidebar`のデザインをさらっと作ってしまいましょう。

まずは、`Sidebar`コンポーネントを画面に表示するところから初めましょう。

```TSX
// src/layouts/Home/index.tsx

import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";

// Sidebarコンポーネントをimport
import { Sidebar } from "../../templates/Sidebar";

export const HomeLayout = () => {
  return (
    <div>
      <DashboardHeader />

      {/*
        Sidebarコンポーネントを表示する
      */}
      <Sidebar />

      <Outlet />
    </div>
  );
};
```

これで、画面に「Sidebar」という文字列が表示されれば成功ですが...画面を見てみると何も表示されていませんね。

![not view siderbar](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/not_view_sidebar.png?raw=true)

これはなぜかという、`Header`コンポーネントのせいで、`Sidebar`コンポーネントが隠されてしまっているせいです。

![Sidebar hidden in header](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/sidebar_hidden_in_header.png?raw=true)

これを解決するために、`Layout`のスタリングを調整します。

```TS
// src/layouts/Home/style.ts
import { makeStyles } from "@material-ui/core";

// 使いまわせるように、`Header`コンポーネントの'height'を定数化
const APP_BAR = 64;

export default makeStyles({
  // サイドバーの上部にAPP_BAR分のpaddingを表示
  sidebar: {
    paddingTop: APP_BAR,
  },
  // メインコンポーネントの上部にAPP_BAR分のpaddingを表示
  main: {
    paddingTop: APP_BAR + 30,
  },
});
```

`HomeLayout`に反映させましょう。

```TSX
// src/layouts/Home/index.tsx

import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";
import { Sidebar } from "../../templates/Sidebar";
import useStyles from "./style";

export const HomeLayout = () => {
  const styles = useStyles();
  return (
    <div>

      <DashboardHeader />

      {/*
        Sidebarコンポーネントにスタイルを反映させる
      */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/*
        メインコンポーネントにスタイルを反映させる
      */}
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
```

隠れていた要素が画面表示されました。

![padding top component](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/padding_top_component.png?raw=true)

しかし、今のままでは、`Sidebar`とメインコンポーネントが横並びになったデザインになっていません。

横並びにしていきましょう。

```TS
// src/layouts/Home/style.ts

import { makeStyles } from "@material-ui/core";

// Sidebarの幅を固定
const SIDEBAR_WIDTH = 240;

const APP_BAR = 64;

export default makeStyles({
  // 横並び
  flex: {
    display: "flex",
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
```

横並びにさせるスタリングを反映させます。

```TSX
// src/layouts/Home/index.tsx

import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";
import { Sidebar } from "../../templates/Sidebar";
import useStyles from "./style";

export const HomeLayout = () => {
  const styles = useStyles();
  return (
    <div>

      <DashboardHeader />

      {/*
        Sidebarとメインコンポーネントを囲む<div>を作成し、Sidebarとメインコンポーネントを横並びにする
      */}
      <div className={styles.flex}>

        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.main}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};
```

横並びになりましたね。

![Flex main style](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/flex_main_style.png?raw=true)

それでは、レイアウトが調整できたことなので、`Sidebar`コンポーネントのデザインをしていきましょう。

```TSX
// src/templates/Sidebar/index.tsx

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

export const Sidebar = () => {
  return (
    <List component="nav">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItem>
    </List>
  );
};
```

今回は、`Materil-UIのドキュメント`に記載されているサンプルをただそのままコピペし、必要な情報を変更しただけです。

これだけですでに、もうデザインが完成されそうですね！

もう少しだけ、デザインを洗練させましょう。

サイドバーの背景に「ホワイト」を指定しましょう。

```TS
// src/templates/Sidebar/style.ts

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    backgroundColor: "#ffffff",
  },
});
```

```TSX
// src/templates/Sidebar/index.tsx

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import useStyles from "./style";

export const Sidebar = () => {
  const styles = useStyles();

  return (
    // スタイルを指定
    <List className={styles.root} component="nav">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItem>

      {/*
        残りのSidebarのコンテンツを追加
      */}
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

もう一度画面表示をしてみましょう。

![Not enough sidebar](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/not_enough_sidebar.png?raw=true)

サイドバーの高さが足りません。

これは由々しき事態です。

これを解決するためには、まず、このアプリケーション全体の CSS を調整する必要があります。

以下のように特殊なグローバルスタリングとして`GlobalStyle.ts`を作成してください。

```TS
// src/GlobalStyle.tsを作成
// GlobalStyle.tsのコード
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

```

そして、この GlobaStyle を、`src/index.tsx`に追加します。

```TSX
// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

// 先程のグローバルスタイルをimport
import GlobalStyle from "./GlobalStyle";


const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />

        {/*
          アプリ全体の特殊なグローバルスタリング
        */}
        <GlobalStyle />

        <RootRouter />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

```

これで、アプリ全体に`height`が指定され、画面サイズいっぱいの高さの要素を置けるようになりました。

これに合わせて、`HomeLayout`の構造を少しだけ調整します。

```TS
// src/layouts/Home/style.ts

import { makeStyles } from "@material-ui/core";

const SIDEBAR_WIDTH = 240;
const APP_BAR = 64;

export default makeStyles({
  // flexというスタリングを「root」に変更。
  // flexとminHeight:100%を指定する
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
```

```TSX
// src/layouts/Home/index.tsx

import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";
import { Sidebar } from "../../templates/Sidebar";
import useStyles from "./style";

export const HomeLayout = () => {
  const styles = useStyles();
  return (

    // 一番上位の<div>に対して"root"スタリングを指定
    // 今ままで`<div className={styles.flex}>`としていた要素は削除
    <div className={styles.root}>

      <DashboardHeader />

      {/*
        `<div className={styles.flex}>`としていた要素は削除
      */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
```

そして、最後に、`Sidebar`コンポーネントのスタリングを完成させましょう。

```TSX
// src/templates/Sidebar/style.ts

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    backgroundColor: "#ffffff",

    // minHeight: 100%を指定して、高さを画面いっぱいにする
    minHeight: "100%",
  },
});
```

これで`Sidebar`のデザインが完成しました。

![Sidebar completed](https://github.com/Hiro-mackay/react-bootcamp/blob/056d54efd1f5eae35f23b6b8a647e1242b2251a1/assets/sidebar_completed.png?raw=true)

## ビデオカードのデザイン作成

次はビデオカードのデザインをしていきます。

ビデオカードとは何かというと、これです。

![React Youtube Home Card](https://github.com/Hiro-mackay/react-bootcamp/blob/155a6ac3238de53e3c3ca1caad89945f3aede1d1/assets/youtube_home_card.png?raw=true)

動画のサムネイルとタイトルと説明を表示するビューです。

では、早速コンポーネントを作っていきましょう。

今回、ビデオカードはロジックを含まないコンポーネントとして、`components`に格納していきます。

ビデオカードに必要なデータは、親コンポーネントから渡してもらう形にして、ビデオカードは、そのデザインにのみ役割を持つようにします。

また、ビデオカードのデザインに使われているサムネイル付きの Card コンポーネントは`Material-UI`に用意されています。

[Materil-UI カードコンポーネント](https://material-ui.com/components/cards/#card)

これを少し調子するだけですぐにデザインが完成しそうです。

```TSX
// src/compoennts/VideoCard/index.tsxを作成
// index.tsxのコード

import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle } from "./HeaderTitle";
import { SubHeaderContent } from "./SubHeaderContent";


export const VideoCard = () => {
  return (
    // elevation={0} : Cardの影を削除する
    // square : 丸みの除去
    <Card elevation={0} square>

      {/*
        サムネイルの表示
        今回はno-image.jpgという画像を作成し、デフォルトのサムネイルとした。
        このno-image.jpgを使いたい方は、/public/staticから自由にダウンローそしてください。
      */}
      <CardMedia
        image="/static/no-image.jpg"
        title="Thumbnail"
      />

      {/*
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        avatar={<Avatar />}
        title="Organization Admin Settings: Dashboard overview [1/7]"
        subheader="Figma 16K views  2 months ago"
      />
    </Card>
  );
};
```

この`<VideoCard>`を画面表示できるようにしたいのですが、今のままでは画面に表示することはできません。

ページを表示するコンポーネントから`<VideoCard>`を呼び出しましょう。

まずは、`pages`というディレクトリに、`Home`というコンポーネントを作成します。

```TSX
// src/pages/Home/index.tsxを作成

// VideoCardをimport
import { VideoCard } from "../../compoennts/VideoCard";

export const Home = () => {
  // VideoCardコンポーネントを表示する
  return <VideoCard />;
};
```

そしてこのコンポーネントを`/`から呼び出せるようにしましょう。

```TSX
// src/Route.tsx

import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";

// 先程のHomeコンポーネントをimport
import { Home } from "./pages/Home";

export const RootRouter = () => {
  return useRoutes([
    {
      element: <HomeLayout />,

      // "element"に<Home />を指定して、URL`/`にアクセスした時にどのコンポーネントを呼び出すか指定します。
      children: [{ path: "/", element: <Home /> }],
    },

    {
      element: <SideLessHomeLayout />,

      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videId", element: <div>watch</div> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <div>ログイン</div> },
        { path: "signup", element: <div>新規作成</div> },
        { path: "forget", element: <div>パスワードリセット</div> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};
```

画面表示をしてみると、一応、画面表示されました。

しかし、デザインとはかけ離れていますね。

![Video Card miss](https://github.com/Hiro-mackay/react-bootcamp/blob/4fe016b02d130f2772ad631daefc45293628188e/assets/video_caed_miss.png?raw=true)

スタリング で調整してきましょう。

```TS
// src/compoennts/VideoCard/style.tsを作成
// style.tsのコード

import { makeStyles } from "@material-ui/core";

export default makeStyles({
  // カードの最大サイズを指定。
  // 背景色を除去
  root: {
    maxWidth: 360,
    backgroundColor: "transparent",
  },

  // 16:9の解像度のサムネイル画像を表示させる。
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  // 背景色と両サイドのpadding を削除。
  // また、ユーザーのサムネイルの位置を上端に合わせる。
  header: {
    alignItems: "start",
    backgroundColor: "transoparent",
    paddingLeft: 0,
    paddingRight: 0,
  },
});
```

スタリングを反映させていきます。

```TSX
// src/compoennts/VideoCard/index.tsx

import { Avatar, Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle } from "./HeaderTitle";
import { SubHeaderContent } from "./SubHeaderContent";
import useStyles from "./style";

export const VideoCard = () => {
  // スタイルの作成
  const styles = useStyles();

  return (
    // styles.rootを指定
    <Card className={styles.root} elevation={0} square>

      {/*
        styles.mediaを指定
      */}
      <CardMedia
        className={styles.media}
        image="/static/no-image.jpg"
        title="Thumbnail"
      />

      {/*
        styles.headerを指定
      */}
      <CardHeader
        className={styles.header}
        avatar={<Avatar />}
        title="Organization Admin Settings: Dashboard overview [1/7]"
        subheader="Figma 16K views  2 months ago"
      />
    </Card>
  );
};
```

ここまでで、カード自体のデザインはいい感じになりました。

![Video card design](https://github.com/Hiro-mackay/react-bootcamp/blob/4fe016b02d130f2772ad631daefc45293628188e/assets/video_caed_design.png?raw=true)

しかし、今のままでは、`VideoCard`が増えた時にときにデザイン通りの表示ができません。

```TSX
import { VideoCard } from "../../compoennts/VideoCard";

export const Home = () => {
  return (
    <div>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>
  );
};
```

このカードを横並びに表示できるようにしましょう。

`Material-UI`の使うコンポーネントは、`Grid`というコンポーネントを使用します。

[Materil-UI Grid コンポーネント](https://material-ui.com/components/grid/)

```TSX
// src/pages/Home/index.tsx

import { Grid } from "@material-ui/core";
import { VideoCard } from "../../compoennts/VideoCard";

export const Home = () => {
  return (
    // 横並びにしたいコンポーネントを全てを囲むように<Grid>を配置
    // このGridには"container"というプロパティを指定する
    // containerの指定がない場合、他のコードが合っていても横並び表示はされない。
    <Grid container spacing={2}>

      {/*
        横並びにしたいコンポーネントの一つ一つを<Grid>で囲む
        こちらのGridでは、itemプロパティを指定する。
        全部を囲む<Grid container>の中にそれぞれの横並び要素の<Grid item>があるイメージ
      */}
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
  );
};

```

無事、横並び表示ができました。

![Grid card](https://github.com/Hiro-mackay/react-bootcamp/blob/4fe016b02d130f2772ad631daefc45293628188e/assets/grid_card.png?raw=true)

しかし、よく見ると`Sidebar`のデザインが崩れており、横並びのデザインの両端が窮屈です。

このような時は、`Container`コンポーネントを使って最後の仕上げをしていきます。

```TSX
// src/pages/Home/index.tsx

import { Container, Grid } from "@material-ui/core";
import { VideoCard } from "../../compoennts/VideoCard";

export const Home = () => {
  return (
    // 全ての要素をContainerで囲むことで、デザインが「整う」
    <Container>

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
```

ここまでで、本当にそれっぽいデザインに仕上がってきました！！

![VideoCard Completed](https://github.com/Hiro-mackay/react-bootcamp/blob/4fe016b02d130f2772ad631daefc45293628188e/assets/videocard_completed.png?raw=true)

## 動画再生画面のデザイン作成

## 動画アップロード画面のデザイン作成

## 認証画面のデザイン作成
