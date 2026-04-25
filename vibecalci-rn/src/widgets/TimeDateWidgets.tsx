import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { NeumorphicInset } from '../components/NeumorphicInset';
import { NeumorphicElevated } from '../components/NeumorphicElevated';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const displayDate = (d: Date): string =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/* ──────────────────────────────────────────────
   Custom Calendar Modal Component
   ────────────────────────────────────────────── */

interface CalendarModalProps {
  visible: boolean;
  title: string;
  value: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ visible, title, value, onSelect, onClose }) => {
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const [mode, setMode] = useState<'calendar' | 'year'>('calendar');
  const [yearPage, setYearPage] = useState(value.getFullYear());

  // Reset view when opening
  React.useEffect(() => {
    if (visible) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
      setYearPage(value.getFullYear());
      setMode('calendar');
    }
  }, [visible, value]);

  const goPrev = () => {
    if (mode === 'year') {
      setYearPage(y => y - 12);
    } else {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
      else setViewMonth(m => m - 1);
    }
  };
  const goNext = () => {
    if (mode === 'year') {
      setYearPage(y => y + 12);
    } else {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
      else setViewMonth(m => m + 1);
    }
  };

  // Build the grid of day cells for the current month
  const dayCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  const yearCells = useMemo(() => {
    const cells: number[] = [];
    for (let i = 0; i < 12; i++) cells.push(yearPage - 4 + i);
    return cells;
  }, [yearPage]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={calStyles.overlay} onPress={onClose}>
        <View style={calStyles.card} onStartShouldSetResponder={() => true}>
          {/* Header */}
          <Text style={calStyles.title}>{title}</Text>

          {/* Month navigation */}
          <View style={calStyles.navRow}>
            <Pressable onPress={goPrev} style={calStyles.navBtn}>
              <Feather name="chevron-left" size={20} color={colors.neutral700} />
            </Pressable>
            <Pressable onPress={() => {
              if (mode === 'calendar') {
                setYearPage(viewYear);
                setMode('year');
              } else {
                setMode('calendar');
              }
            }}>
              <Text style={calStyles.navLabel}>
                {mode === 'calendar' ? `${MONTH_NAMES[viewMonth]} ${viewYear}` : `${yearPage - 4} - ${yearPage + 7}`}
              </Text>
            </Pressable>
            <Pressable onPress={goNext} style={calStyles.navBtn}>
              <Feather name="chevron-right" size={20} color={colors.neutral700} />
            </Pressable>
          </View>

          {mode === 'calendar' ? (
            <>
              {/* Day-of-week header */}
              <View style={calStyles.weekRow}>
                {DAY_NAMES.map(dn => (
                  <Text key={dn} style={calStyles.weekLabel}>{dn}</Text>
                ))}
              </View>

              {/* Day grid */}
              <View style={calStyles.grid}>
                {dayCells.map((day, idx) => {
                  if (day === null) return <View key={`e${idx}`} style={calStyles.dayCell} />;
                  const cellDate = new Date(viewYear, viewMonth, day);
                  const isSelected = isSameDay(cellDate, value);
                  const isToday = isSameDay(cellDate, new Date());
                  return (
                    <Pressable
                      key={day}
                      onPress={() => onSelect(cellDate)}
                      style={[
                        calStyles.dayCell,
                        isSelected && calStyles.dayCellSelected,
                      ]}
                    >
                      <Text style={[
                        calStyles.dayText,
                        isToday && !isSelected && calStyles.dayTextToday,
                        isSelected && calStyles.dayTextSelected,
                      ]}>
                        {day}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={calStyles.grid}>
              {yearCells.map((y) => (
                <Pressable
                  key={y}
                  onPress={() => {
                    setViewYear(y);
                    setMode('calendar');
                  }}
                  style={[
                    calStyles.yearCell,
                    y === viewYear && calStyles.yearCellSelected,
                  ]}
                >
                  <Text style={[
                    calStyles.yearText,
                    y === viewYear && calStyles.yearTextSelected,
                  ]}>
                    {y}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Close button */}
          <Pressable onPress={onClose} style={calStyles.closeBtn}>
            <Text style={calStyles.closeBtnText}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const calStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.neutral700,
    textAlign: 'center',
    marginBottom: 12,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  navLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral900,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral400,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: colors.red500,
    borderRadius: 99,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral700,
  },
  dayTextToday: {
    color: colors.red500,
    fontWeight: '700',
  },
  dayTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  yearCell: {
    width: `${100 / 3}%`,
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  yearCellSelected: {
    backgroundColor: colors.red500,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral700,
  },
  yearTextSelected: {
    color: '#ffffff',
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral100,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral600,
  },
});

/* ──────────────────────────────────────────────
   1. Date Picker Widget
   ────────────────────────────────────────────── */

export const DatePickerWidget: React.FC = () => {
  const [date, setDate] = useState(new Date(2025, 0, 1));
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <WidgetWrapper
      label="Date Selector"
      hint="Tap to select a date from the calendar."
      labelColor={colors.red500}
    >
      <Pressable onPress={() => setShowCalendar(true)}>
        <NeumorphicInset style={styles.dateDisplay}>
          <Feather name="calendar" size={14} color={colors.red500} />
          <Text style={styles.dateText}>{displayDate(date)}</Text>
        </NeumorphicInset>
      </Pressable>

      <CalendarModal
        visible={showCalendar}
        title="Select Date"
        value={date}
        onSelect={(d) => { setDate(d); setShowCalendar(false); }}
        onClose={() => setShowCalendar(false)}
      />
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   2. Date Range Selector Widget
   ────────────────────────────────────────────── */

export const DateRangeSelectorWidget: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date(2025, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 11, 31));
  const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | null>(null);

  const handleSelect = (d: Date) => {
    if (pickerTarget === 'start') setStartDate(d);
    else if (pickerTarget === 'end') setEndDate(d);
    setPickerTarget(null);
  };

  return (
    <WidgetWrapper
      label="Date Range Selector"
      hint="Tap a date to change it."
      labelColor={colors.red500}
    >
      <View style={styles.dateRangeRow}>
        {/* Start date */}
        <View style={styles.dateRangeHalf}>
          <Text style={styles.dateRangeLabel}>From</Text>
          <Pressable onPress={() => setPickerTarget('start')}>
            <NeumorphicInset style={styles.dateDisplaySmall}>
              <Text style={styles.dateTextSmall}>{displayDate(startDate)}</Text>
            </NeumorphicInset>
          </Pressable>
        </View>

        {/* Arrow separator */}
        <Feather name="arrow-right" size={16} color={colors.neutral400} style={{ marginTop: 18 }} />

        {/* End date */}
        <View style={styles.dateRangeHalf}>
          <Text style={styles.dateRangeLabel}>To</Text>
          <Pressable onPress={() => setPickerTarget('end')}>
            <NeumorphicInset style={styles.dateDisplaySmall}>
              <Text style={styles.dateTextSmall}>{displayDate(endDate)}</Text>
            </NeumorphicInset>
          </Pressable>
        </View>
      </View>

      <CalendarModal
        visible={pickerTarget !== null}
        title={pickerTarget === 'start' ? 'Select Start Date' : 'Select End Date'}
        value={pickerTarget === 'start' ? startDate : endDate}
        onSelect={handleSelect}
        onClose={() => setPickerTarget(null)}
      />
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   3. Time Duration Counter Widget
   ────────────────────────────────────────────── */

export const TimeDurationWidget: React.FC = () => {
  const [val, setVal] = useState(20);
  const [unit, setUnit] = useState('Years');
  const unitLabels: Record<string, string> = { Days: 'D', Months: 'Mo', Years: 'Yrs' };

  return (
    <WidgetWrapper
      label="Time Duration Counter"
      hint="Adjust duration and select unit (Days/Months/Years)."
      labelColor={colors.cyan600}
      badge={
        <NeumorphicElevated style={styles.unitToggleBar}>
          {['Days', 'Months', 'Years'].map((u) => (
            <Pressable
              key={u}
              onPress={() => setUnit(u)}
              style={[
                styles.unitToggleBtn,
                unit === u && styles.unitToggleBtnActive,
              ]}
            >
              <Text style={[
                styles.unitToggleBtnText,
                { color: unit === u ? '#ffffff' : colors.cyan500 },
              ]}>{unitLabels[u]}</Text>
            </Pressable>
          ))}
        </NeumorphicElevated>
      }
    >
      <View style={styles.stepperRow}>
        <NeumorphicElevated
          pressable
          onPress={() => setVal(v => Math.max(1, v - 1))}
          style={styles.stepperButton}
        >
          <Feather name="minus" size={14} color={colors.cyan500} />
        </NeumorphicElevated>

        <NeumorphicInset style={styles.stepperCenter}>
          <Text style={styles.stepperValue}>{val}</Text>
          <Text style={[styles.stepperUnit, { color: colors.cyan400 }]}>{unit}</Text>
        </NeumorphicInset>

        <NeumorphicElevated
          pressable
          onPress={() => setVal(v => v + 1)}
          style={styles.stepperButton}
        >
          <Feather name="plus" size={14} color={colors.cyan500} />
        </NeumorphicElevated>
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────── */

const styles = StyleSheet.create({
  // ─── Date Picker ──────────────────────────
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 8,
    paddingHorizontal: 12,
  },
  dateText: {
    ...typography.value,
    color: colors.textPrimary,
  },
  dateDisplaySmall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingHorizontal: 4,
  },
  dateTextSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // ─── Date Range ───────────────────────────
  dateRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateRangeHalf: {
    flex: 1,
    gap: 4,
  },
  dateRangeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.neutral500,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingLeft: 4,
  },

  // ─── Duration Stepper ─────────────────────
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

  // ─── Unit Toggle Bar ──────────────────────
  unitToggleBar: {
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    padding: 0,
  },
  unitToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  unitToggleBtnActive: {
    backgroundColor: colors.cyan500,
  },
  unitToggleBtnText: {
    fontSize: 13,
    fontWeight: '700',
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

export const DatePickerWithUnitWidget: React.FC = () => {
  const [date, setDate] = useState(new Date(2025, 0, 1));
  const [showCalendar, setShowCalendar] = useState(false);
  const [unit, setUnit] = useState('Standard');
  const [showPicker, setShowPicker] = useState(false);
  const options = ['Standard', 'Fiscal'];

  return (
    <WidgetWrapper
      label="Date Selector (Unit)"
      hint="Select date and switch context/format."
      labelColor={colors.red500}
      badge={
        <NeumorphicElevated pressable onPress={() => setShowPicker(!showPicker)} style={styles.badgePill}>
          <View style={styles.badgeContent}>
            <Text style={[styles.badgeText, { color: colors.red700 }]}>{unit}</Text>
            <Feather name="chevron-down" size={12} color={colors.red700} />
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
                <Text style={[styles.unitOptionText, opt === unit && { color: colors.red700, fontWeight: '700' }]}>{opt}</Text>
              </Pressable>
            ))}
          </NeumorphicElevated>
        </View>
      )}
      <Pressable onPress={() => setShowCalendar(true)}>
        <NeumorphicInset style={styles.dateDisplay}>
          <Feather name="calendar" size={14} color={colors.red500} />
          <Text style={styles.dateText}>{displayDate(date)}</Text>
        </NeumorphicInset>
      </Pressable>

      <CalendarModal
        visible={showCalendar}
        title="Select Date"
        value={date}
        onSelect={(d) => { setDate(d); setShowCalendar(false); }}
        onClose={() => setShowCalendar(false)}
      />
    </WidgetWrapper>
  );
};
