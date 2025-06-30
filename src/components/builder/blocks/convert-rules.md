## 📋 Инструкция по адаптации блоков под конструктор

### 🎯 **Основные требования для блоков:**

#### 1. **Структура файла блока:**
```tsx
// 1. Импорты
import { ComponentName } from "@/components/ui/component";

// 2. Интерфейс пропсов
interface BlockNameProps {
  content: {
    // Поля контента
  };
}

// 3. Компонент блока (default export)
export default function BlockName({ content }: BlockNameProps) {
  return (
    // JSX разметка
  );
}

// 4. Шаблон блока (named export)
export const blockNameTemplate = {
  id: "blockId",
  name: "Block Name",
  description: "Block description",
  component: BlockName,
  defaultContent: {
    // Значения по умолчанию
  }
};
```

#### 2. **Стилизация (обязательно):**
- ✅ Использовать только CSS переменные shadcn/ui
- ✅ Поддержка темного режима через токены и модификатором dark:
- ✅ Адаптивный дизайн (mobile-first)

**Цветовые токены:**
```tsx
// Правильно ✅ shadcn/ui colors
className="bg-background text-foreground"
className="text-muted-foreground"
className="bg-primary text-primary-foreground"
className="bg-card text-card-foreground"
className="border-border"

// Неправильно ❌
className="bg-white text-black"
className="text-gray-500"
className="bg-blue-600 text-white"
```

#### 3. **Структура контента:**
```tsx
interface BlockProps {
  content: {
    // Простые поля вместо сложных объектов
    title: string;
    subtitle: string;
    buttonText: string;
    // Массивы для повторяющихся элементов
    items?: Array<{
      title: string;
      description: string;
    }>;
  };
}
```

#### 4. **Компоненты UI:**
- ✅ Использовать только компоненты из `@/components/ui/`
- ✅ Правильные размеры: `size="lg"` для кнопок
- ✅ Единообразные отступы: `py-20 px-6`

#### 5. **Анимации и интерактивность:**
```tsx
// Стандартные hover эффекты
className="hover:scale-105 transition-all duration-300"
className="group-hover:translate-x-1 transition-transform"
className="hover:shadow-lg transition-shadow"
```

### 🔧 **Пошаговая адаптация:**

#### **Шаг 1: Исправить типизацию**
```tsx
// Было ❌
import { Badge, type BadgeProps } from "@/components/ui/badge";

// Стало ✅
import { Badge } from "@/components/ui/badge";
```

#### **Шаг 2: Упростить интерфейс**
```tsx
// Было ❌
type Content = {
  badge?: BadgeProps & { text: string };
  buttons?: (ButtonProps & { id: string; text: string })[];
};

// Стало ✅
interface BlockProps {
  content: {
    badge?: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}
```

#### **Шаг 3: Привести к стандартной структуре**
```tsx
// Было ❌
export const ComponentName = (props: Props) => {
  const { badge, title } = { ...content, ...props };
  return <section>...</section>;
};

// Стало ✅
export default function ComponentName({ content, isPreview = false }: Props) {
  return <section>...</section>;
}
```

#### **Шаг 4: Добавить шаблон**
```tsx
export const blockTemplate = {
  id: "uniqueId",           // Уникальный ID
  name: "Display Name",     // Отображаемое имя
  description: "Brief desc", // Краткое описание
  component: BlockName,     // Ссылка на компонент
  defaultContent: {         // Данные по умолчанию
    title: "Default Title",
    // ... другие поля
  }
};
```

#### **Шаг 5: Обновить index.ts**
```tsx
// Добавить импорт
import NewBlock, { newBlockTemplate } from "./NewBlock";

// Добавить в экспорты
export { NewBlock, newBlockTemplate };

// Добавить в массив шаблонов
export const allTemplates = [
  // ... существующие
  newBlockTemplate
];

// Добавить в объект компонентов
export const allComponents = {
  // ... существующие
  newBlock: NewBlock
};
```

### 🎨 **Примеры правильной стилизации:**

#### **Секция:**
```tsx
<section className="py-20 px-6 bg-background">
  <div className="max-w-6xl mx-auto">
    {/* Контент */}
  </div>
</section>
```

#### **Карточки:**
```tsx
<Card className="hover:shadow-lg transition-all duration-300 border border-border bg-card">
  <CardContent className="p-6">
    {/* Контент карточки */}
  </CardContent>
</Card>
```

### ⚠️ **Частые ошибки:**

1. **Не экспортировать шаблон** - обязательно добавлять `export const template`
2. **Использовать жесткие цвета** - только CSS переменные
3. **Сложная типизация** - упрощать интерфейсы
4. **Забыть `isPreview`** - всегда добавлять этот проп
5. **Не обновить index.ts** - обязательно добавлять новые блоки

Теперь HeroCenterBlock полностью адаптирован под наш конструктор и готов к использованию! 🎉