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
