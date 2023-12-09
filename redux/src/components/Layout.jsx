import { Outlet } from "react-router-dom";
import Header  from "./Header";

export const Layout = () => {
  return (
    <div className="w-2/3 flex flex-col mx-auto mt-3">
      <Header />
      <div className="px-5 mt-4">
        <Outlet />
      </div>
    </div>
  );
};
