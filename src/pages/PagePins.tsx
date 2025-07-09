import { useEffect, useCallback } from "react";
import { Grid3X3, Grid2X2, Bookmark, ChevronDown, Heart, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAtom } from 'jotai';

import PinsSidebar from "../components/PinsSidebar";
import Navigation from "../components/Navigation";
import SaveToCollectionDialog from "../components/dialogs/SaveToCollectionDialog";
import ImportCollectionsDialog from "../components/dialogs/ImportCollectionsDialog";
import { allTemplates } from "../components/builder/blocks/index";
import { useProjectStore, useUIStore, useThemeStore } from "@/store";
import { selectedTemplateAtom, pinsColumnsAtom } from "@/atoms";
import type { Template } from "../types";
import { useHybridStorage } from "@/hooks/useHybridStorage";

export default function PagePins() {
  // Zustand stores
  const { 
    isDark, 
    themeSelectorKey, 
    toggleDarkMode, 
    changeTheme, 
    initialize: initializeTheme 
  } = useThemeStore();
  
  const { 
    getCollections,
    importProject,
    clearCollections,
    toggleFavorite, 
    isFavorite
  } = useProjectStore();
  
  const {
    activeCollection,
    activeCategory,
    showImportCollectionsDialog,
    saveDialogOpen,
    setActiveCollection,
    setActiveCategory,
    setShowImportCollectionsDialog,
    setSaveDialogOpen,
    enableSessionMode,
    disableSessionMode,
    isSessionMode
  } = useUIStore();
  
  // Legacy hook for storage operations
  const {
    fullReset
  } = useHybridStorage();
  
  // Jotai atoms
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);
  const [columns, setColumns] = useAtom(pinsColumnsAtom);

  // Categories based on block directories
  const categories = [
    { id: 'hero', name: 'Hero' },
    { id: 'features', name: 'Features' },
    { id: 'blog', name: 'Blog' },
    { id: 'business', name: 'Business' },
    { id: 'cta', name: 'CTA' },
    { id: 'footer', name: 'Footer' },
  ];

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Filter blocks based on active collection and category
  const getFilteredBlocks = () => {
    if (activeCategory) {
      return allTemplates.filter(template => {
        return template.id.startsWith(activeCategory) || 
               template.id.includes(activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1));
      });
    }
    
    if (activeCollection) {
      // Note: This would need to be implemented with collections data
      // For now, return all templates
      return allTemplates;
    }
    
    return allTemplates;
  };

  const filteredBlocks = getFilteredBlocks();

  const handleSaveToCollection = (template: Template) => {
    setSelectedTemplate(template);
    setSaveDialogOpen(true);
  };

  const handleToggleFavorite = (template: Template) => {
    // Immediate UI feedback with Zustand
    toggleFavorite(template.id);
  };

  const handleExportCollections = () => {
    try {
      const data = {
        collections: getCollections(),
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `buildy-collections-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting collections:', error);
    }
  };

  const handleImportCollections = (jsonData: string) => {
    return importProject(jsonData);
  };

  const handleFullReset = useCallback(() => {
    if (confirm('Are you sure you want to perform a full reset? This will clear ALL data (projects, collections, themes) and reload the application.')) {
      try {
        fullReset();
      } catch (error) {
        console.error('Error performing full reset:', error);
        alert('Error performing reset. Please refresh the page manually.');
      }
    }
  }, [fullReset]);

  const handleEnableSessionMode = useCallback(() => {
    if (confirm('Enable Session Mode? Your data will only be stored for this browser session and will be lost when you close the browser.')) {
      try {
        enableSessionMode();
      } catch (error) {
        console.error('Error enabling session mode:', error);
        alert('Error enabling session mode. Please try again.');
      }
    }
  }, [enableSessionMode]);

  const handleDisableSessionMode = useCallback(() => {
    if (confirm('Disable Session Mode? Your current session data will be saved to permanent storage.')) {
      try {
        disableSessionMode();
      } catch (error) {
        console.error('Error disabling session mode:', error);
        alert('Error disabling session mode. Please try again.');
      }
    }
  }, [disableSessionMode]);

  const PinCard = ({ template }: { template: Template }) => {
    const PreviewComponent = template.component;
    
    const handleCardClick = () => {
      window.location.href = `/builder?template=${template.id}`;
    };
    
    return (
      <div 
        className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-xl transition-all duration-300 h-64 touch-manipulation cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="transform scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
          <PreviewComponent content={template.defaultContent} />
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <Button 
            type="button"
            size="sm"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-yellow-500 !h-8 !w-8"
            onClick={(e) => {
              e.stopPropagation();
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
              handleToggleFavorite(template);
            }}
          >
            {isFavorite(template.id) ? (
              <HeartHandshake className="!h-5 !w-5" />
            ) : (
              <Heart className="!h-5 !w-5" />
            )}
          </Button>
        </div>
        
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="font-semibold text-sm mb-1 text-white">{template.name}</h3>
          <p className="text-xs text-gray-300 line-clamp-2">{template.description}</p>
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
        onExportCollections={handleExportCollections}
        onImportCollections={() => setShowImportCollectionsDialog(true)}
        onClearCollections={clearCollections}
        onEnableSessionMode={handleEnableSessionMode}
        onDisableSessionMode={handleDisableSessionMode}
        onFullReset={handleFullReset}
        isSessionMode={isSessionMode}
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
          <div className="border-b border-border p-4 flex items-center justify-between bg-card/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {activeCategory ? 
                      categories.find(c => c.id === activeCategory)?.name || 'Category' : 
                      'All Categories'
                    }
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setActiveCategory(null)}>
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Grid Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={columns === 2 ? "default" : "ghost"}
                size="sm"
                onClick={() => setColumns(2)}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={columns === 3 ? "default" : "ghost"}
                size="sm"
                onClick={() => setColumns(3)}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Grid Content */}
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
        open={showImportCollectionsDialog}
        onOpenChange={setShowImportCollectionsDialog}
        onImport={handleImportCollections}
      />
    </div>
  );
}
