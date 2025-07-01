import { useState, useEffect } from "react";
import { Grid3X3, Grid2X2, Bookmark, ChevronDown } from "lucide-react";
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
import { allTemplates } from "../components/builder/blocks/index";
import { useTheme } from "../hooks/useTheme";
import type { Template } from "../types";

export default function PagePins() {
  const { 
    isDark,
    themeSelectorKey, 
    toggleDarkMode, 
    changeTheme
  } = useTheme();
  
  const [columns, setColumns] = useState<2 | 3>(3);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
  });

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
    let filtered = allTemplates;
    
    // Filter by category first
    if (activeCategory) {
      filtered = allTemplates.filter(template => {
        // Match template ID prefix with category
        return template.id.startsWith(activeCategory) || 
               template.id.includes(activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1));
      });
    }
    
    // Then filter by collection if active
    if (activeCollection) {
      // Simple filtering logic - in real app you'd have proper collection mapping
      // For now, just return the already filtered templates
      return filtered;
    }
    
    return filtered;
  };

  const filteredBlocks = getFilteredBlocks();

  const PinCard = ({ template }: { template: Template }) => {
    const PreviewComponent = template.component;
    
    return (
      <div className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg">
        {/* Preview */}
        <div className="relative overflow-hidden bg-background h-48">
          <div className="transform scale-[0.15] origin-top-left w-[666%] h-[666%] pointer-events-none">
            <PreviewComponent content={template.defaultContent} isPreview={true} />
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Action button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="h-8 px-3 bg-white/90 text-gray-900 hover:bg-white">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Save
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span className="font-medium">Business</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="font-medium">Blog</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="font-medium">Favorites</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
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
    </div>
  );
}
