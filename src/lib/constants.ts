export const LEAF_CATEGORIES = {
  long_leaf: {
    key: 'long_leaf' as const,
    name: '长条叶',
    description: '又长又窄，像小剑一样',
    emoji: '🌿',
    color: '#4CAF50',
    lightColor: '#E8F5E9',
  },
  round_leaf: {
    key: 'round_leaf' as const,
    name: '圆圆叶',
    description: '形状比较圆',
    emoji: '🍀',
    color: '#66BB6A',
    lightColor: '#F1F8E9',
  },
  tooth_leaf: {
    key: 'tooth_leaf' as const,
    name: '锯齿叶',
    description: '边缘像小牙齿',
    emoji: '🍂',
    color: '#2E7D32',
    lightColor: '#E8F5E9',
  },
  big_leaf: {
    key: 'big_leaf' as const,
    name: '大菜叶',
    description: '又大又宽，比较柔软',
    emoji: '🥬',
    color: '#43A047',
    lightColor: '#E8F5E9',
  },
} as const;

export type LeafCategoryKey = keyof typeof LEAF_CATEGORIES;

export const MISTAKE_REASONS = [
  { key: 'blurry', label: '照片太模糊' },
  { key: 'messy_bg', label: '背景太乱' },
  { key: 'too_few', label: '样本太少' },
  { key: 'incomplete', label: '叶子没有拍完整' },
  { key: 'too_similar', label: '两种叶子太像' },
  { key: 'too_dark', label: '光线太暗' },
  { key: 'wrong_label', label: '分类可能放错了' },
];

export const PHOTO_TIPS = [
  '一张照片只拍一片叶子',
  '叶子放在白色背景上',
  '不要用手挡住叶子',
  '光线要明亮但不要直射',
  '拍清楚、拍完整',
  '背景要干净',
];
