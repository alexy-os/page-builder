import { useEffect, useState, useCallback, useRef, Suspense, memo, useMemo } from "react";
import { Grid3X3, Grid2X2, Bookmark, ChevronDown, Heart, HeartHandshake, ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
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
  
  // Simple state for manual loading
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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
    { id: 'blog', name: 'Blog' },
    { id: 'business', name: 'Business' },
    { id: 'cta', name: 'CTA' },
    { id: 'faq', name: 'FAQ' },
    { id: 'features', name: 'Features' },
    { id: 'footer', name: 'Footer' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'post', name: 'Post' },
    { id: 'team', name: 'Team' },
    { id: 'testimonial', name: 'Testimonial' },
  ];

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Filter blocks based on active collection and category
  const getFilteredBlocks = () => {
    if (activeCategory) {
      return allTemplates.filter(template => {
        // Фильтруем по префиксу ID блока
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
  
  // Check if lazy loading should be active (only when no filters are applied)
  const isLazyLoadingActive = !activeCollection && !activeCategory;
  
  // Get blocks to display (with lazy loading or all filtered blocks)
  const blocksToDisplay = isLazyLoadingActive 
    ? filteredBlocks.slice(0, visibleCount)
    : filteredBlocks;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
    setIsLoading(false);
  }, [activeCollection, activeCategory]);

  // Simple load more function
  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 9, filteredBlocks.length));
      setIsLoading(false);
    }, 300);
  };

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

  // Memoized pin card component for better performance
  const PinCard = memo(({ template }: { template: Template }) => {
    const PreviewComponent = useMemo(() => {
      return template.component;
    }, [template.component]);

    const handleSaveClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      handleSaveToCollection(template);
    }, [template]);

    const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggleFavorite(template);
    }, [template]);

    const isTemplateFavorite = useMemo(() => {
      return isFavorite(template.id);
    }, [template.id]);
    
    return (
      <div 
        className="relative overflow-hidden bg-background rounded-[16px] border border-transparent hover:border-accent transition-all duration-500 aspect-video group"
      >
        <Button
          className="scroll-preview-eye-btn absolute top-2 left-2 !h-8 !w-8 z-10 duration-200"
          type="button"
          variant="ghost"
          size="icon"
        >
          <Eye className="!h-5 !w-5" />
        </Button>
        
        <div className={`scroll-preview-content transform origin-top-left overflow-y-auto scrollbar-hide ${
            columns === 2 
              ? 'scale-[0.3] w-[500%] h-auto absolute left-[-25%] top-0 scale-2col' 
              : 'scale-[0.2] w-[500%] h-auto scale-3col'
          }`}>
          <Suspense fallback={
            <div className="flex items-center justify-center h-32 bg-muted/50 rounded">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          }>
            <PreviewComponent />
          </Suspense>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-2 text-secondary-foreground pointer-events-none">
          <h3 className="font-semibold text-sm">{template.name}</h3>
          <p className="text-xs opacity-90">{template.description}</p>
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <Button 
            type="button"
            size="icon"
            variant="ghost"
            className="!h-8 !w-8"
            onClick={handleSaveClick}
          >
            <Bookmark className="!h-5 !w-5" />
          </Button>
          <Button 
            type="button"
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive !h-8 !w-8"
            onClick={handleFavoriteClick}
          >
            {isTemplateFavorite ? (
              <HeartHandshake className="text-destructive !h-5 !w-5" />
            ) : (
              <Heart className="!h-5 !w-5" />
            )}
          </Button>
        </div>
      </div>
    );
  });

  PinCard.displayName = 'PinCard';

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
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto scroll-area smooth-scroll"
              >
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
                      <p className="text-sm text-muted-foreground">
                        {blocksToDisplay.length} blocks
                        {!isLazyLoadingActive && filteredBlocks.length !== blocksToDisplay.length && 
                          ` of ${filteredBlocks.length}`
                        }
                      </p>
                    </div>
                  )}

                  {/* Status indicator for lazy loading */}
                  {isLazyLoadingActive && (
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground">
                        Showing {blocksToDisplay.length} of {filteredBlocks.length} blocks
                        {visibleCount < filteredBlocks.length && (
                          <span className="ml-2 text-accent">• Scroll for more</span>
                        )}
                      </p>
                    </div>
                  )}
                  
                  <div 
                    className={`grid gap-6 ${
                      columns === 2 
                        ? 'grid-cols-1 lg:grid-cols-2' 
                        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    }`}
                  >
                    {blocksToDisplay.map((template) => (
                      <PinCard key={template.id} template={template} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {isLazyLoadingActive && visibleCount < filteredBlocks.length && (
                    <div className="flex justify-center py-8">
                      <Button 
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Load More ({Math.min(9, filteredBlocks.length - visibleCount)} blocks)
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {/* End of content indicator */}
                  {isLazyLoadingActive && visibleCount >= filteredBlocks.length && filteredBlocks.length > 12 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">All blocks loaded! 🎉</p>
                    </div>
                  )}
                  
                  {blocksToDisplay.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No blocks found</p>
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
