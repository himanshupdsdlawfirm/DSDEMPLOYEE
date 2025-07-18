import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../config/theme';
import {responsiveSize} from '../../../utils/responsiveFontSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  mainContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  appointmentList: {
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  tabSelector: {
    width: '100%',
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderColor: colors.textGrayTwo,
    flexDirection: 'row',
  },
  tabButton: {
    width: '33.33%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.textGrayThree,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    shadowColor: colors.white,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tabButtonText: {
    fontSize: responsiveSize(14),
    fontWeight: '400',
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingIndicator: {
    paddingVertical: 20,
  },

  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    height: 42,
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
  },
  searchTypeButtonContainer: {
    // flex: 0.33,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    height: 42,
  },
  searchTypeButtonText: {
    fontSize: responsiveSize(12),
    color: colors.white,
    paddingRight: 10,
  },
  dropdownIcon: {
    height: 12,
    width: 12,
    tintColor: colors.white,
  },
  bottomSheetBackground: {
    backgroundColor: colors.bottomTabSignOut,
  },
  bottomSheetHandle: {
    backgroundColor: '#ccc',
    width: 40,
  },

  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 24,
    marginTop: 10,
    gap: 8,
  },
  searchTypeSelectorBtn: {
    bottom: Platform.OS === 'android' ? 10 : 15,
  },
  pillButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedPill: {
    backgroundColor: colors.textGrayTwo,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    elevation: 1,
    shadowColor: colors.white,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  pillText: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectedPillText: {
    color: 'white',
    fontWeight: '600',
  },
});
