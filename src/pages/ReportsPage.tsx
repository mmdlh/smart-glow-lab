import { motion } from "framer-motion";
import { FileBarChart, Download, Calendar, Filter, TrendingUp, Activity, Clock, CheckCircle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, ComposedChart,
} from "recharts";

const weeklyData = [
  { day: "周一", online: 980, faults: 5, energy: 1820 },
  { day: "周二", online: 995, faults: 3, energy: 1760 },
  { day: "周三", online: 1002, faults: 8, energy: 1900 },
  { day: "周四", online: 988, faults: 2, energy: 1840 },
  { day: "周五", online: 1010, faults: 6, energy: 1950 },
  { day: "周六", online: 1005, faults: 4, energy: 1680 },
  { day: "周日", online: 998, faults: 1, energy: 1620 },
];

const monthlyEfficiency = [
  { month: "7月", efficiency: 78, maintenance: 12 },
  { month: "8月", efficiency: 81, maintenance: 9 },
  { month: "9月", efficiency: 83, maintenance: 11 },
  { month: "10月", efficiency: 86, maintenance: 7 },
  { month: "11月", efficiency: 88, maintenance: 5 },
  { month: "12月", efficiency: 91, maintenance: 4 },
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
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.stroke }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const reports = [
  { id: 1, name: "2024年12月能耗月报", date: "2025-01-05", type: "月报", size: "2.4 MB", status: "已完成" },
  { id: 2, name: "Q4季度节能分析报告", date: "2025-01-10", type: "季报", size: "5.1 MB", status: "已完成" },
  { id: 3, name: "2024年度照明运维总结", date: "2025-01-15", type: "年报", size: "12.8 MB", status: "已完成" },
  { id: 4, name: "A区设备健康度报告", date: "2025-01-18", type: "专项", size: "1.8 MB", status: "已完成" },
  { id: 5, name: "节能改造效果评估", date: "2025-01-22", type: "专项", size: "3.2 MB", status: "已完成" },
  { id: 6, name: "2025年1月运行月报", date: "2025-02-03", type: "月报", size: "2.6 MB", status: "生成中" },
];

const summaryCards = [
  { label: "已生成报表", value: "128", icon: FileBarChart, cls: "stat-card-blue" },
  { label: "本月新增", value: "6", icon: TrendingUp, cls: "stat-card-green" },
  { label: "平均生成时间", value: "2.3s", icon: Clock, cls: "stat-card-orange" },
  { label: "数据完整率", value: "99.8%", icon: CheckCircle, cls: "stat-card-teal" },
];

const ReportsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
    <motion.div variants={item} className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">数据报表</h2>
        <p className="text-sm text-muted-foreground mt-1">多维度数据统计与分析报告</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Calendar className="w-4 h-4" /> 选择日期
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" /> 筛选
        </button>
      </div>
    </motion.div>

    {/* Summary */}
    <motion.div variants={item} className="grid grid-cols-4 gap-4">
      {summaryCards.map((s) => (
        <div key={s.label} className={`glass-card p-4 ${s.cls}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>

    {/* Charts */}
    <div className="grid grid-cols-12 gap-4">
      <motion.div variants={item} className="col-span-5 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">本周设备在线率</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="rOnline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190,85%,45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(190,85%,45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} domain={[900, 1050]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="online" stroke="hsl(190,85%,45%)" fill="url(#rOnline)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(190,85%,45%)", stroke: "#fff", strokeWidth: 2 }} name="在线设备" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="col-span-4 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">故障 & 能耗统计</h3>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={weeklyData}>
            <defs>
              <linearGradient id="rFault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(35,95%,55%)" />
                <stop offset="100%" stopColor="hsl(35,95%,65%)" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="faults" fill="url(#rFault)" radius={[6, 6, 0, 0]} name="故障数" barSize={24} />
            <Line yAxisId="right" type="monotone" dataKey="energy" stroke="hsl(165,70%,42%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(165,70%,42%)", stroke: "#fff", strokeWidth: 2 }} name="能耗(kWh)" />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="col-span-3 glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">运维效率趋势</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyEfficiency}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,92%)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215,15%,55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="efficiency" stroke="hsl(190,85%,45%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(190,85%,45%)", stroke: "#fff", strokeWidth: 2 }} name="效率(%)" />
            <Line type="monotone" dataKey="maintenance" stroke="hsl(280,65%,55%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(280,65%,55%)", stroke: "#fff", strokeWidth: 2 }} name="维护次数" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Reports List */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="font-display font-semibold text-foreground mb-4">历史报告</h3>
      <div className="space-y-1.5">
        {reports.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileBarChart className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-foreground">{r.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.size}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">{r.type}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
              r.status === "已完成" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            }`}>{r.status}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-muted/50"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default ReportsPage;
