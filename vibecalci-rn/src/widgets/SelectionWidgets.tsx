import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { NeumorphicElevated } from '../components/NeumorphicElevated';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/* ──────────────────────────────────────────────
   1. Dropdown Selector Widget
   ────────────────────────────────────────────── */

const CURRENCY_OPTIONS = [
  { value: 'USD', label: '🇺🇸 USD — US Dollar' },
  { value: 'EUR', label: '🇪🇺 EUR — Euro' },
  { value: 'GBP', label: '🇬🇧 GBP — Pound' },
  { value: 'INR', label: '🇮🇳 INR — Indian Rupee' },
  { value: 'LONG', label: '🌍 X-WORLD — An extremely long and verbose currency option name to test text wrapping' },
];

export const DropdownSelectorWidget: React.FC = () => {
  const [val, setVal] = useState('USD');
  const [open, setOpen] = useState(false);

  const selected = CURRENCY_OPTIONS.find(o => o.value === val);

  return (
    <WidgetWrapper
      label="Dropdown Selector"
      hint="Select an option from the list."
      labelColor={colors.teal600}
    >
      <NeumorphicElevated
        pressable
        fullWidth
        onPress={() => setOpen(true)}
        style={styles.dropdownTrigger}
      >
        <View style={styles.dropdownTextContainer}>
          <Text style={styles.dropdownText}>{selected?.label}</Text>
        </View>
        <Feather name="chevron-down" size={16} color={colors.teal400} />
      </NeumorphicElevated>

      {/* Dropdown modal */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            {CURRENCY_OPTIONS.map(({ value, label }) => (
              <Pressable
                key={value}
                onPress={() => { setVal(value); setOpen(false); }}
                style={[
                  styles.modalOption,
                  val === value && styles.modalOptionSelected,
                ]}
              >
                <Text style={[
                  styles.modalOptionText,
                  val === value && { color: colors.teal700, fontWeight: '700' },
                ]}>{label}</Text>
                {val === value && (
                  <Feather name="check" size={16} color={colors.teal600} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   2. Radio Button Group Widget
   ────────────────────────────────────────────── */

const RADIO_OPTIONS = [
  { label: 'Monthly', sublabel: 'Pay every month' },
  { label: 'Quarterly', sublabel: 'Pay every 3 months' },
  { label: 'Yearly', sublabel: 'Pay once a year' },
  { label: 'Custom Lifetime Premium Subscription', sublabel: 'A very long sublabel explaining that you only pay once for a lifetime of updates and premium features forever' },
];

export const RadioGroupWidget: React.FC = () => {
  const [val, setVal] = useState('Monthly');

  return (
    <WidgetWrapper
      label="Radio Group"
      hint="Select a single option from the list."
      labelColor={colors.rose500}
    >
      <NeumorphicElevated style={styles.radioContainer} fullWidth>
        {RADIO_OPTIONS.map(({ label, sublabel }, index) => (
          <Pressable
            key={label}
            onPress={() => setVal(label)}
            style={[
              styles.radioItem,
              val === label && styles.radioItemSelected,
              index < RADIO_OPTIONS.length - 1 && styles.radioItemBorder,
            ]}
          >
            {/* Left accent bar */}
            <View style={[
              styles.accentBar,
              { backgroundColor: val === label ? colors.rose500 : 'transparent' },
            ]} />
            <View style={styles.radioTextArea}>
              <Text style={[
                styles.radioLabel,
                { color: val === label ? colors.neutral900 : colors.neutral500 },
              ]}>{label}</Text>
              <Text style={styles.radioSublabel}>{sublabel}</Text>
            </View>
            {val === label && (
              <View style={styles.radioDot}>
                <View style={styles.radioDotInner} />
              </View>
            )}
          </Pressable>
        ))}
      </NeumorphicElevated>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   3. Checkbox / Chip Group Widget
   ────────────────────────────────────────────── */

const CHECKBOX_OPTIONS = [
  { id: 'taxes', label: 'Include Taxes' },
  { id: 'insurance', label: 'Add Insurance' },
  { id: 'processing', label: 'Processing Fee' },
  { id: 'long_option', label: 'Include extremely long optional comprehensive damage protection policy' },
];

export const CheckboxWidget: React.FC = () => {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({ taxes: true });

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <WidgetWrapper
      label="Checkbox Group"
      hint="Select one or more options."
      labelColor={colors.slate600}
    >
      <View style={styles.checkboxGrid}>
        {CHECKBOX_OPTIONS.map(({ id, label }) => {
          const isChecked = checked[id];
          return (
            <Pressable
              key={id}
              onPress={() => toggle(id)}
              style={[
                styles.checkboxChip,
                isChecked ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              <Text style={[
                styles.checkboxLabel,
                { color: isChecked ? '#ffffff' : colors.neutral700 },
              ]}>{label}</Text>
              {isChecked && (
                <Feather name="check" size={14} color="#ffffff" />
              )}
            </Pressable>
          );
        })}
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   4. Toggle Switch Group Widget
   ────────────────────────────────────────────── */

const TOGGLE_OPTIONS = [
  { id: 'inflation', label: 'Inflation Adjustment', sublabel: 'Auto adjust for CPI' },
  { id: 'tax', label: 'Tax Deduction', sublabel: 'Apply tax relief' },
  { id: 'long_toggle', label: 'Enable ultra-high-definition automatic background processing mode', sublabel: 'This feature will aggressively consume background resources to ensure maximum real-time quality enhancements' },
];

export const ToggleSwitchWidget: React.FC = () => {
  const [toggled, setToggled] = useState<{ [key: string]: boolean }>({ inflation: true });

  return (
    <WidgetWrapper
      label="Toggle Switch Group"
      hint="Enable or disable multiple features."
      labelColor={colors.orange500}
    >
      <NeumorphicElevated style={styles.toggleContainer} fullWidth>
        {TOGGLE_OPTIONS.map(({ id, label, sublabel }, index) => (
          <Pressable
            key={id}
            onPress={() => setToggled(prev => ({ ...prev, [id]: !prev[id] }))}
            style={[
              styles.toggleItem,
              index < TOGGLE_OPTIONS.length - 1 && styles.toggleItemBorder,
            ]}
          >
            <View style={styles.toggleTextArea}>
              <Text style={styles.toggleLabel}>{label}</Text>
              <Text style={styles.toggleSublabel}>{sublabel}</Text>
            </View>
            {/* Custom toggle track */}
            <View style={[
              styles.toggleTrack,
              { backgroundColor: toggled[id] ? colors.orange400 : colors.neutral200 },
            ]}>
              <View style={[
                styles.toggleThumb,
                { transform: [{ translateX: toggled[id] ? 14 : 0 }] },
              ]} />
            </View>
          </Pressable>
        ))}
      </NeumorphicElevated>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   5. Chip Selector Widget
   ────────────────────────────────────────────── */

const CHIP_OPTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'car', label: 'Car' },
  { id: 'personal', label: 'Personal' },
  { id: 'education', label: 'Education' },
  { id: 'long_chip', label: 'Extremely Long Category Name' },
];

export const ChipSelectorWidget: React.FC = () => {
  const [selected, setSelected] = useState('home');

  return (
    <WidgetWrapper
      label="Chip Selector"
      hint="Select a category from the scrollable list."
      labelColor={colors.violet600}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {CHIP_OPTIONS.map(({ id, label }) => {
          const isSelected = selected === id;
          return (
            <Pressable
              key={id}
              onPress={() => setSelected(id)}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
            >
              <Text style={[
                styles.chipText,
                { color: isSelected ? '#ffffff' : colors.violet600 },
              ]}>{label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────── */

const styles = StyleSheet.create({
  // ─── Dropdown ─────────────────────────────
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  dropdownTextContainer: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  dropdownText: {
    ...typography.value,
    color: colors.textPrimary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 16,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.neutral700,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(229,229,229,0.5)',
  },
  modalOptionSelected: {
    backgroundColor: 'rgba(13, 148, 136, 0.06)',
  },
  modalOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.neutral700,
    flexShrink: 1,
  },

  // ─── Radio Group ──────────────────────────
  radioContainer: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  radioItemSelected: {
    backgroundColor: 'rgba(244, 244, 245, 0.8)',
  },
  radioItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(244, 63, 94, 0.1)',
  },
  accentBar: {
    width: 3,
    height: 24,
    borderRadius: 99,
  },
  radioTextArea: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  radioSublabel: {
    fontSize: 12,
    color: colors.neutral400,
    marginTop: 2,
  },
  radioDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.rose500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.rose500,
  },

  // ─── Checkbox Chips ───────────────────────
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkboxChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: '45%',
    flex: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.slate700,
    borderWidth: 1,
    borderColor: colors.slate800,
  },
  checkboxUnchecked: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: 'rgba(188,194,200,0.3)',
  },
  checkboxLabel: {
    fontSize: 13.5,
    fontWeight: '500',
    flexShrink: 1,
  },

  // ─── Toggle Switch ────────────────────────
  toggleContainer: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  toggleItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(249, 115, 22, 0.1)',
  },
  toggleTextArea: {
    flex: 1,
    marginRight: 12,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.neutral900,
  },
  toggleSublabel: {
    fontSize: 12,
    color: colors.neutral400,
    marginTop: 2,
  },
  toggleTrack: {
    width: 34,
    height: 20,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },

  // ─── Chip Selector ────────────────────────
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.violet600,
    borderWidth: 1,
    borderColor: colors.violet700,
  },
  chipUnselected: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: 'rgba(188,194,200,0.3)',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Reusable Unit Styles
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  unitPickerContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
    marginTop: -4,
    zIndex: 10,
  },
  unitPicker: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    minWidth: 100,
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  unitOptionSelected: {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  unitOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});

/* ──────────────────────────────────────────────
   REPLICAS WITH UNIT SELECTOR (Phase 6)
   ────────────────────────────────────────────── */

export const DropdownSelectorWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('USD');
  const [unit, setUnit] = useState('Fiat');
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Fiat', 'Crypto'];

  const selected = CURRENCY_OPTIONS.find(o => o.value === val);

  return (
    <WidgetWrapper
      label="Dropdown Switcher (Unit)"
      hint="Select main value and switch category."
      labelColor={colors.teal600}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.teal700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.teal700} />
          </View>
        </NeumorphicElevated>
      }
    >
      {showPicker && (
        <View style={styles.unitPickerContainer}>
          <NeumorphicElevated style={styles.unitPicker}>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setUnit(opt); setShowPicker(false); }}
                style={[styles.unitOption, opt === unit && styles.unitOptionSelected]}
              >
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.teal700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <NeumorphicElevated pressable fullWidth onPress={() => setOpen(true)} style={styles.dropdownTrigger}>
        <View style={styles.dropdownTextContainer}>
          <Text style={styles.dropdownText}>{selected?.label}</Text>
        </View>
        <Feather name="chevron-down" size={16} color={colors.teal400} />
      </NeumorphicElevated>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            {CURRENCY_OPTIONS.map(({ value, label }) => (
              <Pressable key={value} onPress={() => { setVal(value); setOpen(false); }} style={[styles.modalOption, val === value && styles.modalOptionSelected]}>
                <Text style={[styles.modalOptionText, val === value && { color: colors.teal700, fontWeight: '700' }]}>{label}</Text>
                {val === value && <Feather name="check" size={16} color={colors.teal600} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </WidgetWrapper>
  );
};

export const RadioGroupWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('Monthly');
  const [unit, setUnit] = useState('Frequency');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Frequency', 'Schedule'];

  return (
    <WidgetWrapper
      label="Radio Group (Unit)"
      hint="Select an option and switch context."
      labelColor={colors.rose500}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.rose700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.rose700} />
          </View>
        </NeumorphicElevated>
      }
    >
      {showPicker && (
        <View style={styles.unitPickerContainer}>
          <NeumorphicElevated style={styles.unitPicker}>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setUnit(opt); setShowPicker(false); }}
                style={[styles.unitOption, opt === unit && styles.unitOptionSelected]}
              >
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.rose700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <NeumorphicElevated style={styles.radioContainer} fullWidth>
        {RADIO_OPTIONS.map(({ label, sublabel }, index) => (
          <Pressable key={label} onPress={() => setVal(label)} style={[styles.radioItem, val === label && styles.radioItemSelected, index < RADIO_OPTIONS.length - 1 && styles.radioItemBorder]}>
            <View style={[styles.accentBar, { backgroundColor: val === label ? colors.rose500 : 'transparent' }]} />
            <View style={styles.radioTextArea}>
              <Text style={[styles.radioLabel, { color: val === label ? colors.neutral900 : colors.neutral500 }]}>{label}</Text>
              <Text style={styles.radioSublabel}>{sublabel}</Text>
            </View>
            {val === label && (
              <View style={styles.radioDot}>
                <View style={styles.radioDotInner} />
              </View>
            )}
          </Pressable>
        ))}
      </NeumorphicElevated>
    </WidgetWrapper>
  );
};

export const CheckboxWithUnitWidget: React.FC = () => {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({ taxes: true });
  const [unit, setUnit] = useState('Add-ons');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Add-ons', 'Extras'];

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <WidgetWrapper
      label="Checkbox Group (Unit)"
      hint="Select multiple add-ons and switch unit."
      labelColor={colors.slate600}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.slate700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.slate700} />
          </View>
        </NeumorphicElevated>
      }
    >
      {showPicker && (
        <View style={styles.unitPickerContainer}>
          <NeumorphicElevated style={styles.unitPicker}>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setUnit(opt); setShowPicker(false); }}
                style={[styles.unitOption, opt === unit && styles.unitOptionSelected]}
              >
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.slate700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <View style={styles.checkboxGrid}>
        {CHECKBOX_OPTIONS.map(({ id, label }) => {
          const isChecked = checked[id];
          return (
            <Pressable key={id} onPress={() => toggle(id)} style={[styles.checkboxChip, isChecked ? styles.checkboxChecked : styles.checkboxUnchecked]}>
              <Text style={[styles.checkboxLabel, { color: isChecked ? '#ffffff' : colors.neutral700 }]}>{label}</Text>
              {isChecked && <Feather name="check" size={14} color="#ffffff" />}
            </Pressable>
          );
        })}
      </View>
    </WidgetWrapper>
  );
};

export const ToggleSwitchWithUnitWidget: React.FC = () => {
  const [toggled, setToggled] = useState<{ [key: string]: boolean }>({ inflation: true });
  const [unit, setUnit] = useState('Settings');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Settings', 'Options'];

  return (
    <WidgetWrapper
      label="Toggle Switch (Unit)"
      hint="Enable features and switch unit context."
      labelColor={colors.orange500}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.orange700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.orange700} />
          </View>
        </NeumorphicElevated>
      }
    >
      {showPicker && (
        <View style={styles.unitPickerContainer}>
          <NeumorphicElevated style={styles.unitPicker}>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setUnit(opt); setShowPicker(false); }}
                style={[styles.unitOption, opt === unit && styles.unitOptionSelected]}
              >
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.orange700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <NeumorphicElevated style={styles.toggleContainer} fullWidth>
        {TOGGLE_OPTIONS.map(({ id, label, sublabel }, index) => (
          <Pressable key={id} onPress={() => setToggled(prev => ({ ...prev, [id]: !prev[id] }))} style={[styles.toggleItem, index < TOGGLE_OPTIONS.length - 1 && styles.toggleItemBorder]}>
            <View style={styles.toggleTextArea}>
              <Text style={styles.toggleLabel}>{label}</Text>
              <Text style={styles.toggleSublabel}>{sublabel}</Text>
            </View>
            <View style={[styles.toggleTrack, { backgroundColor: toggled[id] ? colors.orange400 : colors.neutral200 }]}>
              <View style={[styles.toggleThumb, { transform: [{ translateX: toggled[id] ? 14 : 0 }] }]} />
            </View>
          </Pressable>
        ))}
      </NeumorphicElevated>
    </WidgetWrapper>
  );
};

