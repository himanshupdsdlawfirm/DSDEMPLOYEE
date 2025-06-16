// import React, { useRef, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import RNPickerSelect from 'react-native-picker-select';
// import DatePicker from 'react-native-date-picker';

// const FilterBottomSheet = ({ isVisible, onClose, onApply }) => {
//   const bottomSheetRef = useRef(null);
//   const snapPoints = ['80%']; // 80% dynamic height

//   // Form state
//   const [searchText, setSearchText] = useState('');
//   const [selectedOption1, setSelectedOption1] = useState(null);
//   const [selectedOption2, setSelectedOption2] = useState(null);
//   const [selectedOption3, setSelectedOption3] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [datePickerVisible, setDatePickerVisible] = useState(false);

//   // Dropdown options
//   const options1 = [
//     { label: 'Category', value: null },
//     { label: 'Electronics', value: 'electronics' },
//     { label: 'Clothing', value: 'clothing' },
//     { label: 'Food', value: 'food' },
//   ];

//   const options2 = [
//     { label: 'Status', value: null },
//     { label: 'Active', value: 'active' },
//     { label: 'Inactive', value: 'inactive' },
//     { label: 'Pending', value: 'pending' },
//   ];

//   const options3 = [
//     { label: 'Sort By', value: null },
//     { label: 'Price: Low to High', value: 'price_asc' },
//     { label: 'Price: High to Low', value: 'price_desc' },
//     { label: 'Newest', value: 'newest' },
//   ];

//   const handleApply = () => {
//     const filters = {
//       searchText,
//       category: selectedOption1,
//       status: selectedOption2,
//       sortBy: selectedOption3,
//       date: selectedDate,
//     };
//     onApply(filters);
//     onClose();
//   };

//   const handleReset = () => {
//     setSearchText('');
//     setSelectedOption1(null);
//     setSelectedOption2(null);
//     setSelectedOption3(null);
//     setSelectedDate(new Date());
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={isVisible ? 0 : -1}
//         snapPoints={snapPoints}
//         enablePanDownToClose
//         onClose={onClose}
//       >
//         <View style={styles.container}>
//           <Text style={styles.title}>Filter Options</Text>
          
//           {/* Search Input */}
//           <TextInput
//             style={styles.input}
//             placeholder="Search..."
//             value={searchText}
//             onChangeText={setSearchText}
//           />
          
//           {/* Dropdown 1 */}
//           <View style={styles.dropdownContainer}>
//             <RNPickerSelect
//               placeholder={{}}
//               items={options1}
//               onValueChange={setSelectedOption1}
//               value={selectedOption1}
//               style={pickerSelectStyles}
//             />
//           </View>
          
//           {/* Dropdown 2 */}
//           <View style={styles.dropdownContainer}>
//             <RNPickerSelect
//               placeholder={{}}
//               items={options2}
//               onValueChange={setSelectedOption2}
//               value={selectedOption2}
//               style={pickerSelectStyles}
//             />
//           </View>
          
//           {/* Dropdown 3 */}
//           <View style={styles.dropdownContainer}>
//             <RNPickerSelect
//               placeholder={{}}
//               items={options3}
//               onValueChange={setSelectedOption3}
//               value={selectedOption3}
//               style={pickerSelectStyles}
//             />
//           </View>
          
//           {/* Date Picker */}
//           <TouchableOpacity 
//             style={styles.dateButton} 
//             onPress={() => setDatePickerVisible(true)}
//           >
//             <Text style={styles.dateButtonText}>
//               {selectedDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
          
//           <DatePicker
//             modal
//             open={datePickerVisible}
//             date={selectedDate}
//             mode="date"
//             onConfirm={(date) => {
//               setDatePickerVisible(false);
//               setSelectedDate(date);
//             }}
//             onCancel={() => {
//               setDatePickerVisible(false);
//             }}
//           />
          
//           {/* Action Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity 
//               style={[styles.button, styles.cancelButton]} 
//               onPress={handleReset}
//             >
//               <Text style={styles.buttonText}>Reset</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.button, styles.applyButton]} 
//               onPress={handleApply}
//             >
//               <Text style={styles.buttonText}>Apply Filters</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//   },
//   dropdownContainer: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//     height: 50,
//   },
//   dateButton: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: 'center',
//     paddingHorizontal: 15,
//     marginBottom: 20,
//   },
//   dateButtonText: {
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     flex: 1,
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#f0f0f0',
//   },
//   applyButton: {
//     backgroundColor: '#007AFF',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     color: 'black',
//   },
//   inputAndroid: {
//     fontSize: 16,
//     color: 'black',
//   },
// });

// export default FilterBottomSheet;