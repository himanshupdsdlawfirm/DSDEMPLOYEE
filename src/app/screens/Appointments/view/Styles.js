import {StyleSheet} from 'react-native';
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
});
