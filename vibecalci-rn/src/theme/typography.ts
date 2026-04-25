import { TextStyle } from 'react-native';

/**
 * Typography presets matching the web app's font styles.
 * Web uses Inter via Tailwind — RN uses system font (visually similar).
 */

export const typography = {
  /** Widget label — e.g. "NUMERIC INPUT" */
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  /** Hint text below content */
  hint: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  } as TextStyle,

  /** Input value */
  value: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,

  /** Badge / unit selector text */
  badge: {
    fontSize: 14,
    fontWeight: '600',
  } as TextStyle,

  /** Section card title — e.g. "NUMERIC INPUTS" */
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  } as TextStyle,

  /** Small labels on sliders, units */
  caption: {
    fontSize: 11,
    fontWeight: '700',
  } as TextStyle,

  /** Large value display */
  valueLarge: {
    fontSize: 16,
    fontWeight: '700',
  } as TextStyle,

  /** Small unit label next to values */
  unitLabel: {
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,
} as const;
