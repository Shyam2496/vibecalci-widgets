import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { shadowPresets } from '../theme/shadows';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * SectionCard — the brushed-aluminum outer card that groups widgets.
 * Replaces the web SectionCard with its neumorphic depth + metal sheen.
 */
export const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <View style={styles.wrapper}>
      <Shadow
        distance={shadowPresets.sectionCard.distance}
        startColor={shadowPresets.sectionCard.startColor}
        offset={shadowPresets.sectionCard.offset}
        style={styles.shadowStyle}
        containerStyle={styles.shadowContainer}
      >
        <View style={styles.card}>
          {/* Brushed metal sheen overlay */}
          <LinearGradient
            colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)', 'rgba(0,0,0,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {/* Section title bar */}
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          {/* Widget children */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  shadowContainer: {
    width: '100%',
  },
  shadowStyle: {
    width: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: colors.sectionBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(173, 179, 184, 0.3)',
    overflow: 'hidden',
  },
  titleBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  titleText: {
    ...typography.sectionTitle,
    color: colors.neutral400,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
});
