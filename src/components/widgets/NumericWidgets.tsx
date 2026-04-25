import { useState } from 'react';
import { WidgetWrapper } from '../WidgetWrapper';
import { Plus, Minus } from 'lucide-react';

export const NumberInputWidget = () => {
  const [val, setVal] = useState('250000');

  return (
    <WidgetWrapper
      label="Numeric Input"
      hint="Enter a number value."
      iconColorClass="text-indigo-600"
    >
      <div
        className="flex items-center justify-center gap-2 neumorphic-inset rounded-[6px] px-2 h-8 max-w-sm w-full"
      >
        <span className="text-[14px] font-medium text-indigo-300 flex-shrink-0">#</span>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="0"
          className="flex-1 text-[16px] font-semibold text-neutral-900 bg-transparent focus:outline-none placeholder:text-indigo-100 min-w-0 h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

// --- 2. Currency Input --- inline horizontal with large symbol
export const CurrencyInputWidget = () => {
  const [val, setVal] = useState('4500');

  return (
    <WidgetWrapper
      label="Currency Input"
      hint="Enter the amount."
      iconColorClass="text-emerald-600"
      badge={
        <span className="text-[12px] font-bold text-emerald-700 px-2 py-1 select-none">USD</span>
      }
    >
      <div className="flex items-center gap-2 neumorphic-inset rounded-[6px] overflow-hidden h-8 px-1">
        <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
          <span className="text-[15px] font-bold text-emerald-500">$</span>
        </div>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="0.00"
          className="flex-1 text-[16px] font-semibold text-neutral-900 bg-transparent focus:outline-none placeholder:text-emerald-100 min-w-0 h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

// --- 3. Percentage Input --- large centered value + slider
export const PercentageInputWidget = () => {
  const [val, setVal] = useState(7.5);

  return (
    <WidgetWrapper
      label="Slider Numeric Input"
      hint="Drag to select a percentage value."
      iconColorClass="text-orange-500"
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
          <input
            type="range"
            min={1}
            max={25}
            step={0.1}
            value={val}
            onChange={e => setVal(parseFloat(e.target.value))}
            className="neumorphic-slider-track neumorphic-slider-thumb accent-orange-500"
            style={{ 
              background: `linear-gradient(to right, rgb(249, 115, 22) 0%, rgb(249, 115, 22) ${((val - (1)) / (25 - (1))) * 100}%, rgba(229, 229, 229, 0.5) ${((val - (1)) / (25 - (1))) * 100}%, rgba(229, 229, 229, 0.5) 100%)`,
              ['--thumb-color' as any]: 'rgb(249, 115, 22)'
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-orange-500 px-0.5">
            <span>1%</span>
            <span>25%</span>
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-[3.8rem] h-7 px-1.5 bg-white/40 border border-[#bcc2c8]/40 rounded-[6px] justify-center flex-shrink-0 self-start">
          <span className="text-[16px] font-bold text-neutral-900 leading-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] font-medium text-orange-400 leading-none mt-0.5">%</span>
        </div>
      </div>
    </WidgetWrapper>
  );
};

// --- 4. Range Slider --- large centered value + unit + slider
export const RangeSliderWidget = () => {
  const [val, setVal] = useState(30);

  return (
    <WidgetWrapper
      label="Slider Input"
      hint="Drag to select a value."
      iconColorClass="text-pink-500"
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
          <input
            type="range"
            min={18}
            max={65}
            value={val}
            onChange={e => setVal(parseInt(e.target.value))}
            className="neumorphic-slider-track neumorphic-slider-thumb accent-pink-500"
            style={{ 
              background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(236, 72, 153) ${((val - 18) / (65 - 18)) * 100}%, rgba(229, 229, 229, 0.5) ${((val - 18) / (65 - 18)) * 100}%, rgba(229, 229, 229, 0.5) 100%)`,
              ['--thumb-color' as any]: 'rgb(236, 72, 153)'
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-pink-500 px-0.5">
            <span>18 yrs</span>
            <span>65 yrs</span>
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-[3.8rem] h-7 px-1.5 bg-white/40 border border-[#bcc2c8]/40 rounded-[6px] justify-center flex-shrink-0 self-start">
          <span className="text-[16px] font-bold text-neutral-900 leading-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] font-medium text-pink-400 leading-none mt-0.5">yrs</span>
        </div>
      </div>
    </WidgetWrapper>
  );
};

// --- 5. Stepper Input --- full-width pill row
export const StepperInputWidget = () => {
  const [val, setVal] = useState(4);

  return (
    <WidgetWrapper
      label="Stepper Input"
      hint="Use plus and minus to adjust value."
      iconColorClass="text-sky-500"
    >
      <div className="flex items-center bg-transparent rounded-[6px] h-8 gap-1.5">
        <button
          onClick={() => setVal(v => Math.max(1, v - 1))}
          className="h-full w-10 flex items-center justify-center text-sky-500 neumorphic-elevated rounded-[6px] flex-shrink-0 cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex flex-row items-center justify-center gap-1.5 px-2 min-w-0 neumorphic-inset rounded-[6px] h-full">
          <span className="text-[16px] font-bold text-neutral-900 leading-none select-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] text-sky-400 font-semibold leading-none">People</span>
        </div>
        <button
          onClick={() => setVal(v => v + 1)}
          className="h-full w-10 flex items-center justify-center text-sky-500 neumorphic-elevated rounded-[6px] flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </WidgetWrapper>
  );
};

// --- replicas with unit selector ---

export const NumberInputWithUnitWidget = () => {
  const [val, setVal] = useState('250000');
  const [unit, setUnit] = useState('Amount');

  return (
    <WidgetWrapper
      label="Numeric Input (Unit)"
      hint="Enter a number value and select unit."
      iconColorClass="text-indigo-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-indigo-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Amount</option>
            <option>Units</option>
            <option>Qty</option>
          </select>
        </div>
      }
    >
      <div
        className="flex items-center justify-center gap-2 neumorphic-inset rounded-[6px] px-2 h-8 max-w-sm w-full"
      >
        <span className="text-[14px] font-medium text-indigo-300 flex-shrink-0">#</span>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="0"
          className="flex-1 text-[16px] font-semibold text-neutral-900 bg-transparent focus:outline-none placeholder:text-indigo-100 min-w-0 h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

export const CurrencyInputWithUnitWidget = () => {
  const [val, setVal] = useState('4500');
  const [unit, setUnit] = useState('USD');

  const symbol = unit === 'USD' ? '$' : unit === 'EUR' ? '€' : '£';

  return (
    <WidgetWrapper
      label="Currency Input (Unit)"
      hint="Enter amount and select unit."
      iconColorClass="text-emerald-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-emerald-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
      }
    >
      <div className="flex items-center gap-2 neumorphic-inset rounded-[6px] overflow-hidden h-8 px-1">
        <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
          <span className="text-[15px] font-bold text-emerald-500">{symbol}</span>
        </div>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="0.00"
          className="flex-1 text-[16px] font-semibold text-neutral-900 bg-transparent focus:outline-none placeholder:text-emerald-100 min-w-0 h-full"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

export const PercentageInputWithUnitWidget = () => {
  const [val, setVal] = useState(7.5);
  const [unit, setUnit] = useState('%');

  return (
    <WidgetWrapper
      label="Slider Numeric (Unit)"
      hint="Adjust value and select unit."
      iconColorClass="text-orange-500"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-1.5 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[15px] font-bold text-neutral-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>%</option>
            <option>BPS</option>
          </select>
        </div>
      }
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
          <input
            type="range"
            min={1}
            max={unit === '%' ? 25 : 2500}
            step={unit === '%' ? 0.1 : 10}
            value={val}
            onChange={e => setVal(parseFloat(e.target.value))}
            className="neumorphic-slider-track neumorphic-slider-thumb accent-orange-500"
            style={{ 
              background: `linear-gradient(to right, rgb(249, 115, 22) 0%, rgb(249, 115, 22) ${((val - (1)) / ((unit === '%' ? 25 : 2500) - (1))) * 100}%, rgba(229, 229, 229, 0.5) ${((val - (1)) / ((unit === '%' ? 25 : 2500) - (1))) * 100}%, rgba(229, 229, 229, 0.5) 100%)`,
              ['--thumb-color' as any]: 'rgb(249, 115, 22)'
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-orange-500 px-0.5">
            <span>1 {unit}</span>
            <span>{unit === '%' ? 25 : 2500} {unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-[4.2rem] h-7 px-1.5 bg-white/40 border border-[#bcc2c8]/40 rounded-[6px] justify-center flex-shrink-0 self-start">
          <span className="text-[16px] font-bold text-neutral-900 leading-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] font-medium text-orange-400 leading-none mt-0.5">{unit}</span>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export const RangeSliderWithUnitWidget = () => {
  const [val, setVal] = useState(30);
  const [unit, setUnit] = useState('yrs');

  return (
    <WidgetWrapper
      label="Slider Input (Unit)"
      hint="Drag to select value and switch unit."
      iconColorClass="text-pink-500"
      badge={
        <div className="flex rounded-md overflow-hidden neumorphic-elevated">
          {['yrs', 'mo', 'wks'].map(u => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-2.5 py-1 text-[13px] font-bold transition-colors ${
                unit === u ? 'bg-pink-500 text-white' : 'text-pink-400 hover:bg-pink-50'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
          <input
            type="range"
            min={1}
            max={60}
            value={val}
            onChange={e => setVal(parseInt(e.target.value))}
            className="neumorphic-slider-track neumorphic-slider-thumb accent-pink-500"
            style={{ 
              background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(236, 72, 153) ${((val - (1)) / (60 - (1))) * 100}%, rgba(229, 229, 229, 0.5) ${((val - (1)) / (60 - (1))) * 100}%, rgba(229, 229, 229, 0.5) 100%)`,
              ['--thumb-color' as any]: 'rgb(236, 72, 153)'
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-pink-500 px-0.5">
            <span>1 {unit}</span>
            <span>60 {unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-[4.2rem] h-7 px-1.5 bg-white/40 border border-[#bcc2c8]/40 rounded-[6px] justify-center flex-shrink-0 self-start">
          <span className="text-[16px] font-bold text-neutral-900 leading-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] font-medium text-pink-400 leading-none mt-0.5">{unit}</span>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export const StepperInputWithUnitWidget = () => {
  const [val, setVal] = useState(4);
  const [unit, setUnit] = useState('People');

  return (
    <WidgetWrapper
      label="Stepper Input (Unit)"
      hint="Adjust value and switch category."
      iconColorClass="text-sky-500"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-sky-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>People</option>
            <option>Families</option>
            <option>Pets</option>
          </select>
        </div>
      }
    >
      <div className="flex items-center bg-transparent rounded-[6px] h-8 gap-1.5">
        <button
          onClick={() => setVal(v => Math.max(1, v - 1))}
          className="h-full w-10 flex items-center justify-center text-sky-500 neumorphic-elevated rounded-[6px] flex-shrink-0"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex flex-row items-center justify-center gap-1.5 px-2 min-w-0 neumorphic-inset rounded-[6px] h-full">
          <span className="text-[16px] font-bold text-neutral-900 leading-none select-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] text-sky-400 font-semibold leading-none">{unit}</span>
        </div>
        <button
          onClick={() => setVal(v => v + 1)}
          className="h-full w-10 flex items-center justify-center text-sky-500 neumorphic-elevated rounded-[6px] flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </WidgetWrapper>
  );
};
