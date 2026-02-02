import { UploadCloud } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FieldConfig } from "./DynamicForm";

interface Props {
  field: FieldConfig;
  error: any;
  setValue: any;
  preview: string | null;
}

function ImageCase({ field, error, setValue, preview }: Props) {
  const { t } = useTranslation();
  return (
    <div key={field.name} className="flex flex-col items-start gap-2 h-full">
      <label>{t(field.label)}</label>
      <label
        htmlFor="picture-upload"
        className="w-32 h-32 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer relative overflow-hidden bg-surface"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full object-cover rounded-lg"
          />
        ) : (
          <UploadCloud className="w-10 h-10 text-gray-500" />
        )}
      </label>
      <input
        id="picture-upload"
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setValue(field.name, e.target.files[0]);
          }
        }}
      />
      {error && (
        <span className="text-red-500 text-sm">
          {t("form.error_message")}: {error.message as string}
        </span>
      )}
    </div>
  );
}

export default ImageCase;
