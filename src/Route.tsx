import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";

export const RootRouter = () => {
  return useRoutes([

    
    {
      element: <HomeLayout />,
      children: [{ path: "/", element: <div>Home</div> }],
    },

    {
      element: <SideLessHomeLayout />,
      children: [{ path: "watch/:videId", element: <div>watch</div> }],
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
