import { motion } from "framer-motion";
import { Clock, Plus, Power, Sun, Moon, Repeat, Trash2, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

interface Schedule {
  id: string;
  name: string;
  time: string;
  days: string[];
  scene: string;
  action: string;
  enabled: boolean;
  zones: string[];
}

const weekdays = ["一", "二", "三", "四", "五", "六", "日"];

const schedules: Schedule[] = [
  { id: "1", name: "工作日日出开灯", time: "06:30", days: ["一","二","三","四","五"], scene: "日出模式", action: "开启", enabled: true, zones: ["A区","B区"] },
  { id: "2", name: "夜间节能切换", time: "23:00", days: ["一","二","三","四","五","六","日"], scene: "夜间模式", action: "切换", enabled: true, zones: ["全部"] },
  { id: "3", name: "周末景观灯开启", time: "18:00", days: ["六","日"], scene: "节日模式", action: "开启", enabled: true, zones: ["B区","C区"] },
  { id: "4", name: "凌晨关闭装饰灯", time: "01:00", days: ["一","二","三","四","五","六","日"], scene: "关闭", action: "关闭", enabled: false, zones: ["B区"] },
  { id: "5", name: "上班高峰加亮", time: "07:30", days: ["一","二","三","四","五"], scene: "全亮模式", action: "调亮", enabled: true, zones: ["A区","D区"] },
  { id: "6", name: "午间调暗节能", time: "12:00", days: ["一","二","三","四","五"], scene: "节能模式", action: "调暗", enabled: false, zones: ["全部"] },
];

const SchedulesPage = () => {
  const [items, setItems] = useState(schedules);

  const toggleEnabled = (id: string) => {
    setItems(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">定时策略</h2>
          <p className="text-sm text-muted-foreground mt-1">自动化照明控制，按时间和场景智能切换</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium glow-box"
        >
          <Plus className="w-4 h-4" /> 新建策略
        </motion.button>
      </motion.div>

      {/* Timeline layout */}
      <motion.div variants={container} initial="hidden" animate="show" className="relative">
        {/* Timeline line */}
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {items.map((s) => (
            <motion.div key={s.id} variants={item} className="flex gap-6 group">
              {/* Time badge */}
              <div className="w-[100px] shrink-0 flex flex-col items-center pt-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg ${
                  s.enabled ? "gradient-primary text-primary-foreground glow-box" : "bg-muted text-muted-foreground"
                }`}>
                  {s.time.split(":")[0]}
                  <span className="text-sm">:{s.time.split(":")[1]}</span>
                </div>
              </div>

              {/* Card */}
              <div className={`flex-1 glass-card p-5 transition-all duration-300 ${!s.enabled ? "opacity-60" : "hover:glow-box"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{s.name}</h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Repeat className="w-3 h-3" /> {s.scene}</span>
                      <span className="flex items-center gap-1"><Power className="w-3 h-3" /> {s.action}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
                      <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleEnabled(s.id)}>
                      {s.enabled ? (
                        <ToggleRight className="w-8 h-8 text-primary" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  {/* Week pills */}
                  <div className="flex gap-1">
                    {weekdays.map((d) => (
                      <span
                        key={d}
                        className={`w-6 h-6 rounded-full text-[10px] font-medium flex items-center justify-center ${
                          s.days.includes(d) ? "gradient-accent text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex gap-1.5">
                    {s.zones.map((z) => (
                      <span key={z} className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">{z}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SchedulesPage;
