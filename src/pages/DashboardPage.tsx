import { motion } from "framer-motion";
import {
  Lightbulb, Zap, Activity, MapPin, TrendingUp, TrendingDown,
  Sun, Moon, CloudSun, ThermometerSun, Wifi, AlertTriangle,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const areaData = [
  { time: "00:00", power: 120, devices: 45 },
  { time: "04:00", power: 80, devices: 30 },
  { time: "08:00", power: 320, devices: 180 },
  { time: "12:00", power: 450, devices: 220 },
  { time: "16:00", power: 380, devices: 195 },
  { time: "20:00", power: 520, devices: 240 },
  { time: "23:00", power: 200, devices: 80 },
];

const pieData = [
  { name: "路灯", value: 420, color: "hsl(190, 85%, 45%)" },
  { name: "景观灯", value: 180, color: "hsl(165, 70%, 42%)" },
  { name: "室内照明", value: 320, color: "hsl(210, 80%, 55%)" },
  { name: "应急照明", value: 80, color: "hsl(35, 95%, 55%)" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stats = [
  { label: "在线设备", value: "1,024", change: "+12", up: true, icon: Wifi, cls: "stat-card-blue" },
  { label: "总功率", value: "48.6 kW", change: "-5.2%", up: false, icon: Zap, cls: "stat-card-green" },
  { label: "今日能耗", value: "862 kWh", change: "+3.1%", up: true, icon: Activity, cls: "stat-card-orange" },
  { label: "告警数量", value: "7", change: "-2", up: false, icon: AlertTriangle, cls: "stat-card-purple" },
];

const zones = [
  { name: "A区 - 主干道", online: 128, total: 130, brightness: 85 },
  { name: "B区 - 商业街", online: 96, total: 98, brightness: 100 },
  { name: "C区 - 公园绿地", online: 64, total: 68, brightness: 60 },
  { name: "D区 - 住宅区", online: 200, total: 210, brightness: 70 },
  { name: "E区 - 工业园", online: 156, total: 160, brightness: 90 },
];

const weather = [
  { icon: Sun, label: "晴天", temp: "26°C", time: "今天" },
  { icon: CloudSun, label: "多云", temp: "24°C", time: "明天" },
  { icon: ThermometerSun, label: "高温", temp: "32°C", time: "后天" },
];

const DashboardPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className={`glass-card p-5 ${s.cls}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-display font-bold mt-1 text-foreground">{s.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${s.up ? "text-success" : "text-primary"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{s.change}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Area Chart */}
        <motion.div variants={item} className="col-span-2 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">24小时能耗趋势</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="gPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190,85%,45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(190,85%,45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDevices" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(165,70%,42%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(165,70%,42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,90%)" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(0,0%,100%)",
                  border: "1px solid hsl(210,25%,90%)",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px hsl(0,0%,0%,0.08)",
                }}
              />
              <Area type="monotone" dataKey="power" stroke="hsl(190,85%,45%)" fill="url(#gPower)" strokeWidth={2} name="功率(W)" />
              <Area type="monotone" dataKey="devices" stroke="hsl(165,70%,42%)" fill="url(#gDevices)" strokeWidth={2} name="设备数" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={item} className="glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">设备类型分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Zone Status */}
        <motion.div variants={item} className="col-span-2 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">区域状态</h3>
          <div className="space-y-3">
            {zones.map((z) => (
              <div key={z.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-sm text-foreground w-36">{z.name}</span>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(z.online / z.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">{z.online}/{z.total} 在线</span>
                <div className="flex items-center gap-1 w-16">
                  <Sun className="w-3 h-3 text-warning" />
                  <span className="text-xs font-medium text-foreground">{z.brightness}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weather + Quick Actions */}
        <motion.div variants={item} className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-3">天气信息</h3>
            <div className="space-y-3">
              {weather.map((w) => (
                <div key={w.time} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <w.icon className="w-5 h-5 text-warning" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{w.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{w.time}</span>
                  </div>
                  <span className="font-display font-semibold text-foreground">{w.temp}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card-accent p-5">
            <h3 className="font-display font-semibold text-foreground mb-3">快捷操作</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Sun, label: "全开" },
                { icon: Moon, label: "全关" },
                { icon: Lightbulb, label: "节能模式" },
                { icon: AlertTriangle, label: "应急模式" },
              ].map((a) => (
                <motion.button
                  key={a.label}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/40 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <a.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium text-foreground">{a.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
