import { motion } from "framer-motion";
import { Zap, TrendingDown, DollarSign, Leaf, ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, Legend,
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
  hour: `${i}:00`,
  today: Math.floor(Math.random() * 300 + 100),
  yesterday: Math.floor(Math.random() * 300 + 120),
}));

const radialData = [
  { name: "路灯", value: 72, fill: "hsl(190,85%,45%)" },
  { name: "景观灯", value: 58, fill: "hsl(165,70%,42%)" },
  { name: "室内", value: 85, fill: "hsl(210,80%,55%)" },
  { name: "应急", value: 35, fill: "hsl(35,95%,55%)" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const EnergyPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
    <motion.div variants={item} className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">能耗分析</h2>
        <p className="text-sm text-muted-foreground mt-1">全方位能源监控，优化照明能效</p>
      </div>
    </motion.div>

    {/* KPI Cards - horizontal */}
    <motion.div variants={item} className="grid grid-cols-4 gap-4">
      {[
        { label: "本月总能耗", value: "15,200 kWh", change: "-8.2%", down: true, icon: Zap, cls: "stat-card-blue" },
        { label: "本月费用", value: "¥10,640", change: "-12%", down: true, icon: DollarSign, cls: "stat-card-green" },
        { label: "节能率", value: "22.4%", change: "+3.1%", down: false, icon: Leaf, cls: "stat-card-teal" },
        { label: "碳减排", value: "8.6 吨", change: "+15%", down: false, icon: TrendingDown, cls: "stat-card-purple" },
      ].map((k) => (
        <div key={k.label} className={`glass-card p-5 ${k.cls}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-display font-bold mt-1 text-foreground">{k.value}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${k.down ? "text-success" : "text-info"}`}>
                {k.down ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                <span>{k.change} 较上月</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center">
              <k.icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>

    {/* Charts Row */}
    <div className="grid grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">月度能耗与费用</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215,15%,50%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,50%)" }} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(210,25%,90%)", borderRadius: 8 }} />
            <Bar dataKey="consumption" fill="hsl(190,85%,45%)" radius={[4,4,0,0]} name="能耗(kWh)" />
            <Bar dataKey="savings" fill="hsl(165,70%,42%)" radius={[4,4,0,0]} name="节省(kWh)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">今日 vs 昨日能耗对比</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dailyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,90%)" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215,15%,50%)" }} interval={3} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,50%)" }} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(210,25%,90%)", borderRadius: 8 }} />
            <Line type="monotone" dataKey="today" stroke="hsl(190,85%,45%)" strokeWidth={2} dot={false} name="今日" />
            <Line type="monotone" dataKey="yesterday" stroke="hsl(210,25%,80%)" strokeWidth={2} dot={false} strokeDasharray="5 5" name="昨日" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Radial + Table */}
    <div className="grid grid-cols-3 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">各类设备能效评分</h3>
        <ResponsiveContainer width="100%" height={240}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
            <RadialBar dataKey="value" cornerRadius={6} />
            <Legend iconSize={10} />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="col-span-2 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">区域能耗排行</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 font-medium">排名</th>
              <th className="text-left py-2 font-medium">区域</th>
              <th className="text-left py-2 font-medium">能耗(kWh)</th>
              <th className="text-left py-2 font-medium">费用(¥)</th>
              <th className="text-left py-2 font-medium">趋势</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, zone: "A区 - 主干道", kwh: "4,820", cost: "3,374", trend: "down" },
              { rank: 2, zone: "E区 - 工业园", kwh: "3,650", cost: "2,555", trend: "up" },
              { rank: 3, zone: "D区 - 住宅区", kwh: "3,200", cost: "2,240", trend: "down" },
              { rank: 4, zone: "B区 - 商业街", kwh: "2,180", cost: "1,526", trend: "down" },
              { rank: 5, zone: "C区 - 公园绿地", kwh: "1,350", cost: "945", trend: "up" },
            ].map((r) => (
              <tr key={r.rank} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3">
                  <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                    r.rank <= 3 ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{r.rank}</span>
                </td>
                <td className="py-3 font-medium text-foreground">{r.zone}</td>
                <td className="py-3 text-foreground">{r.kwh}</td>
                <td className="py-3 text-foreground">{r.cost}</td>
                <td className="py-3">
                  {r.trend === "down" ? (
                    <span className="text-success flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />下降</span>
                  ) : (
                    <span className="text-warning flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />上升</span>
                  )}
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
