import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function Modal({
  children,
  field,
  handleSubmit,
}: {
  children: ReactNode;
  field: string;
  handleSubmit?: () => void;
}) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-main text-white">
      <DialogHeader>
        <DialogTitle className="mb-2">{`Edit ${field}`}</DialogTitle>
        <DialogDescription>
          {`Make changes to your ${field}. Click save when you're done.`}
        </DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>
        {handleSubmit ? (
          <Button
            onClick={handleSubmit}
            className="bg-main"
            variant="outline"
            type="submit"
          >
            Save changes
          </Button>
        ) : null}
      </DialogFooter>
    </DialogContent>
  );
}
