import { motion } from "framer-motion";
import { FileBarChart, Download, Calendar, Filter } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const weeklyData = Array.from({ length: 7 }, (_, i) => ({
  day: ["周一","周二","周三","周四","周五","周六","周日"][i],
  online: Math.floor(Math.random() * 50 + 950),
  faults: Math.floor(Math.random() * 10),
  energy: Math.floor(Math.random() * 500 + 1500),
}));

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const reports = [
  { id: 1, name: "2024年12月能耗月报", date: "2025-01-05", type: "月报", size: "2.4 MB" },
  { id: 2, name: "Q4季度节能分析报告", date: "2025-01-10", type: "季报", size: "5.1 MB" },
  { id: 3, name: "2024年度照明运维总结", date: "2025-01-15", type: "年报", size: "12.8 MB" },
  { id: 4, name: "A区设备健康度报告", date: "2025-01-18", type: "专项", size: "1.8 MB" },
  { id: 5, name: "节能改造效果评估", date: "2025-01-22", type: "专项", size: "3.2 MB" },
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

    {/* Two charts side by side */}
    <div className="grid grid-cols-2 gap-4">
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">本周设备在线率</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="gOnline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190,85%,45%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(190,85%,45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(210,25%,90%)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="online" stroke="hsl(190,85%,45%)" fill="url(#gOnline)" strokeWidth={2} name="在线设备" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">本周故障统计</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,25%,90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215,15%,50%)" }} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(210,25%,90%)", borderRadius: 8 }} />
            <Bar dataKey="faults" fill="hsl(35,95%,55%)" radius={[4,4,0,0]} name="故障数" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Reports List */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="font-display font-semibold text-foreground mb-4">历史报告</h3>
      <div className="space-y-2">
        {reports.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileBarChart className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-foreground">{r.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.size}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">{r.type}</span>
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
