import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface NeumorphicInsetProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * NeumorphicInset — simulates the CSS `.neumorphic-inset` effect.
 *
 * Since RN doesn't support `inset box-shadow`, we layer:
 * 1. A base View with the inset bg color + subtle border
 * 2. A LinearGradient overlay (dark top-left to transparent) to simulate the "carved in" shadow
 * 3. Another LinearGradient (transparent to light bottom-right) for the inner highlight
 */
export const NeumorphicInset: React.FC<NeumorphicInsetProps> = ({ children, style }) => {
  return (
    <View style={[styles.outer, style]}>
      {children}
      
      {/* Top Inset Shadow */}
      <LinearGradient
        colors={['rgba(0,0,0,0.08)', 'transparent']}
        style={styles.topShadow}
        pointerEvents="none"
      />
      {/* Left Inset Shadow */}
      <LinearGradient
        colors={['rgba(0,0,0,0.08)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.leftShadow}
        pointerEvents="none"
      />
      
      {/* Bottom Inset Highlight */}
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.8)']}
        style={styles.bottomHighlight}
        pointerEvents="none"
      />
      {/* Right Inset Highlight */}
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.rightHighlight}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.inset,
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: 'rgba(229, 229, 229, 0.5)',
    borderLeftColor: 'rgba(229, 229, 229, 0.5)',
    borderRightColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    position: 'relative',
  },
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  leftShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 6,
  },
  bottomHighlight: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  rightHighlight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 6,
  },
});
