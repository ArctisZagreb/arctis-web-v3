"use client";

import React from "react";
import { useId } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ReferenceDetails from "./ReferenceDetails";
import type { QueryResultReference } from "@/types/sanity";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: QueryResultReference | null | undefined;
}

const MobileReferenceModal: React.FC<MobileReferenceModalProps> = ({
  isOpen,
  onClose,
  reference,
}) => {
  const titleId = useId();

  // Don't render if not open or no reference
  if (!isOpen || !reference) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 m-0 max-w-full w-full h-full max-h-full sm:max-w-full sm:h-full flex flex-col gap-0 overflow-hidden [&>button]:hidden"
        aria-labelledby={titleId}
      >
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-slate-50 shrink-0">
          <DialogTitle
            id={titleId}
            className="text-lg font-semibold truncate"
            title={reference.client?.name || "Reference Details"}
          >
            {reference.client?.name || "Reference Details"}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="cursor-pointer"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="flex-grow">
          <div className="p-4 md:p-6">
            <ReferenceDetails reference={reference} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MobileReferenceModal;
