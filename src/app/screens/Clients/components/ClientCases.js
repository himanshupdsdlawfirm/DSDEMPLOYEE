import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../config/theme';
import {ActivityIndicator} from 'react-native';
import {styles} from '../view/Styles';
import {AppImages} from '../../../config/Images';

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
    <View style={styles.caseCardContainer}>
      <LinearGradient
        colors={[colors.bottomTabLightGray, colors.textGray]}
        locations={[0, 1]}
        start={{x: 0.1, y: 0}}
        end={{x: 1, y: 3}}
        style={styles.caseGradient}>
        <View style={styles.AppointmentNotifitionBox}>
          <View style={styles.caseHeader}>
            <Text style={styles.Appointment}>
              {item?.case_type_name?.length > 30
                ? `${item?.case_type_name.slice(0, 29)}...`
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
          <View style={styles.clientDetailContainer}>
            <View style={styles.clientContactRow}>
              {item?.client_name && (
                <>
                  <Image
                    style={styles.clientUserIcon}
                    source={AppImages.userAnimyPlaceholder}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={1} style={styles.employeeClientName}>
                    {item?.client_name}
                  </Text>
                </>
              )}
              {item?.client_mobile_no && (
                <>
                  <Image style={styles.mobileIcon} source={AppImages.call} />
                  <Text numberOfLines={1} style={styles.mobileNumber}>
                    {item?.client_mobile_no}
                  </Text>
                </>
              )}
              {item?.client_alien_no && (
                <>
                  <Image
                    style={styles.alienNumberIcon}
                    source={AppImages.alienNumber}
                  />
                  <Text numberOfLines={1} style={styles.alienNumber}>
                    {item?.client_alien_no}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.AppointmentTabs}>
            {item?.contract_amount && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Contract \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.contract_amount || 0}`}
                  </Text>
                </Text>
              </View>
            )}
            {item?.total_paid && (
              <View style={styles.paidContainer}>
                <Text style={styles.amountLabel}>
                  {'Paid \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.total_paid || 0}`}
                  </Text>
                </Text>
              </View>
            )}
            {item?.remaining_amount && (
              <View style={styles.Appointmenttype}>
                <Text style={styles.amountLabel}>
                  {'Due \n'}
                  <Text style={styles.amountValue}>
                    {`$${item?.remaining_amount}`}
                  </Text>
                </Text>
              </View>
            )}
            {item?.retention_date && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Retained \n'}
                  <Text style={styles.amountValue}>
                    {formattedDate(item?.retention_date)}
                  </Text>
                </Text>
              </View>
            )}
            {item?.filing_date && (
              <View style={styles.Appointmentwith}>
                <Text style={styles.amountLabel}>
                  {'Filing \n'}
                  <Text style={styles.amountValue}>
                    {formattedDate(item?.filing_date)}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  ));
});

export default ClientCases;
