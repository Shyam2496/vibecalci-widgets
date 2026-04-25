import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface WidgetWrapperProps {
  label: string;
  hint?: string;
  labelColor?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * WidgetWrapper — individual widget container inside a SectionCard.
 * Provides: colored label + optional badge, content area, hint, and bottom divider.
 */
export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  label,
  hint,
  labelColor = colors.indigo600,
  badge,
  children,
}) => {
  return (
    <View style={styles.container}>
      {/* Label Row */}
      <View style={styles.labelRow}>
        <View style={styles.labelLeft}>
          <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
        </View>
        {badge && <View style={styles.badgeArea}>{badge}</View>}
      </View>

      {/* Hint */}
      {hint && <Text style={styles.hintText}>{hint}</Text>}

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Bottom Divider */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  labelText: {
    ...typography.label,
    opacity: 0.9,
    flexShrink: 1,
  },
  badgeArea: {
    flexShrink: 0,
    marginLeft: 8,
  },
  hintText: {
    ...typography.hint,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  content: {
    width: '100%',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(188, 194, 200, 0.5)',
    marginHorizontal: 8,
    marginTop: 4,
  },
});
