import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";
import { Sidebar } from "../../templates/Sidebar";
import useStyles from "./style";

export const HomeLayout = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      {/* 
        DashboardHeaderコンポーネントを表示する
      */}
      <DashboardHeader />

      {/* 
        Sidebarコンポーネント
      */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* 
        メインコンポーネント
      */}
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
