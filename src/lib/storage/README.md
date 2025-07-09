# Новая архитектура хранения данных BuildY

## Обзор

Вся система хранения данных была переработана для использования централизованной архитектуры через `HybridStorage`. Теперь используется только **2 ключа** в localStorage:

- `darkMode` - настройка темного режима
- `project` - все данные проекта (блоки, коллекции, темы, избранное)

## Основные преимущества

✅ **Централизованное управление** - все данные в одном месте  
✅ **Сессионный режим** - возможность работы только в рамках сессии  
✅ **Автоматическая синхронизация** - данные синхронизируются между памятью и хранилищем  
✅ **Гибридный кэш** - быстрая работа с оперативной памятью  
✅ **Простое API** - упрощенные хуки для всех операций  

## Структура проекта

```typescript
interface ProjectState {
  name: string;
  id: string;
  version: string;
  blocks: any[];              // Блоки в canvas
  theme: {
    currentThemeId: string;
    customThemes: CustomTheme[];
  };
  collections: Collection[];   // Все коллекции
  savedBlocks: SavedBlock[];   // Сохраненные блоки
  favorites: string[];         // Избранные шаблоны
  metadata: {
    createdAt: string;
    lastModified: string;
    version: string;
  };
}
```

## Использование

### Основной хук
```typescript
import { useHybridStorage } from '@/hooks/useHybridStorage';

const {
  // Состояние
  stats,
  isLoading,
  
  // Проект
  getProject,
  updateProjectBlocks,
  clearProjectBlocks,
  
  // Темы
  getCurrentTheme,
  setCurrentTheme,
  
  // Коллекции
  getCollections,
  saveCollection,
  clearCollections,
  
  // Избранное
  getFavorites,
  toggleFavorite,
  
  // Сессия
  enableSessionMode,
  disableSessionMode,
  isSessionMode,
  
  // Утилиты
  fullReset,
  exportProject,
  importProject
} = useHybridStorage();
```

### Упрощенные хуки (совместимость)
```typescript
// Эти хуки теперь используют HybridStorage под капотом
import { useProject } from '@/hooks/useProject';
import { useTheme } from '@/hooks/useTheme';
import { useCollections } from '@/hooks/useCollections';
import { useFavorites } from '@/hooks/useFavorites';
```

## Режимы работы

### Обычный режим (по умолчанию)
- Данные сохраняются в `localStorage`
- Данные остаются после закрытия браузера
- Автоматическая синхронизация каждые 5 секунд

### Сессионный режим
- Данные сохраняются только в `sessionStorage`
- Данные удаляются при закрытии браузера
- Полезно для временной работы или демонстраций

```typescript
// Включение сессионного режима
enableSessionMode();

// Проверка режима
const isSession = isSessionMode();

// Отключение сессионного режима
disableSessionMode();
```

## Кнопки очистки

### В Navigation (общие)
- **Session Mode** - переключение между localStorage и sessionStorage
- **Clear Collections** - очистка только коллекций (для Pins страницы)
- **Clear Project** - очистка только canvas (для Builder страницы)  
- **Full Reset & Reload** - полная очистка всех данных + перезагрузка

### Специфичные для страниц
- **Pins**: кнопка очистки удаляет только коллекции
- **Builder**: кнопка очистки удаляет только блоки canvas

## Инициализация

При старте приложения:
1. `sessionStorage` полностью очищается
2. Загружаются данные из `localStorage` или создается дефолтный проект
3. Запускается таймер автосинхронизации
4. Данные кэшируются в памяти для быстрого доступа

## Статистика и отладка

В development режиме внизу страницы отображается строка статистики:
```
Project: My Project | Blocks: 5 | Collections: 4 | Favorites: 2 | Storage: LocalStorage | Memory: 25.3KB | Last Sync: 10:30:45
```

## Миграция

Старые файлы удалены:
- ❌ `collectionStorage.ts`
- ❌ `darkModeStorage.ts` 
- ❌ `projectStorage.ts`

Вся логика теперь централизована в `HybridStorage`. 