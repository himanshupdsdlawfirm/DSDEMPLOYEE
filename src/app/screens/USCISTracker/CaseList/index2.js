import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import {topPadding} from '../../../config/CommonStyle';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';
import { SwipeListView } from 'react-native-swipe-list-view';


// Api's Doc
const USCIS_AUTH_URL = 'https://api.uscis.gov/oauth/v1/token';
const USCIS_API_BASE_URL = 'https://api.uscis.gov/v1/';
const CLIENT_ID = 'bN3at0YDMGRmKhfSq5ZvwLCHIAzFgkvU';
const CLIENT_SECRET = 'GzCUm3jpfd0Z7j3s';

const CaseListScreen = ({navigation}) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock data fetch function - replace with your actual API call
  const fetchCases = async (currentPage = 1, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - replace with your actual data
      const mockData = [
        {
          id: 'EAC2101350505',
          status: "Response To USCIS' Request For Evidence Was Received",
          caseNumber: 'Case 1',
          caseDate: 'Apr 27, 2025',
          lastChange: '68 days ago',
          caseFileId: 'I-589',
        },
        {
          id: 'EAC2101350506',
          status: 'Case Was Approved',
          caseNumber: 'Case 2',
          caseDate: 'Feb 18, 2025',
          lastChange: '45 days ago',
          caseFileId: 'I-467',
        },
        {
          id: 'EAC2101350507',
          status: 'Interview Was Scheduled',
          caseNumber: 'Case 3',
          caseDate: 'Nov 20, 2024',
          lastChange: '30 days ago',
          caseFileId: 'I-485',
        },
        // Add more mock cases as needed
      ];

      if (isRefreshing) {
        setCases(mockData);
        setPage(1);
      } else if (currentPage === 1) {
        setCases(mockData);
      } else {
        console.log('asasasasasaddfddd:::::', currentPage, isRefreshing);

        setCases(prev => [...prev, ...mockData]);
      }

      // For demo purposes, we'll assume there's always more data
      setHasMore(true);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchCases();
  }, []);

  // Handle refresh
  const onRefresh = useCallback(() => {
    fetchCases(1, true);
  }, []);

  // Handle pagination
  const loadMoreCases = () => {
    if (!loading && hasMore) {
      fetchCases(page + 1);
      setPage(prev => prev + 1);
    }
  };

  // Render each case item
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CaseDetails', {caseId: item.id})}
      style={styles.caseItem}>
      <View style={styles.caseStatusColor} />
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <View style={styles.caseIdContainer}>
          <Text style={styles.caseId}>{item.id}</Text>
          <Text style={styles.casedate}>{item.caseDate}</Text>
        </View>
        {/* <Text style={styles.caseStatus}>{item.status}</Text> */}
        <Text style={styles.caseNumber}>{item.caseNumber}</Text>
        <View style={styles.caseIdContainer}>
          <Text style={styles.lastChange}>
            Last Status Change: {item.lastChange}
          </Text>
          <Text style={styles.casedate}>{item.caseFileId}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render footer for loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <ImageBackground source={AppImages.loginTheme} style={styles.container}>
      {/* Header with refresh button */}
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

      {/* Main FlatList */}
      <FlatList
        data={cases}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreCases}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 5,
    paddingBottom: 21,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderColor,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.themeTextColor,
  },
  addRefreshRow: {
    justifyContent: 'flex-end',
    width: 150,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addCaseBtn: {marginRight: 20, width: 50, alignItems: 'center'},
  refreshText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    color: colors.white,
  },
  refrestButton: {
    alignSelf: 'flex-start',
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  refreshButtonText: {
    // color: '#333',
    color: colors.white,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  category: {
    marginRight: 16,
    color: '#666',
  },
  categoryActive: {
    marginRight: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    marginVertical: 15,
  },
  caseStatusColor: {
    width: 10,
    backgroundColor: colors.blue,
  },
  caseItem: {
    marginVertical: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.transparent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.themeLightBg,
  },
  caseIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 5,
  },
  caseId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.white,
  },
  casedate: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
    color: colors.gray,
  },
  caseStatus: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.white,
    paddingRight: 5,
  },
  caseNumber: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.white,
  },
  lastChange: {
    fontSize: 12,
    marginBottom: 8,
    color: colors.gray,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: colors.white,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderColor: colors.white,
  },
});

export default CaseListScreen;
