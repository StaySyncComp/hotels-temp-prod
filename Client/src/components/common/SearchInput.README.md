# SearchInput Component

A reusable, RTL-aware search input component for the StaySync application.

## Features

✅ **RTL Support**: Automatically positions the search icon based on language direction

- Left side for LTR languages (English)
- Right side for RTL languages (Hebrew, Arabic)

✅ **Flexible Sizing**: Customizable width and height for any layout

✅ **Fully Typed**: TypeScript support with proper type inference

✅ **Accessible**: Inherits all accessibility features from the base Input component

✅ **Customizable**: Support for custom icons, styling, and event handlers

## Usage

### Basic Usage

```tsx
import { SearchInput } from "@/components/common/SearchInput";

function MyComponent() {
  return <SearchInput placeholder="Search..." />;
}
```

### Custom Width and Height

```tsx
<SearchInput width="w-full" height="h-14" placeholder="Search..." />
```

### With Custom Icon

```tsx
import { Filter } from "lucide-react";

<SearchInput searchIcon={<Filter />} placeholder="Filter results..." />;
```

### Controlled Component

```tsx
const [search, setSearch] = useState("");

<SearchInput
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search..."
/>;
```

### With Event Handlers

```tsx
<SearchInput
  placeholder="Search..."
  onChange={(e) => console.log(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      // Handle search
    }
  }}
/>
```

## Props

| Prop                 | Type              | Default          | Description                                  |
| -------------------- | ----------------- | ---------------- | -------------------------------------------- |
| `width`              | `string`          | `"w-[340px]"`    | Width class (Tailwind or custom CSS)         |
| `height`             | `string`          | `"h-11"`         | Height class (Tailwind or custom CSS)        |
| `searchIcon`         | `React.ReactNode` | `<Search />`     | Custom search icon                           |
| `iconSize`           | `string`          | `"child:size-5"` | Icon size class                              |
| `containerClassName` | `string`          | `undefined`      | Additional container classes                 |
| All Input props      | -                 | -                | Inherits all props from base Input component |

## RTL Behavior

The component uses the base `Input` component's `icon` prop, which automatically handles RTL positioning:

- **LTR (English)**: Icon appears on the left (start of input)
- **RTL (Hebrew/Arabic)**: Icon appears on the right (start of input in RTL)

This is handled automatically by the Input component's internal logic using Tailwind's `rtl:` and `ltr:` directives.

## Examples

See `SearchInputExamples.tsx` for comprehensive usage examples.

## Component Location

**File**: `Client/src/components/common/SearchInput.tsx`

## Related Components

- `Input` - Base input component (`@/components/ui/Input`)
- Uses `useRTL` hook for RTL detection (indirectly through base components)

## Migration from Direct Input Usage

Before:

```tsx
<Input
  className="w-[340px] h-11 bg-surface border-border focus:bg-white focus:border-blue-400 transition-all rounded-3xl"
  placeholder={tCommon("search")}
/>
```

After:

```tsx
<SearchInput placeholder={tCommon("search")} />
```

## Technical Details

The component leverages the existing `Input` component's RTL support:

- Uses Tailwind's `rtl:` and `ltr:` directives for icon positioning
- Icon padding automatically adjusts based on direction
- Input text alignment adjusts based on language direction
