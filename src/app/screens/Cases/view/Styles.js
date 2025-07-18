import {StyleSheet} from 'react-native';
import {colors} from '../../../config/theme';
import {responsiveSize} from '../../../utils/responsiveFontSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  searchButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
    backgroundColor: colors.bottomTabLightGray,
    borderWidth: 1,
    borderColor: colors.inputBorderColor,
    borderRadius: 8,
    alignSelf: 'center',
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
  clientsList: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  caseCardContainer: {
    shadowColor: colors.themeBgColor,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    elevation: 10,
  },
  caseGradient: {
    justifyContent: 'space-around',
    borderRadius: 12,
    width: '100%',
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
  },
  AppointmentTime: {
    fontSize: responsiveSize(12),
    marginLeft: 5,
    color: 'white',
  },
  AppointmentTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 10,
    paddingTop: 20,
    paddingBottom: 5,
    marginRight: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    paddingVertical: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: colors.gray,
    fontSize: responsiveSize(16),
    textAlign: 'center',
  },
});