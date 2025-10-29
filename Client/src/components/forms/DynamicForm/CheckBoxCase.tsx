import React from "react";
import { useTranslation } from "react-i18next";
import { FieldConfig } from "./DynamicForm";
interface Props {
  field: FieldConfig;
  error: any;
  register: any;
  requiredFields: string[];
  defaultValues: any;
}
function CheckBoxCase({
  field,
  error,
  register,
  requiredFields,
  defaultValues,
}: Props) {
  const { t } = useTranslation();
  return (
    <div key={field.name} className="flex items-center gap-2 w-56">
      <input
        type="checkbox"
        {...register(field.name)}
        defaultChecked={defaultValues?.[field.name]}
        className="w-4 h-4"
      />
      <label>
        {t(field.label)}
        {requiredFields.includes(field.name) && (
          <span className="text-red-500 ml-1">{t("form.required_field")}</span>
        )}
      </label>
      {error && (
        <span className="text-red-500 text-sm">
          {t("form.error_message")}: {error.message as string}
        </span>
      )}
    </div>
  );
}

export default CheckBoxCase;
