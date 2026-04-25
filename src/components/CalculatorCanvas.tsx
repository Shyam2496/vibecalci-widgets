import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { getWidgetById } from '../widgetRegistry';
import { ResultDisplayWidget } from './widgets/DataWidgets';

interface CanvasItem {
  instanceId: string;
  widgetId: string;
}

let instanceCounter = 0;

export const CalculatorCanvas: React.FC = () => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only handle leave if actually leaving the container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const widgetId = e.dataTransfer.getData('application/widget-id');
    if (!widgetId) return;

    const widget = getWidgetById(widgetId);
    if (!widget) return;

    instanceCounter++;
    setItems(prev => [...prev, {
      instanceId: `canvas-${instanceCounter}`,
      widgetId,
    }]);
  };

  const removeItem = (instanceId: string) => {
    setItems(prev => prev.filter(item => item.instanceId !== instanceId));
  };

  return (
    <div className="flex flex-col gap-3 max-w-[400px] mx-auto w-full">
      {/* === LAYER 1: Drop shadow + ambient === */}
      <div
        className="relative rounded-[2rem]"
        style={{
          boxShadow: `
            0 45px 80px -20px rgba(0,0,0,0.35),
            0 20px 40px -10px rgba(0,0,0,0.2),
            0 3px 10px rgba(0,0,0,0.12)
          `,
        }}
      >
        {/* === LAYER 2: Bezel — uniform color, curved edges via box-shadow ridges === */}
        <div
          className="rounded-[2rem] p-[5px] relative"
          style={{
            /* Uniform bezel color — no directional gradient */
            background: '#d8dde4',
            /* 
              Curved edge effect via stacked inset shadows:
              - Top edge: bright specular ridge (light hitting the curve apex)
              - Left edge: secondary specular
              - Bottom edge: soft ambient bounce light
              - Right edge: gentle ambient
              - Additional layers for the "roll-off" gradient of a curved surface
            */
            boxShadow: `
              inset 0 3px 1px -1px rgba(255,255,255,0.85),
              inset 0 1px 0px rgba(255,255,255,0.6),
              inset 3px 0 1px -1px rgba(255,255,255,0.4),
              inset 1px 0 0px rgba(255,255,255,0.3),
              inset 0 -2px 1px -1px rgba(255,255,255,0.25),
              inset 0 -1px 0px rgba(255,255,255,0.15),
              inset -2px 0 1px -1px rgba(255,255,255,0.2),
              inset -1px 0 0px rgba(255,255,255,0.1),
              inset 0 4px 8px -2px rgba(255,255,255,0.5),
              inset 0 -3px 6px -2px rgba(0,0,0,0.06)
            `,
          }}
        >

          {/* === LAYER 3: Inner face plate (recessed into the bezel) === */}
          <div
            className="rounded-[1.5rem] overflow-hidden relative"
            style={{
              background: 'linear-gradient(180deg, #dee3ea 0%, #d8dde4 100%)',
              /* Recessed look — shadow at top/sides, light bounce at bottom */
              boxShadow: `
                inset 0 2px 5px rgba(0,0,0,0.1),
                inset 1px 0 3px rgba(0,0,0,0.05),
                inset -1px 0 3px rgba(0,0,0,0.05),
                inset 0 -1px 2px rgba(255,255,255,0.5)
              `,
            }}
          >
            {/* Matte surface texture */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '150px 150px',
              }}
            />

            {/* Canvas title bar */}
            <div className="relative z-10 px-5 pt-3 pb-1 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Calculator Preview</p>
              {items.length > 0 && (
                <button
                  onClick={() => setItems([])}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Canvas content */}
            <div className="relative z-10 flex flex-col gap-0 px-3 pb-3">
              {/* Result Display — always present, not removable */}
              <ResultDisplayWidget />

              {/* Dropped Widgets */}
              {items.map((item) => {
                const widget = getWidgetById(item.widgetId);
                if (!widget) return null;

                const WidgetComponent = widget.Component;
                return (
                  <div key={item.instanceId} className="canvas-widget-item relative group">
                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.instanceId)}
                      className="absolute -right-1 top-1 z-30 w-5 h-5 flex items-center justify-center rounded-full 
                        bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-all 
                        hover:bg-red-500 hover:text-white hover:scale-110 shadow-sm"
                      title="Remove widget"
                    >
                      <X className="w-3 h-3" strokeWidth={3} />
                    </button>

                    {/* Rendered Widget */}
                    <WidgetComponent />
                  </div>
                );
              })}

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`canvas-drop-zone flex flex-col items-center justify-center gap-2 
                  rounded-xl border-2 border-dashed border-[#bcc2c8]/50 
                  min-h-[80px] mt-1 mx-1 mb-1 transition-all
                  ${dragOver ? 'drag-over border-emerald-400/60' : ''}
                  ${items.length === 0 ? 'min-h-[120px]' : ''}`}
              >
                <Plus className={`w-5 h-5 transition-colors ${dragOver ? 'text-emerald-500' : 'text-neutral-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${dragOver ? 'text-emerald-500' : 'text-neutral-400'}`}>
                  {dragOver ? 'Release to add' : 'Drag widgets here'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
