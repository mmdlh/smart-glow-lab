import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

const AppLayout = () => {
  return (
    <div className="min-h-screen gradient-surface">
      <AppHeader />
      <main className="px-6 py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
