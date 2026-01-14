export enum GrowthStage {
  Seedling = 0,
  Sapling = 1,
  Flowering = 2,
  Towering = 3,
}

export interface TreeState {
  stage: GrowthStage;
  level: number; // 1, 2, or 3
  experience: number;
  maxExperience: number;
  name: string | null;
  adopted: boolean;
  adoptionDate: string | null;
  adoptionDuration: string | null; // e.g., "Forever", "1 Year"
}

export interface Item {
  id: string;
  name: string;
  description: string;
  xpValue: number;
  unlockStage: GrowthStage;
  icon: string; // Lucide icon name representation
  color: string;
  cooldownMs: number;
}

export interface LogEntry {
  id: number;
  message: string;
  timestamp: Date;
  type: 'action' | 'growth' | 'unlock';
}
