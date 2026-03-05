import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Lightbulb,
  Layers,
  CalendarClock,
  Zap,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";

const navItems = [
  { title: "总览", path: "/", icon: LayoutDashboard },
  { title: "设备管理", path: "/devices", icon: Lightbulb },
  { title: "场景模式", path: "/scenes", icon: Layers },
  { title: "定时策略", path: "/schedules", icon: CalendarClock },
  { title: "能耗分析", path: "/energy", icon: Zap },
  { title: "数据报表", path: "/reports", icon: BarChart3 },
  { title: "告警中心", path: "/alerts", icon: Shield },
  { title: "系统设置", path: "/settings", icon: Settings },
];

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full glass-card rounded-none border-x-0 border-t-0">
      <div className="flex items-center h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-8 shrink-0">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center glow-box">
            <Lightbulb className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight tracking-tight text-foreground">
              LumiCore
            </span>
            <span className="text-[10px] text-muted-foreground leading-none tracking-widest uppercase">
              智慧照明平台
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative"
              >
                <motion.div
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "nav-item-active text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  <span>{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 rounded-lg nav-item-active -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
