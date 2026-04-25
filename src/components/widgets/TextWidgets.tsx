import { useState, useRef } from 'react';
import { WidgetWrapper, cn } from '../WidgetWrapper';
import { Sigma, ChevronDown, ChevronUp } from 'lucide-react';

const SYMBOLS = [
  // Operators & Basic
  '+', '-', '*', '/', '=', '≠', '≈', '±', '(', ')',
  // Roots & Powers
  '√', '∛', '∜', '²', '³', 'e',
  // Calculus & Advanced
  '∫', 'log', 'π', 'Σ', '∞',
  // Greek & Science
  'α', 'β', 'γ', 'Δ', 'θ', 'λ', 'μ', 'φ', '%', '°',
  // Fractions
  '½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅐', '⅛', '⅜', '⅝', '⅞', '⅑', '⅒',
  // Logic
  '∀', '∃', '∄',
  // Variables & Numbers
  'n', 'i', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

// --- 6. Text Field --- underline style
export const TextFieldWidget = () => {
  const [val, setVal] = useState('');

  return (
    <WidgetWrapper
      label="Text Field"
      hint="Standard single-line text input."
      iconColorClass="text-violet-600"
    >
      <div className="neumorphic-inset rounded-[6px] h-8 flex items-center px-1">
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="e.g. Laptop, Chair..."
          className="w-full bg-transparent px-2 text-[16px] font-medium text-neutral-900 placeholder:text-violet-200 focus:outline-none h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

// --- 7. Custom Instructions --- with char count & symbol grid
export const CustomInstructionsWidget = () => {
  const [val, setVal] = useState('');
  const [showSymbols, setShowSymbols] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX = 500;

  const insertSymbol = (sym: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newValue = val.substring(0, start) + sym + val.substring(end);
    setVal(newValue);
    
    // Set cursor position after insertion in next frame
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + sym.length, start + sym.length);
      }
    }, 0);
  };

  return (
    <WidgetWrapper
      label="Text Area / Custom Instructions"
      hint="Multiline text input with symbol support."
      iconColorClass="text-fuchsia-600"
      badge={
        <button
          onClick={() => setShowSymbols(!showSymbols)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all neumorphic-elevated",
            showSymbols 
              ? 'bg-fuchsia-100 text-fuchsia-700' 
              : 'text-fuchsia-500 hover:bg-fuchsia-50'
          )}
        >
          <Sigma className="w-3.5 h-3.5" />
          <span className="text-[13px] font-bold">Symbols</span>
          {showSymbols ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <div className="relative group">
          <textarea
            ref={textareaRef}
            rows={3}
            value={val}
            maxLength={MAX}
            onChange={e => setVal(e.target.value)}
            placeholder="e.g. If value > 100 then multiply by 0.5..."
            className="w-full neumorphic-inset rounded-[6px] px-2.5 py-1 text-[15.5px] font-medium text-neutral-900 placeholder:text-fuchsia-200 focus:outline-none resize-none transition-all scrollbar-hide"
            style={{ color: 'rgba(51, 51, 51, 0.99)' }}
          />
          <span className="absolute bottom-1.5 right-2 text-[12px] text-fuchsia-300 font-bold bg-white/80 px-1 rounded backdrop-blur-sm select-none">
            {val.length}/{MAX}
          </span>
        </div>

        {showSymbols && (
          <div className="grid grid-cols-9 gap-1 p-1.5 bg-white border border-fuchsia-100 rounded-[6px] animate-in fade-in slide-in-from-top-1 duration-200">
            {SYMBOLS.map(sym => (
              <button
                key={sym}
                onClick={() => insertSymbol(sym)}
                className="h-7 flex items-center justify-center text-[16px] font-bold text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors active:scale-90"
              >
                {sym}
              </button>
            ))}
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
};

// --- replicas with unit selector ---

export const TextFieldWithUnitWidget = () => {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('kg');

  return (
    <WidgetWrapper
      label="Text Field (Unit)"
      hint="Single-line input with unit selection."
      iconColorClass="text-violet-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-violet-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>kg</option>
            <option>lbs</option>
            <option>g</option>
            <option>oz</option>
          </select>
        </div>
      }
    >
      <div className="flex items-center gap-0 neumorphic-inset rounded-[6px] overflow-hidden h-8 px-1">
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="e.g. 1.5"
          className="flex-1 px-2 text-[16px] font-medium text-neutral-900 bg-transparent focus:outline-none placeholder:text-violet-200 min-w-0 h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
        <span className="flex-shrink-0 px-2 text-[14px] font-semibold text-violet-400 border-l border-violet-100 h-5 flex items-center">
          {unit}
        </span>
      </div>
    </WidgetWrapper>
  );
};

export const CustomInstructionsWithUnitWidget = () => {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('Lines');
  const [showSymbols, setShowSymbols] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX = 500;

  const insertSymbol = (sym: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newValue = val.substring(0, start) + sym + val.substring(end);
    setVal(newValue);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + sym.length, start + sym.length);
      }
    }, 0);
  };

  return (
    <WidgetWrapper
      label="Text Area (Unit)"
      hint="Multiline input with unit and symbols."
      iconColorClass="text-fuchsia-600"
      badge={
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSymbols(!showSymbols)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all neumorphic-elevated",
              showSymbols 
                ? 'bg-fuchsia-100 text-fuchsia-700' 
                : 'text-fuchsia-500 hover:bg-fuchsia-50'
            )}
          >
            <Sigma className="w-3.5 h-3.5" />
            <span className="text-[13px] font-bold">Symbols</span>
            {showSymbols ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
            <select
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="text-[14px] font-semibold text-fuchsia-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option>Lines</option>
              <option>Chars</option>
              <option>Words</option>
            </select>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-1">
        <div className="relative group">
          <textarea
            ref={textareaRef}
            rows={3}
            value={val}
            maxLength={MAX}
            onChange={e => setVal(e.target.value)}
            placeholder="Enter your notes or logic..."
            className="w-full neumorphic-inset rounded-[6px] px-2.5 py-1 text-[15.5px] font-medium text-neutral-900 placeholder:text-fuchsia-200 focus:outline-none resize-none transition-all scrollbar-hide"
            style={{ color: 'rgba(51, 51, 51, 0.99)' }}
          />
          <span className="absolute bottom-1.5 right-2 text-[12px] text-fuchsia-300 font-bold bg-white/80 px-1 rounded backdrop-blur-sm select-none">
            {val.length}/{MAX}
          </span>
        </div>

        {showSymbols && (
          <div className="grid grid-cols-9 gap-1 p-1.5 bg-white border border-fuchsia-100 rounded-[6px] animate-in fade-in slide-in-from-top-1 duration-200">
            {SYMBOLS.map(sym => (
              <button
                key={sym}
                onClick={() => insertSymbol(sym)}
                className="h-7 flex items-center justify-center text-[14px] font-bold text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors active:scale-90"
              >
                {sym}
              </button>
            ))}
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
};
