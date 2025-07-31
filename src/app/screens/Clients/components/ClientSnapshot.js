import React, {memo, useCallback} from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../../config/theme';
import {styles} from '../view/Styles';

const ClientSnapshot = memo(({snapshotData, loading}) => {
  console.log('snapshotDatasnapshotData:::', snapshotData);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  // Define all possible fields with their labels and data keys
  const fields = [
    {label: 'Phone', key: 'mobile'},
    {label: 'Email', key: 'email'},
    {label: 'Gender', key: 'gender'},
    {label: 'DOB', key: 'dob'},
    {label: 'Address', key: 'address'},
    {label: 'State', key: 'state'},
    {label: 'Zip Code', key: 'zip_code'},
  ];

  // Filter out fields that don't have data
  const validFields = fields.filter(
    field =>
      snapshotData?.[field.key] &&
      String(snapshotData[field.key]).trim() !== '',
  );

  if (validFields.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No snapshot data available</Text>
      </View>
    );
  }

  // Format date helper
  const formattedDate = useCallback(dateString => {
    if (!dateString) return '--/--/--';
    try {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${month}/${day}/${year}`;
    } catch {
      return '--/--/--';
    }
  }, []);

  return (
    <View style={styles.snapshotsContainer}>
      <View style={styles.detailsColumn}>
        {validFields.map(field => (
          <View key={field.label} style={styles.detailItem}>
            <Text style={styles.detailLabel}>{field.label}</Text>
            <View style={styles.underline} />
          </View>
        ))}
      </View>
      <View style={styles.valuesColumn}>
        {validFields.map(field => {
          let value = '';
          
          if (field.key === 'gender') {
            // Handle gender display
            value = 
              snapshotData[field.key] === 'm' ? 'Male' :
              snapshotData[field.key] === 'f' ? 'Female' :
              snapshotData[field.key] === 'o' ? 'Other' : 
              snapshotData[field.key];
          } else if (field.key === 'dob') {
            // Handle date display
            value = formattedDate(snapshotData[field.key]);
          } else {
            // Default case
            value = snapshotData[field.key];
          }

          return ( 
            <View key={`value-${field.label}`} style={styles.detailItem}>
              <Text style={styles.detailValue}>{value}</Text>
              <View style={styles.underline} />
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default ClientSnapshot;