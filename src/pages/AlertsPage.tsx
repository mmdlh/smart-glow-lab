import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Bell, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } };

type AlertLevel = "critical" | "warning" | "info" | "resolved";

interface Alert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  zone: string;
  device: string;
  time: string;
}

const alerts: Alert[] = [
  { id: "1", title: "灯杆倾斜告警", description: "检测到灯杆角度偏移超过5°，请及时检查", level: "critical", zone: "A区", device: "L-A045", time: "5分钟前" },
  { id: "2", title: "通信中断", description: "设备连续30分钟无响应", level: "critical", zone: "D区", device: "L-D210", time: "12分钟前" },
  { id: "3", title: "电流异常", description: "工作电流超出额定范围15%", level: "warning", zone: "E区", device: "L-E089", time: "30分钟前" },
  { id: "4", title: "灯具老化预警", description: "光衰检测达到70%，建议更换灯具", level: "warning", zone: "B区", device: "L-B032", time: "1小时前" },
  { id: "5", title: "温度过高提醒", description: "灯具表面温度达到85°C", level: "warning", zone: "A区", device: "L-A012", time: "2小时前" },
  { id: "6", title: "固件更新提醒", description: "新版固件v3.2.1可用，建议升级", level: "info", zone: "全部", device: "-", time: "3小时前" },
  { id: "7", title: "景观灯故障已修复", description: "商业街景观灯故障已排除并恢复", level: "resolved", zone: "B区", device: "L-B015", time: "4小时前" },
  { id: "8", title: "通信恢复正常", description: "住宅区网关通信已恢复", level: "resolved", zone: "D区", device: "GW-D03", time: "5小时前" },
];

const levelConfig: Record<AlertLevel, { label: string; icon: any; color: string; bg: string; border: string }> = {
  critical: { label: "严重", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-l-destructive" },
  warning: { label: "警告", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-l-warning" },
  info: { label: "提示", icon: Bell, color: "text-info", bg: "bg-info/10", border: "border-l-info" },
  resolved: { label: "已处理", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", border: "border-l-success" },
};

const AlertsPage = () => {
  const [filter, setFilter] = useState<AlertLevel | "all">("all");

  const filtered = filter === "all" ? alerts : alerts.filter(a => a.level === filter);
  const counts = {
    all: alerts.length,
    critical: alerts.filter(a => a.level === "critical").length,
    warning: alerts.filter(a => a.level === "warning").length,
    info: alerts.filter(a => a.level === "info").length,
    resolved: alerts.filter(a => a.level === "resolved").length,
  };

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">告警中心</h2>
          <p className="text-sm text-muted-foreground mt-1">实时设备告警与故障通知</p>
        </div>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {(["critical", "warning", "info", "resolved"] as AlertLevel[]).map((level) => {
          const cfg = levelConfig[level];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setFilter(level === filter ? "all" : level)}
              className={`glass-card p-4 cursor-pointer transition-all ${filter === level ? "ring-2 ring-primary/30 glow-box" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{counts[level]}</p>
                  <p className="text-xs text-muted-foreground">{cfg.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Alert list */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
        {filtered.map((a) => {
          const cfg = levelConfig[a.level];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={a.id}
              variants={item}
              className={`glass-card p-4 border-l-[3px] ${cfg.border} hover:glow-box transition-all cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-4.5 h-4.5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-foreground">{a.title}</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.zone}</span>
                    <span>{a.device}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AlertsPage;
