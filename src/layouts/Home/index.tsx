import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";

export const HomeLayout = () => {
  return (
    <div>
      {/* 
        DashboardHeaderコンポーネントを表示する
      */}
      <DashboardHeader />
      {/* 
        <Outlet />を配置した箇所に、childrenコンポーネントが展開される
        childrenコンポーネントとは、Route.tsx内でchildren>elementで指定したコンポーネントである
      */}
      <Outlet />
    </div>
  );
};
