import { SectionCard } from './components/WidgetWrapper';
import { DraggableWidget } from './components/DraggableWidget';
import { CalculatorCanvas } from './components/CalculatorCanvas';
import { getGroupedRegistry } from './widgetRegistry';

const groupedWidgets = getGroupedRegistry();

function App() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-4 px-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-[20px] font-extrabold text-neutral-900 tracking-tight">Vibecalci Widgets</h1>
        <p className="text-[12px] text-neutral-500 mt-0.5">Drag components from the palette to build your calculator</p>
      </div>

      {/* Two-Panel Layout */}
      <div className="flex gap-6 max-w-6xl mx-auto items-start">

        {/* LEFT PANEL — Widget Palette */}
        <div className="w-[42%] flex-shrink-0 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide pr-1 sticky top-4">
          <div className="flex flex-col gap-4">
            {Array.from(groupedWidgets.entries()).map(([category, widgets]) => (
              <SectionCard key={category} title={category}>
                {widgets.map(entry => (
                  <DraggableWidget key={entry.id} widgetId={entry.id} label={entry.label}>
                    <entry.Component />
                  </DraggableWidget>
                ))}
              </SectionCard>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — Calculator Canvas */}
        <div className="flex-1 sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide py-8 px-6">
          <CalculatorCanvas />
        </div>

      </div>
    </div>
  );
}

export default App;
