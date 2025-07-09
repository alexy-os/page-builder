
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAtom } from 'jotai';

import type { Block, Template } from "../../types";
import { useProjectStore } from "@/store";
import { builderActiveTabAtom } from "@/atoms";

import { allTemplates } from "./blocks/index";

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
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-lg border-2 border-transparent hover:border-blue-500 transition-all duration-300 touch-manipulation h-32">
        <div className="transform scale-[0.2] origin-top-left w-[500%] h-[500%] pointer-events-none">
          <PreviewComponent content={template.defaultContent} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 text-white">
          <h4 className="font-semibold text-sm">{template.name}</h4>
          <p className="text-xs opacity-90">{template.description}</p>
        </div>
        <Button
          onClick={() => addBlock(template)}
          className="absolute top-2 right-2 h-8 w-8 touch-manipulation"
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
    <div className="w-80 border-r border-border bg-card/30 backdrop-blur-sm overflow-y-auto">
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
            <Card key={template.id} className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300">
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
  );
}