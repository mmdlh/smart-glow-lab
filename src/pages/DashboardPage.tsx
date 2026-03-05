import { motion } from "framer-motion";
import {
  Lightbulb, Zap, Activity, MapPin, TrendingUp, TrendingDown,
  Sun, Moon, CloudSun, ThermometerSun, Wifi, AlertTriangle,
  Clock, CheckCircle2, Users, Server,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  BarChart, Bar, Legend,
} from "recharts";

const areaData = [
  { time: "00:00", power: 120, devices: 45 },
  { time: "02:00", power: 95, devices: 35 },
  { time: "04:00", power: 80, devices: 30 },
  { time: "06:00", power: 180, devices: 90 },
  { time: "08:00", power: 320, devices: 180 },
  { time: "10:00", power: 410, devices: 210 },
  { time: "12:00", power: 450, devices: 220 },
  { time: "14:00", power: 420, devices: 215 },
  { time: "16:00", power: 380, devices: 195 },
  { time: "18:00", power: 480, devices: 230 },
  { time: "20:00", power: 520, devices: 240 },
  { time: "22:00", power: 280, devices: 120 },
  { time: "23:59", power: 160, devices: 60 },
];

const pieData = [
  { name: "LED路灯", value: 420, color: "hsl(190, 85%, 45%)" },
  { name: "景观灯", value: 180, color: "hsl(165, 70%, 42%)" },
  { name: "室内照明", value: 320, color: "hsl(210, 80%, 55%)" },
  { name: "应急照明", value: 80, color: "hsl(35, 95%, 55%)" },
  { name: "泛光灯", value: 140, color: "hsl(280, 65%, 55%)" },
];

const weekBarData = [
  { day: "周一", online: 980, offline: 44 },
  { day: "周二", online: 995, offline: 29 },
  { day: "周三", online: 1002, offline: 22 },
  { day: "周四", online: 988, offline: 36 },
  { day: "周五", online: 1010, offline: 14 },
  { day: "周六", online: 1005, offline: 19 },
  { day: "周日", online: 998, offline: 26 },
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
  { label: "在线设备", value: "1,024", sub: "总计 1,068 台", change: "+12", up: true, icon: Wifi, cls: "stat-card-blue" },
  { label: "总功率", value: "48.6 kW", sub: "额定 62 kW", change: "-5.2%", up: false, icon: Zap, cls: "stat-card-green" },
  { label: "今日能耗", value: "862 kWh", sub: "较昨日 -3%", change: "+3.1%", up: true, icon: Activity, cls: "stat-card-orange" },
  { label: "活跃告警", value: "7", sub: "已处理 23 条", change: "-2", up: false, icon: AlertTriangle, cls: "stat-card-purple" },
  { label: "运行时长", value: "99.7%", sub: "本月在线率", change: "+0.3%", up: true, icon: Server, cls: "stat-card-teal" },
];

const zones = [
  { name: "A区 · 主干道", online: 128, total: 130, brightness: 85, power: 15.2 },
  { name: "B区 · 商业街", online: 96, total: 98, brightness: 100, power: 8.4 },
  { name: "C区 · 公园绿地", online: 64, total: 68, brightness: 60, power: 3.2 },
  { name: "D区 · 住宅区", online: 200, total: 210, brightness: 70, power: 12.8 },
  { name: "E区 · 工业园", online: 156, total: 160, brightness: 90, power: 9.0 },
];

const recentEvents = [
  { icon: CheckCircle2, text: "B区景观灯故障已修复", time: "10分钟前", color: "text-success" },
  { icon: AlertTriangle, text: "D区灯杆-210 通信中断", time: "25分钟前", color: "text-warning" },
  { icon: Lightbulb, text: "节能模式已自动切换", time: "1小时前", color: "text-primary" },
  { icon: Users, text: "管理员张工登录系统", time: "2小时前", color: "text-info" },
  { icon: Clock, text: "夜间模式定时任务已执行", time: "3小时前", color: "text-muted-foreground" },
];

