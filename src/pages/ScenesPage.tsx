import { motion } from "framer-motion";
import { Sunrise, Sunset, Moon, PartyPopper, ShieldAlert, Leaf, Star, Play, Pause, Clock, Cpu, Zap } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface Scene {
  id: string;
  name: string;
  description: string;
  icon: any;
  gradient: string;
  devices: number;
  active: boolean;
  brightness: number;
  color: string;
  powerSaving: number;
  schedule: string;
  usageData: { h: string; v: number }[];
}

const makeUsage = () => Array.from({ length: 12 }, (_, i) => ({ h: `${i * 2}`, v: Math.floor(Math.random() * 80 + 20) }));

const scenes: Scene[] = [
  { id: "1", name: "日出模式", description: "渐亮唤醒，模拟自然日出光线变化，提升舒适度", icon: Sunrise, gradient: "from-amber-400/20 to-orange-300/10", devices: 240, active: true, brightness: 70, color: "text-amber-500", powerSaving: 15, schedule: "每日 06:00-08:00", usageData: makeUsage() },
  { id: "2", name: "日落模式", description: "暖色调柔和过渡，营造温馨舒适氛围", icon: Sunset, gradient: "from-orange-400/20 to-rose-300/10", devices: 240, active: false, brightness: 50, color: "text-orange-500", powerSaving: 20, schedule: "每日 17:30-19:00", usageData: makeUsage() },
  { id: "3", name: "夜间模式", description: "低亮度智能运行，兼顾安全与节能", icon: Moon, gradient: "from-indigo-400/20 to-blue-300/10", devices: 320, active: true, brightness: 30, color: "text-indigo-500", powerSaving: 45, schedule: "每日 23:00-05:00", usageData: makeUsage() },
  { id: "4", name: "节日模式", description: "多彩灯光变换，打造缤纷节日氛围", icon: PartyPopper, gradient: "from-pink-400/20 to-purple-300/10", devices: 180, active: false, brightness: 100, color: "text-pink-500", powerSaving: -10, schedule: "手动触发", usageData: makeUsage() },
  { id: "5", name: "应急模式", description: "全亮度强制照明，确保最大范围安全", icon: ShieldAlert, gradient: "from-red-400/20 to-orange-300/10", devices: 500, active: false, brightness: 100, color: "text-red-500", powerSaving: -30, schedule: "紧急触发", usageData: makeUsage() },
  { id: "6", name: "节能模式", description: "AI智能调光，根据环境自动降低30%能耗", icon: Leaf, gradient: "from-emerald-400/20 to-teal-300/10", devices: 450, active: true, brightness: 55, color: "text-emerald-500", powerSaving: 35, schedule: "自动策略", usageData: makeUsage() },
];

const ScenesPage = () => {
  const [activeScenes, setActiveScenes] = useState<Set<string>>(new Set(scenes.filter(s => s.active).map(s => s.id)));

  const toggle = (id: string) => {
    setActiveScenes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">场景模式</h2>
          <p className="text-sm text-muted-foreground mt-1">一键切换照明场景，智能联动控制</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="w-4 h-4 text-warning" />
            <span>激活 <strong className="text-foreground">{activeScenes.size}</strong> 个场景</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cpu className="w-4 h-4 text-primary" />
            <span>管控 <strong className="text-foreground">{scenes.reduce((a, s) => a + s.devices, 0)}</strong> 台设备</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-5">
        {scenes.map((scene) => {
          const isActive = activeScenes.has(scene.id);
          const Icon = scene.icon;
          return (
            <motion.div
              key={scene.id}
              variants={item}
              className={`glass-card overflow-hidden group cursor-pointer transition-all duration-300 ${isActive ? "glow-box ring-1 ring-primary/20" : ""}`}
              onClick={() => toggle(scene.id)}
            >
              <div className={`bg-gradient-to-br ${scene.gradient} p-5`}>
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-card/80 backdrop-blur flex items-center justify-center ${isActive ? "pulse-glow" : ""}`}>
                    <Icon className={`w-7 h-7 ${scene.color}`} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? "gradient-primary" : "bg-muted/60"
                    }`}
                  >
                    {isActive ? <Pause className="w-4 h-4 text-primary-foreground" /> : <Play className="w-4 h-4 text-muted-foreground ml-0.5" />}
                  </motion.button>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mt-4">{scene.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{scene.description}</p>

                {/* Mini sparkline */}
                <div className="mt-3 h-10 opacity-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scene.usageData}>
                      <Bar dataKey="v" fill={isActive ? "hsl(190,85%,45%)" : "hsl(215,15%,75%)"} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><Cpu className="w-3 h-3" />{scene.devices} 台设备</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">亮度</span>
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${isActive ? "gradient-primary" : "bg-muted-foreground/30"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${scene.brightness}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{scene.brightness}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{scene.schedule}</span>
                  <span className={`font-medium ${scene.powerSaving >= 0 ? "text-success" : "text-warning"} flex items-center gap-1`}>
                    <Zap className="w-3 h-3" />
                    {scene.powerSaving >= 0 ? `节能 ${scene.powerSaving}%` : `+${Math.abs(scene.powerSaving)}% 能耗`}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ScenesPage;
