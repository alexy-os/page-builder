import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCollections } from "../hooks/useCollections";

interface PinsSidebarProps {
  activeCollection: string | null;
  onCollectionChange: (collectionId: string | null) => void;
}

export default function PinsSidebar({ activeCollection, onCollectionChange }: PinsSidebarProps) {
  const [activeTab, setActiveTab] = useState<'buildy' | 'user'>('buildy');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { collections, createCollection, deleteCollection } = useCollections();

  const buildyCollections = collections.filter(c => c.type === 'buildy');
  const userCollections = collections.filter(c => c.type === 'user');
  const currentCollections = activeTab === 'buildy' ? buildyCollections : userCollections;

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim());
      setNewCollectionName('');
      setShowCreateDialog(false);
    }
  };

  const handleDeleteCollection = (collectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Вы уверены, что хотите удалить эту коллекцию?')) {
      deleteCollection(collectionId);
      if (activeCollection === collectionId) {
        onCollectionChange(null);
      }
    }
  };

  return (
    <div className="w-80 border-r border-border bg-card/30 backdrop-blur-sm overflow-y-auto">
      <div className="p-6">
        {/* Tabs */}
        <div className="flex mb-6 bg-muted/50 rounded-lg p-1">
          <Button
            variant={activeTab === 'buildy' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('buildy')}
          >
            BuildY
          </Button>
          <Button
            variant={activeTab === 'user' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1"
            onClick={() => setActiveTab('user')}
          >
            My Pins
          </Button>
        </div>

        {/* Collections */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Collections
            </h3>
            {activeTab === 'user' && (
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Collection</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Collection name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateCollection();
                        }
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateCollection}>
                        Create
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {currentCollections.map((collection) => (
            <Card
              key={collection.id}
              className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md group ${
                activeCollection === collection.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onCollectionChange(collection.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-medium text-sm">{collection.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {collection.count}
                  </Badge>
                </div>
                {collection.type === 'user' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDeleteCollection(collection.id, e)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
          
          {currentCollections.length === 0 && activeTab === 'user' && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No collections yet
            </div>
          )}

          
        <Button
          variant={activeCollection === null ? 'default' : 'outline'}
          className="w-full my-4 rounded-full"
          onClick={() => onCollectionChange(null)}
        >
          Show All Blocks
        </Button>
        </div>
      </div>
    </div>
  );
} 