const weather = [
  { icon: Sun, label: "晴天", temp: "26°C", time: "今天", humidity: "45%" },
  { icon: CloudSun, label: "多云", temp: "24°C", time: "明天", humidity: "60%" },
  { icon: ThermometerSun, label: "高温", temp: "32°C", time: "后天", humidity: "38%" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !bg-card/95 text-xs" style={{ boxShadow: "0 8px 32px hsl(0 0% 0% / 0.1)" }}>
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className={`glass-card p-5 ${s.cls}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</p>
                <p className="text-2xl font-display font-bold mt-1 text-foreground">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${s.up ? "text-success" : "text-primary"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{s.change}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Area Chart - wider */}
        <motion.div variants={item} className="col-span-7 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">24小时功率 & 设备趋势</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full" style={{ background: "hsl(190,85%,45%)" }} />功率(W)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded-full" style={{ background: "hsl(165,70%,42%)" }} />设备数</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="gPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190,85%,45%)" stopOpacity={0.35} />
                  <stop offset="50%" stopColor="hsl(190,85%,55%)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="hsl(190,85%,45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDevices" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(165,70%,42%)" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="hsl(165,70%,50%)" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="hsl(165,70%,42%)" stopOpacity={0} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="power" stroke="hsl(190,85%,45%)" fill="url(#gPower)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "hsl(190,85%,45%)", stroke: "#fff", strokeWidth: 2 }} name="功率(W)" filter="url(#glow)" />
              <Area type="monotone" dataKey="devices" stroke="hsl(165,70%,42%)" fill="url(#gDevices)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "hsl(165,70%,42%)", stroke: "#fff", strokeWidth: 2 }} name="设备数" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={item} className="col-span-5 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">设备类型分布</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <defs>
                  {pieData.map((d, i) => (
                    <linearGradient key={i} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={d.color} stopOpacity={1} />
                      <stop offset="100%" stopColor={d.color} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                  <filter id="pieShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                  </filter>
                </defs>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={3}
                  cornerRadius={4}
                  filter="url(#pieShadow)"
                >
                  {pieData.map((d, i) => (
                    <Cell key={i} fill={`url(#pieGrad${i})`} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{d.name}</span>
                  <span className="text-sm font-display font-bold text-foreground">{d.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">总计</span>
                  <span className="font-display font-bold text-foreground">{pieData.reduce((a, b) => a + b.value, 0)} 台</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Zone Status */}
        <motion.div variants={item} className="col-span-5 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">区域运行状态</h3>
          <div className="space-y-3">
            {zones.map((z) => (
              <div key={z.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground">{z.name}</span>
                    <span className="text-xs text-muted-foreground">{z.power} kW</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(190,85%,45%), hsl(165,70%,42%))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(z.online / z.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-muted-foreground">{z.online}/{z.total} 在线</span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Sun className="w-3 h-3 text-warning" />{z.brightness}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Bar Chart */}
        <motion.div variants={item} className="col-span-4 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">本周设备在线统计</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weekBarData} barGap={2}>
              <defs>
                <linearGradient id="barOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190,85%,45%)" />
                  <stop offset="100%" stopColor="hsl(190,85%,55%)" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="barOffline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(35,95%,55%)" />
                  <stop offset="100%" stopColor="hsl(35,95%,65%)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="online" fill="url(#barOnline)" radius={[6, 6, 0, 0]} name="在线" />
              <Bar dataKey="offline" fill="url(#barOffline)" radius={[6, 6, 0, 0]} name="离线" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Right column - events + weather + quick actions */}
        <motion.div variants={item} className="col-span-3 space-y-4">
          {/* Recent events */}
          <div className="glass-card p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">最新动态</h3>
            <div className="space-y-2.5">
              {recentEvents.map((e, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <e.icon className={`w-4 h-4 mt-0.5 shrink-0 ${e.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">{e.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div className="glass-card p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">天气预报</h3>
            <div className="space-y-2">
              {weather.map((w) => (
                <div key={w.time} className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/30">
                  <w.icon className="w-5 h-5 text-warning" />
                  <div className="flex-1">
                    <span className="text-xs font-medium text-foreground">{w.label}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">{w.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-semibold text-sm text-foreground">{w.temp}</span>
                    <p className="text-[10px] text-muted-foreground">湿度 {w.humidity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass-card-accent p-4">
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">快捷操作</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Sun, label: "全开" },
                { icon: Moon, label: "全关" },
                { icon: Lightbulb, label: "节能" },
                { icon: AlertTriangle, label: "应急" },
              ].map((a) => (
                <motion.button
                  key={a.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-muted/40 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <a.icon className="w-5 h-5 text-primary" />
                  <span className="text-[11px] font-medium text-foreground">{a.label}</span>
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
