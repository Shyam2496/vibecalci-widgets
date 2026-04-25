import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WidgetWrapper } from '../components/WidgetWrapper';
import { NeumorphicInset } from '../components/NeumorphicInset';
import { NeumorphicElevated } from '../components/NeumorphicElevated';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/* ──────────────────────────────────────────────
   1. Dataset Table Widget
   ────────────────────────────────────────────── */

export const DatasetTableWidget: React.FC = () => {
  const [headers, setHeaders] = useState(['Year', 'Revenue']);
  const [rows, setRows] = useState([
    ['2023', '10000'],
    ['2024', '12000'],
  ]);

  const addRow = () => {
    setRows([...rows, new Array(headers.length).fill('')]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const addColumn = () => {
    setHeaders([...headers, `Col ${headers.length + 1}`]);
    setRows(rows.map(row => [...row, '']));
  };

  const removeColumn = (index: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
      setRows(rows.map(row => row.filter((_, i) => i !== index)));
    }
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = rows.map((row, ri) =>
      ri === rowIndex
        ? row.map((cell, ci) => (ci === colIndex ? value : cell))
        : row
    );
    setRows(newRows);
  };

  return (
    <WidgetWrapper
      label="Data Table"
      hint="Edit headers and cells. Add/remove rows and columns as needed."
      labelColor="#4f46e5"
      badge={
        <View style={styles.tableBadgeRow}>
          <Pressable onPress={addColumn} style={styles.tableBadgeBtn}>
            <Feather name="columns" size={12} color="#4f46e5" />
            <Text style={styles.tableBadgeBtnText}>Add Col</Text>
          </Pressable>
          <Pressable onPress={addRow} style={styles.tableBadgeBtn}>
            <Feather name="plus" size={12} color="#4f46e5" />
            <Text style={styles.tableBadgeBtnText}>Add Row</Text>
          </Pressable>
        </View>
      }
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          {/* Header row */}
          <View style={styles.headerRow}>
            {headers.map((header, i) => (
              <View key={i} style={styles.headerCell}>
                <TextInput
                  value={header}
                  onChangeText={(v) => updateHeader(i, v)}
                  style={styles.headerInput}
                />
                {headers.length > 1 && (
                  <Pressable onPress={() => removeColumn(i)} style={styles.cellDeleteBtn}>
                    <Feather name="trash-2" size={10} color={colors.neutral300} />
                  </Pressable>
                )}
              </View>
            ))}
            <View style={styles.actionCol} />
          </View>

          {/* Data rows */}
          {rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.dataRow,
                rowIndex < rows.length - 1 && styles.dataRowBorder,
              ]}
            >
              {row.map((cell, colIndex) => (
                <View key={colIndex} style={styles.dataCell}>
                  <TextInput
                    value={cell}
                    onChangeText={(v) => updateCell(rowIndex, colIndex, v)}
                    style={styles.dataCellInput}
                    placeholder="..."
                    placeholderTextColor={colors.neutral300}
                  />
                </View>
              ))}
              <View style={styles.actionCol}>
                {rows.length > 1 && (
                  <Pressable onPress={() => removeRow(rowIndex)} style={styles.rowDeleteBtn}>
                    <Feather name="trash-2" size={12} color={colors.neutral300} />
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   2. Result Display Widget
   ────────────────────────────────────────────── */

export const ResultDisplayWidget: React.FC = () => {
  return (
    <WidgetWrapper
      label="Calculated Result"
      hint="Displays the final output based on inputs."
      labelColor="#16a34a"
      badge={
        <NeumorphicElevated style={styles.resultBadge}>
          <Feather name="trending-down" size={14} color="#16a34a" />
          <Text style={styles.resultBadgeText}>Optimal</Text>
        </NeumorphicElevated>
      }
    >
      <View style={styles.resultCardContainer}>
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#f7fee7' }]} />
        <View style={styles.resultCardContent}>
          {/* Header */}
          <View style={styles.resultHeader}>
            <Text style={styles.resultLabel}>Monthly Payment</Text>
            <View style={styles.resultPill}>
              <Feather name="trending-down" size={14} color={colors.neutral600} />
              <Text style={styles.resultPillText}>Low Rate</Text>
            </View>
          </View>

          {/* Main value */}
          <View style={styles.resultValueRow}>
            <Text style={styles.resultMainValue}>$1,484</Text>
            <Text style={styles.resultPeriod}>/ month</Text>
          </View>

          {/* Breakdown */}
          <View style={styles.resultBreakdown}>
            <View style={styles.resultBreakdownItem}>
              <Text style={styles.resultBreakdownLabel}>Total Interest</Text>
              <Text style={styles.resultBreakdownValue}>$117,148</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultBreakdownItem}>
              <Text style={styles.resultBreakdownLabel}>Total Amount</Text>
              <Text style={styles.resultBreakdownValue}>$367,148</Text>
            </View>
          </View>
        </View>

        {/* Simplified Inset Shadows */}
        <LinearGradient 
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.02)', 'transparent']} 
          style={styles.innerShadowTop} 
          pointerEvents="none" 
        />
        <LinearGradient 
          colors={['rgba(0,0,0,0.05)', 'transparent']} 
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
          style={styles.innerShadowLeft} 
          pointerEvents="none" 
        />
      </View>
    </WidgetWrapper>
  );
};

/* ──────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────── */

const styles = StyleSheet.create({
  // ─── Data Table ───────────────────────────
  tableBadgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tableBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.2)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tableBadgeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4f46e5',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    minWidth: 280,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245,245,245,0.6)',
    borderBottomWidth: 2,
    borderBottomColor: colors.neutral200,
  },
  headerCell: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  headerInput: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.neutral700,
  },
  cellDeleteBtn: {
    padding: 2,
  },
  actionCol: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataRow: {
    flexDirection: 'row',
  },
  dataRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229,229,229,0.6)',
  },
  dataCell: {
    width: 100,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  dataCellInput: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  rowDeleteBtn: {
    padding: 4,
  },

  // ─── Result Display ───────────────────────
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resultBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  resultCardContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    overflow: 'hidden',
    position: 'relative',
  },
  resultCardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  resultHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral500,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  resultPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral600,
  },
  resultValueRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 16,
  },
  resultMainValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#22c55e',
  },
  resultPeriod: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral500,
  },
  resultBreakdown: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: colors.neutral300,
    paddingTop: 10,
  },
  resultBreakdownItem: {
    flex: 1,
    gap: 0,
  },
  resultBreakdownLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral500,
  },
  resultBreakdownValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.neutral800,
  },
  resultDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.neutral300,
  },
  innerShadowTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: 12,
  },
  innerShadowLeft: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, width: 10,
  },
  innerShadowRight: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, width: 10,
  },
  innerShadowBottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0, height: 8,
  },
});
