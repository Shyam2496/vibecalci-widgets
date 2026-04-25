import { useState } from 'react';
import { WidgetWrapper, cn } from '../WidgetWrapper';
import { ChevronDown, Check } from 'lucide-react';

// --- 8. Dropdown Selector --- full-width pill button
export const DropdownSelectorWidget = () => {
  const [val, setVal] = useState('USD');

  return (
    <WidgetWrapper
      label="Dropdown Selector"
      hint="Select an option from the list."
      iconColorClass="text-teal-600"
    >
      <div className="relative w-full">
        <select
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full appearance-none neumorphic-elevated rounded-[6px] px-3 py-1 text-[16px] font-semibold text-neutral-900 focus:outline-none focus:ring-1.5 focus:ring-teal-300 cursor-pointer pr-9 h-8"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        >
          <option value="USD">🇺🇸 USD — US Dollar</option>
          <option value="EUR">🇪🇺 EUR — Euro</option>
          <option value="GBP">🇬🇧 GBP — Pound</option>
          <option value="INR">🇮🇳 INR — Indian Rupee</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400 pointer-events-none" />
      </div>
    </WidgetWrapper>
  );
};

// --- 9. Radio Button Group --- left-accent-bar layout
export const RadioGroupWidget = () => {
  const [val, setVal] = useState('Monthly');
  const options = [
    { label: 'Monthly', sublabel: 'Pay every month' },
    { label: 'Quarterly', sublabel: 'Pay every 3 months' },
    { label: 'Yearly', sublabel: 'Pay once a year' },
  ];

  return (
    <WidgetWrapper
      label="Radio Group"
      hint="Select a single option from the list."
      iconColorClass="text-rose-500"
    >
      <div className="flex flex-col divide-y divide-rose-100 neumorphic-elevated rounded-[6px] overflow-hidden">
        {options.map(({ label, sublabel }) => (
          <div
            key={label}
            onClick={() => setVal(label)}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1 cursor-pointer transition-all select-none',
              val === label ? 'bg-neutral-100' : 'hover:bg-neutral-50'
            )}
          >
            {/* Left accent bar */}
            <div className={cn(
              'w-1 h-6 rounded-full flex-shrink-0 transition-all',
              val === label ? 'bg-rose-500' : 'bg-transparent'
            )} />
            <div className="flex-1">
              <p className={cn(
                'text-[15px] font-medium leading-none',
                val === label ? 'text-neutral-900' : 'text-neutral-500'
              )}>{label}</p>
              <p className="text-[12px] text-neutral-400 leading-tight mt-0.5">{sublabel}</p>
            </div>
            {val === label && (
              <div className="w-4 h-4 rounded-full border-2 border-rose-500 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
};

// --- 10. Checkbox --- 2-column chip grid
export const CheckboxWidget = () => {
  const options = [
    { id: 'taxes', label: 'Include Taxes' },
    { id: 'insurance', label: 'Add Insurance' },
    { id: 'processing', label: 'Processing Fee' },
  ];
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({ taxes: true });

  
  return (
    <WidgetWrapper
      label="Checkbox Group"
      hint="Select one or more options."
      iconColorClass="text-slate-600"
    >
      <div className="grid grid-cols-2 gap-2">
        {options.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setChecked(s => ({ ...s, [id]: !s[id] }))}
            className={cn(
              'flex flex-col items-start gap-0.5 px-3 py-1 rounded-[6px] transition-all text-left select-none active:translate-y-0.5',
              checked[id]
                ? 'bg-slate-700 border-t border-b-2 border-x border-slate-800 text-white shadow-md'
                : 'neumorphic-elevated text-neutral-500'
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className={cn('text-[13.5px] font-medium leading-tight', checked[id] ? 'text-white' : 'text-neutral-700')}>
                {label}
              </span>
              {checked[id] && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        ))}
      </div>
    </WidgetWrapper>
  );
};

// --- 11. Toggle Switch --- tight borderless rows with dividers
export const ToggleSwitchWidget = () => {
  const options = [
    { id: 'inflation', label: 'Inflation Adjustment', sublabel: 'Auto adjust for CPI' },
    { id: 'tax', label: 'Tax Deduction', sublabel: 'Apply tax relief' },
  ];
  const [toggled, setToggled] = useState<{ [key: string]: boolean }>({ inflation: true });

  
  return (
    <WidgetWrapper
      label="Toggle Switch Group"
      hint="Enable or disable multiple features."
      iconColorClass="text-orange-500"
    >
      <div className="flex flex-col divide-y divide-orange-100 neumorphic-elevated rounded-[6px] overflow-hidden">
        {options.map(({ id, label, sublabel }) => (
          <div
            key={id}
            onClick={() => setToggled(s => ({ ...s, [id]: !s[id] }))}
            className="flex items-center justify-between px-2.5 py-1 cursor-pointer hover:bg-orange-50/60 transition-all"
          >
            <div>
              <p className="text-[15px] font-medium text-neutral-900 leading-none">{label}</p>
              <p className="text-[12px] text-neutral-400 mt-0.5">{sublabel}</p>
            </div>
            <div className={cn(
              'w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors duration-200 flex-shrink-0',
              toggled[id] ? 'bg-orange-400' : 'bg-neutral-200'
            )}>
              <div className={cn(
                'w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200',
                toggled[id] ? 'translate-x-3.5' : 'translate-x-0'
              )} />
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
};

// --- replicas with unit selector ---
export const DropdownSelectorWithUnitWidget = () => {
  const [val, setVal] = useState('USD');
  const [unit, setUnit] = useState('Fiat');

  return (
    <WidgetWrapper
      label="Dropdown Switcher (Unit)"
      hint="Select main value and switch category."
      iconColorClass="text-teal-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-teal-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Fiat</option>
            <option>Crypto</option>
          </select>
        </div>
      }
    >
      <div className="relative w-full">
        <select
          value={val}
          onChange={e => setVal(e.target.value)}
          className="w-full appearance-none neumorphic-elevated rounded-[6px] px-3 text-[14px] font-semibold text-neutral-900 focus:outline-none focus:ring-1.5 focus:ring-teal-300 cursor-pointer pr-9 h-8"
          style={{ color: 'rgba(51, 51, 51, 0.99)' }}
        >
          <option value="USD">🇺🇸 USD — US Dollar</option>
          <option value="EUR">🇪🇺 EUR — Euro</option>
          <option value="GBP">🇬🇧 GBP — Pound</option>
          <option value="INR">🇮🇳 INR — Indian Rupee</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400 pointer-events-none" />
      </div>
    </WidgetWrapper>
  );
};

export const RadioGroupWithUnitWidget = () => {
  const [val, setVal] = useState('Monthly');
  const [unit, setUnit] = useState('Frequency');
  const options = [
    { label: 'Monthly', sublabel: 'Pay every month' },
    { label: 'Quarterly', sublabel: 'Pay every 3 months' },
    { label: 'Yearly', sublabel: 'Pay once a year' },
  ];

  return (
    <WidgetWrapper
      label="Radio Group (Unit)"
      hint="Select an option and switch context."
      iconColorClass="text-rose-500"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-rose-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Frequency</option>
            <option>Schedule</option>
          </select>
        </div>
      }
    >
      <div className="flex flex-col divide-y divide-rose-100 neumorphic-elevated rounded-[6px] overflow-hidden">
        {options.map(({ label, sublabel }) => (
          <div
            key={label}
            onClick={() => setVal(label)}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1.5 cursor-pointer transition-all select-none',
              val === label ? 'bg-neutral-100' : 'hover:bg-neutral-50'
            )}
          >
            <div className={cn(
              'w-1 h-8 rounded-full flex-shrink-0 transition-all',
              val === label ? 'bg-rose-500' : 'bg-transparent'
            )} />
            <div className="flex-1">
              <p className={cn(
                'text-[13px] font-medium leading-none',
                val === label ? 'text-neutral-900' : 'text-neutral-500'
              )}>{label}</p>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">{sublabel}</p>
            </div>
            {val === label && (
              <div className="w-4 h-4 rounded-full border-2 border-rose-500 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
};

export const CheckboxWithUnitWidget = () => {
  const options = [
    { id: 'taxes', label: 'Include Taxes' },
    { id: 'insurance', label: 'Add Insurance' },
    { id: 'processing', label: 'Processing Fee' },
  ];
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({ taxes: true });
  const [unit, setUnit] = useState('Add-ons');

  
  return (
    <WidgetWrapper
      label="Checkbox Group (Unit)"
      hint="Select multiple add-ons and switch unit."
      iconColorClass="text-slate-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Add-ons</option>
            <option>Extras</option>
          </select>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2">
        {options.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setChecked(s => ({ ...s, [id]: !s[id] }))}
            className={cn(
              'flex flex-col items-start gap-0.5 px-3 py-1.5 rounded-[6px] transition-all text-left select-none active:translate-y-0.5',
              checked[id]
                ? 'bg-slate-700 border-t border-b-2 border-x border-slate-800 text-white shadow-md'
                : 'neumorphic-elevated text-neutral-500'
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className={cn('text-[11.5px] font-medium leading-tight', checked[id] ? 'text-white' : 'text-neutral-700')}>
                {label}
              </span>
              {checked[id] && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
          </button>
        ))}
      </div>
    </WidgetWrapper>
  );
};

export const ToggleSwitchWithUnitWidget = () => {
  const options = [
    { id: 'inflation', label: 'Inflation Adjustment', sublabel: 'Auto adjust for CPI' },
    { id: 'tax', label: 'Tax Deduction', sublabel: 'Apply tax relief' },
  ];
  const [toggled, setToggled] = useState<{ [key: string]: boolean }>({ inflation: true });
  const [unit, setUnit] = useState('Settings');

  
  return (
    <WidgetWrapper
      label="Toggle Switch (Unit)"
      hint="Enable features and switch unit context."
      iconColorClass="text-orange-500"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1">
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="text-[14px] font-semibold text-orange-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Settings</option>
            <option>Options</option>
          </select>
        </div>
      }
    >
      <div className="flex flex-col divide-y divide-orange-100 neumorphic-elevated rounded-[6px] overflow-hidden">
        {options.map(({ id, label, sublabel }) => (
          <div
            key={id}
            onClick={() => setToggled(s => ({ ...s, [id]: !s[id] }))}
            className="flex items-center justify-between px-2.5 py-1 cursor-pointer hover:bg-orange-50/60 transition-all"
          >
            <div>
              <p className="text-[13px] font-medium text-neutral-900 leading-none">{label}</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">{sublabel}</p>
            </div>
            <div className={cn(
              'w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors duration-200 flex-shrink-0',
              toggled[id] ? 'bg-orange-400' : 'bg-neutral-200'
            )}>
              <div className={cn(
                'w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200',
                toggled[id] ? 'translate-x-3.5' : 'translate-x-0'
              )} />
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
};

// --- 14. Chip Selector --- horizontal scrollable strip
export const ChipSelectorWidget = () => {
  const options = [
    { id: 'home', label: 'Home' },
    { id: 'car', label: 'Car' },
    { id: 'personal', label: 'Personal' },
    { id: 'education', label: 'Education' },
  ];
  const [selected, setSelected] = useState('home');

  
  return (
    <WidgetWrapper
      label="Chip Selector"
      hint="Select a category from the scrollable list."
      iconColorClass="text-violet-600"
    >
      <div className="flex gap-2 overflow-x-auto mt-1 mb-1 pb-0.5 scrollbar-hide snap-x">
        {options.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={cn(
              'flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all select-none flex-shrink-0 snap-start h-9 active:translate-y-0.5',
              selected === id
                ? 'bg-violet-600 border border-violet-700 text-white font-bold shadow-md'
                : 'neumorphic-elevated text-violet-500 font-medium'
            )}
          >
            <span className="text-[13px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </WidgetWrapper>
  );
};
