import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FieldConfig } from "./DynamicForm";

interface Props {
  field: FieldConfig;
  error: any;
  control: any;
  requiredFields: string[];
}

function MultiTime({ field, error, control, requiredFields }: Props) {
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
        render={({ field: controllerField }) => (
          <div className="flex flex-col gap-2">
            {(controllerField?.value || []).map((time: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => {
                    const newTimes = [...controllerField.value];
                    newTimes[idx] = e.target.value;
                    controllerField.onChange(newTimes);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    const newTimes = [...controllerField.value];
                    newTimes.splice(idx, 1);
                    controllerField.onChange(newTimes);
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                controllerField.onChange([...(controllerField.value ?? []), ""])
              }
            >
              {t("add_time")}
            </Button>
          </div>
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

export default MultiTime;
