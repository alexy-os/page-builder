import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { Trash2, Edit, GripVertical, Braces } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

import { allComponents } from "./blocks/index";
import type { Block } from "../../types";

interface BuilderCanvasProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

export default function BuilderCanvas({ blocks, setBlocks }: BuilderCanvasProps) {
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [jsonError, setJsonError] = useState("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item: Block, index: number) => ({
      ...item,
      order: index
    }));

    setBlocks(updatedItems);
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter((block: Block) => block.id !== blockId));
  };

  const openEditModal = (block: Block) => {
    setEditingBlock(block);
    setJsonData(JSON.stringify(block.content, null, 2));
    setJsonError("");
  };

  const saveBlockData = () => {
    if (!editingBlock) return;
    
    try {
      const parsedData = JSON.parse(jsonData);
      setBlocks(blocks.map(block => 
        block.id === editingBlock.id 
          ? { ...block, content: parsedData }
          : block
      ));
      setEditingBlock(null);
      setJsonError("");
    } catch (error) {
      setJsonError("Invalid JSON format");
    }
  };

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
          <Edit className="w-12 h-12 text-muted-foreground" />
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
  );

  if (blocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-muted/10">
      
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
              {blocks.map((block: Block, index: number) => {
                const BlockComponent = allComponents[block.type as keyof typeof allComponents];
                
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
                              className="h-6 w-6 text-white hover:text-sky-300 hover:bg-sky-500/20"
                              onClick={() => openEditModal(block)}
                            >
                              <Braces className="h-3 w-3" />
                            </Button>
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

                        {/* Block Content */}
                        <div className="relative" data-block-id={block.id}>
                          {BlockComponent && (
                            <BlockComponent 
                              content={block.content}
                            />
                          )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-400 group-hover:bg-sky-500/5 transition-all duration-200 pointer-events-none rounded-lg" />
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

             {editingBlock && (
         <Dialog open={!!editingBlock} onOpenChange={() => setEditingBlock(null)}>
           <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
             <DialogHeader>
               <DialogTitle>Edit Block - {editingBlock.type}</DialogTitle>
               <p className="text-sm text-muted-foreground">ID: {editingBlock.id}</p>
             </DialogHeader>
             <div className="flex flex-col gap-4 flex-1 min-h-0">
               <div className="flex flex-col gap-2">
                 <label htmlFor="content" className="text-sm font-medium">
                   Block Content (JSON):
                 </label>
                 <textarea
                   id="content"
                   value={jsonData}
                   onChange={(e) => setJsonData(e.target.value)}
                   className="flex-1 min-h-[300px] p-3 monospace border border-input text-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring text-secondary-foreground bg-muted/25"
                   placeholder="Enter JSON data..."
                 />
               </div>
               {jsonError && (
                 <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">
                   Error: {jsonError}
                 </div>
               )}
             </div>
             <div className="flex justify-between pt-4 border-t">
               <Button 
                 variant="outline" 
                 onClick={() => setEditingBlock(null)}
               >
                 Cancel
               </Button>
               <Button 
                 onClick={saveBlockData}
                 disabled={!!jsonError}
               >
                 Save Changes
               </Button>
             </div>
           </DialogContent>
         </Dialog>
       )}
    </div>
  );
}