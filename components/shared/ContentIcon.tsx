import {
  AppWindow,
  Bell,
  Boxes,
  Car,
  ChartColumn,
  ClipboardList,
  GraduationCap,
  Printer,
  School,
  WashingMachine,
  CalendarClock,
  FileCheck,
  FileText,
  HandCoins,
  Languages,
  Package,
  PanelsTopLeft,
  Plug,
  Receipt,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  UsersRound,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ContentIconName } from "@/lib/types";

const icons: Record<ContentIconName, LucideIcon> = {
  "app-window": AppWindow,
  plug: Plug,
  "shopping-cart": ShoppingCart,
  "panels-top-left": PanelsTopLeft,
  wrench: Wrench,
  server: Server,
  package: Package,
  receipt: Receipt,
  "calendar-clock": CalendarClock,
  "hand-coins": HandCoins,
  wallet: Wallet,
  "file-check": FileCheck,
  "file-text": FileText,
  users: UsersRound,
  languages: Languages,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
  car: Car,
  boxes: Boxes,
  "graduation-cap": GraduationCap,
  "washing-machine": WashingMachine,
  school: School,
  bell: Bell,
  printer: Printer,
  chart: ChartColumn,
  clipboard: ClipboardList,
};

interface ContentIconProps {
  name: ContentIconName;
  className?: string;
}

/** Renders an icon chosen by name in a content file. Always decorative. */
export function ContentIcon({ name, className }: ContentIconProps) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
