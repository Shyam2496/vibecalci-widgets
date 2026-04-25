import { useState } from 'react';
import { WidgetWrapper } from '../WidgetWrapper';
import { Plus, Minus } from 'lucide-react';

// --- 12. Date Picker --- standard pill display
export const DatePickerWidget = () => {
  const [val, setVal] = useState('2025-01-01');

  return (
    <WidgetWrapper
      label="Date Selector"
      hint="Select a single date from the calendar."
      iconColorClass="text-red-500"
    >
      <div className="neumorphic-inset rounded-[6px] h-8 flex items-center px-2">
        <input
          type="date"
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full bg-transparent text-[16px] font-semibold text-neutral-900 focus:outline-none h-full cursor-pointer"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};

// --- 13. Date Range Selector --- start and end dates
export const DateRangeSelectorWidget = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  return (
    <WidgetWrapper
      label="Date Range Selector"
      hint="Select a start and end date range."
      iconColorClass="text-red-500"
    >
      <div className="flex gap-2">
        <div className="flex-1 neumorphic-inset rounded-[6px] h-8 flex items-center px-2">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full bg-transparent text-[15px] font-semibold text-neutral-900 focus:outline-none h-full cursor-pointer"
            style={{ color: 'rgba(51, 51, 51, 0.99)' }}
          />
        </div>
        <div className="flex-1 neumorphic-inset rounded-[6px] h-8 flex items-center px-2">
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full bg-transparent text-[15px] font-semibold text-neutral-900 focus:outline-none h-full cursor-pointer"
            style={{ color: 'rgba(51, 51, 51, 0.99)' }}
          />
        </div>
      </div>
    </WidgetWrapper>
  );
};

// --- 14. Time Duration Input --- simplified counter
export const TimeDurationWidget = () => {
  const [val, setVal] = useState('20');
  const [unit, setUnit] = useState('Years');

  return (
    <WidgetWrapper
      label="Time Duration Counter"
      hint="Adjust duration and select unit (Days/Months/Years)."
      iconColorClass="text-cyan-600"
      badge={
        <div className="flex rounded-[6px] overflow-hidden neumorphic-elevated">
          {['Days', 'Months', 'Years'].map(u => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-2.5 py-1 text-[13px] font-bold transition-colors ${
                unit === u ? 'bg-cyan-500 text-white' : 'text-cyan-500 hover:bg-cyan-50'
              }`}
            >
              {u === 'Years' ? 'Yrs' : u === 'Months' ? 'Mo' : 'D'}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex items-center bg-transparent rounded-[6px] h-7 gap-1.5">
        <button
          onClick={() => setVal(v => String(Math.max(1, parseInt(v) - 1)))}
          className="h-7 w-10 flex items-center justify-center text-cyan-500 neumorphic-elevated rounded-[6px] flex-shrink-0"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex flex-row items-center justify-center gap-1.5 px-2 min-w-0 neumorphic-inset rounded-[6px] h-7">
          <span className="text-[16px] font-bold text-neutral-900 leading-none select-none" style={{ color: 'rgba(51, 51, 51, 0.99)' }}>{val}</span>
          <span className="text-[12px] text-cyan-400 font-semibold leading-none">{unit}</span>
        </div>
        <button
          onClick={() => setVal(v => String(parseInt(v) + 1))}
          className="h-7 w-10 flex items-center justify-center text-cyan-500 neumorphic-elevated rounded-[6px] flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </WidgetWrapper>
  );
};

// --- Replicas with unit selector ---

export const DatePickerWithUnitWidget = () => {
  const [val, setVal] = useState('2025-01-01');
  const [unit, setUnit] = useState('Standard');

  return (
    <WidgetWrapper
      label="Date Selector (Unit)"
      hint="Select date and switch context/format."
      iconColorClass="text-red-500"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-red-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Standard</option>
            <option>Fiscal</option>
          </select>
        </div>
      }
    >
      <div className="neumorphic-inset rounded-[6px] h-8 flex items-center px-2">
        <input
          type="date"
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full bg-transparent text-[14px] font-semibold text-neutral-900 focus:outline-none h-full cursor-pointer"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        />
      </div>
    </WidgetWrapper>
  );
};
