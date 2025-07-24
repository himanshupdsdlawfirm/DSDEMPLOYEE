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
import {AppImages} from '../../../config/Images';
import {colors} from '../../../config/theme';
import {moderateScale} from '../../../utils/fontsize';
import {LinearGradientHeader} from '../../../../components/common/LinerGradientHeader';

const CaseDetailsScreen = ({navigation, route}) => {

  const {data} = route.params;

  console.log('previous ss data::', data);
  
  // Mock data - replace with your actual data fetching
  const caseDetails = {
    id: 'EAC2101350505',
    title: 'Application to Register Permanent Residence or Adjust Status',
    currentStatus: "Response To USCIS' Request For Evidence Was Received",
    formType: 'I-485',
    lastUpdated: 'Mar 27, 2025',
    daysSinceUpdate: 69,
    description:
      'On March 27, 2025, we received your response to our Request for Evidence for your Form I-485, Application to Register Permanent Residence or Adjust Status, Receipt Number EAC2101350505. USCIS has begun working on your case again. We will send you a decision or notify you if we need something from you.',
    history: [
      {
        date: 'Mar 27, 2025',
        event: "Response To USCIS' Request For Evidence Was Received",
      },
      {
        date: 'Mar 7, 2025',
        event:
          'We sent a request for initial evidence for your Form I-485, Application to Register Permanent Residence or Adjust Status.',
      },
      {
        date: 'Dec 12, 2024',
        event:
          'We transferred your Form I-485, Application to Register Permanent Residence or Adjust Status, to another USCIS office that now has jurisdiction over your case.',
      },
      {
        date: 'Dec 11, 2024',
        event:
          'Your Form I-485, Application to Register Permanent Residence or Adjust Status, was transferred to another office for processing.',
      },
      {
        date: 'Nov 16, 2024',
        event:
          'We reopened your Form I-485, Application to Register Permanent Residence or Adjust Status.',
      },
      {
        date: 'Nov 14, 2024',
        event: 'We reviewed your appeal for Form I-485, Application',
      },
    ],
  };

  const handleViewOnline = () => {
    // Replace with your actual URL or navigation
    Linking.openURL('https://www.uscis.gov/');
  };

  const handleShareTimeline = () => {
    // Implement share functionality
    console.log('Sharing timeline');
  };

  return (
    <>
      <ImageBackground source={AppImages.loginTheme} style={styles.BIContainer}>
        {/* Screen Header */}
        <View
          style={{
            width: '100%',
          }}>
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
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              paddingBottom: 70,
            }}>
            {/* Case Header */}
            <View style={styles.header}>
              <Text style={styles.caseId}>{caseDetails.id}</Text>
              <View style={styles.divider} />
            </View>

            {/* Current Status */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {caseDetails.currentStatus}
              </Text>
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
              <Text style={styles.descriptionText}>
                {caseDetails.description}
              </Text>
              <Text style={styles.addressChangeText}>
                If you move, go to www.uscis.gov/addresschange to give us your
                new mailing address.
              </Text>
            </View>

            {/* History Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>History</Text>
              <View style={styles.historyContainer}>
                {caseDetails.history.map((item, index) => {
                  // Determine status color based on event type
                  let statusColor = '#1a73e8'; // Default blue
                  if (item.event.includes('Request For Evidence'))
                    statusColor = '#fbbc04'; // Yellow
                  if (item.event.includes('transferred'))
                    statusColor = '#34a853'; // Green
                  if (
                    item.event.includes('reopened') ||
                    item.event.includes('appeal')
                  )
                    statusColor = '#ea4335'; // Red

                  return (
                    <View key={index} style={styles.historyItem}>
                      <View style={styles.historyTimeline}>
                        <View
                          style={[
                            styles.timelineDot,
                            {backgroundColor: statusColor},
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
                              {backgroundColor: statusColor},
                            ]}
                          />
                        </View>
                        <Text style={styles.historyEvent}>{item.event}</Text>
                      </View>
                    </View>
                  );
                })}
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
  title: {
    justifyContent: 'center',
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.themeTextColor,
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
    // color: '#666',
    color: colors.white,
  },
  daysSinceUpdate: {
    fontSize: 14,
    // color: '#666',
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
    // color: '#666',
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
    paddingTop: 0, // Aligns text with dot
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
    // color: '#555',
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
