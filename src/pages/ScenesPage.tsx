import { motion } from "framer-motion";
import { Sunrise, Sunset, Moon, PartyPopper, ShieldAlert, Leaf, Star, Play, Pause } from "lucide-react";
import { useState } from "react";

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
}

const scenes: Scene[] = [
  { id: "1", name: "日出模式", description: "渐亮唤醒，模拟自然日出光线变化", icon: Sunrise, gradient: "from-amber-400/20 to-orange-300/10", devices: 240, active: true, brightness: 70, color: "text-amber-500" },
  { id: "2", name: "日落模式", description: "暖色调过渡，营造舒适氛围", icon: Sunset, gradient: "from-orange-400/20 to-rose-300/10", devices: 240, active: false, brightness: 50, color: "text-orange-500" },
  { id: "3", name: "夜间模式", description: "低亮度节能运行，安全照明", icon: Moon, gradient: "from-indigo-400/20 to-blue-300/10", devices: 320, active: true, brightness: 30, color: "text-indigo-500" },
  { id: "4", name: "节日模式", description: "彩色灯光变换，烘托节日气氛", icon: PartyPopper, gradient: "from-pink-400/20 to-purple-300/10", devices: 180, active: false, brightness: 100, color: "text-pink-500" },
  { id: "5", name: "应急模式", description: "全亮度照明，保障安全", icon: ShieldAlert, gradient: "from-red-400/20 to-orange-300/10", devices: 500, active: false, brightness: 100, color: "text-red-500" },
  { id: "6", name: "节能模式", description: "智能调光，降低30%能耗", icon: Leaf, gradient: "from-emerald-400/20 to-teal-300/10", devices: 450, active: true, brightness: 55, color: "text-emerald-500" },
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 text-warning" />
          <span>当前激活 {activeScenes.size} 个场景</span>
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
              <div className={`bg-gradient-to-br ${scene.gradient} p-6`}>
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
                    {isActive ? (
                      <Pause className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Play className="w-4 h-4 text-muted-foreground ml-0.5" />
                    )}
                  </motion.button>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mt-4">{scene.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{scene.description}</p>
              </div>
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{scene.devices} 台设备</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">亮度 {scene.brightness}%</span>
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isActive ? "gradient-primary" : "bg-muted-foreground/30"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${scene.brightness}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
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
