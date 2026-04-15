import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import techBg from "@/assets/tech-bg.jpg";

const AppLayout = () => {
  return (
    <div className="min-h-screen relative">
      {/* Tech background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${techBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Subtle overlay for readability */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, hsl(210 30% 97% / 0.75) 0%, hsl(200 40% 96% / 0.65) 50%, hsl(210 30% 97% / 0.7) 100%)",
        }}
      />
      <AppHeader />
      <main className="px-6 py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
