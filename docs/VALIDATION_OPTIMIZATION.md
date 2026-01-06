# Оптимизация валидации в wizzard-stepper-react

## Проблема

При использовании асинхронной валидации в визарде с несколькими полями, валидация выполнялась **последовательно**, что приводило к значительным задержкам.

### Пример медленной валидации (ДО оптимизации)

```typescript
// ❌ МЕДЛЕННО: Последовательная валидация
async validate(data: FormData): Promise<ValidationResult> {
  const errors: Record<string, string> = {};
  
  for (const [field, validator] of Object.entries(this.rules)) {
    const error = await validator(data[field], data); // Ждем каждую валидацию!
    if (error) {
      errors[field] = error;
    }
  }
  
  return { isValid: Object.keys(errors).length === 0, errors };
}
```

**Время выполнения:**
- Поле 1: 100мс (email check)
- Поле 2: 80мс (username check)
- Поле 3: 50мс (phone check)
- **Итого: 230мс** ⏱️

Если полей 10 и каждая валидация занимает ~100мс:
- **Итого: ~1000мс (1 секунда!)** 🐌

---

## Решение: Параллельная валидация

Используем `Promise.all()` для одновременного выполнения всех валидаций:

```typescript
// ✅ БЫСТРО: Параллельная валидация
async validate(data: FormData): Promise<ValidationResult> {
  const errors: Record<string, string> = {};

  // ⚡ Все валидаторы запускаются одновременно
  const validationPromises = Object.entries(this.rules).map(
    async ([field, validator]) => {
      const error = await validator(data[field], data);
      return { field, error };
    }
  );

  // Ждем завершения ВСЕХ валидаций
  const results = await Promise.all(validationPromises);

  // Собираем ошибки
  let isValid = true;
  for (const { field, error } of results) {
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
}
```

**Время выполнения:**
- Все поля валидируются **одновременно**
- **Итого: max(100мс, 80мс, 50мс) = 100мс** ⚡

Для 10 полей:
- **Итого: ~100мс (самая медленная валидация)** 🚀
- **Ускорение в 10 раз!**

---

## Результаты оптимизации

| Количество полей | До оптимизации | После оптимизации | Ускорение |
|------------------|----------------|-------------------|-----------|
| 2 поля | 200мс | 100мс | **2x** |
| 5 полей | 500мс | 100мс | **5x** |
| 10 полей | 1000мс | 100мс | **10x** |
| 20 полей | 2000мс | 100мс | **20x** |

---

## Применение в проекте

### 1. Обновите ваш ValidationAdapter

```typescript
// src/adapters/MyValidationAdapter.ts
class MyValidationAdapter implements IValidatorAdapter<T> {
  async validate(data: T): Promise<ValidationResult> {
    // ⚡ Используйте Promise.all для параллельной валидации
    const validationPromises = Object.entries(this.rules).map(
      async ([field, validator]) => {
        const error = await validator(data[field], data);
        return { field, error };
      }
    );

    const results = await Promise.all(validationPromises);
    
    const errors: Record<string, string> = {};
    let isValid = true;
    
    for (const { field, error } of results) {
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }
}
```

### 2. Для Zod/Yup адаптеров

Библиотеки Zod и Yup уже оптимизированы и выполняют валидацию эффективно:

```typescript
import { ZodAdapter } from 'wizzard-stepper-react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email().refine(async (email) => {
    // Асинхронная проверка
    return await checkEmailExists(email);
  }),
  username: z.string().refine(async (username) => {
    // Асинхронная проверка
    return await checkUsernameAvailable(username);
  }),
});

// ✅ Zod автоматически оптимизирует валидацию
const adapter = new ZodAdapter(schema);
```

---

## Дополнительные оптимизации

### 1. Debounce для onChange валидации

```typescript
const config: IWizardConfig = {
  validationMode: 'onChange',
  validationDebounceTime: 300, // Задержка перед валидацией
};
```

### 2. Кэширование результатов валидации

```typescript
class CachedValidator {
  private cache = new Map<string, Promise<string | null>>();

  async validate(value: string): Promise<string | null> {
    const cacheKey = JSON.stringify(value);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const promise = this.performValidation(value);
    this.cache.set(cacheKey, promise);
    
    return promise;
  }

  private async performValidation(value: string): Promise<string | null> {
    // Ваша логика валидации
    await new Promise(resolve => setTimeout(resolve, 100));
    return null;
  }
}
```

### 3. Отмена предыдущих запросов (AbortController)

```typescript
class OptimizedValidator {
  private abortController: AbortController | null = null;

  async validate(value: string): Promise<string | null> {
    // Отменяем предыдущий запрос
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        body: JSON.stringify({ value }),
        signal,
      });

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        return null; // Запрос был отменен
      }
      throw error;
    }
  }
}
```

---

## Лучшие практики

1. **✅ Всегда используйте параллельную валидацию** для независимых полей
2. **✅ Добавьте debounce** для onChange валидации (300-500мс)
3. **✅ Кэшируйте результаты** для одинаковых значений
4. **✅ Отменяйте устаревшие запросы** при быстром вводе
5. **✅ Показывайте лоадеры** во время асинхронной валидации
6. **❌ Не валидируйте на каждый keystroke** без debounce
7. **❌ Не делайте последовательные запросы** если они независимы

---

## Измерение производительности

```typescript
// Добавьте логирование для измерения времени валидации
async validate(data: T): Promise<ValidationResult> {
  const startTime = performance.now();
  
  // Ваша валидация...
  const result = await this.performValidation(data);
  
  const endTime = performance.now();
  console.log(`Validation took ${endTime - startTime}ms`);
  
  return result;
}
```

---

## Заключение

Параллельная валидация с `Promise.all()` - это простая и эффективная оптимизация, которая может ускорить валидацию в **10-20 раз** при наличии нескольких асинхронных валидаторов.

**Результат:**
- ❌ Было: ~1000мс для 10 полей
- ✅ Стало: ~100мс для 10 полей
- 🚀 Ускорение: **10x**

**Дата:** 2026-01-06
