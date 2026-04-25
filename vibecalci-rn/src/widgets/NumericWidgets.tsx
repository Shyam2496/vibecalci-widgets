import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { NeumorphicInset } from '../components/NeumorphicInset';
import { NeumorphicElevated } from '../components/NeumorphicElevated';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/* ──────────────────────────────────────────────
   1. Number Input Widget
   ────────────────────────────────────────────── */

export const NumberInputWidget: React.FC = () => {
  const [val, setVal] = useState('250000');

  return (
    <WidgetWrapper
      label="Numeric Input"
      hint="Enter a number value."
      labelColor={colors.indigo600}
    >
      <NeumorphicInset style={styles.inputRow}>
        <Text style={[styles.prefixSymbol, { color: colors.indigo300 }]}>#</Text>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="0"
          placeholderTextColor={colors.indigo300}
          keyboardType="numeric"
          style={styles.input}
        />
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   2. Currency Input Widget
   ────────────────────────────────────────────── */

export const CurrencyInputWidget: React.FC = () => {
  const [val, setVal] = useState('4500');

  return (
    <WidgetWrapper
      label="Currency Input"
      hint="Enter the amount."
      labelColor={colors.emerald600}
      badge={
        <Text style={[styles.currencyBadge, { color: colors.emerald700 }]}>USD</Text>
      }
    >
      <NeumorphicInset style={styles.inputRow}>
        <View style={styles.symbolContainer}>
          <Text style={[styles.currencySymbol, { color: colors.emerald500 }]}>$</Text>
        </View>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="0.00"
          placeholderTextColor='rgba(16, 185, 129, 0.3)'
          keyboardType="numeric"
          style={styles.input}
        />
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   3. Stepper Input Widget
   ────────────────────────────────────────────── */

export const StepperInputWidget: React.FC = () => {
  const [val, setVal] = useState(4);

  return (
    <WidgetWrapper
      label="Stepper Input"
      hint="Use plus and minus to adjust value."
      labelColor={colors.sky500}
    >
      <View style={styles.stepperRow}>
        {/* Minus button */}
        <NeumorphicElevated
          pressable
          onPress={() => setVal(v => Math.max(1, v - 1))}
          style={styles.stepperButton}
        >
          <Feather name="minus" size={14} color={colors.sky500} />
        </NeumorphicElevated>

        {/* Center value */}
        <NeumorphicInset style={styles.stepperCenter}>
          <Text style={styles.stepperValue}>{val}</Text>
          <Text style={[styles.stepperUnit, { color: colors.sky400 }]}>People</Text>
        </NeumorphicInset>

        {/* Plus button */}
        <NeumorphicElevated
          pressable
          onPress={() => setVal(v => v + 1)}
          style={styles.stepperButton}
        >
          <Feather name="plus" size={14} color={colors.sky500} />
        </NeumorphicElevated>
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   4. Percentage / Slider Numeric Input Widget
   ────────────────────────────────────────────── */

export const PercentageInputWidget: React.FC = () => {
  const [val, setVal] = useState(7.5);
  const min = 1;
  const max = 25;
  const percent = Math.max(0, Math.min(1, (val - min) / (max - min)));

  return (
    <WidgetWrapper
      label="Slider Numeric Input"
      hint="Drag to select a percentage value."
      labelColor={colors.orange500}
    >
      <View style={sliderStyles.row}>
        <View style={sliderStyles.sliderArea}>
          <View style={sliderStyles.customTrackContainer}>
            <NeumorphicInset style={sliderStyles.customTrack}>
              <View style={[
                sliderStyles.customActiveTrack, 
                { width: `${percent * 100}%`, backgroundColor: colors.orange500 }
              ]} />
            </NeumorphicInset>
            <Slider
              value={val}
              onValueChange={setVal}
              minimumValue={min}
              maximumValue={max}
              step={0.1}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={colors.orange500}
              style={sliderStyles.slider}
            />
          </View>
          <View style={sliderStyles.rangeLabels}>
            <Text style={[sliderStyles.rangeText, { color: colors.orange500 }]}>1%</Text>
            <Text style={[sliderStyles.rangeText, { color: colors.orange500 }]}>25%</Text>
          </View>
        </View>
        <View style={sliderStyles.valueBox}>
          <Text style={sliderStyles.valueText}>{val.toFixed(1)}</Text>
          <Text style={[sliderStyles.unitText, { color: colors.orange400 }]}>%</Text>
        </View>
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   5. Range Slider Input Widget
   ────────────────────────────────────────────── */

export const RangeSliderWidget: React.FC = () => {
  const [val, setVal] = useState(30);
  const min = 18;
  const max = 65;
  const percent = Math.max(0, Math.min(1, (val - min) / (max - min)));

  return (
    <WidgetWrapper
      label="Slider Input"
      hint="Drag to select a value."
      labelColor={colors.pink500}
    >
      <View style={sliderStyles.row}>
        <View style={sliderStyles.sliderArea}>
          <View style={sliderStyles.customTrackContainer}>
            <NeumorphicInset style={sliderStyles.customTrack}>
              <View style={[
                sliderStyles.customActiveTrack, 
                { width: `${percent * 100}%`, backgroundColor: colors.pink500 }
              ]} />
            </NeumorphicInset>
            <Slider
              value={val}
              onValueChange={(v) => setVal(Math.round(v))}
              minimumValue={min}
              maximumValue={max}
              step={1}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={colors.pink500}
              style={sliderStyles.slider}
            />
          </View>
          <View style={sliderStyles.rangeLabels}>
            <Text style={[sliderStyles.rangeText, { color: colors.pink500 }]}>18 yrs</Text>
            <Text style={[sliderStyles.rangeText, { color: colors.pink500 }]}>65 yrs</Text>
          </View>
        </View>
        <View style={sliderStyles.valueBox}>
          <Text style={sliderStyles.valueText}>{val}</Text>
          <Text style={[sliderStyles.unitText, { color: colors.pink400 }]}>yrs</Text>
        </View>
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────── */

const styles = StyleSheet.create({
  // Badge / Unit Picker
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
    ...typography.badge,
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(188, 194, 200, 0.3)',
  },
  unitOptionSelected: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  unitOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral700,
  },

  // Number / Currency Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 8,
  },
  prefixSymbol: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  symbolContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    ...typography.value,
    color: colors.textPrimary,
    paddingVertical: 0,
    height: '100%',
  },
  currencyBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  // Stepper
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    gap: 6,
  },
  stepperButton: {
    width: 40,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  stepperCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    gap: 6,
  },
  stepperValue: {
    ...typography.valueLarge,
    color: colors.textPrimary,
  },
  stepperUnit: {
    ...typography.unitLabel,
  },
});

/* Slider-specific styles */
const sliderStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  sliderArea: {
    flex: 1,
    gap: 2,
  },
  slider: {
    width: Platform.OS === 'android' ? 'auto' : '100%',
    height: 24,
    position: 'absolute',
    left: Platform.OS === 'android' ? -14 : -2,
    right: Platform.OS === 'android' ? -14 : -2,
    zIndex: 2,
  },
  customTrackContainer: {
    position: 'relative',
    height: 24,
    justifyContent: 'center',
    marginHorizontal: Platform.OS === 'android' ? 14 : 2,
  },
  customTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 1,
  },
  customActiveTrack: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  rangeText: {
    ...typography.caption,
  },
  valueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minWidth: 60,
    height: 28,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(188, 194, 200, 0.4)',
    borderRadius: 6,
    justifyContent: 'center',
  },
  valueText: {
    ...typography.valueLarge,
    color: colors.textPrimary,
  },
  unitText: {
    ...typography.unitLabel,
    marginTop: 2,
  },
});

/* ──────────────────────────────────────────────
   REPLICAS WITH UNIT SELECTOR (Phase 6)
   ────────────────────────────────────────────── */

export const NumberInputWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('250000');
  const [unit, setUnit] = useState('Amount');
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const unitOptions = ['Amount', 'Units', 'Qty'];

  return (
    <WidgetWrapper
      label="Numeric Input (Unit)"
      hint="Enter a number value and select unit."
      labelColor={colors.indigo600}
      badge={
        <NeumorphicElevated
          pressable
          onPress={() => setShowUnitPicker(!showUnitPicker)}
          style={styles.badgePill}
        >
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.indigo700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.indigo700} />
          </View>
        </NeumorphicElevated>
      }
    >
      {/* Unit picker dropdown */}
      {showUnitPicker && (
        <View style={styles.unitPickerContainer}>
          <NeumorphicElevated style={styles.unitPicker}>
            {unitOptions.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setUnit(opt); setShowUnitPicker(false); }}
                style={[
                  styles.unitOption,
                  opt === unit && styles.unitOptionSelected,
                ]}
              >
                <Text style={[
                  styles.unitOptionText,
                  opt === unit && { color: colors.indigo700, fontWeight: '700' },
                ]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}

      <NeumorphicInset style={styles.inputRow}>
        <Text style={[styles.prefixSymbol, { color: colors.indigo300 }]}>#</Text>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="0"
          placeholderTextColor={colors.indigo300}
          keyboardType="numeric"
          style={styles.input}
        />
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

export const CurrencyInputWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('4500');
  const [unit, setUnit] = useState('USD');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['USD', 'EUR', 'GBP'];
  const symbol = unit === 'USD' ? '$' : unit === 'EUR' ? '€' : '£';

  return (
    <WidgetWrapper
      label="Currency Input (Unit)"
      hint="Enter amount and select unit."
      labelColor={colors.emerald600}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.emerald700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.emerald700} />
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
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.emerald700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <NeumorphicInset style={styles.inputRow}>
        <View style={styles.symbolContainer}>
          <Text style={[styles.currencySymbol, { color: colors.emerald500 }]}>{symbol}</Text>
        </View>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="0.00"
          placeholderTextColor='rgba(16, 185, 129, 0.3)'
          keyboardType="numeric"
          style={styles.input}
        />
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

export const PercentageInputWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState(7.5);
  const [unit, setUnit] = useState('%');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['%', 'BPS'];
  
  const min = 1;
  const max = unit === '%' ? 25 : 2500;
  const percent = Math.max(0, Math.min(1, (val - min) / (max - min)));

  return (
    <WidgetWrapper
      label="Slider Numeric (Unit)"
      hint="Adjust value and select unit."
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
      <View style={sliderStyles.row}>
        <View style={sliderStyles.sliderArea}>
          <View style={sliderStyles.customTrackContainer}>
            <NeumorphicInset style={sliderStyles.customTrack}>
              <View style={[sliderStyles.customActiveTrack, { width: `${percent * 100}%`, backgroundColor: colors.orange500 }]} />
            </NeumorphicInset>
            <Slider
              value={val}
              onValueChange={setVal}
              minimumValue={min}
              maximumValue={max}
              step={unit === '%' ? 0.1 : 10}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={colors.orange500}
              style={sliderStyles.slider}
            />
          </View>
          <View style={sliderStyles.rangeLabels}>
            <Text style={[sliderStyles.rangeText, { color: colors.orange500 }]}>1 {unit}</Text>
            <Text style={[sliderStyles.rangeText, { color: colors.orange500 }]}>{max} {unit}</Text>
          </View>
        </View>
        <View style={sliderStyles.valueBox}>
          <Text style={sliderStyles.valueText}>{val.toFixed(unit === '%' ? 1 : 0)}</Text>
          <Text style={[sliderStyles.unitText, { color: colors.orange400 }]}>{unit}</Text>
        </View>
      </View>
    </WidgetWrapper>
  );
};

export const RangeSliderWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState(30);
  const [unit, setUnit] = useState('yrs');
  const options = ['yrs', 'mo', 'wks'];
  
  const min = 1;
  const max = 60;
  const percent = Math.max(0, Math.min(1, (val - min) / (max - min)));

  return (
    <WidgetWrapper
      label="Slider Input (Unit)"
      hint="Drag to select value and switch unit."
      labelColor={colors.pink500}
      badge={
        <NeumorphicElevated style={{ flexDirection: 'row', borderRadius: 6, overflow: 'hidden' }}>
          {options.map((opt) => (
            <Pressable
              key={opt}
              onPress={() => setUnit(opt)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: unit === opt ? colors.pink500 : 'transparent'
              }}
            >
              <Text style={{
                fontSize: 13,
                fontWeight: '700',
                color: unit === opt ? '#fff' : colors.pink400
              }}>{opt}</Text>
            </Pressable>
          ))}
        </NeumorphicElevated>
      }
    >
      <View style={sliderStyles.row}>
        <View style={sliderStyles.sliderArea}>
          <View style={sliderStyles.customTrackContainer}>
            <NeumorphicInset style={sliderStyles.customTrack}>
              <View style={[sliderStyles.customActiveTrack, { width: `${percent * 100}%`, backgroundColor: colors.pink500 }]} />
            </NeumorphicInset>
            <Slider
              value={val}
              onValueChange={(v) => setVal(Math.round(v))}
              minimumValue={min}
              maximumValue={max}
              step={1}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={colors.pink500}
              style={sliderStyles.slider}
            />
          </View>
          <View style={sliderStyles.rangeLabels}>
            <Text style={[sliderStyles.rangeText, { color: colors.pink500 }]}>1 {unit}</Text>
            <Text style={[sliderStyles.rangeText, { color: colors.pink500 }]}>{max} {unit}</Text>
          </View>
        </View>
        <View style={sliderStyles.valueBox}>
          <Text style={sliderStyles.valueText}>{val}</Text>
          <Text style={[sliderStyles.unitText, { color: colors.pink400 }]}>{unit}</Text>
        </View>
      </View>
    </WidgetWrapper>
  );
};

export const StepperInputWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState(4);
  const [unit, setUnit] = useState('People');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['People', 'Families', 'Pets'];

  return (
    <WidgetWrapper
      label="Stepper Input (Unit)"
      hint="Adjust value and switch category."
      labelColor={colors.sky500}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.sky700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.sky700} />
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
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.sky700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <View style={styles.stepperRow}>
        <NeumorphicElevated pressable onPress={() => setVal(v => Math.max(1, v - 1))} style={styles.stepperButton}>
          <Feather name="minus" size={14} color={colors.sky500} />
        </NeumorphicElevated>
        <NeumorphicInset style={styles.stepperCenter}>
          <Text style={styles.stepperValue}>{val}</Text>
          <Text style={[styles.stepperUnit, { color: colors.sky400 }]}>{unit}</Text>
        </NeumorphicInset>
        <NeumorphicElevated pressable onPress={() => setVal(v => v + 1)} style={styles.stepperButton}>
          <Feather name="plus" size={14} color={colors.sky500} />
        </NeumorphicElevated>
      </View>
    </WidgetWrapper>
  );
};
