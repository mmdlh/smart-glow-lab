import { motion } from "framer-motion";
import { Lightbulb, Power, WifiOff, MapPin, Search, Signal, Thermometer, Clock, Battery } from "lucide-react";
import { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";

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
  temp: number;
  runtime: number;
}

const devices: Device[] = [
  { id: "L001", name: "主干道灯杆-001", zone: "A区", status: "online", brightness: 85, power: 120, type: "LED路灯", signal: 92, temp: 42, runtime: 2840 },
  { id: "L002", name: "主干道灯杆-002", zone: "A区", status: "online", brightness: 85, power: 118, type: "LED路灯", signal: 88, temp: 40, runtime: 2840 },
  { id: "L003", name: "商业街景观灯-01", zone: "B区", status: "online", brightness: 100, power: 60, type: "景观灯", signal: 95, temp: 35, runtime: 1560 },
  { id: "L004", name: "公园步道灯-01", zone: "C区", status: "warning", brightness: 60, power: 45, type: "庭院灯", signal: 45, temp: 58, runtime: 3200 },
  { id: "L005", name: "住宅区灯杆-001", zone: "D区", status: "offline", brightness: 0, power: 0, type: "LED路灯", signal: 0, temp: 0, runtime: 0 },
  { id: "L006", name: "工业园高杆灯-01", zone: "E区", status: "online", brightness: 90, power: 250, type: "高杆灯", signal: 78, temp: 55, runtime: 1980 },
  { id: "L007", name: "商业街投光灯-01", zone: "B区", status: "online", brightness: 100, power: 80, type: "投光灯", signal: 91, temp: 48, runtime: 1200 },
  { id: "L008", name: "公园草坪灯-01", zone: "C区", status: "online", brightness: 50, power: 15, type: "草坪灯", signal: 82, temp: 28, runtime: 4100 },
  { id: "L009", name: "住宅区灯杆-002", zone: "D区", status: "online", brightness: 70, power: 100, type: "LED路灯", signal: 86, temp: 38, runtime: 2600 },
  { id: "L010", name: "应急照明灯-001", zone: "A区", status: "online", brightness: 0, power: 0, type: "应急灯", signal: 99, temp: 22, runtime: 0 },
  { id: "L011", name: "工业园泛光灯-01", zone: "E区", status: "online", brightness: 95, power: 200, type: "泛光灯", signal: 73, temp: 52, runtime: 1800 },
  { id: "L012", name: "隧道灯-001", zone: "A区", status: "warning", brightness: 40, power: 180, type: "隧道灯", signal: 55, temp: 65, runtime: 5200 },
];

const statusConfig: Record<DeviceStatus, { label: string; dot: string; bg: string }> = {
  online: { label: "在线", dot: "bg-success glow-dot", bg: "bg-success/10" },
  offline: { label: "离线", dot: "bg-muted-foreground", bg: "bg-muted/40" },
  warning: { label: "告警", dot: "bg-warning glow-dot", bg: "bg-warning/10" },
};

const statusPieData = [
  { name: "在线", value: devices.filter(d => d.status === "online").length, color: "hsl(155,70%,45%)" },
  { name: "告警", value: devices.filter(d => d.status === "warning").length, color: "hsl(35,95%,55%)" },
  { name: "离线", value: devices.filter(d => d.status === "offline").length, color: "hsl(215,15%,70%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-2 !bg-card/95 text-xs" style={{ boxShadow: "0 8px 32px hsl(0 0% 0% / 0.1)" }}>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.payload.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
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
      {/* Top row: toolbar + mini pie */}
      <div className="grid grid-cols-12 gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="col-span-9 glass-card p-4 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1 bg-muted/50 rounded-lg px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
              placeholder="搜索设备名称、编号或区域..."
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
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === s ? "gradient-primary text-primary-foreground glow-box" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {s === "all" ? "全部" : statusConfig[s].label} ({counts[s]})
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="col-span-3 glass-card p-3 flex items-center gap-3">
          <ResponsiveContainer width={70} height={70}>
            <PieChart>
              <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={20} outerRadius={32} dataKey="value" stroke="none" paddingAngle={3}>
                {statusPieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1">
            {statusPieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-bold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Device Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-4 gap-4">
        {filtered.map((d) => {
          const sc = statusConfig[d.status];
          return (
            <motion.div key={d.id} variants={item} className="glass-card p-4 hover:glow-box transition-shadow duration-300 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sc.bg}`}>
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
                <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <Power className="w-3 h-3 text-primary" />
                    <span className="text-[11px] text-muted-foreground">亮度</span>
                    <span className="text-[11px] font-semibold text-foreground ml-auto">{d.brightness}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Signal className={`w-3 h-3 ${d.signal > 70 ? "text-success" : d.signal > 40 ? "text-warning" : "text-destructive"}`} />
                    <span className="text-[11px] text-muted-foreground">信号</span>
                    <span className="text-[11px] font-semibold text-foreground ml-auto">{d.signal}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-3 h-3 text-warning" />
                    <span className="text-[11px] text-muted-foreground">温度</span>
                    <span className="text-[11px] font-semibold text-foreground ml-auto">{d.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-info" />
                    <span className="text-[11px] text-muted-foreground">运行</span>
                    <span className="text-[11px] font-semibold text-foreground ml-auto">{d.runtime}h</span>
                  </div>
                </div>
              )}

              {d.status !== "offline" && (
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(190,85%,45%), hsl(165,70%,42%))" }}
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
