import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import GlobalStyle from "./GlobalStyle";

// Material-UIの「テーマ」を作成する。
// Material-UIをカスタマイズする際には、createThemeの引数にカスタマイズ項目を渡す。
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

        {/* 
          アプリ全体の特殊なグローバルスタリング
        */}
        <GlobalStyle />

        {/* 
          ルーティング用のメインコンポーネント
        */}
        <RootRouter />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
