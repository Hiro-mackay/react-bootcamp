# ReactBootcamp 第一回勉強会後の開発ドキュメント

## 次回までの目標

- [ ] React の環境を構築し、React の使い方を掴む

## 今週のやることリスト

- [ ] PC に React の開発環境を構築する
- [ ] エディタをインストール（VS code 推奨）
- [ ] React プロジェクトの作成
- [ ] React を起動してみる
- [ ] React のソースコードを書いてみる

# ReactBootcamp 第一回目勉強会ドキュメント

以下から実際に、手を動かしながら React の環境を整えていきます。

## PC に React の環境を構築する

<details>
<summary>Mac OSの方はこちら</summary>

---

### MacOS の方は、以下のパッケージをにインストールすることで、簡単に React の環境を構築することができます。

- Homebrew (Mac に色々なパッケージをインストールし、管理できる)
- Nodebrew (Node.js をインストールし、バージョン管理できる)
- node.js (Nodebrew を通してインストール)
  - npm (上記インストールで自動でインストール)

#### 1. `Homebrew`のインストール

`Homebrew`をインストールするためにはターミナルでコマンドを入力し、インストールを行います。

まずは、ターミナルを起動しましょう。（ターミナルの起動方法がわからない場合は、ググりましょう！！）

起動したターミナルに、そのまま以下のコマンドを入力して、Enter で実行します。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> `Press RETURN to continue or any other key to abort`というテキストが表示されている場合は、そのままターミナルに Mac のパスワードを入力して Enter でインストールが再開します。

