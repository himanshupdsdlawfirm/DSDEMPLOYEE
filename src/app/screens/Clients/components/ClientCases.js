import React, {memo} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../config/theme';
import {ActivityIndicator} from 'react-native';
import { styles } from '../view/Styles';

const ClientCases = memo(({casesData, loading, formattedDate}) => {

  console.log('casesData::', casesData);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!casesData?.length) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No cases found</Text>
      </View>
    );
  }

  return casesData.map(item => (
    <View key={item?.id} style={styles.caseCardContainer}>
      <LinearGradient
        colors={[colors.bottomTabLightGray, colors.textGray]}
        locations={[0, 1]}
        start={{x: 0.1, y: 0}}
        end={{x: 1, y: 3}}
        style={styles.caseGradient}>
        <View style={styles.AppointmentNotifitionBox}>
          <View style={styles.caseHeader}>
            <Text style={styles.Appointment}>
              {item?.case_type_name?.length > 25
                ? `${item?.case_type_name.slice(0, 24)}...`
                : item?.case_type_name}
            </Text>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    item?.status?.trim() === 'Open'
                      ? '#50ad6d'
                      : item?.status?.trim() === 'Closed'
                      ? '#EB5757'
                      : colors.gray,
                },
              ]}>
              <Text style={styles.AppointmentTime}>{item?.status}</Text>
            </View>
          </View>
          <View style={styles.AppointmentTabs}>
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Contract \n'}
                <Text style={styles.amountValue}>
                  {`$${item?.contract_amount || 0}`}
                </Text>
              </Text>
            </View>
            <View style={styles.paidContainer}>
              <Text style={styles.amountLabel}>
                {'Paid \n'}
                <Text style={styles.amountValue}>
                  {`$${item?.total_paid || 0}`}
                </Text>
              </Text>
            </View>
            {item?.remaining_amount ? (
              <View style={styles.Appointmenttype}>
                <Text style={styles.amountLabel}>
                  {'Due \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.remaining_amount}`}
                  </Text>
                </Text>
              </View>
            ) : null}
            <View style={styles.Appointmentwith}>
              <Text style={styles.amountLabel}>
                {'Filing Date \n'}
                <Text style={styles.amountValue}>
                  {item?.filing_date
                    ? formattedDate(item.filing_date)
                    : '--/--/--'}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  ));
});

export default ClientCases;