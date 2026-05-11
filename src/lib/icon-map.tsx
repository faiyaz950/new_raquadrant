'use client';

import {
  Zap,
  Handshake,
  Globe,
  BrainCircuit,
  ShieldCheck,
  Users,
  Award,
  CheckSquare,
  Sun,
  BarChart3,
  Leaf,
  Battery,
  Wrench,
  Factory,
  HeartHandshake,
  CheckCircle2,
  Target,
  Eye,
  Compass,
  LayoutPanelTop,
  FileText,
  Truck,
  HardHat,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Handshake,
  Globe,
  BrainCircuit,
  ShieldCheck,
  Users,
  Award,
  CheckSquare,
  Sun,
  BarChart3,
  Leaf,
  Battery,
  Wrench,
  Factory,
  HeartHandshake,
  CheckCircle2,
  Target,
  Eye,
  Compass,
  LayoutPanelTop,
  FileText,
  Truck,
  HardHat,
  TrendingUp,
  Clock,
  Star,
};

export function getIcon(name: string, className = 'h-6 w-6'): React.ReactNode {
  const Icon = iconMap[name] || Zap;
  return <Icon className={className} />;
}

export function getIconComponent(name: string): LucideIcon {
  return iconMap[name] || Zap;
}
