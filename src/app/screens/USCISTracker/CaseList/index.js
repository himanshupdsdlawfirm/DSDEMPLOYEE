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
          lastChange: '68 days ago',
        },
        {
          id: 'EAC2101350506',
          status: 'Case Was Approved',
          caseNumber: 'Case 2',
          lastChange: '45 days ago',
        },
        {
          id: 'EAC2101350507',
          status: 'Interview Was Scheduled',
          caseNumber: 'Case 3',
          lastChange: '30 days ago',
        },
        // Add more mock cases as needed
      ];

      if (isRefreshing) {
        setCases(mockData);
        setPage(1);
      } else if (currentPage === 1) {
        setCases(mockData);
      } else {
        console.log('asasasasasaddfddd:::::',currentPage, isRefreshing);
        
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
      <View
        style={{
          width: 10,
          backgroundColor: 'blue',
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <Text style={styles.caseId}>{item.id}</Text>
        <Text style={styles.caseStatus}>{item.status}</Text>
        <Text style={styles.caseNumber}>{item.caseNumber}</Text>
        <Text style={styles.lastChange}>
          Last Status Change: {item.lastChange}
        </Text>
      </View>

      {/* <View style={styles.divider} /> */}
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
    <ImageBackground source={AppImages.themeFive} style={styles.container}>
      {/* Header with refresh button */}
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <Text style={styles.title}>Cases</Text>
          <View style={styles.addRefreshRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCase')}
              style={styles.addCaseBtn}>
              <Image
                style={{
                  height: 16,
                  width: 16,
                }}
                source={AppImages.addIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onRefresh}>
              {/* <Text style={styles.refreshButtonText}>Refresh</Text> */}
               <Image
                style={{
                  height: 16,
                  width: 16,
                  tintColor: colors.themeColor
                }}
                source={AppImages.refreshIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.refreshText}>
          Refreshed: {new Date().toLocaleString()}
        </Text>
      </View>

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
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.themeColor,
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
  caseItem: {
    // height:120,
    marginVertical: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#333333',
    // paddingVertical: 16,
    // paddingHorizontal:10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
  },
  caseId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.white,
  },
  caseStatus: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.white,
  },
  caseNumber: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.white,
  },
  lastChange: {
    fontSize: 12,
    // color: '#666',
    marginBottom: 8,
    color: colors.gray,
  },
  divider: {
    height: 1,
    // backgroundColor: '#e0e0e0',
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
