// utils/responsiveFontSize.js
import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Based on iPhone 11 scale (most common mid-range device)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Screen size classification
const isSmallScreen = width < 375;
const isLargeScreen = width > 500;
const isTablet = width > 600;

/**
 * Scale horizontal sizes (width, fonts, etc.)
 * @param {number} size - The size to scale
 * @returns {number} The scaled size
 */
const scale = size => {
  const scaledSize = (width / guidelineBaseWidth) * size;
  
  // Adjust scaling curve for different screen sizes
  if (isSmallScreen) {
    return scaledSize * 0.97;
  } else if (isLargeScreen) {
    return scaledSize * 1.05;
  } else if (isTablet) {
    return size + (scaledSize - size) * 0.7; // Less aggressive scaling for tablets
  }
  
  return scaledSize;
};

/**
 * Scale vertical sizes (height)
 * @param {number} size - The size to scale
 * @returns {number} The scaled size
 */
const verticalScale = size => {
  const scaledSize = (height / guidelineBaseHeight) * size;
  
  // Adjust for different aspect ratios
  if (isSmallScreen) {
    return scaledSize * 0.97;
  } else if (isLargeScreen) {
    return scaledSize * 1.05;
  } else if (isTablet) {
    return size + (scaledSize - size) * 0.6;
  }
  
  return scaledSize;
};

/**
 * Moderate scale - a middle ground between scaling and not scaling
 * @param {number} size - The size to scale
 * @param {number} [factor=0.5] - The scaling factor (0 = no scale, 1 = full scale)
 * @returns {number} The scaled size
 */
const moderateScale = (size, factor = 0.5) => {
  const scaledSize = (width / guidelineBaseWidth) * size;
  
  // Special handling for different device types
  if (isTablet) {
    return size + (scaledSize - size) * (factor * 0.7); // Less scaling for tablets
  }
  
  return size + (scaledSize - size) * factor;
};

/**
 * Scale font sizes with pixel rounding for better rendering
 * @param {number} size - The font size to scale
 * @param {number} [factor=0.5] - The scaling factor for moderateScale
 * @returns {number} The scaled and rounded font size
 */
const scaleFont = (size, factor = 0.5) => {
  const scaledSize = moderateScale(size, factor);
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

export { scale, verticalScale, moderateScale, scaleFont };