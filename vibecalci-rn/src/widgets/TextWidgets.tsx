import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { NeumorphicInset } from '../components/NeumorphicInset';
import { NeumorphicElevated } from '../components/NeumorphicElevated';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const SYMBOLS = [
  // Operators & Basic
  '+', '-', '*', '/', '=', '≠', '≈', '±', '(',
  // Roots & Powers
  '√', '∛', '∜', '²', '³', 'e', '∫', 'log', 'π',
  // Summation & Greek
  'Σ', '∞', 'α', 'β', 'γ', 'Δ', 'θ', 'λ', 'μ',
  // Fractions & Logic
  '½', '⅓', '⅔', '¼', '¾', '%', '°', 'φ', ')',
];

/* ──────────────────────────────────────────────
   1. Text Field Widget
   ────────────────────────────────────────────── */

export const TextFieldWidget: React.FC = () => {
  const [val, setVal] = useState('');

  return (
    <WidgetWrapper
      label="Text Field"
      hint="Standard single-line text input."
      labelColor={colors.violet600}
    >
      <NeumorphicInset style={styles.inputRow}>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="e.g. Laptop, Chair..."
          placeholderTextColor={colors.violet200}
          style={styles.textInput}
        />
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   2. Custom Instructions / Text Area Widget
   ────────────────────────────────────────────── */

export const CustomInstructionsWidget: React.FC = () => {
  const [val, setVal] = useState('');
  const [showSymbols, setShowSymbols] = useState(false);
  const MAX = 500;

  const insertSymbol = (sym: string) => {
    if (val.length + sym.length <= MAX) {
      setVal(prev => prev + sym);
    }
  };

  return (
    <WidgetWrapper
      label="Text Area / Custom Instructions"
      hint="Multiline text input with symbol support."
      labelColor={colors.fuchsia600}
      badge={
        <NeumorphicElevated
          pressable
          onPress={() => setShowSymbols(!showSymbols)}
          style={[
            styles.symbolBadge,
            showSymbols && { backgroundColor: colors.fuchsia100 },
          ]}
        >
          <View style={styles.symbolBadgeContent}>
            <Feather
              name="hash"
              size={13}
              color={showSymbols ? colors.fuchsia700 : colors.fuchsia500}
            />
            <Text style={[
              styles.symbolBadgeText,
              { color: showSymbols ? colors.fuchsia700 : colors.fuchsia500 },
            ]}>Symbols</Text>
            <Feather
              name={showSymbols ? 'chevron-up' : 'chevron-down'}
              size={12}
              color={showSymbols ? colors.fuchsia700 : colors.fuchsia500}
            />
          </View>
        </NeumorphicElevated>
      }
    >
      <View style={styles.textAreaContainer}>
        {/* Textarea */}
        <View>
          <NeumorphicInset style={styles.textAreaInset}>
            <TextInput
              value={val}
              onChangeText={(t) => setVal(t.slice(0, MAX))}
              placeholder="e.g. If value > 100 then multiply by 0.5..."
              placeholderTextColor={colors.fuchsia200}
              multiline
              numberOfLines={3}
              style={styles.textArea}
              textAlignVertical="top"
            />
          </NeumorphicInset>
          {/* Char counter */}
          <View style={styles.charCounter}>
            <Text style={styles.charCounterText}>{val.length}/{MAX}</Text>
          </View>
        </View>

        {/* Symbol grid */}
        {showSymbols && (
          <View style={styles.symbolGrid}>
            {SYMBOLS.map((sym) => (
              <Pressable
                key={sym}
                onPress={() => insertSymbol(sym)}
                style={({ pressed }) => [
                  styles.symbolButton,
                  pressed && styles.symbolButtonPressed,
                ]}
              >
                <Text style={styles.symbolText}>{sym}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────── */

const styles = StyleSheet.create({
  // Text Field
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    ...typography.value,
    color: colors.textPrimary,
    paddingVertical: 0,
    height: '100%',
  },

  // Custom Instructions
  symbolBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  symbolBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  symbolBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  textAreaContainer: {
    gap: 8,
  },
  textAreaInset: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 80,
  },
  textArea: {
    fontSize: 15.5,
    fontWeight: '500',
    color: colors.textPrimary,
    minHeight: 68,
    textAlignVertical: 'top',
  },
  charCounter: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  charCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.fuchsia300,
  },

  // Symbol Grid
  symbolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.fuchsia100,
    borderRadius: 6,
    padding: 6,
    gap: 4,
  },
  symbolButton: {
    width: '10%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  symbolButtonPressed: {
    backgroundColor: colors.fuchsia100,
    transform: [{ scale: 0.9 }],
  },
  symbolText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.fuchsia600,
  },
  // Unit Text Field
  unitSeparator: {
    borderLeftWidth: 1,
    borderLeftColor: colors.violet100,
    height: 20,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.violet400,
  },
  // Reusable
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

export const TextFieldWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('kg');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['kg', 'lbs', 'g', 'oz'];

  return (
    <WidgetWrapper
      label="Text Field (Unit)"
      hint="Single-line input with unit selection."
      labelColor={colors.violet600}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.violet700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.violet700} />
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
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.violet700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <NeumorphicInset style={styles.inputRow}>
        <TextInput
          value={val}
          onChangeText={setVal}
          placeholder="e.g. 1.5"
          placeholderTextColor={colors.violet200}
          style={styles.textInput}
        />
        <View style={styles.unitSeparator}>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      </NeumorphicInset>
    </WidgetWrapper>
  );
};

export const CustomInstructionsWithUnitWidget: React.FC = () => {
  const [val, setVal] = useState('');
  const [unit, setUnit] = useState('Lines');
  const [showSymbols, setShowSymbols] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Lines', 'Chars', 'Words'];
  const MAX = 500;

  const insertSymbol = (sym: string) => {
    if (val.length + sym.length <= MAX) {
      setVal(prev => prev + sym);
    }
  };

  return (
    <WidgetWrapper
      label="Text Area (Unit)"
      hint="Multiline input with unit and symbols."
      labelColor={colors.fuchsia600}
      badge={
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <NeumorphicElevated
            pressable
            onPress={() => setShowSymbols(!showSymbols)}
            style={[styles.symbolBadge, showSymbols && { backgroundColor: colors.fuchsia100 }]}
          >
            <View style={styles.symbolBadgeContent}>
              <Feather name="hash" size={13} color={showSymbols ? colors.fuchsia700 : colors.fuchsia500} />
              <Text style={[styles.symbolBadgeText, { color: showSymbols ? colors.fuchsia700 : colors.fuchsia500 }]}>Symbols</Text>
              <Feather name={showSymbols ? 'chevron-up' : 'chevron-down'} size={12} color={showSymbols ? colors.fuchsia700 : colors.fuchsia500} />
            </View>
          </NeumorphicElevated>
          <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
            <View style={styles.badgeContent}>
              <Text style={[styles.badgeText, { color: colors.fuchsia700 }]}>{unit}</Text>
              <Feather name="chevron-down" size={12} color={colors.fuchsia700} />
            </View>
          </NeumorphicElevated>
        </View>
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
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.fuchsia700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <View style={styles.textAreaContainer}>
        <View>
          <NeumorphicInset style={styles.textAreaInset}>
            <TextInput
              value={val}
              onChangeText={(t) => setVal(t.slice(0, MAX))}
              placeholder="Enter your notes or logic..."
              placeholderTextColor={colors.fuchsia200}
              multiline
              numberOfLines={3}
              style={styles.textArea}
              textAlignVertical="top"
            />
          </NeumorphicInset>
          <View style={styles.charCounter}>
            <Text style={styles.charCounterText}>{val.length}/{MAX}</Text>
          </View>
        </View>
        {showSymbols && (
          <View style={styles.symbolGrid}>
            {SYMBOLS.map((sym) => (
              <Pressable key={sym} onPress={() => insertSymbol(sym)} style={({ pressed }) => [styles.symbolButton, pressed && styles.symbolButtonPressed]}>
                <Text style={styles.symbolText}>{sym}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </WidgetWrapper>
  );
};

