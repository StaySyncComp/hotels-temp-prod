import { Combobox } from "@/components/ui/combobox";
import React from "react";
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

function AutocompleteCase({
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
        defaultValue={defaultValues?.[field.name] || ""}
        render={({ field: controllerField }) => (
          <Combobox
            value={controllerField.value}
            onChange={controllerField.onChange}
            options={field.options ?? []}
            label={t("select_option")}
            className="h-[38px]"
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

export default AutocompleteCase;
