import React, {useState, useEffect, useCallback} from 'react';
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
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import {SwipeListView} from 'react-native-swipe-list-view';

const {width} = Dimensions.get('window');

const CaseListScreen = ({navigation}) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCases = async (currentPage = 1, isRefreshing = false) => {
    try {
      isRefreshing ? setRefreshing(true) : setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData = [
        {
          key: '1',
          id: 'EAC2101350505',
          status: "Response To USCIS' Request For Evidence Was Received",
          caseDate: 'Apr 27, 2025',
          lastChange: '68 days ago',
          caseFileId: 'I-589',
        },
        {
          key: '2',
          id: 'EAC2101350506',
          status: 'Case Was Approved',
          caseDate: 'Feb 18, 2025',
          lastChange: '45 days ago',
          caseFileId: 'I-467',
        },
        {
          key: '3',
          id: 'EAC2101350507',
          status: 'Interview Was Scheduled',
          caseDate: 'Nov 20, 2024',
          lastChange: '30 days ago',
          caseFileId: 'I-485',
        },
      ];

      if (isRefreshing || currentPage === 1) {
        setCases(mockData);
        if (isRefreshing) setPage(1);
      } else {
        setCases(prev => [...prev, ...mockData]);
      }

      setHasMore(true);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      isRefreshing ? setRefreshing(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const onRefresh = useCallback(() => {
    fetchCases(1, true);
  }, []);

  const loadMoreCases = () => {
    if (!loading && hasMore) {
      fetchCases(page + 1);
      setPage(prev => prev + 1);
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    setCases(prev => prev.filter(item => item.key !== rowKey));
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <View style={styles.underlayContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRow(rowMap, data.item.key)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
    activeOpacity={1}
      onPress={() => navigation.navigate('CaseDetails', {caseId: item.id})}
      style={styles.frontViewContainer}>
      <View style={styles.caseItem}>
        <View style={styles.caseStatusColor} />
        <View style={styles.caseContent}>
          <View style={styles.caseIdContainer}>
            <Text style={styles.caseId}>{item.id}</Text>
            <Text style={styles.caseDate}>{item.caseDate}</Text>
          </View>
          <Text style={styles.caseStatus}>{item.status}</Text>
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
        keyExtractor={item => item.key}
        leftOpenValue={75} // Width of delete button
        rightOpenValue={-75} // Same as left for consistency
        disableRightSwipe={true} // Enable both directions
        stopLeftSwipe={75} // Stop at delete button width
        stopRightSwipe={-75} // Stop at delete button width
        swipeToOpenPercent={30} // Percentage to trigger open
        swipeToClosePercent={30} // Percentage to trigger close
        closeOnRowPress={true} // Close when row is pressed
        closeOnRowBeginSwipe={false} // Don't close when beginning to swipe
        closeOnScroll={true} // Close when scrolling
        useNativeDriver={false}
        previewRowKey={'1'} // Optional: set a key to enable preview
        previewOpenValue={-40} // Optional: preview swipe amount
        previewOpenDelay={3000} // Optional: delay before preview appears
        directionalDistanceChangeThreshold={2} // More sensitive swipe detection
        friction={10} // Higher value makes swipe less sensitive
        tension={100} // Higher value makes swipe more stiff
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
        bounces={false}
        overScrollMode="never"
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
    height: 100,
  },
  caseStatusColor: {
    width: 10,
    backgroundColor: colors.blue,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  caseDate: {
    fontSize: 14,
    color: colors.gray,
  },
  caseStatus: {
    fontSize: 14,
    color: colors.white,
  },
  lastChange: {
    fontSize: 12,
    color: colors.gray,
  },
  caseFileId: {
    fontSize: 12,
    color: colors.gray,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default CaseListScreen;
