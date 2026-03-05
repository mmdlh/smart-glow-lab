import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Database, Wifi, Globe, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

interface SettingItem {
  label: string;
  description: string;
  type: "toggle" | "link";
  enabled?: boolean;
}

interface SettingGroup {
  title: string;
  icon: any;
  color: string;
  items: SettingItem[];
}

const settingGroups: SettingGroup[] = [
  {
    title: "账户设置",
    icon: User,
    color: "text-info",
    items: [
      { label: "个人信息", description: "修改用户名、邮箱、手机号", type: "link" },
      { label: "修改密码", description: "定期更新密码以保障安全", type: "link" },
      { label: "双因素认证", description: "启用后登录需验证码确认", type: "toggle", enabled: true },
    ],
  },
  {
    title: "通知设置",
    icon: Bell,
    color: "text-warning",
    items: [
      { label: "告警推送", description: "通过APP/短信接收紧急告警", type: "toggle", enabled: true },
      { label: "日报邮件", description: "每日运行摘要发送到邮箱", type: "toggle", enabled: false },
      { label: "维护提醒", description: "设备维护到期自动提醒", type: "toggle", enabled: true },
    ],
  },
  {
    title: "安全设置",
    icon: Shield,
    color: "text-success",
    items: [
      { label: "IP白名单", description: "限制允许访问的IP地址范围", type: "link" },
      { label: "操作日志", description: "查看所有用户的操作记录", type: "link" },
      { label: "自动锁屏", description: "闲置15分钟后自动锁定", type: "toggle", enabled: true },
    ],
  },
  {
    title: "系统配置",
    icon: Database,
    color: "text-primary",
    items: [
      { label: "数据备份", description: "配置自动备份周期和存储位置", type: "link" },
      { label: "网络设置", description: "网关连接与通信协议配置", type: "link" },
      { label: "API接口", description: "第三方系统集成与接口管理", type: "link" },
    ],
  },
];

const SettingsPage = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    settingGroups.forEach(g => g.items.forEach(i => {
      if (i.type === "toggle") map[i.label] = i.enabled ?? false;
    }));
    return map;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h2 className="font-display text-2xl font-bold text-foreground">系统设置</h2>
        <p className="text-sm text-muted-foreground mt-1">管理平台配置与个人偏好</p>
      </motion.div>

      {settingGroups.map((group) => {
        const Icon = group.icon;
        return (
          <motion.div key={group.title} variants={item} className="glass-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
              <Icon className={`w-5 h-5 ${group.color}`} />
              <h3 className="font-display font-semibold text-foreground">{group.title}</h3>
            </div>
            <div className="divide-y divide-border/50">
              {group.items.map((si) => (
                <motion.div
                  key={si.label}
                  whileHover={{ backgroundColor: "hsl(210,20%,94%,0.3)" }}
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{si.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{si.description}</p>
                  </div>
                  {si.type === "toggle" ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setToggles(p => ({ ...p, [si.label]: !p[si.label] }))}
                    >
                      {toggles[si.label] ? (
                        <ToggleRight className="w-8 h-8 text-primary" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                      )}
                    </motion.button>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SettingsPage;
