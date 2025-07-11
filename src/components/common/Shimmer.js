// components/common/Shimmer.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../../app/config/theme';

const Shimmer = ({ width, height, style, borderRadius = 0 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <View style={[styles.background, { borderRadius }]} />
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.skeletonBg,
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.skeletonBg,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default Shimmer;