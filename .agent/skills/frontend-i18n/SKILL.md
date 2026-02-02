---
name: frontend-i18n
description: Handles Internationalization (i18n), RTL support, and data localization. Use when working on multi-language features or text formatting.
---

# Frontend Internationalization (i18n) & RTL

## When to use this skill

- Adding new content that requires translation.
- Implementing features that must support RTL (Right-to-Left) languages like Hebrew/Arabic.
- Formatting dates or accessing localized data objects.

## Core Hook: `useRTL`

**Path**: `@/hooks/useRtl`

This is the primary hook for all directionality logic.

### API

```typescript
const {
  isRtl, // boolean: true if language is 'he' or 'ar'
  textAlign, // string: "text-right" | "text-left"
  flexDirection, // string: "flex-row-reverse" | "flex-row"
  rtlStyles, // string: combined classes e.g. "flex-row-reverse text-right"
  getNameByLanguage, // func: (obj: {he, en}) => string
  formatDate, // func: (dateString) => formatted string (localized)
} = useRTL();
```

### Usage Patterns

#### 1. Conditional Layouts

Always use `isRtl` or the helper strings to control layout direction. Do NOT hardcode `flex-row-reverse` unless strictly necessary.

```tsx
// ✅ Correct
<div className={`flex gap-2 ${flexDirection}`}>
  <span>Icon</span>
  <span>Text</span>
</div>

// ❌ Avoid
<div className={isRtl ? "flex-row-reverse" : "flex-row"}>...</div>
```

#### 2. Localized Data Access

Backend often returns objects for names: `{ en: "Name", he: "שם" }`.
Use `getNameByLanguage` or manual lookup.

```tsx
// ✅ Using helper
<div>{getNameByLanguage(item.name)}</div>

// ✅ Manual (if helper not available)
<div>{item.name[i18n.language as "he" | "en"]}</div>
```

#### 3. Date Formatting

Dates should be formatted according to the locale.

```tsx
<span>{formatDate(item.createdAt)}</span>
// Result: "12/01/2024, 14:00" (format varies by locale)
```

## Translations (`react-i18n`)

- **Hook**: `useTranslation()`
- **Keys**: stored in `Client/src/i18n/locales`.

```tsx
const { t } = useTranslation();
<h1>{t("page_title")}</h1>;
```

## CSS Utilities (Tailwind)

Use Tailwind's logical properties or direction modifiers for simple cases:

- `rtl:text-right`
- `ltr:text-left`
- `rtl:ml-2` (margin-left only in RTL)

```tsx
<div className="pl-4 rtl:pr-4 rtl:pl-0">Content with padding start</div>
```
