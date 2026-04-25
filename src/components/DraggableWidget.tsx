import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

interface DraggableWidgetProps {
  widgetId: string;
  label: string;
  children: React.ReactNode;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({ widgetId, label, children }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/widget-id', widgetId);
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`draggable-widget relative group ${isDragging ? 'dragging' : ''}`}
      title={`Drag "${label}" to the canvas`}
    >
      {/* Grip handle — visible on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-5 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-3.5 h-3.5 text-neutral-400" />
      </div>

      {/* Widget content — pointer events disabled during drag to prevent interaction in palette */}
      <div className="pointer-events-none select-none">
        {children}
      </div>
    </div>
  );
};
