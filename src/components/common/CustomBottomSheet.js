import React, {forwardRef, useMemo} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { colors } from '../../app/config/theme';
import LinearGradient from 'react-native-linear-gradient';

const CustomBottomSheet = forwardRef(
  (
    {
      children,
      snapPoints = ['50%', '80%'],
      backgroundStyle,
      handleIndicatorStyle,
      mainContainerStyle,
      keyboardBehavior = 'extend',
      keyboardBlurBehavior = 'none',
      ...props
    },
    ref,
  ) => {
    // Memoize snap points for performance
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      
      <BottomSheetModal
        ref={ref}
        index={0}
        // snapPoints={memoizedSnapPoints}

        backgroundStyle={[styles.background, backgroundStyle]}
        handleIndicatorStyle={[styles.handle, handleIndicatorStyle]}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        {...props}>
           <LinearGradient
            colors={[ colors.bottomTabSignOut,colors.themeBgColor]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <BottomSheetScrollView
            contentContainerStyle={[styles.contentContainer, mainContainerStyle]}>
            {children}
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
        </LinearGradient>
      </BottomSheetModal>
    );
  },
);

// Default styles
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.bottomTabSignOut,
    // backgroundColor:colors.themeBgColor,
    borderRadius: 20,
  },
  handle: {
    backgroundColor: '#ccc',
    width: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
});

export default CustomBottomSheet;
