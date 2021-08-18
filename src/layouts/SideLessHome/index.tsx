import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../../templates/DashboardHeader";

// styleをimportし、
import useStyles from "./styles";

export const SideLessHomeLayout = () => {

  // スタイルを生成し、
  const styles = useStyles();

  return (

    // スタイルをあてる
    <div className={styles.root}>

      {/* 
        DashboardHeaderコンポーネントを表示する
      */}
      <DashboardHeader />
      {/* 
        <Outlet />を配置した箇所に、childrenコンポーネントが展開される
        childrenコンポーネントとは、Route.tsx内でchildren>elementで指定したコンポーネントである
      */}

      {/* 
        スタイルをあてる
      */}
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
