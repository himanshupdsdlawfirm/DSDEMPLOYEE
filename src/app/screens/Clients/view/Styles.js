// views/ClientsScreen.styles.js
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {responsiveSize} from '../../../utils/responsiveFontSize';
import {colors} from '../../../config/theme';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientsList: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.clientListBg,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.bottomTabSignOut,
  },
  clientItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 3,
    shadowColor: colors.themeTextColor,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  clientImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: colors.imageBorderColor,
    borderWidth: 2,
  },

  pinIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    bottom: 3,
    right: 16,
  },
  clientName: {
    fontSize: responsiveSize(14),
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  clientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    height: 12,
    width: 12,
    tintColor: colors.sheildIconColor,
  },
  clientId: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.textGray,
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 15,
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },
  rightArrowIcon: {
    height: 24,
    width: 24,
    tintColor: colors.textGrayTwo,
  },
  bottomSheetContainer: {
    flex: 1,
    height: 600,
    width: '100%',
  },
  clientHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImageSmall: {
    height: 60,
    width: 60,
    alignSelf: 'flex-start',
  },
  clientNameSmall: {
    fontSize: responsiveSize(14),
    fontWeight: '400',
    maxWidth: '80%',
    color: colors.white,
    maxWidth: '100%',
    marginLeft: 12,
  },
  clientInfoRight: {
    marginTop: 5,
    marginLeft: 12,
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.textViewBg,
  },
  infoText: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    maxWidth: 100,
    marginLeft: 5,
    color: colors.white,
  },
  tabSelector: {
    width: '100%',
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: colors.textGrayTwo,
    flexDirection: 'row',
  },
  tabButton: {
    width: '33.33%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonMiddle: {
    borderColor: colors.textGrayTwo,
  },
  tabButtonActive: {
    backgroundColor: colors.textGrayTwo,
    borderRadius: 25,
    borderColor: colors.textGrayTwo,
    borderWidth: 1,
    elevation: 2,
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
  snapshotsContainer: {
    flexDirection: 'row',
    padding: 3,
    paddingVertical: 10,
    marginTop: 10,
  },
  detailsColumn: {
    width: '40%',
  },
  valuesColumn: {
    width: '60%',
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: responsiveSize(14),
    color: colors.textGray,
    fontWeight: '400',
  },
  detailValue: {
    fontSize: responsiveSize(14),
    color: colors.white,
    fontWeight: '400',
  },
  underline: {
    height: 0.5,
    backgroundColor: colors.underline,
    marginTop: 10,
    width: '100%',
  },
  caseCardContainer: {
    shadowColor: colors.themeBgColor,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    borderRadius: 12,
    marginVertical: 30,
    width: '100%',
    alignSelf: 'center',
    elevation: 10,
  },
  caseGradient: {
    justifyContent: 'space-around',
    borderRadius: 12,
  },
  AppointmentNotifitionBox: {
    width: '100%',
    borderRadius: 8,
    padding: 15,
  },
  caseHeader: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Appointment: {
    fontSize: responsiveSize(16),
    color: colors.white,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  statusIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  AppointmentTime: {
    fontSize: responsiveSize(12),
    marginLeft: 5,
    color: 'white',
  },

  clientDetailContainer: {
    paddingVertical: 5,
    width: '100%',
  },
  clientContactRow: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  clientUserIcon: {
    marginRight: 3,
    height: 16,
    width: 16,
  },
  mobileIcon: {
    marginRight: 3,
    marginLeft: 10,
    height: 14,
    width: 14,
    tintColor: colors.sheildIconColor,
  },
  alienNumberIcon: {
    marginLeft: 10,
    marginRight: 2,
    height: 14,
    width: 14,
    tintColor: colors.sheildIconColor,
  },

  employeeClientName: {
    fontSize: responsiveSize(14),
    fontWeight: '500',
    color: colors.white,
    flexShrink: 1,
    maxWidth: '35%', // Set a maximum width
  },
  mobileNumber: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
    flexShrink: 1, // Allow shrinking if needed
    maxWidth: '25%', // Set a maximum width
  },
  alienNumber: {
    fontSize: responsiveSize(12),
    fontWeight: '400',
    color: colors.white,
    flexShrink: 1, // Allow shrinking if needed
    maxWidth: '25%', // Set a maximum width
  },
  AppointmentTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  Appointmentwith: {
    flexDirection: 'row',
    backgroundColor: colors.textViewBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paidContainer: {
    flexDirection: 'row',
    backgroundColor: colors.textViewBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  Appointmenttype: {
    flexDirection: 'row',
    backgroundColor: '#EB5757',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amountLabel: {
    color: colors.white,
    fontSize: responsiveSize(12),
    textAlign: 'left',
  },
  amountValue: {
    color: colors.white,
    fontSize: responsiveSize(12),
    fontWeight: '700',
  },
  noDataText: {
    color: colors.gray, // or any color you prefer
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'YourFont-Regular', // if using custom fonts
    lineHeight: 24, // for better readability
  },
  hearingsList: {
    paddingVertical: 30,
  },
  hearingsColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  hearingLinearCard: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
  },
  hearingItem: {
    width: '100%',
    padding: 10,
  },
  hearingContainer: {
    width: '48%',
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: colors.borderColor,
  },
  hearingDateContainer: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hearingDateInner: {
    backgroundColor: colors.themeBgColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: Platform.OS === 'android' ? '100%' : '99%',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 1,
  },
  calendarIcon: {
    height: 15,
    width: 15,
  },
  hearingDateTime: {
    fontSize: responsiveSize(14, 'font'),
    fontWeight: '400',
    flex: 1,
    marginLeft: 10,
    color: colors.white,
  },
  hearingName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '400',
    marginTop: 10,
    marginHorizontal: 10,
    color: colors.themeTextColor,
  },
  hearingAlienNumber: {
    fontSize: responsiveSize(18, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingLocationContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  locationIcon: {
    height: 16,
    width: 16,
    tintColor: colors.sheildIconColor,
  },
  hearingLocation: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingOfficerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  officerIcon: {
    height: 16,
    width: 16,
    tintColor: colors.sheildIconColor,
  },
  hearingOfficer: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginHorizontal: 10,
    color: colors.textGray,
  },
  hearingTypeContainer: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: Platform.OS === 'android' ? 1 : 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hearingTypeInner: {
    width: Platform.OS === 'android' ? '100%' : '99%',
    height:
      Platform.OS === 'android'
        ? responsiveSize(90, 'height')
        : responsiveSize(80, 'height'),
    borderRadius: 11,
    backgroundColor: colors.themeBgColor,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 1,
  },
  hearingOfficerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Add this to take available width
    maxWidth: '100%', // Ensure it doesn't overflow
  },
  userIcon: {
    height: 22,
    width: 22,
  },
  hearingOfficerName: {
    fontSize: responsiveSize(20, 'font'),
    fontWeight: '600',
    marginLeft: 10,
    color: colors.white,
    flex: 1,
    flexShrink: 1,
  },
  hearingTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ihIcon: {
    height: 18,
    width: 18,
  },
  hearingTypeText: {
    fontSize: responsiveSize(19, 'font'),
    fontWeight: '400',
    marginTop: 5,
    color: colors.textGray,
  },
  hearingTypeBullet: {
    fontSize: responsiveSize(22, 'font'),
    fontWeight: '600',
    color: colors.white,
  },
  loadingIndicator: {
    paddingVertical: 20,
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