このコマンドは、[Hombrew の公式サイト](https://brew.sh/)から入手することができます。

このインストールは、時間がかかりますが、気長に待ちましょう。

Xcode の command linet tool が必要になりますが、これもインストールの中に自動でインストールしてくれるはずなので、待ちましょう。

インストールが終わったら、同じくターミナル画面内にて、以下のコマンドを入力してテキストが表示されるか確認してください。

```
#コマンド
brew -v

#出力
Homebrew 3.0.11
Homebrew/homebrew-core (git revision 5ec34e181d; last commit 2021-04-06)
```

インストール時期によって、バージョンが違うかもしれませんが、バージョン情報が表示されていれば問題ありません。

### 2.`Nodebrew`のインストール

続いて、`Node.js`をインストール/管理するためのパッケージ`Nodebrew`をインストールします。

同じくターミナル上で、以下のコマンドを入力し、`Nodebrew`をインストールします。

```
brew install nodebrew
```

> エラー等でインストールができない時は、エラー文をまずは読んでみましょう。Homebrew が正しくインストールされていなかったりするかもしれません。

インストールが完了したら、Nodebrew が正しくインストールされているか確認しましょう。

```
#コマンド
nodebrew -v

#出力
nodebrew 1.0.1

Usage:
    nodebrew help                         Show this message
    nodebrew install <version>            Download and install <version> (from binary)
    nodebrew compile <version>            Download and install <version> (from source)
    nodebrew install-binary <version>     Alias of `install` (For backward compatibility)
    nodebrew uninstall <version>          Uninstall <version>
    nodebrew use <version>                Use <version>
    nodebrew list                         List installed versions
    nodebrew ls                           Alias for `list`
    nodebrew ls-remote                    List remote versions
    nodebrew ls-all                       List remote and installed versions
    nodebrew alias <key> <value>          Set alias
    nodebrew unalias <key>                Remove alias
    nodebrew clean <version> | all        Remove source file
    nodebrew selfupdate                   Update nodebrew
    nodebrew migrate-package <version>    Install global NPM packages contained in <version> to current version
    nodebrew exec <version> -- <command>  Execute <command> using specified <version>
```

Usage に表示されてるコマンドは、`nodebrew`で使用できるコマンドです。

例えば、`nodebrew help`とコマンドに入力すると、`nodebrew`のヘルプを見ることができます。

### 3.`Node.js`のインストール

さあ、いよいよ`Node.js`のインストールです。

`Node.js`のインストールが完了すれば、いつでもどこでも React のアプリケーションを開発することができます。

> React は PC 上で、Node.js を使って様々な処理を行います。そのため、PC に Node.js さえインストールすることができれば、React の開発を行うことができます。

`Node.js`のインストールは以下のコマンドで行います。

```
#今回は最新版v16.6.1の`Node.js`をインストールします。
nodebrw install v16.6.1
```

`Node.js`のインストールが完了したら、以下のコマンドで指定のバージョンの`Node.js`がインストールされているか確認します。

```
#コマンド
node -v

#出力
v16.6.1
```

また、`Node.js`をインストールすると勝手に`npm`と言うパッケージがインストールされます。

こちらは React 開発で非常に重要なパッケージですので合わせて確認しましょう。

```
#コマンド
npm -v

#出力
7.20.3
```

こちらは与太話ですが、以下のコマンドを入力するとインストール済みの`Node.js`のバージョンが表示されます。

```
#コマンド
nodebrew list

#出力
v14.15.5
v15.5.1
v15.8.0
v15.11.0
v16.6.1

current: v16.6.1
```

このように`Nodebrew`では、複数の`Node.js`のバージョンをまとめて管理することができます。

私の場合は、v14~v15 まで過去にインストールしたことがある`Node.js`のバージョンが表示されています。

そのなかで、今は`v16.6.1`の`Node.js`を使用しているので、`current`という項目が`v16.6.1`となっています。

もし、バージョンを変更したい場合は、以下のコマンドで変更することができます。

```
#コマンド
nodebrew use <Node.jsのバージョン>

#出力
use <Node.jsのバージョン>
```

ちなみに、`Nodebrew`でインストールできるバージョンは以下のコマンドで確認することができます。

```
#コマンド
nodebrew ls-remote

#出力
v0.0.1    v0.0.2    v0.0.3    v0.0.4    v0.0.5    v0.0.6

v0.1.0    v0.1.1    v0.1.2    v0.1.3    v0.1.4    v0.1.5    v0.1.6    v0.1.7
v0.1.8    v0.1.9    v0.1.10   v0.1.11   v0.1.12   v0.1.13   v0.1.14   v0.1.15
v0.1.16   v0.1.17   v0.1.18   v0.1.19   v0.1.20   v0.1.21   v0.1.22   v0.1.23
v0.1.24   v0.1.25   v0.1.26   v0.1.27   v0.1.28   v0.1.29   v0.1.30   v0.1.31
v0.1.32   v0.1.33   v0.1.90   v0.1.91   v0.1.92   v0.1.93   v0.1.94   v0.1.95
v0.1.96   v0.1.97   v0.1.98   v0.1.99   v0.1.100  v0.1.101  v0.1.102  v0.1.103
v0.1.104
.
.
.
```

</details>

<details>
<summary>WindowsOSの方はこちら</summary>

---

### WindowsOS の方は、以下のパッケージをにインストールすることで、簡単に React の環境を構築することができます。

- Nodist (Node.js のインストール/管理ツールです)
- node.js (Nodist を通してインストール)
  - npm (上記インストールで自動でインストール)

### 1.`Nodist`のインストール

下記の URL にアクセスして、`NodistSetup`をダウンロードします。

[Nodist - Github](https://github.com/nullivex/nodist/releases)

2021/08/07 現在、`v0.9.1`が最新バージョンですので、`NodistSetup-v0.9.1.exe`をクリックしてダウンロードします。

ダウンロードした`exe`ファイルを起動し、`Nodist`をインストール。

デフォルトのインストール先を指定し、インストールが完了したら OS を再起動します。

インストールが完了したか確認します。

コマンドプロンプトを起動しましょう。（起動の仕方がわからない場合は、ググりましょう！！）

コマンドプロンプトが開いたら、以下のコマンドを入力して`Nodist`がインストールされているか確認します。

```
#コマンド
nodist -v

#出力
0.9.1
```

### 2.`Node.js`のインストール

さあ、いよいよ`Node.js`のインストールです。

`Node.js`のインストールが完了すれば、いつでもどこでも React のアプリケーションを開発することができます。

> React は PC 上で、Node.js を使って様々な処理を行います。そのため、PC に Node.js さえインストールすることができれば、React の開発を行うことができます。

`Node.js`のインストールは以下のコマンドで行います。

```
#今回は最新版v16.6.1の`Node.js`をインストールします。
nodist + 16.6.1
```

`Node.js`のインストールが完了したら、以下のコマンドで指定のバージョンの`Node.js`がインストールされているか確認します。

```
#コマンド
node -v

#出力
16.6.1
```

また、Javascript のアプリ開発で欠かせない`npm`と言うパッケージをインストールします。
こちらは React 開発で非常に重要なパッケージです。

```
nodist npm 7.20.3
```

合わせて、開発が便利になる`npx`と言うパッケージもインストールします。

```
npm i -g npx
```

以下のコマンドで、`npm`がインストールされているか確認します。

```
#コマンド
npm  -v

#出力
7.20.3
```

</details>

## エディタをインストール

今回の ReactBootcamp は、VScode というエディタを使用している前提で開発を進めていきます。

もちろん、ご自身が普段使い慣れているエディタをご使用していただく分には問題ありません。

これからの勉強会で、VScode 特有の機能を用いた作業を行う可能性がありますので、VScode 以外のエディタをご使用の際は適宜、読み替えて頂きますようよろしくお願いします。

以下のリンクから VScode のインストらーをダウンロードします。

[VScode インストーラー](https://code.visualstudio.com/#alt-downloads)

ダウンロードが完了したら、インストーラーを起動し、指示に通りにインストールを行います。

## React プロジェクトの作成

さあそれでは、いよいよ ReactBootcamp で開発を行うアプリケーションのプロジェクトを作成しましょう。

React のプロジェクトフォルダーを作る方法は極めて簡単です。

以下のコマンドを、プロジェクトを作成したい任意の場所で入力するだけです。

ターミナル（もしくはコマンドプロンプト）上で、以下のコマンドを入力して、プロジェクトを作成しましょう。

```
#プロジェクトを作成したいディレクトリ(今回は”desktop”)の階層に移動
cd desktop

#Reactプロジェクトの作成
npx create-react-app reactbootcamp-youtube --template typescript
```

> npx : `create-react-app`を実行するために必要なコマンド  
> create-react-app : React のプロジェクトを勝手に作ってくれる魔法のコマンド  
> reactbootcamp-youtube : プロジェクト名、任意のプロジェクト名を入力するとディレクトリの名前になる  
> --template : `create-react-app`で作成するプロジェクトのテンプレートをカスタマイズする  
> typescript : 今回は`create-react-app`に対して、typescript と言うカスタムテンプレートを指定

`npx ~~`のコマンド一文で簡単に React の開発に必要な環境を全て構築することができます。

実は、React のアプリケーションを起動する準備は全て整いました。

次項で、今作った React プロジェクトを起動してみましょう。

## React を起動してみる

React の起動も、作成と同じくターミナル（コマンドプロンプト）で行います。

先ほどのターミナル（コマンドプロンプト）から、まずは作成したプロジェクトのディレクトリに移動します。

```
cd reactbootcamp-youtube
```

> ターミナルを閉じしまった場合は、もう一度起動して `cd desktop/reactbootcamp-youtube`で移動できます。

それでは起動用のコマンドを入力しましょう

```
#コマンド
npm run start

#出力
Compiled successfully!

You can now view youtube in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.100.145:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

上記の出力が出れば成功です。

お使いの Web ブラウザで、`http://localhost:3000` にアクセスしてみください。

以下のような画面が表示されるはずです。

![React starter]()

この画面が表示されている間は、`npm run start`で PC にローカルサーバーが起動されている状態です。

ローカルサーバーを停止したい場合は、ターミナル(コマンドプロンプト)上で以下のキーボードショーカットを入力してください。

Mac: `Control(^)` + c

Windows: `Ctrl` + c

## React のソースコードを書いてみる

それでは、無事、React の起動ができたので、少しだけ React のソースコードを触ってみましょう。

現在`reactbootcamp-youtube`のフォルダの階層は以下のようになっています。

```
reactbootcamp-youtube
├── README.md
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
└── tsconfig.json
```

React のアプリケーション開発で主にソースコードを書いていくのは、`src`以下のファイルになります。

では、`src`ディレクトリの中身を見ていきましょう。

```
src
├── App.css
├── App.test.tsx
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts
```

様々なファイルが用意されていますが、ここで重要なファイルは 2 つのみです。

```
├── App.tsx
├── index.tsx
```

この二つのファイルの中身を見ていきましょう。

まずは、コードを見るために、`reactbootcamp-youtube`のディレクトリを VScode で開きましょう。

> [VSCode でディレクトリを開く方法](https://qiita.com/daijiro_maeyama/items/fdb696d68beabb96f46d)

2 つのファイルはそれぞれ以下のようになっています。

```TSX:index.tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

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
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

「習うより慣れろ」と言うことで、まずはコードの説明よりも、コードを変更した結果の挙動を感じてもらおうと思います。

今回は、`App.tsx`のファイルを変更してみましょう、

`Edit <code>src/App.tsx</code> and save to reload.`と言う文と`Learn React`の文を変更してみましょう。

- `Edit <code>src/App.tsx</code> and save to reload.` → `ReactBootcamp Youtube App`
- `Learn React`→'第一回目勉強会'

変更後のソースコードはこちら

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

不変更したファイルを保存し、React アプリがどのように見え方が変わったか確認しましょう。

```
#ターミナル(コマンドプロンプト)でReactを起動
npm run start
```

`http://localhost:3000/`を見てみると、以下のように文字が変更されています。

![change text]()

`App.tsx`のファイルを変更したことによって、実際のアプリの表示も変更されたことが確認できました。

では、この`App.tsx`ファイルに書かれているソースコードは、どのようにして React アプリに反映されているのでしょうか？

その答えを知るためには、`index.tsx`ファイルを見る必要があります。

```TSX:index.tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

勘のいい人はお気づきかもしれませんが、明らかに`App`を呼び出していそうなコードがありますね。

そうです、`4行目`と`9行目`です。

では、この`index.tsx`の`9行目`のコードを削除してみましょう。

```TSX:index.tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

ファイルを保存して、もう一度、`http://localhost:3000/`を見ましょう。

> 開発中は、`npm run start`で起動したローカルサーバーを停止する必要はありません。変更したファイルを保存して、ブラウザをリロードすればすぐに変更が反映されます。

![ignore app component]()

今度は、真っ白な画面で何も表示されなくなりましたね。

React では、今変更を加えた`index.tsx`を基軸に全てのソースコードがアプリに反映されます。

逆に言うと、`index.tsx`から呼び出されないソースコードはいかなる方法を持ってしてもアプリに反映することはできません。

> 少し語弊がありますが、`index.tsx`が React アプリの基軸になるという理解をして頂ければ大丈夫です。

これからの 1 ヶ月間で、この`src`以下のディレクトリにソースコードを記述していき、Youtube アプリを完成させていきます。

---

今週は、React 自体もかなり軽めで説明をしました。

そのため、正確でない説明や、省略している情報などもあり、疑問がたくさん生まれたかと思います。

しかし、今回の ReactBootcamp はあくまで「完成」を最大のプライオリティとしており、その発展系として、より深いコードの理解をして頂ければと思っております。

それでは、次回の勉強会は`8/15(日) 18:00〜20:00`となっております。

次回は、本格的にアプリケーションの顔とも言うべき、デザインと React の View の設計について話していこうと思います。

今回の勉強会が、コンテンツ不足で少し物足りないと感じた方も、来週からはボリューミーな内容をお届けしますので、是非、来週の勉強会を楽しみにお待ちください。
