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
import { CenteredHeroContent, SplitHeroContent } from "@/components/blocks/hero/content";
import { useBlockContent } from "@/hooks/useBlockContent";

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
    exportProject,
    clearCollections,
    toggleFavorite, 
    isFavorite,
    getBlockData,
    updateBlockData
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
      // Export full project data instead of just collections
      // This includes collections, savedBlocks, data array, and all other project data
      const jsonData = exportProject();
      
      if (!jsonData || jsonData.trim() === '') {
        throw new Error('Export returned empty data');
      }
      
      // Validate JSON before creating file
      try {
        JSON.parse(jsonData);
      } catch (parseError) {
        throw new Error('Export returned invalid JSON data');
      }

      const blob = new Blob([jsonData], {
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
      
      console.log('Collections with full project data exported successfully');
      
      // Debug: Show data array content in console
      const blockData = getBlockData();
      console.log(`📊 Exported ${blockData.length} content items in data array:`, blockData);
      
    } catch (error) {
      console.error('Error exporting collections:', error);
      alert(`Error exporting collections: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleImportCollections = (jsonData: string) => {
    return importProject(jsonData);
  };

  // Helper function to clean content from non-serializable objects (React components, functions)
  const cleanContentForSerialization = (content: any): any => {
    if (!content || typeof content !== 'object') return content;
    
    const cleaned = { ...content };
    
    // Remove React components and functions that can't be serialized
    Object.keys(cleaned).forEach(key => {
      const value = cleaned[key];
      
      // Remove React components (icons) and functions
      if (typeof value === 'function' || 
          (typeof value === 'object' && value?.$$typeof)) {
        delete cleaned[key];
        console.log(`🧹 Removed non-serializable ${key} from content`);
      }
      
      // Recursively clean nested objects
      else if (typeof value === 'object' && value !== null) {
        cleaned[key] = cleanContentForSerialization(value);
      }
    });
    
    return cleaned;
  };

  // Helper function to get content from intermediate layer (same as in useCollections)
  const getContentFromIntermediateLayer = (templateId: string): any => {
    let rawContent = null;
    
    // Check CenteredHero content first
    if (templateId.includes('Hero') && templateId.startsWith('centered')) {
      const key = templateId as keyof typeof CenteredHeroContent;
      rawContent = CenteredHeroContent[key];
      if (rawContent) {
        console.log(`✅ Found CenteredHero content for ${templateId}`);
      }
    }
    
    // Check SplitHero content  
    else if (templateId.includes('Hero') && templateId.startsWith('split')) {
      const key = templateId as keyof typeof SplitHeroContent;
      rawContent = SplitHeroContent[key];
      if (rawContent) {
        console.log(`✅ Found SplitHero content for ${templateId}`);
      }
    }
    
    // For now, only Hero blocks are supported with custom content
    // Other block types (blog, post, business, etc.) use library defaults
    else if (!templateId.includes('Hero')) {
      console.log(`⚠️  ${templateId} is not a Hero block - content extraction not supported yet`);
      return null;
    }
    
    if (!rawContent) {
      console.warn(`❌ No content found for Hero templateId: ${templateId}`);
      return null;
    }
    
    // Clean the content for safe JSON serialization
    const cleanedContent = cleanContentForSerialization(rawContent);
    console.log(`🧹 Cleaned content for ${templateId}:`, cleanedContent);
    
    return cleanedContent;
  };

  // Migration function: Fill content for all existing blocks in collections
  const handleFillContentForExistingBlocks = () => {
    try {
      const savedBlocks = getSavedBlocks();
      const currentBlockData = getBlockData();
      let addedCount = 0;
      let skippedCount = 0;
      let alreadyExistsCount = 0;
      
      // Statistics by block type
      const blockTypeStats: Record<string, { total: number; added: number; skipped: number; }> = {};

      console.log(`🔄 Starting content migration for ${savedBlocks.length} saved blocks...`);

      savedBlocks.forEach(savedBlock => {
        // Extract timestamp from savedBlock ID: "block-splitHeroSecurity-1754465928482"
        const parts = savedBlock.id.split('-');
        if (parts.length >= 3) {
          const templateId = parts[1]; // "splitHeroSecurity"
          const timestamp = parts[2]; // "1754465928482"
          const dataBlockId = `${templateId}_${timestamp}`;

          // Initialize block type stats
          if (!blockTypeStats[templateId]) {
            blockTypeStats[templateId] = { total: 0, added: 0, skipped: 0 };
          }
          blockTypeStats[templateId].total++;

          // Check if content already exists
          const existingContent = currentBlockData.find(item => 
            item.id === dataBlockId && item.type === templateId
          );

          if (!existingContent) {
            // Get content from intermediate layer
            const content = getContentFromIntermediateLayer(templateId);
            if (content) {
              updateBlockData(dataBlockId, templateId, content);
              addedCount++;
              blockTypeStats[templateId].added++;
              console.log(`✅ Added content for ${templateId}`);
            } else {
              skippedCount++;
              blockTypeStats[templateId].skipped++;
              console.log(`⚠️ No content available for ${templateId}`);
            }
          } else {
            alreadyExistsCount++;
            console.log(`⏭️ Content already exists for ${templateId}`);
          }
        }
      });

      // Create detailed statistics message
      let statsMessage = '\n📊 Block Type Statistics:\n';
      Object.entries(blockTypeStats).forEach(([blockType, stats]) => {
        const status = blockType.includes('Hero') ? '✅ Supported' : '⚠️  Not supported yet';
        statsMessage += `  ${blockType}: ${stats.added}/${stats.total} added ${status}\n`;
      });

      const message = `Migration complete!\n✅ Added: ${addedCount} content items\n⏭️ Skipped: ${skippedCount} blocks\n📋 Already exists: ${alreadyExistsCount}\n${statsMessage}\n💡 Note: Only Hero blocks have content extraction support currently.`;
      
      console.log(`🎉 Migration complete! Added: ${addedCount}, Skipped: ${skippedCount}, Already exists: ${alreadyExistsCount}`);
      console.table(blockTypeStats);
      alert(message);

      // Refresh data display
      const blockData = getBlockData();
      console.log(`📊 Updated data array (${blockData.length} items):`, blockData);

    } catch (error) {
      console.error('Error during content migration:', error);
      alert(`Error during migration: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Test function: Modify content in session to demonstrate live changes
  const handleTestContentModification = () => {
    try {
      const blockData = getBlockData();
      console.log('🧪 Testing live content modification...');
      
      // Find a Hero block to modify
      const heroBlocks = blockData.filter(item => item.type.includes('Hero'));
      
      if (heroBlocks.length === 0) {
        alert('⚠️ No Hero blocks found in session data.\n\nPlease:\n1. Add a Hero block to a collection\n2. Run "🔄 Fill Content" migration\n3. Then try this test');
        return;
      }

      const randomBlock = heroBlocks[Math.floor(Math.random() * heroBlocks.length)];
      const timestamp = Date.now();
      
      // Modify the content with test data
      const modifiedContent = {
        ...randomBlock.content,
        title: `🧪 LIVE TEST TITLE - ${timestamp}`,
        description: `This content was dynamically modified at ${new Date().toLocaleTimeString()}! Changes should appear immediately in all block previews. 🚀`,
        badge: '🧪 LIVE SESSION DATA',
        primaryButtonText: 'Live Content!',
        secondaryButtonText: 'Session Powered'
      };

      // Update in session
      updateBlockData(randomBlock.id, randomBlock.type, modifiedContent);
      
      console.log(`✅ Modified content for ${randomBlock.type}:`, modifiedContent);
      
      alert(`🧪 Content Test Complete!\n\n` +
            `Modified: ${randomBlock.type}\n` +
            `New Title: "${modifiedContent.title}"\n\n` +
            `👀 Look at the block previews - they should show the new content immediately!\n\n` +
            `Check console for detailed logs.`);

    } catch (error) {
      console.error('Error during content test:', error);
      alert(`Error during content test: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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

  // Memoized pin card component for better performance with dynamic content
  const PinCard = memo(({ template }: { template: Template }) => {
    const { getContent } = useBlockContent();
    
    // Get dynamic content for this template from session (if available)
    const dynamicContent = useMemo(() => {
      const content = getContent(template.id);
      // Only log for Hero blocks to reduce console noise
      if (template.id.includes('Hero')) {
        console.log(`🎨 PinCard for ${template.id} using content:`, content ? 'DYNAMIC' : 'STATIC');
      }
      return content;
    }, [template.id, getContent]);
    
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
            {/* Pass dynamic content to component if it supports ContentProps */}
            <PreviewComponent content={dynamicContent} blockId={template.id} />
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

                  {/* Migration button to fill content for existing blocks */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFillContentForExistingBlocks}
                    title="Fill content for all existing blocks from intermediate layer"
                    className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 border-blue-200 dark:border-blue-800"
                  >
                    🔄 Fill Content
                  </Button>

                  {/* Test button to modify content in session */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestContentModification}
                    title="Test: Modify Hero content in session to see live changes"
                    className="bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900 border-green-200 dark:border-green-800"
                  >
                    🧪 Test Live Content
                  </Button>

                  {/* Reset button if corrupted data */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('⚠️ Reset all session data?\n\nThis will clear corrupted content and reload the page.\nUse this if you see "Element type is invalid" errors.')) {
                        sessionStorage.clear();
                        window.location.reload();
                      }
                    }}
                    title="Clear corrupted session data and reload page"
                    className="bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900 border-red-200 dark:border-red-800"
                  >
                    🔄 Reset Session
                  </Button>

                  {/* Debug button to check data array */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const blockData = getBlockData();
                      console.log(`📊 Current data array (${blockData.length} items):`, blockData);
                      alert(`Data array has ${blockData.length} content items. Check console for details.`);
                    }}
                    title="Debug: Show data array content"
                  >
                    📊 Data ({getBlockData().length})
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
