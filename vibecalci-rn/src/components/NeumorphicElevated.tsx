import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { colors } from '../theme/colors';
import { shadowPresets } from '../theme/shadows';

interface NeumorphicElevatedProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  /** If true, acts as a pressable button with active state */
  pressable?: boolean;
  /** If true, forces the shadow wrapper to take 100% width */
  fullWidth?: boolean;
}

/**
 * NeumorphicElevated — simulates the CSS `.neumorphic-elevated` effect.
 *
 * Uses react-native-shadow-2 for the outer shadow (works on Android too),
 * plus a subtle top-inset highlight border for the "raised" 3D look.
 *
 * When `pressable`, the shadow reduces and the view translates down on press.
 */
export const NeumorphicElevated: React.FC<NeumorphicElevatedProps> = ({
  children,
  style,
  onPress,
  pressable = false,
  fullWidth = false,
}) => {
  const content = (
    <View style={[styles.inner, style, fullWidth && { width: '100%' }]}>
      {/* Top highlight line — simulates `inset 0 1px 1px rgba(255,255,255,0.8)` */}
      <View style={styles.topHighlight} pointerEvents="none" />
      {children}
    </View>
  );

  if (pressable || onPress) {
    return (
      <Pressable onPress={onPress} style={fullWidth && { width: '100%' }}>
        {({ pressed }) => (
          <Shadow
            distance={pressed ? 6 : 12}
            startColor={pressed ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.05)'}
            offset={pressed ? [0, 4] : [0, 8]}
            style={[
              styles.shadowStyle,
              fullWidth && { width: '100%' },
              pressed && styles.pressed,
            ]}
          >
            <Shadow
              distance={0}
              startColor="rgba(0,0,0,0.1)"
              offset={pressed ? [0, 2] : [0, 4]}
              style={[styles.shadowStyle, fullWidth && { width: '100%' }]}
            >
              {content}
            </Shadow>
          </Shadow>
        )}
      </Pressable>
    );
  }

  return (
    <Shadow
      distance={12}
      startColor="rgba(0,0,0,0.05)"
      offset={[0, 8]}
      style={[styles.shadowStyle, fullWidth && { width: '100%' }]}
    >
      <Shadow
        distance={0}
        startColor="rgba(0,0,0,0.1)"
        offset={[0, 4]}
        style={[styles.shadowStyle, fullWidth && { width: '100%' }]}
      >
        {content}
      </Shadow>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  shadowStyle: {
    borderRadius: 6,
  },
  inner: {
    backgroundColor: colors.elevated,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  pressed: {
    transform: [{ translateY: 2 }],
  },
});
