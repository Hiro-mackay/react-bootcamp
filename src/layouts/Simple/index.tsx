import { Outlet } from "react-router-dom";

export const SimpleLayout = () => {
  return (
    <div>
      <h1>Simple</h1>
      <Outlet />
    </div>
  );
};
