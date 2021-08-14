import { Outlet } from "react-router-dom";

export const SideLessHomeLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
};
