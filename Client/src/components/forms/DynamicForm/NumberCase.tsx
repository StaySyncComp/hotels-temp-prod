import { Input } from "@/components/ui/Input";
import { useTranslation } from "react-i18next";
import { FieldConfig } from "./DynamicForm";

interface Props {
  field: FieldConfig;
  error: any;
  register: any;
  requiredFields: string[];
  setValue: any;
}

function NumberCase({
  field,
  error,
  register,
  requiredFields,
  setValue,
}: Props) {
  const { t } = useTranslation();
  return (
    <div key={field.name} className="flex flex-col gap-1 w-56">
      <label>
        {t(field.label)}
        {requiredFields.includes(field.name) && (
          <span className="text-red-500 ml-1">{t("form.required_field")}</span>
        )}
      </label>
      <Input
        type="number"
        min={1}
        {...register(field.name)}
        onChange={(e) => setValue(field.name, Number(e.target.value))}
      />
      {error && (
        <span className="text-red-500 text-sm">
          {t("form.error_message")}: {error.message as string}
        </span>
      )}
    </div>
  );
}

export default NumberCase;
