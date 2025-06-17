import React, {forwardRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../../app/config/theme';
import {responsiveSize} from '../../app/utils/responsiveFontSize';
import {CustomButton} from './CustomButton';

const FilterBottomSheet = forwardRef(({onApply, ...props}, ref) => {
  const {
    isDatePickerVisible,
    isDropdownOneVisible,
    isDropdownTwoVisible,
    isDropdownThreeVisible,
    isDropdownFourVisible,
    isTextInputOneVisible,
    isTextInputTwoVisible,
    firstInputPlaceholder,
    secondInputPlaceholder,
    dropdownOptions,
    pickerOnePlaceholder,
    pickerTwoPlaceholder,
    pickerThreePlaceholder,
    pickerFourPlaceholder,
  } = props;

  // State for filters
  const [filters, setFilters] = useState({
    searchText: '',
    searchSecondText: '',
    caseWorker: null,
    attorney: null,
    judge: null,
    hearingType: null,
    hearing: null,
    startDate: new Date(),
    endDate: new Date(),
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Memoized snap points for performance
  const snapPoints = useMemo(() => ['80%'], []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}));
  };

  // Handle apply filters
  const handleApply = () => {
    const {startDate, endDate} = filters;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      Alert.alert('Validation Error', 'Please select both start and end dates');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Validation Error', 'End date cannot be before start date');
      return;
    }

    if (startDate > today || endDate > today) {
      Alert.alert('Validation Error', 'Dates cannot be in the future');
      return;
    }

    onApply(filters);
    ref.current?.dismiss();
  };

  // Reset all filters
  const handleReset = () => {
    setFilters({
      searchText: '',
      searchSecondText: '',
      caseWorker: null,
      attorney: null,
      judge: null,
      hearingType: null,
      hearing: null,
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  // Common picker icon component
  const PickerIcon = () => (
    <Ionicons name="chevron-down" size={16} color={colors.gray} />
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      // snapPoints={snapPoints}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {/* Text Input One */}
        {isTextInputOneVisible && (
          <TextInput
            style={styles.input}
            placeholder={firstInputPlaceholder}
            placeholderTextColor={colors.gray}
            value={filters.searchText}
            onChangeText={text => handleFilterChange('searchText', text)}
          />
        )}

        {/* Dropdown One */}
        {isDropdownOneVisible && (
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => handleFilterChange('caseWorker', value)}
              items={dropdownOptions.categoryOne}
              value={filters.caseWorker}
              placeholder={pickerOnePlaceholder}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={PickerIcon}
              fixAndroidTouchableBug
            />
          </View>
        )}

        {/* Dropdown Two */}
        {isDropdownTwoVisible && (
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => handleFilterChange('attorney', value)}
              items={dropdownOptions.categoryTwo}
              value={filters.attorney}
              placeholder={pickerTwoPlaceholder}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={PickerIcon}
              fixAndroidTouchableBug
            />
          </View>
        )}

        {/* Text Input Two */}
        {isTextInputTwoVisible && (
          <TextInput
            style={styles.input}
            placeholder={secondInputPlaceholder}
            placeholderTextColor={colors.gray}
            value={filters.searchSecondText}
            onChangeText={text => handleFilterChange('searchSecondText', text)}
          />
        )}

        {/* Dropdown Three */}
        {isDropdownThreeVisible && (
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => handleFilterChange('hearingType', value)}
              items={dropdownOptions.categoryFour}
              value={filters.hearingType}
              placeholder={pickerThreePlaceholder}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={PickerIcon}
              fixAndroidTouchableBug
            />
          </View>
        )}

        {/* Dropdown Four */}
        {isDropdownFourVisible && (
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={value => handleFilterChange('hearing', value)}
              items={dropdownOptions.categoryFive}
              value={filters.hearing}
              placeholder={pickerFourPlaceholder}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={PickerIcon}
              fixAndroidTouchableBug
            />
          </View>
        )}

        {/* Date Picker */}
        {isDatePickerVisible && (
          <View>
            <Text style={styles.dateRangeLabel}>Select date range</Text>
            <View style={styles.dateRangeContainer}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}>
                <Text style={styles.dateText}>
                  {filters.startDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}>
                <Text style={styles.dateText}>
                  {filters.endDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Date Pickers */}
        <DatePicker
          modal
          open={showStartDatePicker}
          date={filters.startDate || new Date()}
          mode="date"
          maximumDate={new Date()}
          onConfirm={selectedDate => {
            setShowStartDatePicker(false);
            const date = new Date(selectedDate);
            date.setHours(0, 0, 0, 0);

            if (filters.endDate && date > filters.endDate) {
              handleFilterChange('endDate', null);
            }

            handleFilterChange('startDate', date);
          }}
          onCancel={() => setShowStartDatePicker(false)}
        />

        <DatePicker
          modal
          open={showEndDatePicker}
          date={filters.endDate || filters.startDate || new Date()}
          mode="date"
          minimumDate={filters.startDate}
          maximumDate={new Date()}
          disabled={!filters.startDate}
          onConfirm={selectedDate => {
            setShowEndDatePicker(false);
            const date = new Date(selectedDate);
            date.setHours(0, 0, 0, 0);
            handleFilterChange('endDate', date);
          }}
          onCancel={() => setShowEndDatePicker(false)}
        />

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <CustomButton
            btnText="Reset"
            btnOnPress={handleReset}
            isEnable={false}
            isBtnEnable={true}
            btnViewStyle={[styles.button, styles.resetButton]}
            btnTextColor={styles.resetButtonText}
          />

          <CustomButton
            btnText="Apply Filters"
            btnOnPress={handleApply}
            isEnable={true}
            isBtnEnable={true}
            btnViewStyle={styles.button}
            btnTextColor={styles.applyButtonText}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

// Styles
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.bottomTabSignOut,
    borderRadius: 20,
  },
  handle: {
    backgroundColor: '#ccc',
    width: 40,
  },
  contentContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 0.7,
    fontSize: responsiveSize(14),
    color: colors.white,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    backgroundColor: colors.inputBgColor,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  dropdownWrapper: {
    borderWidth: 0.7,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    backgroundColor: colors.inputBgColor,
    marginBottom: 15,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 5,
  },
  dateRangeLabel: {
    fontSize: responsiveSize(14),
    fontWeight: '500',
    marginBottom: 10,
    color: colors.white,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    height: 50,
    width: '45%',
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.inputBgColor,
  },
  dateText: {
    color: colors.white,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: colors.bottomTabSignOut,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  resetButton: {
    marginRight: 10,
  },
  resetButtonText: {
    color: colors.themeBgColor,
    fontSize: responsiveSize(14),
  },
  applyButtonText: {
    color: colors.themeBgColor,
    fontSize: responsiveSize(14),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.inputBgColor,
    color: colors.white,
    zIndex: 9999,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: responsiveSize(14),
    backgroundColor: colors.inputBgColor,
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: colors.white,
    paddingRight: 30,
    height: '100%',
    width: '100%',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  placeholder: {
    color: colors.gray,
  },
  iconContainer: {
    top: '50%',
    right: 10,
    marginTop: -7,
  },
});

export default FilterBottomSheet;
