import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="grid grid-cols-5 md:grid-cols-4 h-screen">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="col-start-2 col-span-4 p-6 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
