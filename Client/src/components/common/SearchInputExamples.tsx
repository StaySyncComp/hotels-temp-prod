import { SearchInput } from "@/components/common/SearchInput";
import { Filter } from "lucide-react";

/**
 * SearchInput Component Usage Examples
 *
 * This file demonstrates various ways to use the SearchInput component
 */

export function SearchInputExamples() {
  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">SearchInput Component Examples</h1>

      {/* Example 1: Default usage */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">1. Default Usage</h2>
        <p className="text-sm text-muted-foreground">
          Standard search input with default width (340px) and height (44px)
        </p>
        <SearchInput placeholder="Search..." />
      </div>

      {/* Example 2: Custom width */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">2. Full Width</h2>
        <p className="text-sm text-muted-foreground">
          Search input that spans the full container width
        </p>
        <SearchInput width="w-full" placeholder="Search full width..." />
      </div>

      {/* Example 3: Custom height */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">3. Large Size</h2>
        <p className="text-sm text-muted-foreground">
          Larger search input for better visual prominence
        </p>
        <SearchInput
          width="w-96"
          height="h-14"
          placeholder="Large search input..."
        />
      </div>

      {/* Example 4: Small size */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">4. Compact Size</h2>
        <p className="text-sm text-muted-foreground">
          Smaller search input for compact layouts
        </p>
        <SearchInput
          width="w-64"
          height="h-9"
          placeholder="Compact search..."
        />
      </div>

      {/* Example 5: Custom icon */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">5. Custom Icon</h2>
        <p className="text-sm text-muted-foreground">
          Using a filter icon instead of the default search icon
        </p>
        <SearchInput searchIcon={<Filter />} placeholder="Filter results..." />
      </div>

      {/* Example 6: With custom styling */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">6. Custom Styling</h2>
        <p className="text-sm text-muted-foreground">
          Search input with custom background and border colors
        </p>
        <SearchInput
          placeholder="Custom styled search..."
          className="bg-blue-50 border-blue-300 focus:border-blue-500"
        />
      </div>

      {/* Example 7: Controlled input */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">7. Controlled Component</h2>
        <p className="text-sm text-muted-foreground">
          Controlled search input with state management
        </p>
        <ControlledSearchExample />
      </div>

      {/* Example 8: With onChange handler */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">8. With Event Handler</h2>
        <p className="text-sm text-muted-foreground">
          Search input that logs changes to console
        </p>
        <SearchInput
          placeholder="Type to see console logs..."
          onChange={(e) => console.log("Search value:", e.target.value)}
        />
      </div>

      {/* RTL Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">RTL Support</h3>
        <p className="text-sm text-blue-800">
          The SearchInput component automatically adapts to RTL languages
          (Hebrew/Arabic). The search icon will appear on the right side in RTL
          mode and on the left side in LTR mode. Try changing the language to
          see this in action.
        </p>
      </div>
    </div>
  );
}

// Controlled search example
function ControlledSearchExample() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="space-y-2">
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Controlled search..."
      />
      <p className="text-sm text-muted-foreground">
        Current value:{" "}
        <span className="font-mono">{searchValue || "(empty)"}</span>
      </p>
    </div>
  );
}

import React from "react";
