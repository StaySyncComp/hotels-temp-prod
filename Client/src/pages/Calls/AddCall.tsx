import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { OrganizationsContext } from "@/contexts/OrganizationsContext";
import { useLocations } from "@/hooks/organization/useLocations";
import { useUser } from "@/hooks/useUser";
import { getCallFields } from "@/components/forms/calls/callFields";
import { callFormSchema } from "@/components/forms/calls/callFormSchema";
import DynamicForm from "@/components/forms/DynamicForm/DynamicForm";
import { createCall } from "@/api/calls";
import { z } from "zod";
import { Button } from "@/components/ui/button";

interface AddCallProps {
  defaultLocationId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddCall({
  defaultLocationId,
  onSuccess,
  onCancel,
}: AddCallProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { callCategories } = useContext(OrganizationsContext);
  const { locations } = useLocations();
  const { allUsers } = useUser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Build status options as in CallTable
  const statusOptions = Object.entries({
    OPENED: t("status_open"),
    IN_PROGRESS: t("status_in_progress"),
    COMPLETED: t("status_completed"),
    FAILED: t("status_failed"),
    ON_HOLD: t("status_on_hold"),
  }).map(([value, label]) => ({ value, label }));

  // Use the same fields as the main table
  const fields = getCallFields(
    t,
    i18n.language as "he" | "en" | "ar",
    locations,
    callCategories,
    allUsers,
    statusOptions,
  ).filter((f) => f.name !== "status");

  // Handle form submit
  const handleSubmit = async (data: z.infer<typeof callFormSchema>) => {
    setError(null);
    try {
      // Find departmentId from callCategoryId
      const category = callCategories.find(
        //@ts-ignore
        (cat) => cat.id === data.callCategoryId,
      );
      const departmentId = category?.departmentId;
      if (!departmentId) throw new Error(t("missing_department"));

      const assignedToId = data.assignedToId
        ? parseInt(data.assignedToId.toString())
        : undefined;

      // Auto-assign status based on assignment
      const status = assignedToId ? "IN_PROGRESS" : "OPENED";

      const payload = {
        ...data,
        departmentId,
        status: status as "OPENED" | "IN_PROGRESS",
        locationId: parseInt(data.locationId.toString()),
        callCategoryId: parseInt(data.callCategoryId.toString()),
        assignedToId,
      };
      await createCall(payload);
      setSuccess(true);

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          setSuccess(false);
          navigate("/calls");
        }, 1500);
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    }
  };

  return (
    <div
      className={
        onSuccess
          ? ""
          : "flex justify-center items-center min-h-[80vh] bg-muted/50"
      }
    >
      <Card
        className={
          onSuccess ? "border-0 shadow-none" : "w-full max-w-2xl shadow-lg"
        }
      >
        {!onSuccess && (
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {t("add_call")}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <DynamicForm
            mode="create"
            headerKey="call"
            fields={fields}
            validationSchema={callFormSchema}
            onSubmit={handleSubmit}
            defaultValues={{
              status: "OPENED", // Default value to satisfy z.object schema
              ...(defaultLocationId
                ? { locationId: defaultLocationId.toString() }
                : undefined),
            }}
            extraButtons={
              onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  {t("cancel")}
                </Button>
              )
            }
          />
          {success && (
            <div className="text-success text-center mt-2">{t("success")}</div>
          )}
          {error && (
            <div className="text-destructive text-center mt-2">{error}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
