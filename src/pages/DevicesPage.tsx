import { motion } from "framer-motion";
import { Lightbulb, Power, WifiOff, MapPin, Search, Filter, MoreVertical, Signal } from "lucide-react";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

type DeviceStatus = "online" | "offline" | "warning";

interface Device {
  id: string;
  name: string;
  zone: string;
  status: DeviceStatus;
  brightness: number;
  power: number;
  type: string;
  signal: number;
}

const devices: Device[] = [
  { id: "L001", name: "主干道灯杆-001", zone: "A区", status: "online", brightness: 85, power: 120, type: "LED路灯", signal: 92 },
  { id: "L002", name: "主干道灯杆-002", zone: "A区", status: "online", brightness: 85, power: 118, type: "LED路灯", signal: 88 },
  { id: "L003", name: "商业街景观灯-01", zone: "B区", status: "online", brightness: 100, power: 60, type: "景观灯", signal: 95 },
  { id: "L004", name: "公园步道灯-01", zone: "C区", status: "warning", brightness: 60, power: 45, type: "庭院灯", signal: 45 },
  { id: "L005", name: "住宅区灯杆-001", zone: "D区", status: "offline", brightness: 0, power: 0, type: "LED路灯", signal: 0 },
  { id: "L006", name: "工业园高杆灯-01", zone: "E区", status: "online", brightness: 90, power: 250, type: "高杆灯", signal: 78 },
  { id: "L007", name: "商业街投光灯-01", zone: "B区", status: "online", brightness: 100, power: 80, type: "投光灯", signal: 91 },
  { id: "L008", name: "公园草坪灯-01", zone: "C区", status: "online", brightness: 50, power: 15, type: "草坪灯", signal: 82 },
  { id: "L009", name: "住宅区灯杆-002", zone: "D区", status: "online", brightness: 70, power: 100, type: "LED路灯", signal: 86 },
  { id: "L010", name: "应急照明灯-001", zone: "A区", status: "online", brightness: 0, power: 0, type: "应急灯", signal: 99 },
  { id: "L011", name: "工业园泛光灯-01", zone: "E区", status: "online", brightness: 95, power: 200, type: "泛光灯", signal: 73 },
  { id: "L012", name: "隧道灯-001", zone: "A区", status: "warning", brightness: 40, power: 180, type: "隧道灯", signal: 55 },
];

const statusConfig: Record<DeviceStatus, { label: string; dot: string; bg: string }> = {
  online: { label: "在线", dot: "bg-success glow-dot", bg: "bg-success/10" },
  offline: { label: "离线", dot: "bg-muted-foreground", bg: "bg-muted/40" },
  warning: { label: "告警", dot: "bg-warning glow-dot", bg: "bg-warning/10" },
};

const DevicesPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DeviceStatus | "all">("all");

  const filtered = devices.filter((d) => {
    if (filter !== "all" && d.status !== filter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.id.includes(search)) return false;
    return true;
  });

  const counts = {
    all: devices.length,
    online: devices.filter((d) => d.status === "online").length,
    offline: devices.filter((d) => d.status === "offline").length,
    warning: devices.filter((d) => d.status === "warning").length,
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1 bg-muted/50 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
            placeholder="搜索设备名称或编号..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {(["all", "online", "warning", "offline"] as const).map((s) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {s === "all" ? "全部" : statusConfig[s].label} ({counts[s]})
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Device Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-4 gap-4">
        {filtered.map((d) => {
          const sc = statusConfig[d.status];
          return (
            <motion.div key={d.id} variants={item} className="glass-card p-4 hover:glow-box transition-shadow duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sc.bg}`}>
                  {d.status === "offline" ? (
                    <WifiOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Lightbulb className={`w-5 h-5 ${d.status === "warning" ? "text-warning" : "text-primary"}`} />
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                  <span className="text-xs text-muted-foreground">{sc.label}</span>
                </div>
              </div>
              <h4 className="font-medium text-sm text-foreground truncate">{d.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{d.type} · {d.id}</p>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {d.zone}
              </div>

              {d.status !== "offline" && (
                <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">亮度</p>
                    <p className="font-display font-semibold text-sm text-foreground">{d.brightness}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">功率</p>
                    <p className="font-display font-semibold text-sm text-foreground">{d.power}W</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">信号</p>
                    <div className="flex items-center justify-center gap-0.5">
                      <Signal className={`w-3 h-3 ${d.signal > 70 ? "text-success" : d.signal > 40 ? "text-warning" : "text-destructive"}`} />
                      <span className="font-display font-semibold text-sm text-foreground">{d.signal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Brightness bar */}
              {d.status !== "offline" && (
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.brightness}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default DevicesPage;
