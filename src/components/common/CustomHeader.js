import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomHeader = ({
  leftImageSource,
  centerImageSource,
  rightImageSource,
  onLeftPress,
  onCenterPress,
  onRightPress,
  headerStyle = {},
  leftImageStyle = {},
  centerImageStyle = {},
  rightImageStyle = {},
  leftImageContainerStyle = {},
  centerImageContainerStyle = {},
  rightImageContainerStyle = {},
}) => {
  return (
    <View style={[styles.headerContainer, headerStyle]}>
      {/* Left Image */}
      {/* <TouchableOpacity 
        onPress={onLeftPress} 
        style={[styles.imageContainer, leftImageContainerStyle]}
        disabled={!onLeftPress}
      >
        {leftImageSource && (
          <Image 
            source={leftImageSource} 
            style={[styles.image, leftImageStyle]} 
            resizeMode="contain"
          />
        )}
      </TouchableOpacity> */}

      {/* Center Image */}
      <TouchableOpacity 
        onPress={onCenterPress} 
        style={[styles.imageContainer, centerImageContainerStyle]}
        disabled={!onCenterPress}
      >
        {centerImageSource && (
          <Image 
            source={centerImageSource} 
            style={[styles.image, centerImageStyle]} 
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      {/* Right Image */}
      <TouchableOpacity 
        onPress={onRightPress} 
        style={[styles.imageContainer, rightImageContainerStyle]}
        disabled={!onRightPress}
      >
        {rightImageSource && (
          <Image 
            source={rightImageSource} 
            style={[styles.image, rightImageStyle]} 
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent', // default background
    height: 60, // default height
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 24, // default width
    height: 24, // default height
  },
});

export default CustomHeader;