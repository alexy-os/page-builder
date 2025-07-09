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
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!importJson.trim()) {
      setError("Please paste project JSON data");
      return;
    }

    setIsImporting(true);
    setError(null);

    try {
      // Validate JSON format first
      JSON.parse(importJson);
      
      // Call the import function
      onImport(importJson);
      
      // Success
      setImportJson("");
      setError(null);
      onOpenChange(false);
      
      // Show success message
      setTimeout(() => {
        alert("Project imported successfully!");
      }, 100);
      
    } catch (error) {
      console.error('Import error:', error);
      setError(error instanceof Error ? error.message : "Invalid JSON format. Please check your project file.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setImportJson("");
    setError(null);
    setIsImporting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
              onChange={(e) => {
                setImportJson(e.target.value);
                setError(null);
              }}
              placeholder="Paste your exported project JSON here..."
              disabled={isImporting}
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isImporting}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isImporting || !importJson.trim()}>
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 