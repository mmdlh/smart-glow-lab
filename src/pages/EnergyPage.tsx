import { motion } from "framer-motion";
import { Zap, TrendingDown, DollarSign, Leaf, ArrowDownRight, ArrowUpRight, Flame, Battery } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, Legend, AreaChart, Area, ComposedChart,
} from "recharts";

const monthlyData = [
  { month: "1月", consumption: 12400, cost: 8680, savings: 2100 },
  { month: "2月", consumption: 11200, cost: 7840, savings: 1900 },
  { month: "3月", consumption: 13600, cost: 9520, savings: 2400 },
  { month: "4月", consumption: 12800, cost: 8960, savings: 2200 },
  { month: "5月", consumption: 14200, cost: 9940, savings: 2600 },
  { month: "6月", consumption: 15800, cost: 11060, savings: 2800 },
  { month: "7月", consumption: 16400, cost: 11480, savings: 3000 },
  { month: "8月", consumption: 15200, cost: 10640, savings: 2700 },
  { month: "9月", consumption: 13800, cost: 9660, savings: 2500 },
  { month: "10月", consumption: 12600, cost: 8820, savings: 2300 },
  { month: "11月", consumption: 11800, cost: 8260, savings: 2000 },
  { month: "12月", consumption: 13200, cost: 9240, savings: 2400 },
];

const dailyTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  today: Math.floor(80 + 200 * Math.sin((i - 6) * Math.PI / 12) ** 2 + Math.random() * 40),
  yesterday: Math.floor(100 + 180 * Math.sin((i - 6) * Math.PI / 12) ** 2 + Math.random() * 40),
}));

const zoneComparison = [
  { zone: "A区", current: 4820, previous: 5200, saving: 7.3 },
  { zone: "B区", current: 2180, previous: 2450, saving: 11.0 },
  { zone: "C区", current: 1350, previous: 1500, saving: 10.0 },
  { zone: "D区", current: 3200, previous: 3600, saving: 11.1 },
  { zone: "E区", current: 3650, previous: 3400, saving: -7.4 },
];

const radialData = [
  { name: "路灯", value: 72, fill: "hsl(190,85%,45%)" },
  { name: "景观灯", value: 58, fill: "hsl(165,70%,42%)" },
  { name: "室内", value: 85, fill: "hsl(210,80%,55%)" },
  { name: "应急", value: 35, fill: "hsl(35,95%,55%)" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 !bg-card/95 text-xs" style={{ boxShadow: "0 8px 32px hsl(0 0% 0% / 0.1)" }}>
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const EnergyPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
    <motion.div variants={item} className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">能耗分析</h2>
        <p className="text-sm text-muted-foreground mt-1">全方位能源监控，优化照明能效</p>
      </div>
    </motion.div>

    {/* KPI Cards */}
    <motion.div variants={item} className="grid grid-cols-5 gap-4">
      {[
        { label: "本月总能耗", value: "15,200 kWh", change: "-8.2%", down: true, icon: Zap, cls: "stat-card-blue" },
        { label: "本月费用", value: "¥10,640", change: "-12%", down: true, icon: DollarSign, cls: "stat-card-green" },
        { label: "节能率", value: "22.4%", change: "+3.1%", down: false, icon: Leaf, cls: "stat-card-teal" },
        { label: "碳减排", value: "8.6 吨", change: "+15%", down: false, icon: TrendingDown, cls: "stat-card-purple" },
        { label: "峰值功率", value: "52.3 kW", change: "-2.1%", down: true, icon: Flame, cls: "stat-card-orange" },
      ].map((k) => (
        <div key={k.label} className={`glass-card p-5 ${k.cls}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{k.label}</p>
              <p className="text-2xl font-display font-bold mt-1 text-foreground">{k.value}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${k.down ? "text-success" : "text-info"}`}>
                {k.down ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                <span>{k.change} 较上月</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
              <k.icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>

    {/* Charts Row 1 */}
    <div className="grid grid-cols-12 gap-4">
      <motion.div variants={item} className="col-span-7 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">月度能耗与节能对比</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyData}>
            <defs>
              <linearGradient id="eBarConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190,85%,45%)" />
                <stop offset="100%" stopColor="hsl(190,85%,60%)" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="eBarSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(165,70%,42%)" />
                <stop offset="100%" stopColor="hsl(165,70%,55%)" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="consumption" fill="url(#eBarConsumption)" radius={[6, 6, 0, 0]} name="能耗(kWh)" barSize={20} />
            <Bar dataKey="savings" fill="url(#eBarSavings)" radius={[6, 6, 0, 0]} name="节省(kWh)" barSize={20} />
            <Line type="monotone" dataKey="cost" stroke="hsl(35,95%,55%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(35,95%,55%)", stroke: "#fff", strokeWidth: 2 }} name="费用(¥)" />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="col-span-5 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">今日 vs 昨日实时对比</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyTrend}>
            <defs>
              <linearGradient id="eTodayArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190,85%,45%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(190,85%,45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} interval={3} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="today" stroke="hsl(190,85%,45%)" fill="url(#eTodayArea)" strokeWidth={2.5} dot={false} name="今日(W)" />
            <Line type="monotone" dataKey="yesterday" stroke="hsl(210,25%,78%)" strokeWidth={2} dot={false} strokeDasharray="6 4" name="昨日(W)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-12 gap-4">
      <motion.div variants={item} className="col-span-4 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">设备能效评分</h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="85%" data={radialData} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" cornerRadius={8} />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-4 mt-2">
          {radialData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.fill }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-bold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="col-span-8 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">区域能耗排行与节能分析</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2.5 font-medium">排名</th>
              <th className="text-left py-2.5 font-medium">区域</th>
              <th className="text-left py-2.5 font-medium">本月(kWh)</th>
              <th className="text-left py-2.5 font-medium">上月(kWh)</th>
              <th className="text-left py-2.5 font-medium">节能率</th>
              <th className="text-left py-2.5 font-medium">趋势</th>
            </tr>
          </thead>
          <tbody>
            {zoneComparison.map((r, i) => (
              <tr key={r.zone} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3">
                  <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${
                    i < 3 ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{i + 1}</span>
                </td>
                <td className="py-3 font-medium text-foreground">{r.zone}</td>
                <td className="py-3 text-foreground font-display">{r.current.toLocaleString()}</td>
                <td className="py-3 text-muted-foreground">{r.previous.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`font-display font-bold ${r.saving >= 0 ? "text-success" : "text-warning"}`}>
                    {r.saving >= 0 ? `-${r.saving}%` : `+${Math.abs(r.saving)}%`}
                  </span>
                </td>
                <td className="py-3">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: r.saving >= 0 ? "linear-gradient(90deg, hsl(155,70%,45%), hsl(165,70%,42%))" : "linear-gradient(90deg, hsl(35,95%,55%), hsl(15,85%,55%))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.abs(r.saving) * 8, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  </motion.div>
);

export default EnergyPage;
