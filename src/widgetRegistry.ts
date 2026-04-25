import React from 'react';

// Numeric Widgets
import {
  NumberInputWidget,
  CurrencyInputWidget,
  PercentageInputWidget,
  RangeSliderWidget,
  StepperInputWidget,
  NumberInputWithUnitWidget,
  CurrencyInputWithUnitWidget,
  PercentageInputWithUnitWidget,
  RangeSliderWithUnitWidget,
  StepperInputWithUnitWidget
} from './components/widgets/NumericWidgets';

// Text Widgets
import {
  TextFieldWidget,
  CustomInstructionsWidget,
  TextFieldWithUnitWidget,
  CustomInstructionsWithUnitWidget
} from './components/widgets/TextWidgets';

// Selection Widgets
import {
  DropdownSelectorWidget,
  RadioGroupWidget,
  CheckboxWidget,
  ToggleSwitchWidget,
  DropdownSelectorWithUnitWidget,
  RadioGroupWithUnitWidget,
  CheckboxWithUnitWidget,
  ToggleSwitchWithUnitWidget,
  ChipSelectorWidget
} from './components/widgets/SelectionWidgets';

// Time & Date Widgets
import {
  DatePickerWidget,
  DateRangeSelectorWidget,
  TimeDurationWidget,
  DatePickerWithUnitWidget
} from './components/widgets/TimeDateWidgets';

// Data Widgets
import { DatasetTableWidget } from './components/widgets/DataWidgets';

export interface WidgetRegistryEntry {
  id: string;
  label: string;
  category: string;
  Component: React.FC;
}

export const WIDGET_REGISTRY: WidgetRegistryEntry[] = [
  // --- Numeric Inputs ---
  { id: 'number-input', label: 'Number Input', category: 'Numeric Inputs', Component: NumberInputWidget },
  { id: 'currency-input', label: 'Currency Input', category: 'Numeric Inputs', Component: CurrencyInputWidget },
  { id: 'percentage-input', label: 'Slider Numeric', category: 'Numeric Inputs', Component: PercentageInputWidget },
  { id: 'range-slider', label: 'Slider Input', category: 'Numeric Inputs', Component: RangeSliderWidget },
  { id: 'stepper-input', label: 'Stepper Input', category: 'Numeric Inputs', Component: StepperInputWidget },

  // --- Numeric Inputs (Unit) ---
  { id: 'number-input-unit', label: 'Number Input (Unit)', category: 'Numeric (Unit)', Component: NumberInputWithUnitWidget },
  { id: 'currency-input-unit', label: 'Currency (Unit)', category: 'Numeric (Unit)', Component: CurrencyInputWithUnitWidget },
  { id: 'percentage-input-unit', label: 'Slider Numeric (Unit)', category: 'Numeric (Unit)', Component: PercentageInputWithUnitWidget },
  { id: 'range-slider-unit', label: 'Slider Input (Unit)', category: 'Numeric (Unit)', Component: RangeSliderWithUnitWidget },
  { id: 'stepper-input-unit', label: 'Stepper (Unit)', category: 'Numeric (Unit)', Component: StepperInputWithUnitWidget },

  // --- Text Inputs ---
  { id: 'text-field', label: 'Text Field', category: 'Text Inputs', Component: TextFieldWidget },
  { id: 'custom-instructions', label: 'Text Area', category: 'Text Inputs', Component: CustomInstructionsWidget },

  // --- Text Inputs (Unit) ---
  { id: 'text-field-unit', label: 'Text Field (Unit)', category: 'Text (Unit)', Component: TextFieldWithUnitWidget },
  { id: 'custom-instructions-unit', label: 'Text Area (Unit)', category: 'Text (Unit)', Component: CustomInstructionsWithUnitWidget },

  // --- Selection Widgets ---
  { id: 'dropdown', label: 'Dropdown', category: 'Selection', Component: DropdownSelectorWidget },
  { id: 'radio-group', label: 'Radio Group', category: 'Selection', Component: RadioGroupWidget },
  { id: 'checkbox', label: 'Checkbox', category: 'Selection', Component: CheckboxWidget },
  { id: 'toggle-switch', label: 'Toggle Switch', category: 'Selection', Component: ToggleSwitchWidget },
  { id: 'chip-selector', label: 'Chip Selector', category: 'Selection', Component: ChipSelectorWidget },

  // --- Selection Widgets (Unit) ---
  { id: 'dropdown-unit', label: 'Dropdown (Unit)', category: 'Selection (Unit)', Component: DropdownSelectorWithUnitWidget },
  { id: 'radio-group-unit', label: 'Radio Group (Unit)', category: 'Selection (Unit)', Component: RadioGroupWithUnitWidget },
  { id: 'checkbox-unit', label: 'Checkbox (Unit)', category: 'Selection (Unit)', Component: CheckboxWithUnitWidget },
  { id: 'toggle-switch-unit', label: 'Toggle Switch (Unit)', category: 'Selection (Unit)', Component: ToggleSwitchWithUnitWidget },

  // --- Time & Date ---
  { id: 'date-picker', label: 'Date Picker', category: 'Time & Date', Component: DatePickerWidget },
  { id: 'date-range', label: 'Date Range', category: 'Time & Date', Component: DateRangeSelectorWidget },
  { id: 'time-duration', label: 'Time Duration', category: 'Time & Date', Component: TimeDurationWidget },

  // --- Time & Date (Unit) ---
  { id: 'date-picker-unit', label: 'Date Picker (Unit)', category: 'Time & Date (Unit)', Component: DatePickerWithUnitWidget },

  // --- Data ---
  { id: 'data-table', label: 'Data Table', category: 'Data Input', Component: DatasetTableWidget },
];

// Group entries by category for palette rendering
export function getGroupedRegistry(): Map<string, WidgetRegistryEntry[]> {
  const map = new Map<string, WidgetRegistryEntry[]>();
  for (const entry of WIDGET_REGISTRY) {
    if (!map.has(entry.category)) map.set(entry.category, []);
    map.get(entry.category)!.push(entry);
  }
  return map;
}

export function getWidgetById(id: string): WidgetRegistryEntry | undefined {
  return WIDGET_REGISTRY.find(e => e.id === id);
}
