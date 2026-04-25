/**
 * Shadow presets for react-native-shadow-2.
 * These replicate the neumorphic-elevated CSS box-shadows.
 */

export const shadowPresets = {
  /** Main elevated surface — buttons, dropdowns, cards within sections */
  elevated: {
    distance: 6,
    startColor: 'rgba(0, 0, 0, 0.12)',
    endColor: 'transparent',
    offset: [0, 3] as [number, number],
  },

  /** Deeper shadow for section cards */
  sectionCard: {
    distance: 20,
    startColor: 'rgba(0, 0, 0, 0.18)',
    endColor: 'transparent',
    offset: [0, 8] as [number, number],
  },

  /** Subtle shadow for badges */
  badge: {
    distance: 4,
    startColor: 'rgba(0, 0, 0, 0.10)',
    endColor: 'transparent',
    offset: [0, 2] as [number, number],
  },
} as const;
