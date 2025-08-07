# Business Blocks

Коллекция бизнес-блоков для создания корпоративных веб-сайтов.

## Структура

### GridBusiness

Блоки с гридовой системой для отображения информации в виде карточек.

**Варианты:**
- `cardsGallery` - Галерея сервисов с иконками
- `solutionsGrid` - Сетка бизнес-решений  
- `pricing` - Планы тарифов
- `pricingYear` - Тарифы с годовой подпиской
- `career` - Вакансии

### SplitBusiness

Блоки с разделенной компоновкой (контент + медиа).

**Варианты:**
- `solutions` - Бизнес-решения с метриками
- `metrics` - Показатели достижений
- `testimonial` - Отзывы клиентов
- `features` - Возможности платформы
- `about` - О компании

## Использование

### GridBusiness

```tsx
import { GridBusiness } from '@/components/blocks/business';

// Галерея сервисов
<GridBusiness 
  variant="cardsGallery"
  templateId="gridBusinessCardsGallery"
  cols="1-2-3"
  useContainer={true}
/>

// Планы тарифов
<GridBusiness 
  variant="pricing"
  templateId="gridBusinessPricing"
  cols="1-2-3"
  className="bg-gradient-to-b from-primary/5"
/>
```

### SplitBusiness

```tsx
import { SplitBusiness } from '@/components/blocks/business';

// Бизнес-решения
<SplitBusiness 
  variant="solutions"
  templateId="splitBusinessSolutions"
  leftMedia={false}
  useContainer={true}
/>

// Отзывы
<SplitBusiness 
  variant="testimonial"
  templateId="splitBusinessTestimonial"
  leftMedia={true}
  className="bg-gradient-to-r from-primary/5"
/>
```

## Контент

Блоки используют предопределенный контент из `content.ts`, который включает:

- Бизнес-карточки с иконками Lucide
- Решения с статистикой и изображениями
- Планы тарифов с функциями
- Вакансии с информацией о зарплате
- Метрики и показатели
- Отзывы клиентов
- Ценности компании

## Кастомизация

### Передача собственного контента

```tsx
const customContent = {
  title: "Наши услуги",
  description: "Описание услуг",
  cards: [
    {
      id: "1",
      title: "Аналитика",
      description: "Продвинутая аналитика данных",
      lucideIcon: BarChart
    }
  ]
};

<GridBusiness 
  content={customContent}
  variant="cardsGallery"
/>
```

### Стилизация

```tsx
<GridBusiness 
  className="bg-gradient-to-b from-blue-50 to-white"
  variant="pricing"
/>

<SplitBusiness 
  className="py-24 bg-gray-50"
  variant="about"
/>
```

## Адаптивность

Все блоки полностью адаптивны:
- **Mobile**: Одна колонка
- **Tablet**: Две колонки
- **Desktop**: Три колонки (или по настройке)

## Иконки

Используются иконки из библиотеки Lucide React:
- `BarChart`, `Building`, `Users`
- `Shield`, `Cloud`, `Smartphone`
- `Code`, `Database`, `Globe`
- `Rocket`, `Target`, `Award`
- `Zap`, `Clock`, `DollarSign`

## Примеры templateId

### GridBusiness
- `gridBusinessCardsGallery`
- `gridBusinessSolutionsGrid`
- `gridBusinessPricing`
- `gridBusinessPricingYear`
- `gridBusinessCareer`

### SplitBusiness
- `splitBusinessSolutions`
- `splitBusinessMetrics`
- `splitBusinessTestimonial`
- `splitBusinessFeatures`
- `splitBusinessAbout`