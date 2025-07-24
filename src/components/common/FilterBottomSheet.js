import React, {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../../app/config/theme';
import {responsiveSize} from '../../app/utils/responsiveFontSize';
import {CustomButton} from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {AppImages} from '../../app/config/Images';

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
    bottomBtnStyle,
    isFromAppointments,
    selectedAppointmentTab,
    showToast,
    isResetFilterData,
    isHearingScreen,
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
    startDate: null,
    endDate: null,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    handleResetByDiffScr();
  }, [isResetFilterData]);

  // Memoized snap points for performance
  const snapPoints = useMemo(() => ['80%'], []);

  const PickerWrapper = ({children, onPress}) => {
    if (Platform.OS === 'android') {
      return children;
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{flex: 1}}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  // Helper functions for date handling
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getMinDate = () => new Date(1990, 0, 1); // Jan 1, 1990

  const safeDateToString = date => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Select date';
    }
    return date.toLocaleDateString();
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}));
  };

  // Handle start date selection
  const handleStartDateSelect = selectedDate => {
    try {
      const date = new Date(selectedDate);
      if (isNaN(date.getTime())) {
        showToast({title: 'Error', message: 'Invalid date selected'});
        return;
      }

      date.setHours(0, 0, 0, 0);
      const today = getToday();
      const minDate = getMinDate();

      // Only validate against future dates if it's not a hearing screen
      if (!isHearingScreen && date > today) {
        showToast({title: 'Invalid', message: 'Cannot select future dates'});
        return;
      }

      if (date < minDate) {
        showToast({
          title: 'Invalid',
          message: 'Cannot select dates before 1990',
        });
        return;
      }

      setFilters(prev => {
        const newFilters = {...prev, startDate: date};
        // Reset end date if it's before new start date
        if (prev.endDate && date > prev.endDate) {
          newFilters.endDate = null;
        }
        return newFilters;
      });
    } catch (error) {
      console.error('Start date error:', error);
      showToast({title: 'Error', message: 'Failed to set start date'});
    } finally {
      setShowStartDatePicker(false);
    }
  };

  // Handle end date selection
  const handleEndDateSelect = selectedDate => {
    try {
      // Validate start date exists first
      if (!filters.startDate) {
        showToast({
          title: 'Select Start Date',
          message: 'Please select start date first',
          colorDark: colors.errorDark,
          colorLight: colors.errorLight,
          icon: AppImages.alertIcon,
        });
        setShowEndDatePicker(false);
        return;
      }

      const date = new Date(selectedDate);
      if (isNaN(date.getTime())) {
        showToast({title: 'Error', message: 'Invalid date selected'});
        return;
      }

      date.setHours(0, 0, 0, 0);
      const today = getToday();

      // Only validate against future dates if it's not a hearing screen
      if (!isHearingScreen && date > today) {
        showToast({title: 'Invalid', message: 'Cannot select future dates'});
        return;
      }

      if (date < filters.startDate) {
        showToast({
          title: 'Invalid',
          message: 'End date cannot be before start date',
        });
        return;
      }

      handleFilterChange('endDate', date);
    } catch (error) {
      console.error('End date error:', error);
      showToast({title: 'Error', message: 'Failed to set end date'});
    } finally {
      setShowEndDatePicker(false);
    }
  };

  const handleResetByDiffScr = () => {
    setFilters({
      searchText: '',
      searchSecondText: '',
      caseWorker: null,
      attorney: null,
      judge: null,
      hearingType: null,
      hearing: null,
      startDate: null,
      endDate: null,
    });
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
      startDate: null,
      endDate: null,
    });
  };

  // Handle apply filters
  const handleApply = useCallback(() => {
    try {
      const {startDate, endDate} = filters;

      // Validate start date is selected if end date is selected
      if (!startDate && endDate) {
        showToast({
          title: 'Invalid Date',
          message: 'Please select a start date first',
          colorDark: colors.errorDark,
          colorLight: colors.errorLight,
          icon: AppImages.alertIcon,
        });
        return;
      }

      const today = getToday();

      // For appointment-specific validation
      if (isFromAppointments) {
        if (selectedAppointmentTab === 'today') {
          const newFilters = {
            ...filters,
            startDate: today,
            endDate: today,
          };
          setFilters(newFilters);
          onApply(newFilters);
          ref.current?.dismiss();
          return;
        }

        if (selectedAppointmentTab === 'past') {
          if (startDate && startDate >= today) {
            showToast({
              title: 'Invalid Date',
              message: 'Please select a date in the past',
            });
            return;
          }
          if (endDate && endDate >= today) {
            showToast({
              title: 'Invalid Date',
              message: 'Please select a date in the past',
            });
            return;
          }
        }

        if (selectedAppointmentTab === 'future') {
          if (startDate && startDate <= today) {
            showToast({
              title: 'Invalid Date',
              message: 'Please select a date in the future',
            });
            return;
          }
          if (endDate && endDate <= today) {
            showToast({
              title: 'Invalid Date',
              message: 'Please select a date in the future',
            });
            return;
          }
        }
      }

      onApply(filters);
      ref.current?.dismiss();
    } catch (error) {
      console.error('Error applying filters:', error);
      showToast({title: 'Error', message: 'Failed to apply filters'});
    }
  }, [
    filters,
    isFromAppointments,
    selectedAppointmentTab,
    onApply,
    ref,
    showToast,
  ]);

  // Common picker icon component
  const PickerIcon = () => (
    <Ionicons name="chevron-down" size={16} color={colors.gray} />
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}>
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <LinearGradient
          colors={[colors.bottomTabSignOut, colors.themeBgColor]}
          style={{flex: 1}}>
          <View style={{padding: 20}}>
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
                  onValueChange={value =>
                    handleFilterChange('caseWorker', value)
                  }
                  items={dropdownOptions.categoryOne}
                  value={filters.caseWorker}
                  placeholder={pickerOnePlaceholder}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  Icon={PickerIcon}
                  fixAndroidTouchableBug
                  touchableWrapperProps={{
                    hitSlop: {top: 20, bottom: 20, left: 0, right: 0},
                    activeOpacity: 0.8,
                  }}
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
                onChangeText={text =>
                  handleFilterChange('searchSecondText', text)
                }
              />
            )}

            {/* Dropdown Three */}
            {isDropdownThreeVisible && (
              <View style={styles.dropdownWrapper}>
                <RNPickerSelect
                  onValueChange={value => {
                    handleFilterChange('hearingType', value);
                  }}
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

            {isDatePickerVisible && (
              <View>
                <Text style={styles.dateRangeLabel}>Select date range</Text>
                <View style={styles.dateRangeContainer}>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowStartDatePicker(true)}>
                    <Text style={styles.dateText}>
                      {safeDateToString(filters.startDate)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => {
                      if (!filters.startDate) {
                        showToast({
                          title: 'Select Start Date',
                          message: 'Please select start date first',
                          colorDark: colors.redError,
                          colorLight: colors.cancelled_txt,
                          icon: AppImages.warning,
                        });
                        return;
                      }
                      setShowEndDatePicker(true);
                    }}>
                    <Text style={styles.dateText}>
                      {safeDateToString(filters.endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Date Pickers */}
            <DatePicker
              modal
              open={showStartDatePicker}
              date={filters.startDate || getToday()}
              mode="date"
              minimumDate={getMinDate()}
              maximumDate={isHearingScreen ? undefined : getToday()}
              onConfirm={handleStartDateSelect}
              onCancel={() => setShowStartDatePicker(false)}
            />

            <DatePicker
              modal
              open={showEndDatePicker}
              date={filters.endDate || filters.startDate || getToday()}
              mode="date"
              minimumDate={filters.startDate || getMinDate()}
              maximumDate={isHearingScreen ? undefined : getToday()}
              onConfirm={handleEndDateSelect}
              onCancel={() => setShowEndDatePicker(false)}
            />

            {/* Action Buttons */}
            <View style={[styles.buttonRow, bottomBtnStyle]}>
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
          </View>
        </LinearGradient>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

// Styles remain the same as in your original code
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
    width: '100%',
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
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
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
  inputIOSContainer: {width: '100%', height: 40},
  inputIOS: {
    fontSize: responsiveSize(16),
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.white,
    paddingRight: 30,
    height: '100%',
    width: '100%',
  },
  inputAndroid: {
    fontSize: responsiveSize(14),
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: colors.white,
    paddingRight: 30,
    height: '100%',
    width: '100%',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  touchableWrapper: {
    flex: 1,
    justifyContent: 'center',
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
