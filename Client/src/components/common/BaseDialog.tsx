import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface BaseDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  // content specific
  contentStyle?: React.CSSProperties;
  onClickContent?: (e: React.MouseEvent) => void;
}

export function BaseDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  children,
  className,
  titleClassName,
  descriptionClassName,
  contentStyle,
  onClickContent,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-slate-800 p-0 gap-0 overflow-hidden",
          className,
        )}
        style={contentStyle}
        onClick={onClickContent}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className={titleClassName}>{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription className={descriptionClassName}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="p-6">{children}</div>
        {footer && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
            <DialogFooter>{footer}</DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
