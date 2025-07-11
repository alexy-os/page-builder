import { Plus, Eye, Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAtom } from 'jotai';

import type { Block, Template } from "@/types";
import { useProjectStore } from "@/store";
import { builderActiveTabAtom } from "@/atoms";

import { allTemplates } from "@/components/blocks";

interface BlockSidebarProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

export default function BlockSidebar({ blocks, setBlocks }: BlockSidebarProps) {
  // Zustand store for favorites
  const { getFavorites } = useProjectStore();
  
  // Jotai atom for local tab state
  const [activeTab, setActiveTab] = useAtom(builderActiveTabAtom);
  
  // Get favorites data
  const favorites = getFavorites();

  const addBlock = (template: Template) => {
    const newBlock: Block = {
      id: `${template.id}_${Date.now()}`,
      type: template.id,
      content: template.defaultContent,
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
  };

  const BlockPreview = ({ template }: { template: Template }) => {
    const PreviewComponent = template.component;
    
    return (
      <div className="relative overflow-hidden bg-background rounded-[16px] border border-transparent hover:border-accent transition-all duration-500 aspect-video group">
        <Button
          className="scroll-preview-eye-btn absolute top-2 left-2 h-8 w-8 z-10 duration-200"
          variant="ghost"
          size="icon"
        >
          <Eye className="h-4 w-4" />
        </Button>
        
        <div className="scroll-preview-content transform scale-[0.2] origin-top-left w-[500%] h-auto scale-3col overflow-y-auto scrollbar-hide">
          <Suspense fallback={
            <div className="flex items-center justify-center h-20 bg-muted/50 rounded">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          }>
            <PreviewComponent content={template.defaultContent} />
          </Suspense>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-2 text-secondary-foreground pointer-events-none">
          <h4 className="font-semibold text-sm">{template.name}</h4>
          <p className="text-xs opacity-90">{template.description}</p>
        </div>
        <Button
          onClick={() => addBlock(template)}
          className="absolute top-2 right-2 h-8 w-8"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  // Get templates based on active tab - now using Zustand data
  const getTemplates = () => {
    if (activeTab === 'favorites') {
      return allTemplates.filter(template => favorites.includes(template.id));
    }
    return allTemplates;
  };

  const templates = getTemplates();
  const hasFavorites = favorites.length > 0;

  return (
    <div className="w-full h-full border-r border-border bg-card/30 backdrop-blur-sm flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
        {/* Tabs - only show if there are favorites */}
        {hasFavorites && (
          <div className="flex mb-6 bg-muted/50 rounded-lg p-1">
            <Button
              variant={activeTab === 'favorites' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab('favorites')}
            >
              Favorites ({favorites.length})
            </Button>
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab('all')}
            >
              All Blocks
            </Button>
          </div>
        )}
        
        <div className="space-y-4">
          {templates.map((template: Template) => (
            <Card key={template.id} className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300 rounded-[16px]">
              <BlockPreview template={template} />
            </Card>
          ))}
        </div>

        {/* Empty state for favorites */}
        {activeTab === 'favorites' && templates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No favorite blocks yet</p>
            <p className="text-muted-foreground text-xs mt-1">Add blocks to favorites from the <a href="/" className="font-bold text-primary">Pins page</a></p>
          </div>
        )}

        {/* Empty state when no favorites exist */}
        {!hasFavorites && (
          <div className="text-center py-8 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground text-sm mb-2">No favorites yet</p>
            <p className="text-muted-foreground text-xs">Visit the <a href="/" className="text-primary hover:underline">Pins page</a> to add blocks to favorites</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}