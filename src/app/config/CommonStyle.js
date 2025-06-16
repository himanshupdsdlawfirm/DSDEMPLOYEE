import {Platform} from 'react-native';

export const topPadding = () => {
  return Platform.OS === 'ios' ? 60 : 10;
};
export const topMargin = () => {
  return Platform.OS === 'ios' ? 60 : 10;
};
export const topMarginText = () => {
  return Platform.OS === 'ios' ? 70 : 20;
};
export const paddingVertical = () => {
  return Platform.OS === 'ios' ? 10 : 10;
};
