import { DatePicker } from "@/components/ui/date-picker";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FieldConfig } from "./DynamicForm";

interface Props {
  field: FieldConfig;
  error: any;
  control: any;
  requiredFields: string[];
  defaultValues: any;
}

function DateCase({
  field,
  error,
  control,
  requiredFields,
  defaultValues,
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
      <Controller
        name={field.name}
        control={control}
        defaultValue={defaultValues?.[field.name] || undefined}
        render={({ field: controllerField }) => (
          <DatePicker
            date={
              controllerField.value
                ? new Date(controllerField.value)
                : undefined
            }
            onSelect={(date) => controllerField.onChange(date?.toISOString())}
          />
        )}
      />
      {error && (
        <span className="text-red-500 text-sm">
          {t("form.error_message")}: {error.message as string}
        </span>
      )}
    </div>
  );
}

export default DateCase;
