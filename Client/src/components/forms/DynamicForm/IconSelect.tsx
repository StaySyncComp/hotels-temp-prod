import { useEffect, useState } from "react";
import { FieldConfig } from "./DynamicForm";

interface IconSelectProps {
  value?: string;
  setValue?: (val: string, name: string, label: string) => void;
  field: FieldConfig;
}

const IconSelect: React.FC<IconSelectProps> = ({ value, setValue, field }) => {
  console.log(value, "asdsad");

  const [icons, setIcons] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const base =
    "https://raw.githubusercontent.com/Hotels-Take-Over/hotels-icons/refs/heads/main/icons/";

  useEffect(() => {
    async function fetchIcons() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/Hotels-Take-Over/hotels-icons/contents/icons"
        );
        const data = await res.json();
        const parsed = data.map((f: any) => ({
          name: f.name.replace(".svg", ""),
          url: f.download_url,
        }));
        setIcons(parsed);
      } catch (e) {
        console.error("Failed to load icons", e);
      } finally {
        setLoading(false);
      }
    }
    fetchIcons();
  }, []);

  if (loading) return <p>Loading icons…</p>;

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm font-medium">Select Icon</p>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-auto border rounded-md p-2">
        {icons.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => {
              setValue(field.name, icon.name, { shouldDirty: true });
              console.log("clicked");
            }}
            className={`p-2 border rounded hover:bg-gray-100 ${
              value === icon.name ? "border-blue-500 bg-blue-50" : ""
            }`}
          >
            <img src={icon.url} alt={icon.name} className="w-6 h-6 mx-auto" />
          </button>
        ))}
      </div>
      {value && (
        <div className="flex items-center gap-2 mt-2">
          <img src={`${base}${value}.svg`} alt={value} className="w-6 h-6" />
          <span className="text-sm">{value}</span>
        </div>
      )}
    </div>
  );
};

export default IconSelect;
