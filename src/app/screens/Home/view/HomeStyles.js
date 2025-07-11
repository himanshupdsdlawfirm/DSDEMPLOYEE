// features/home/view/HomeStyles.js
import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../../utils/responsiveFontSize';
import { colors } from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeBgColor,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 100,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
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
  searchText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray,
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    letterSpacing: 0.5,
  },
  sectionViewAll: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.themeTextColor,
  },
  appointmentContainer: {
    width: responsiveSize(240),
    borderRadius: 12,
    alignItems: 'center',
  },
  appointmentSubContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
  },
  appointmentList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  clientsList: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  clientItem: {
    width: 110,
    alignItems: 'center',
  },
  clientImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.themeTextColor,
    shadowOffset: { width: 0, height: 0 },
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
  clientName: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
    color: colors.white,
    letterSpacing: 0.5,
  },
  clientId: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textGray,
    letterSpacing: 0.5,
  },
  hearingsList: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  hearingsColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  hearingLinearCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: colors.borderColor,
  },
  hearingItem: {
    width: '100%',
    padding: 10,
  },
});