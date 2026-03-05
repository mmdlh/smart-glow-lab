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
  { title: "系统总览", path: "/", icon: LayoutDashboard },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40" style={{
      background: "linear-gradient(135deg, hsl(200 30% 98%) 0%, hsl(195 40% 96%) 50%, hsl(210 30% 97%) 100%)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 1px 24px hsl(190 85% 45% / 0.06), 0 1px 3px hsl(0 0% 0% / 0.04)",
    }}>
      <div className="flex items-center h-[68px] px-5">
        {/* Logo - wider & bolder */}
        <div className="flex items-center gap-3 mr-6 shrink-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center relative" style={{
            background: "linear-gradient(135deg, hsl(190 85% 45%), hsl(200 80% 50%), hsl(165 70% 42%))",
            boxShadow: "0 0 20px hsl(190 85% 45% / 0.3), 0 0 40px hsl(190 85% 45% / 0.1)",
          }}>
            <Lightbulb className="w-6 h-6 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl animate-pulse" style={{
              background: "linear-gradient(135deg, hsl(190 85% 55% / 0.3), transparent)",
            }} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl leading-tight tracking-tight" style={{
              background: "linear-gradient(135deg, hsl(190 85% 38%), hsl(210 80% 45%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              LumiCore
            </span>
            <span className="text-[10px] text-muted-foreground leading-none tracking-[0.2em] uppercase font-medium">
              Smart Lighting Platform
            </span>
          </div>
          {/* Divider */}
          <div className="ml-3 h-9 w-px" style={{
            background: "linear-gradient(180deg, transparent, hsl(190 85% 45% / 0.3), transparent)",
          }} />
        </div>

        {/* Navigation - stretched full width */}
        <nav className="flex-1 flex items-center gap-0.5">
          {navItems.map((navItem) => {
            const isActive = location.pathname === navItem.path;
            const Icon = navItem.icon;
            return (
              <NavLink
                key={navItem.path}
                to={navItem.path}
                className="flex-1 relative"
              >
                <motion.div
                  className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={isActive ? {
                    background: "linear-gradient(135deg, hsl(190 85% 45% / 0.1), hsl(165 70% 42% / 0.06))",
                    boxShadow: "0 0 16px hsl(190 85% 45% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.5)",
                  } : {}}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-primary drop-shadow-sm" : ""}`} />
                  <span className="whitespace-nowrap">{navItem.title}</span>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-px left-[15%] right-[15%] h-[2.5px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, hsl(190 85% 45%), hsl(165 70% 42%), transparent)",
                        boxShadow: "0 0 10px hsl(190 85% 45% / 0.5), 0 0 20px hsl(190 85% 45% / 0.2)",
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "hsl(190 85% 45%)",
                        boxShadow: "0 0 6px hsl(190 85% 55% / 0.6)",
                      }}
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
