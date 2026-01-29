import { BaseDialog } from "@/components/common/BaseDialog";
import React from "react";

interface AdvancedSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export const AdvancedSearchDialog: React.FC<AdvancedSearchDialogProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => (
  <BaseDialog
    open={open}
    onOpenChange={onOpenChange}
    title={title}
    className="max-w-3xl w-full p-8"
    contentStyle={{ maxHeight: "70vh", minWidth: 600, overflowY: "auto" }}
  >
    <div className="pt-2 pb-2 px-1">{children}</div>
  </BaseDialog>
);
