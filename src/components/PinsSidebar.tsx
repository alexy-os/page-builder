import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Collection {
  id: string;
  name: string;
  count: number;
  type: 'buildy' | 'user';
}

interface PinsSidebarProps {
  activeCollection: string | null;
  onCollectionChange: (collectionId: string | null) => void;
}

export default function PinsSidebar({ activeCollection, onCollectionChange }: PinsSidebarProps) {
  const [activeTab, setActiveTab] = useState<'buildy' | 'user'>('buildy');

  const buildyCollections: Collection[] = [
    { id: 'landing', name: 'Landing', count: 12, type: 'buildy' },
    { id: 'blog', name: 'Blog', count: 8, type: 'buildy' },
    { id: 'website', name: 'Website', count: 15, type: 'buildy' },
    { id: 'layouts', name: 'Layouts', count: 6, type: 'buildy' },
  ];

  const userCollections: Collection[] = [
    { id: 'business', name: 'Business', count: 5, type: 'user' },
    { id: 'blog-user', name: 'Blog', count: 3, type: 'user' },
    { id: 'favorites', name: 'Favorites', count: 7, type: 'user' },
  ];

  const currentCollections = activeTab === 'buildy' ? buildyCollections : userCollections;

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

        {/* Show All Button */}
        <Button
          variant={activeCollection === null ? 'default' : 'outline'}
          className="w-full mb-4"
          onClick={() => {
            onCollectionChange(null);
            window.location.href = '/';
          }}
        >
          Show All Blocks
        </Button>

        {/* Collections */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Collections
          </h3>
          {currentCollections.map((collection) => (
            <Card
              key={collection.id}
              className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                activeCollection === collection.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onCollectionChange(collection.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{collection.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {collection.count}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* User Collections Actions */}
        {activeTab === 'user' && (
          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full">
              + Create Collection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 