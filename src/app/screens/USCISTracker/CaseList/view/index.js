// CaseListScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {AppImages} from '../../../../config/Images';
import {colors, fonts} from '../../../../config/theme';
import {LinearGradientHeader} from '../../../../../components/common/LinerGradientHeader';
import {SwipeListView} from 'react-native-swipe-list-view';
import ToastNotification from '../../../../../components/common/CustomToast';
import {useCaseListViewModel} from '../viewModel/useCaseListViewModel';
import {responsiveSize} from '../../../../utils/responsiveFontSize';

const {width} = Dimensions.get('window');

const CaseListScreen = ({navigation}) => {
  const {
    cases,
    loading,
    refreshing,
    toastConfig,
    fetchCases,
    onRefresh,
    loadMoreCases,
    deleteCase,
    fetchCaseDetail
  } = useCaseListViewModel();

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <View style={styles.underlayContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteCase(data.item.id, rowMap)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => fetchCaseDetail(1,false,item.receipt_number)}
      style={styles.frontViewContainer}>
      <View style={styles.caseItem}>
        {console.log('case list itsm is::', item)}
        <View
          style={[
            styles.caseStatusColor,
            {backgroundColor: getStatusColor(item.status)},
          ]}
        />
        <View style={styles.caseContent}>
          <View>
            <View style={styles.caseIdContainer}>
              <Text style={styles.caseId}>{item.receipt_number}</Text>
              <Text style={styles.caseDate}>{item.caseDate}</Text>
            </View>
            {item.caseName && item.caseName != '' && (
              <Text numberOfLines={1} style={styles.caseName}>
                {item.caseName}
              </Text>
            )}

            {item.status && (
              <Text
                numberOfLines={item.caseName && item.caseName != '' ? 1 : 2}
                style={styles.caseStatus}>
                {item.status}
              </Text>
            )}
          </View>
          <View style={styles.caseIdContainer}>
            <Text style={styles.lastChange}>
              Last Change: {item.lastChange}
            </Text>
            <Text style={styles.caseFileId}>{item.caseFileId}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Approved':
        return colors.green;
      case 'Pending':
        return colors.yellow;
      case 'Rejected':
        return colors.red;
      case 'Interview Scheduled':
        return colors.blue;
      default:
        return colors.gray;
    }
  };

  return (
    <ImageBackground source={AppImages.loginTheme} style={styles.container}>
      <LinearGradientHeader
        goBack={() => navigation.goBack()}
        leftImg={AppImages.backArrow}
        leftImgTint={colors.white}
        showBackBtnContainer={true}
        headerText="Cases"
        isSecondEndImg={true}
        isEndRightImg={true}
        showBackBtn={true}
        isHeaderBottomText={true}
        headerBottomTitle={`Refreshed: ${new Date().toLocaleString()}`}
        rightIcon={AppImages.addIcon}
        rightSecondImgOnPress={onRefresh}
        rightImgOnPress={() => navigation.navigate('AddCase')}
        secondRightIcon={AppImages.refreshIcon}
      />

      <SwipeListView
        data={cases}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={item => item.id}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe={true}
        stopLeftSwipe={75}
        stopRightSwipe={-75}
        swipeToOpenPercent={30}
        swipeToClosePercent={30}
        closeOnRowPress={true}
        closeOnRowBeginSwipe={false}
        closeOnScroll={true}
        useNativeDriver={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }
        onEndReached={loadMoreCases}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        style={styles.swipeList}
      />

      <ToastNotification
        visible={toastConfig.visible}
        title={toastConfig.title}
        message={toastConfig.message}
        colorLight={toastConfig.colorLight}
        colorDark={toastConfig.colorDark}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  rowBack: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  underlayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    width: '80%',
    justifyContent: 'center',
    paddingRight: 15,
    alignItems: 'flex-end',
    backgroundColor: '#F95D5D',
    height: '100%',
  },
  deleteText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  frontViewContainer: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.themeLightBg,
    backgroundColor: colors.themeBgColor,
    overflow: 'hidden',
  },
  caseItem: {
    flexDirection: 'row',
    backgroundColor: colors.transparent,
    // height: 100,
  },
  caseStatusColor: {
    width: 10,
  },
  caseContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  caseIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caseId: {
    fontSize: responsiveSize(22, 'font'),
    fontWeight: 'bold',
    color: colors.white,
  },
  caseDate: {
    fontSize: responsiveSize(20, 'font'),
    color: colors.gray,
  },
  caseName: {
    fontSize: responsiveSize(20, 'font'),
    color: colors.themeTextColor,
    marginTop: 5,
  },
  caseStatus: {
    fontSize: responsiveSize(16, 'font'),
    marginTop: 5,
    color: colors.white,
  },
  lastChange: {
    fontSize: responsiveSize(16, 'font'),
    color: colors.gray,
    marginTop: 5,
  },
  caseFileId: {
    fontSize: responsiveSize(16, 'font'),
    color: colors.gray,
    marginTop: 5,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default CaseListScreen;
