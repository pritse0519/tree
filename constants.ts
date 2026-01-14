import { GrowthStage, Item } from './types';
import { Droplets, Sprout, Sparkles, FlaskConical } from 'lucide-react';

// Updated to 2 levels per stage as requested
export const MAX_LEVEL_PER_STAGE = 2;

// Experience required to finish a specific level within a stage
// Structured as [Stage][Level - 1]
export const XP_THRESHOLDS: Record<GrowthStage, number[]> = {
  [GrowthStage.Seedling]: [150, 300],
  [GrowthStage.Sapling]: [600, 900],
  [GrowthStage.Flowering]: [1500, 2000],
  [GrowthStage.Towering]: [3500, 5000], // Last one is "Max"
};

export const STAGE_NAMES: Record<GrowthStage, string> = {
  [GrowthStage.Seedling]: "萌萌小芽",
  [GrowthStage.Sapling]: "元气幼苗",
  [GrowthStage.Flowering]: "花花盛开",
  [GrowthStage.Towering]: "星空守护神",
};

export const GAME_ITEMS: Item[] = [
  {
    id: 'water',
    name: '快乐泉水',
    description: '咕嘟咕嘟喝水啦！',
    xpValue: 25,
    unlockStage: GrowthStage.Seedling,
    icon: 'Droplets',
    color: 'bg-sky-400',
    cooldownMs: 500,
  },
  {
    id: 'fertilizer',
    name: '甜甜肥料',
    description: '营养满分长高高！',
    xpValue: 60,
    unlockStage: GrowthStage.Sapling,
    icon: 'Sprout',
    color: 'bg-orange-400',
    cooldownMs: 1500,
  },
  {
    id: 'nutrient',
    name: '彩虹药水',
    description: '注入神奇魔法！',
    xpValue: 150,
    unlockStage: GrowthStage.Flowering,
    icon: 'FlaskConical',
    color: 'bg-purple-400',
    cooldownMs: 3000,
  },
  {
    id: 'sunlight',
    name: '极光星尘',
    description: '收集宇宙的能量~',
    xpValue: 300,
    unlockStage: GrowthStage.Towering,
    icon: 'Sparkles',
    color: 'bg-yellow-400',
    cooldownMs: 5000,
  }
];