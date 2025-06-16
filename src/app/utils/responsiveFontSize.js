import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 13 in portrait)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scale factors
const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

// Main scaling function
export function responsiveSize(size, type = 'width') {
  let scaledSize;
  
  switch (type) {
    case 'height':
      scaledSize = size * heightRatio;
      break;
    case 'font':
      // Fonts scale with width but less aggressively (70%)
      scaledSize = size * widthRatio * 0.7;
      break;
    case 'width':
    default:
      scaledSize = size * widthRatio;
  }

  // Round to nearest pixel and ensure minimum size
  const pixelDensity = PixelRatio.get();
  const roundedSize = Math.round(PixelRatio.roundToNearestPixel(scaledSize));

  // Minimum sizes
  const MIN_SIZE = 1;
  const MIN_FONT_SIZE = 10;
  
  if (type === 'font') {
    return Math.max(MIN_FONT_SIZE, roundedSize);
  }
  return Math.max(MIN_SIZE, roundedSize);
}

// Predefined sizes for convenience
export const Sizes = {
  // Fonts
  fontSmall: responsiveSize(12, 'font'),
  fontMedium: responsiveSize(14, 'font'),
  fontLarge: responsiveSize(16, 'font'),

  // Spacing
  small: responsiveSize(8),
  medium: responsiveSize(16),
  large: responsiveSize(24),

  // Components
  buttonHeight: responsiveSize(48, 'height'),
  cardWidth: responsiveSize(320),
};