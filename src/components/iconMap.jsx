import {
  Activity,
  ArrowRight,
  Bell,
  Bookmark,
  Clock3,
  Cloud,
  Cpu,
  Moon,
  Phone,
  Radar,
  RadioTower,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  WifiOff,
} from "lucide-react";

export const iconMap = {
  activity: Activity,
  arrow: ArrowRight,
  bell: Bell,
  bookmark: Bookmark,
  cloud: Cloud,
  clock: Clock3,
  cpu: Cpu,
  moon: Moon,
  phone: Phone,
  radar: Radar,
  radioTower: RadioTower,
  search: Search,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  spark: Sparkles,
  sun: Sun,
  wifioff: WifiOff,
};

export function AppIcon({ name, size = 18, strokeWidth = 1.8, ...props }) {
  const Icon = iconMap[name] || Radar;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
