import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (jsonData: string) => void;
}

export default function ImportProjectDialog({
  open,
  onOpenChange,
  onImport
}: ImportProjectDialogProps) {
  const [importJson, setImportJson] = useState("");

  const handleImport = () => {
    try {
      onImport(importJson);
      setImportJson("");
      onOpenChange(false);
    } catch (error) {
      alert("Invalid JSON format. Please check your project file.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="import-json">Paste your project JSON:</Label>
            <textarea
              id="import-json"
              className="w-full h-32 p-3 mt-2 text-sm border rounded-md bg-background"
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste your exported project JSON here..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport}>
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 