import { BaseDialog } from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { Loader } from "lucide-react";

interface AreYouSureDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void | Promise<void>;
  children: ReactNode; // Dialog trigger
}

const AreYouSureDialog: React.FC<AreYouSureDialogProps> = ({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  onConfirm,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <BaseDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        footer={
          <>
            <Button
              variant={isDangerous ? "destructive" : "default"}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : confirmText}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
          </>
        }
      />
    </>
  );
};

export default AreYouSureDialog;
