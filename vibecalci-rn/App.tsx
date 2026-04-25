import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { SectionCard } from './src/components/SectionCard';
import {
  NumberInputWidget,
  CurrencyInputWidget,
  StepperInputWidget,
  PercentageInputWidget,
  RangeSliderWidget,
  NumberInputWithUnitWidget,
  CurrencyInputWithUnitWidget,
  PercentageInputWithUnitWidget,
  RangeSliderWithUnitWidget,
  StepperInputWithUnitWidget,
} from './src/widgets/NumericWidgets';
import {
  TextFieldWidget,
  CustomInstructionsWidget,
  TextFieldWithUnitWidget,
  CustomInstructionsWithUnitWidget,
} from './src/widgets/TextWidgets';
import {
  DropdownSelectorWidget,
  RadioGroupWidget,
  CheckboxWidget,
  ToggleSwitchWidget,
  ChipSelectorWidget,
  DropdownSelectorWithUnitWidget,
  RadioGroupWithUnitWidget,
  CheckboxWithUnitWidget,
  ToggleSwitchWithUnitWidget,
} from './src/widgets/SelectionWidgets';
import {
  DatePickerWidget,
  DateRangeSelectorWidget,
  TimeDurationWidget,
  DatePickerWithUnitWidget,
} from './src/widgets/TimeDateWidgets';
import { DatasetTableWidget, ResultDisplayWidget } from './src/widgets/DataWidgets';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.screenBg} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vibecalci Widgets</Text>
          <Text style={styles.headerSubtitle}>Input components for calculators</Text>
        </View>

        {/* Numeric Inputs Section */}
        <SectionCard title="Numeric Inputs">
          <NumberInputWidget />
          <CurrencyInputWidget />
          <PercentageInputWidget />
          <RangeSliderWidget />
          <StepperInputWidget />
        </SectionCard>

        {/* Numeric Inputs (Unit) Section */}
        <SectionCard title="Numeric (Unit)">
          <NumberInputWithUnitWidget />
          <CurrencyInputWithUnitWidget />
          <PercentageInputWithUnitWidget />
          <RangeSliderWithUnitWidget />
          <StepperInputWithUnitWidget />
        </SectionCard>

        {/* Text Inputs Section */}
        <SectionCard title="Text Inputs">
          <TextFieldWidget />
          <CustomInstructionsWidget />
        </SectionCard>

        {/* Text Inputs (Unit) Section */}
        <SectionCard title="Text (Unit)">
          <TextFieldWithUnitWidget />
          <CustomInstructionsWithUnitWidget />
        </SectionCard>

        {/* Selection Section */}
        <SectionCard title="Selection">
          <DropdownSelectorWidget />
          <RadioGroupWidget />
          <CheckboxWidget />
          <ToggleSwitchWidget />
          <ChipSelectorWidget />
        </SectionCard>

        {/* Selection (Unit) Section */}
        <SectionCard title="Selection (Unit)">
          <DropdownSelectorWithUnitWidget />
          <RadioGroupWithUnitWidget />
          <CheckboxWithUnitWidget />
          <ToggleSwitchWithUnitWidget />
        </SectionCard>

        {/* Time & Date Section */}
        <SectionCard title="Time & Date">
          <DatePickerWidget />
          <DateRangeSelectorWidget />
          <TimeDurationWidget />
        </SectionCard>

        {/* Time & Date (Unit) Section */}
        <SectionCard title="Time & Date (Unit)">
          <DatePickerWithUnitWidget />
        </SectionCard>

        {/* Data Input Section */}
        <SectionCard title="Data Input">
          <DatasetTableWidget />
          <ResultDisplayWidget />
        </SectionCard>

        {/* Spacer at bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.neutral900,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.neutral500,
    marginTop: 2,
  },
});
