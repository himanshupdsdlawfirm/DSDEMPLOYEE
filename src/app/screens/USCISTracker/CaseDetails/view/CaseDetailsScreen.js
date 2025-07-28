// CaseDetailsScreen.js
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import {AppImages} from '../../../../config/Images';
import {colors} from '../../../../config/theme';
import {moderateScale} from '../../../../utils/fontsize';
import {LinearGradientHeader} from '../../../../../components/common/LinerGradientHeader';
import CaseDetailsViewModel from '../viewModel/useCaseDetailViewModel';

const CaseDetailsScreen = ({navigation, route}) => {
  const {data} = route.params;
  const viewModel = new CaseDetailsViewModel(data);
  const caseDetails = viewModel.getFormattedCaseDetails();

  if (!caseDetails) {
    return (
      <ImageBackground source={AppImages.loginTheme} style={styles.BIContainer}>
        <Text style={styles.errorText}>No case data available</Text>
      </ImageBackground>
    );
  }

  const handleViewOnline = () => {
    Linking.openURL('https://www.uscis.gov/');
  };

  const handleShareTimeline = () => {
    // Implement share functionality
    console.log('Sharing timeline');
  };

  return (
    <>
      <ImageBackground source={AppImages.loginTheme} style={styles.BIContainer}>
        <View style={{width: '100%'}}>
          <LinearGradientHeader
            goBack={() => navigation.goBack()}
            showBackBtnContainer={true}
            showBackBtn={true}
            leftImg={AppImages.backArrow}
            leftImgTint={colors.white}
            headerText="Case Detail"
            isSecondEndImg={false}
            isEndRightImg={false}
            isHeaderBottomText={true}
            headerBottomTitle={caseDetails.title}
          />
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Case Header */}
            <View style={styles.header}>
              <Text style={styles.caseId}>{caseDetails.id}</Text>
              <View style={styles.divider} />
            </View>

            {/* Current Status */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{caseDetails.currentStatus}</Text>
            </View>

            {/* Form Details */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{caseDetails.formType}</Text>
              <Text style={styles.detailValue}>{caseDetails.lastUpdated}</Text>
              <Text style={styles.detailNote}>Form Last Updated</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.daysSinceUpdate}>
                {caseDetails.daysSinceUpdate} Days Since Last Update
              </Text>
            </View>

            {/* Description */}
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{caseDetails.description}</Text>
              <Text style={styles.addressChangeText}>
                If you move, go to www.uscis.gov/addresschange to give us your
                new mailing address.
              </Text>
            </View>

            {/* History Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>History</Text>
              <View style={styles.historyContainer}>
                {caseDetails.history.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <View style={styles.historyTimeline}>
                      <View
                        style={[
                          styles.timelineDot,
                          {backgroundColor: item.statusColor},
                        ]}
                      />
                      {index !== caseDetails.history.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.historyContent}>
                      <View style={styles.historyHeader}>
                        <Text style={styles.historyDate}>{item.date}</Text>
                        <View
                          style={[
                            styles.statusIndicator,
                            {backgroundColor: item.statusColor},
                          ]}
                        />
                      </View>
                      <Text style={styles.historyEvent}>{item.event}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShareTimeline}>
                <Text style={styles.actionButtonText}>SHARE MY TIMELINE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewOnline}>
                <Text style={styles.actionButtonText}>VIEW ONLINE</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  BIContainer: {flex: 1},
  errorText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderColor,
  },
  caseId: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.white,
  },
  divider: {
    height: 2,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.themeTextColor,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: colors.white,
  },
  detailValue: {
    fontSize: 16,
    marginRight: 8,
    color: colors.white,
  },
  detailNote: {
    fontSize: 14,
    color: colors.white,
  },
  daysSinceUpdate: {
    fontSize: 14,
    color: colors.white,
  },
  description: {
    marginVertical: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: colors.white,
  },
  addressChangeText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.white,
  },
  historyContainer: {
    marginTop: 8,
    marginLeft: 8,
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  historyTimeline: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 16,
    marginTop: 2,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    top: 20,
    left: 11,
  },
  historyContent: {
    flex: 1,
    paddingTop: 0,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    color: colors.white,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  historyEvent: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  actionButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CaseDetailsScreen;