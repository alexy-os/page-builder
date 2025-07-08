import { useState, useEffect } from "react";
import { Grid3X3, Grid2X2, Bookmark, ChevronDown, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

import PinsSidebar from "../components/PinsSidebar";
import Navigation from "../components/Navigation";
import SaveToCollectionDialog from "../components/dialogs/SaveToCollectionDialog";
import ImportCollectionsDialog from "../components/dialogs/ImportCollectionsDialog";
import { allTemplates } from "../components/builder/blocks/index";
import { useTheme } from "../hooks/useTheme";
import { useCollections } from "../hooks/useCollections";
import { useFavorites } from "../hooks/useFavorites";
import type { Template } from "../types";

export default function PagePins() {
  const { 
    isDark, 
    themeSelectorKey, 
    toggleDarkMode, 
    changeTheme
  } = useTheme();
  
  const { getCollectionBlocks, exportCollections, importCollections, clearAllCollections } = useCollections();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [columns, setColumns] = useState<2 | 3>(3);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [importCollectionsDialogOpen, setImportCollectionsDialogOpen] = useState(false);

  // Categories based on block directories
  const categories = [
    { id: 'hero', name: 'Hero' },
    { id: 'features', name: 'Features' },
    { id: 'blog', name: 'Blog' },
    { id: 'business', name: 'Business' },
    { id: 'cta', name: 'CTA' },
    { id: 'footer', name: 'Footer' },
  ];

  useEffect(() => {
    // Update URL when category changes
    const url = new URL(window.location.href);
    if (activeCategory) {
      url.searchParams.set('category', activeCategory);
    } else {
      url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url.toString());
  }, [activeCategory]);

  // Filter blocks based on active collection and category
  const getFilteredBlocks = () => {
    // Category has priority - if category is selected, show all blocks from that category regardless of collection
    if (activeCategory) {
      return allTemplates.filter(template => {
        // Match template ID prefix with category
        return template.id.startsWith(activeCategory) || 
               template.id.includes(activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1));
      });
    }
    
    // If a collection is active but no category, show saved blocks from that collection
    if (activeCollection) {
      const collectionBlocks = getCollectionBlocks(activeCollection);
      return collectionBlocks
        .map(savedBlock => allTemplates.find(template => template.id === savedBlock.templateId))
        .filter(Boolean) as Template[];
    }
    
    // Otherwise show all templates
    return allTemplates;
  };

  const filteredBlocks = getFilteredBlocks();

  const handleSaveToCollection = (template: Template) => {
    setSelectedTemplate(template);
    setSaveDialogOpen(true);
  };

  const handleToggleFavorite = (template: Template) => {
    toggleFavorite(template.id);
  };

  const PinCard = ({ template }: { template: Template }) => {
    const PreviewComponent = template.component;
    
    return (
      <div className="group relative overflow-hidden bg-secondary/50 text-accent-foreground rounded-lg border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-lg">
        {/* Preview */}
        <div className="relative overflow-hidden bg-background aspect-video">
          <div className={`transform pointer-events-none ${
            columns === 2 
              ? 'scale-[0.3] origin-top-left w-[500%] h-[500%] absolute left-[-25%] top-0' 
              : 'scale-[0.2] origin-top-left w-[500%] h-[500%]'
          }`}>
            <PreviewComponent content={template.defaultContent} />
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            <Button 
              type="button"
              size="sm"
              variant="ghost"
              className="text-white hover:bg-transparent hover:text-yellow-500 !h-8 !w-8"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSaveToCollection(template);
              }}
            >
              <Bookmark className="!h-5 !w-5" />
            </Button>
            <Button 
              type="button"
              size="sm"
              variant="ghost"
              className="text-white hover:bg-transparent hover:text-red-500 !h-8 !w-8"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleToggleFavorite(template);
                return false;
              }}
            >
              {isFavorite(template.id) ? (
                <HeartHandshake className="!h-5 !w-5" />
              ) : (
                <Heart className="!h-5 !w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 text-foreground">{template.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navigation
        projectName="Pins Collection"
        isDark={isDark}
        themeSelectorKey={themeSelectorKey}
        onToggleDarkMode={toggleDarkMode}
        onThemeChange={changeTheme}
        onExportCollections={exportCollections}
        onImportCollections={() => setImportCollectionsDialogOpen(true)}
        onClearCollections={clearAllCollections}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <PinsSidebar 
          activeCollection={activeCollection}
          onCollectionChange={setActiveCollection}
        />
        
        {/* Pins Grid */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls */}
          <div className="border-b border-border bg-card/30 backdrop-blur-sm px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>{activeCategory ? categories.find(c => c.id === activeCategory)?.name : 'All Categories'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => setActiveCategory(null)}
                    className={!activeCategory ? "bg-muted" : ""}
                  >
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={activeCategory === category.id ? "bg-muted" : ""}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Column toggle */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                  <Button
                    variant={columns === 2 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setColumns(2)}
                    className="h-8 w-8 p-0"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={columns === 3 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setColumns(3)}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Link to="/builder">
                  <Button>Get Builder</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Pins Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {(activeCollection || activeCategory) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">
                    {activeCollection && activeCategory ? 
                      `${activeCollection} Collection - ${categories.find(c => c.id === activeCategory)?.name}` :
                      activeCollection ? 
                        `${activeCollection} Collection` :
                        `${categories.find(c => c.id === activeCategory)?.name} Blocks`
                    }
                  </h2>
                  <p className="text-sm text-muted-foreground">{filteredBlocks.length} blocks</p>
                </div>
              )}
              
              <div 
                className={`grid gap-6 ${
                  columns === 2 
                    ? 'grid-cols-1 lg:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredBlocks.map((template) => (
                  <PinCard key={template.id} template={template} />
                ))}
              </div>
              
              {filteredBlocks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No blocks found in this collection</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save to Collection Dialog */}
      {selectedTemplate && (
        <SaveToCollectionDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          templateId={selectedTemplate.id}
          templateName={selectedTemplate.name}
          templateDescription={selectedTemplate.description}
        />
      )}

      {/* Import Collections Dialog */}
      <ImportCollectionsDialog
        open={importCollectionsDialogOpen}
        onOpenChange={setImportCollectionsDialogOpen}
        onImport={importCollections}
      />
    </div>
  );
}
