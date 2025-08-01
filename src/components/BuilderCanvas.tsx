import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Trash2, GripVertical, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useCallback } from "react";
import { useAtom } from 'jotai';

import { allComponents } from "@/components/blocks";
import type { Block } from "@/types";
import { blockErrorsAtom } from "@/atoms";
import { performance } from "@/lib/utils";

interface BuilderCanvasProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

// Error boundary component for individual blocks
function BlockErrorBoundary({ 
  block, 
  children, 
  onError 
}: { 
  block: Block; 
  children: React.ReactNode;
  onError: (blockId: string, error: Error) => void;
}) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback((error: Error) => {
    console.error(`Error rendering block ${block.id}:`, error);
    setHasError(true);
    onError(block.id, error);
  }, [block.id, onError]);

  // Reset error state when block changes
  useMemo(() => {
    setHasError(false);
  }, [block.id, block.type, block.content]);

  if (hasError) {
    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 m-2">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">Block Error</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          Failed to render block "{block.type}" (ID: {block.id})
        </p>
        <p className="text-xs text-red-500 dark:text-red-500 mt-1">
          This block may have corrupted data. Consider removing or editing it.
        </p>
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (error) {
    handleError(error as Error);
    return null;
  }
}

// Safe block validation
function validateBlock(block: any): block is Block {
  if (!block || typeof block !== 'object') {
    return false;
  }
  
  if (!block.id || typeof block.id !== 'string') {
    return false;
  }
  
  if (!block.type || typeof block.type !== 'string') {
    return false;
  }
  
  if (typeof block.order !== 'number') {
    return false;
  }
  
  return true;
}

export default function BuilderCanvas({ blocks, setBlocks }: BuilderCanvasProps) {
  // Jotai atoms for state management
  const [blockErrors, setBlockErrors] = useAtom(blockErrorsAtom);

  // Validate and filter blocks safely
  const validBlocks = useMemo(() => {
    if (!Array.isArray(blocks)) {
      console.warn('Blocks is not an array:', blocks);
      return [];
    }

    return blocks.filter((block, index) => {
      if (!validateBlock(block)) {
        console.warn(`Invalid block at index ${index}:`, block);
        return false;
      }
      return true;
    }).sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [blocks]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    performance.mark('drag-end-start');

    // Use requestAnimationFrame to avoid blocking the main thread
    requestAnimationFrame(() => {
      try {
        const items = Array.from(validBlocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination!.index, 0, reorderedItem);

        // Update order property
        const updatedItems = items.map((item: Block, index: number) => ({
          ...item,
          order: index
        }));

        setBlocks(updatedItems);
        
        performance.mark('drag-end-complete');
        performance.measureBetween('drag-operation', 'drag-end-start', 'drag-end-complete');
      } catch (error) {
        console.error('Error during drag and drop:', error);
      }
    });
  }, [validBlocks, setBlocks]);

  const removeBlock = useCallback((blockId: string) => {
    try {
      setBlocks(validBlocks.filter((block: Block) => block.id !== blockId));
      // Remove from error tracking
      setBlockErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(blockId);
        return newSet;
      });
    } catch (error) {
      console.error('Error removing block:', error);
    }
  }, [validBlocks, setBlocks, setBlockErrors]);



  const handleBlockError = useCallback((blockId: string, error: Error) => {
    setBlockErrors(prev => new Set(prev).add(blockId));
    console.error(`Block ${blockId} encountered an error:`, error);
  }, [setBlockErrors]);

  const EmptyState = () => (
    <div className="w-full h-full flex flex-col bg-muted/10">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start Building</h3>
          <p className="text-muted-foreground mb-6">
            Drag blocks from the sidebar to create your professional landing page
          </p>
          <div className="text-sm text-muted-foreground">
            Choose from Hero, Features, News, CTA, and Footer blocks
          </div>
        </div>
      </div>
    </div>
  );

  if (validBlocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-muted/10">
      <div className="flex-1 overflow-y-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`min-h-full transition-colors duration-200 ${
                snapshot.isDraggingOver ? "bg-sky-50 dark:bg-sky-950/20" : ""
              }`}
            >
              {validBlocks.map((block: Block, index: number) => {
                const BlockComponent = allComponents[block.type as keyof typeof allComponents];
                
                // Skip rendering if component doesn't exist
                if (!BlockComponent) {
                  console.warn(`No component found for block type: ${block.type}`);
                  return (
                    <div key={block.id} className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 m-2">
                      <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Unknown Block Type</span>
                      </div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                        Block type "{block.type}" is not recognized (ID: {block.id})
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() => removeBlock(block.id)}
                      >
                        Remove Block
                      </Button>
                    </div>
                  );
                }
                
                return (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group relative transition-all duration-200 touch-manipulation ${
                          snapshot.isDragging ? "rotate-2 scale-105 shadow-2xl z-50" : ""
                        }`}
                      >
                        {/* Block Controls - Desktop */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex gap-2 bg-black/80 backdrop-blur-sm rounded-lg p-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-white hover:text-red-300 hover:bg-red-500/20"
                              onClick={() => removeBlock(block.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <div
                              {...provided.dragHandleProps}
                              className="p-1 text-white hover:text-sky-300 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>
                          </div>
                        </div>

                        {/* Block Content with Error Boundary */}
                        <div className="relative" data-block-id={block.id}>
                          <BlockErrorBoundary 
                            block={block} 
                            onError={handleBlockError}
                          >
                            <BlockComponent />
                          </BlockErrorBoundary>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-400 group-hover:bg-sky-500/5 transition-all duration-200 pointer-events-none rounded-lg" />
                        
                        {/* Error indicator */}
                        {blockErrors.has(block.id) && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Error
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>


      </div>
    </div>
  );
}