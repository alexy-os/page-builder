import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCollections } from "../../hooks/useCollections";

interface SaveToCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  templateName: string;
  templateDescription: string;
}

export default function SaveToCollectionDialog({
  open,
  onOpenChange,
  templateId,
  templateName,
  templateDescription,
}: SaveToCollectionDialogProps) {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [savedToCollections, setSavedToCollections] = useState<Set<string>>(new Set());
  
  const { 
    collections, 
    createCollection, 
    saveBlockToCollection, 
    isTemplateInCollection, 
    removeTemplateFromCollection 
  } = useCollections();

  // Initialize saved collections state based on existing data
  useEffect(() => {
    if (open) {
      const initialSavedCollections = new Set<string>();
      collections.forEach(collection => {
        if (isTemplateInCollection(templateId, collection.id)) {
          initialSavedCollections.add(collection.id);
        }
      });
      setSavedToCollections(initialSavedCollections);
    }
  }, [open, templateId]); // Remove collections and isTemplateInCollection from dependencies

  const handleToggleCollection = async (collectionId: string) => {
    const isCurrentlySaved = savedToCollections.has(collectionId);
    
    try {
      if (isCurrentlySaved) {
        // Remove from collection
        removeTemplateFromCollection(templateId, collectionId);
        setSavedToCollections(prev => {
          const newSet = new Set(prev);
          newSet.delete(collectionId);
          return newSet;
        });
      } else {
        // Add to collection
        await saveBlockToCollection(templateId, templateName, templateDescription, collectionId);
        setSavedToCollections(prev => new Set([...prev, collectionId]));
      }
    } catch (error) {
      console.error('Error toggling collection:', error);
    }
  };

  const handleCreateAndSave = async () => {
    if (newCollectionName.trim()) {
      try {
        const newCollection = createCollection(newCollectionName.trim());
        await saveBlockToCollection(templateId, templateName, templateDescription, newCollection.id);
        setSavedToCollections(prev => new Set([...prev, newCollection.id]));
        setNewCollectionName('');
        setShowCreateForm(false);
      } catch (error) {
        console.error('Error creating collection and saving:', error);
      }
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setShowCreateForm(false);
    setNewCollectionName('');
    setSavedToCollections(new Set()); // Clear the state when the dialog is closed
    
    // Reload the page to update the collections in the sidebar
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Block Info */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-sm">{templateName}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {templateDescription}
            </p>
          </div>

          {/* Collections List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {collections.map((collection) => {
              const isSaved = savedToCollections.has(collection.id);
              
              return (
                <Card
                  key={collection.id}
                  className={`group p-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    isSaved ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleToggleCollection(collection.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{collection.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {collection.count}
                      </Badge>
                      {collection.type === 'buildy' && (
                        <Badge variant="outline" className="text-xs">
                          BuildY
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {isSaved ? (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" />
                          <span className="text-xs">Saved</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4" />
                          <span className="text-xs">Add</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Create New Collection */}
          <div className="border-t pt-4">
            {!showCreateForm ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Collection
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateAndSave();
                    } else if (e.key === 'Escape') {
                      setShowCreateForm(false);
                      setNewCollectionName('');
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewCollectionName('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCreateAndSave}
                    disabled={!newCollectionName.trim()}
                    className="flex-1"
                  >
                    Create & Save
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 