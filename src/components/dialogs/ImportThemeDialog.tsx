import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (themeData: any) => void;
}

export default function ImportThemeDialog({
  open,
  onOpenChange,
  onImport
}: ImportThemeDialogProps) {
  const [importThemeJson, setImportThemeJson] = useState("");
  const [importThemeError, setImportThemeError] = useState("");

  const handleImport = () => {
    try {
      const themeData = JSON.parse(importThemeJson);
      const themeName = onImport(themeData);
      
      setImportThemeJson("");
      setImportThemeError("");
      onOpenChange(false);
      
      alert(`Theme "${themeName}" imported successfully!`);
    } catch (error) {
      setImportThemeError(error instanceof Error ? error.message : "Invalid JSON format. Please check your theme file.");
    }
  };

  const handleClose = () => {
    setImportThemeJson("");
    setImportThemeError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Import Theme</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Import a custom theme schema from{" "}
            <a 
              href="https://tweakcn.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              tweakcn.com
            </a>
            {" "}or paste your JSON schema
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex flex-col gap-2">
            <Label htmlFor="theme-json" className="text-sm font-medium">
              Theme Schema (JSON):
            </Label>
            <textarea
              id="theme-json"
              value={importThemeJson}
              onChange={(e) => {
                setImportThemeJson(e.target.value);
                setImportThemeError("");
              }}
              className="flex-1 min-h-[300px] p-3 font-mono border border-input text-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring text-secondary-foreground bg-muted/25"
              placeholder={`{
  "cssVarsV4": {
    "theme": {
      "background": "oklch(0.9707 0.0027 286.3504)",
      "foreground": "oklch(0.2316 0.0038 286.0989)",
      "primary": "oklch(0.6028 0.2177 257.4239)",
      ...
    },
    "light": {
      "background": "oklch(0.9707 0.0027 286.3504)",
      "foreground": "oklch(0.2316 0.0038 286.0989)",
      ...
    },
    "dark": {
      "background": "oklch(0.2178 0 0)",
      "foreground": "oklch(0.9067 0 0)",
      ...
    }
  }
}`}
            />
          </div>
          {importThemeError && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">
              Error: {importThemeError}
            </div>
          )}
        </div>
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport}
            disabled={!importThemeJson.trim() || !!importThemeError}
          >
            Import Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 