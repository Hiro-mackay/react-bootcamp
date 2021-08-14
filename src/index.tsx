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
