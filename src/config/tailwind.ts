export type TailwindVersion = 'tw3-hsl' | 'tw4-oklch';

// Константа для выбора версии Tailwind
export const TAILWIND_VERSION: TailwindVersion = 
  (import.meta.env.VITE_TAILWIND_VERSION as TailwindVersion) || 'tw4-oklch';

export const TAILWIND_CONFIG = {
  'tw3-hsl': {
    version: '3.x',
    colorModel: 'hsl',
    features: ['hsl-colors', 'legacy-compat', 'postcss'],
    cssPath: 'tw3-hsl',
    description: 'Tailwind CSS 3.x with HSL color model for maximum browser compatibility'
  },
  'tw4-oklch': {
    version: '4.x', 
    colorModel: 'oklch',
    features: ['oklch-colors', 'modern-css', 'css-variables', '@theme'],
    cssPath: 'tw4-oklch',
    description: 'Tailwind CSS 4.x with OKLCH color model for better color perception'
  }
} as const;

// Глобальная переменная для проверки в runtime
declare global {
  const __TAILWIND_VERSION__: TailwindVersion;
}

// Runtime проверка версии Tailwind
export function getCurrentTailwindVersion(): TailwindVersion {
  if (typeof __TAILWIND_VERSION__ !== 'undefined') {
    return __TAILWIND_VERSION__;
  }
  return TAILWIND_VERSION;
}

// Получить информацию о текущей конфигурации
export function getTailwindInfo() {
  const currentVersion = getCurrentTailwindVersion();
    return {
      currentVersion,
    ...TAILWIND_CONFIG[currentVersion]
  };
}

// Проверить, поддерживает ли браузер oklch
export function supportsOklch(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }
  return CSS.supports('color', 'oklch(0.7 0.15 0)');
}

// Определить оптимальную версию для браузера
export function getOptimalTailwindVersion(): TailwindVersion {
  return supportsOklch() ? 'tw4-oklch' : 'tw3-hsl';
}