import { useEffect, useCallback, useState, useRef } from "react";
import { Grid3X3, Grid2X2, Bookmark, ChevronDown, Heart, HeartHandshake, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAtom } from 'jotai';
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels';

import PinsSidebar from "@/components/PinsSidebar";
import Navigation from "@/components/Navigation";
import SaveToCollectionDialog from "@/components/dialogs/SaveToCollectionDialog";
import ImportCollectionsDialog from "@/components/dialogs/ImportCollectionsDialog";
import { allTemplates } from "@/components/blocks";
import { useProjectStore, useUIStore, useThemeStore } from "@/store";
import { selectedTemplateAtom, pinsColumnsAtom } from "@/atoms";
import type { Template } from "@/types";
import { useSimpleStorage } from "@/hooks/useSimpleStorage";
import { Link } from "react-router-dom";

export default function PagePins() {
  // Local state for sidebar visibility and size
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [savedSidebarSize, setSavedSidebarSize] = useState(25);
  
  // Refs for panel control
  const sidebarPanelRef = useRef<any>(null);
  const panelGroupRef = useRef<any>(null);
  
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
    getSavedBlocks,
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
    setSaveDialogOpen
  } = useUIStore();
  
  // Simplified storage operations
  const {
    fullReset
  } = useSimpleStorage();
  
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
      // Get the selected collection
      const collections = getCollections();
      const collection = collections.find(c => c.id === activeCollection);
      
      if (!collection) {
        console.warn(`Collection with id "${activeCollection}" not found`);
        return [];
      }
      
      // Get saved blocks for this collection
      const savedBlocks = getSavedBlocks();
      const collectionBlocks = collection.blockIds
        .map(blockId => savedBlocks.find(block => block.id === blockId))
        .filter(Boolean) as NonNullable<typeof savedBlocks[0]>[];
      
      // Find corresponding templates
      const templateIds = collectionBlocks.map(block => block.templateId);
      return allTemplates.filter(template => templateIds.includes(template.id));
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

  // Toggle sidebar collapse/expand
  const toggleSidebar = useCallback(() => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      if (isSidebarCollapsed) {
        // Expand sidebar
        panel.resize(savedSidebarSize);
        setIsSidebarCollapsed(false);
      } else {
        // Collapse sidebar - get size before resize to avoid multiple reflows
        const currentSize = panel.getSize();
        setSavedSidebarSize(currentSize);
        panel.resize(0);
        setIsSidebarCollapsed(true);
      }
    });
  }, [isSidebarCollapsed, savedSidebarSize]);

  // Session mode removed - only using sessionStorage now

  const PinCard = ({ template }: { template: Template }) => {
    const PreviewComponent = template.component;
    
    const handleCardClick = () => {
      window.location.href = `/builder?template=${template.id}`;
    };
    
    return (
      <div 
        className="scroll-preview-trigger relative overflow-hidden bg-background rounded-[16px] border border-transparent hover:border-accent transition-all duration-500 aspect-video group pointer-events-none"
        onClick={handleCardClick}
      >
        <div className={`scroll-preview-content transform origin-top-left pointer-events-none overflow-y-auto scrollbar-hide ${
            columns === 2 
              ? 'scale-[0.2] w-[500%] h-auto' 
              : 'scale-[0.2] w-[500%] h-auto'
          }`}>
          <PreviewComponent content={template.defaultContent} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-2 text-secondary-foreground pointer-events-none">
          <h3 className="font-semibold text-sm">{template.name}</h3>
          <p className="text-xs opacity-90">{template.description}</p>
        </div>
        <Button
          className="absolute top-2 left-2 h-8 w-8 pointer-events-auto"
          variant="ghost"
          size="icon"
        >
          <Eye className="h-4 w-4" />
        </Button>
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
        onFullReset={handleFullReset}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative">
        <PanelGroup direction="horizontal" className="flex-1" ref={panelGroupRef}>
          <Panel 
            ref={sidebarPanelRef}
            defaultSize={25} 
            minSize={0} 
            maxSize={40} 
            className="flex flex-col"
            collapsible={true}
          >
            <PinsSidebar 
              activeCollection={activeCollection}
              onCollectionChange={setActiveCollection}
            />
          </Panel>
          <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors data-[panel-group-direction=horizontal]:cursor-col-resize" />
          <Panel defaultSize={75} minSize={60} className="flex flex-col">
            <div className="flex-1 flex flex-col min-h-0">
              {/* Top Controls - Fixed Header */}
              <div className="shrink-0 border-b border-border p-4 flex items-center justify-between bg-card/30 backdrop-blur-sm">
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
                
                <Link to="/builder">
                  <Button size="sm">Get Builder</Button>
                </Link>
                </div>
              </div>
              
              {/* Grid Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto scroll-area smooth-scroll">
                <div className="p-6">
                  {(activeCollection || activeCategory) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold">
                        {activeCollection && activeCategory ? 
                          `${getCollections().find(c => c.id === activeCollection)?.name || activeCollection} Collection - ${categories.find(c => c.id === activeCategory)?.name}` :
                          activeCollection ? 
                            `${getCollections().find(c => c.id === activeCollection)?.name || activeCollection} Collection` :
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
          </Panel>
        </PanelGroup>
        
        {/* Floating Toggle Button */}
        <Button
          onClick={toggleSidebar}
          className="absolute bg-accent/50 top-4 left-4 z-50 shadow-lg !w-8 !h-8"
          size="sm"
          variant="ghost"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
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
