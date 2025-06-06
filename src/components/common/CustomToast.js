import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

function ToastNotification({
  visible,
  colorDark,
  colorLight,
  title,
  message,
  icon,
}) {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      exiting={FadeOutUp.duration(300)}
      style={{
        top: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        zIndex: 1,
      }}>
      <LinearGradient
        colors={[colorLight, colorDark]}
        style={{
          width: '90%',
          borderRadius: 18,
          padding: 14,
          flexDirection: 'row',
        }}>
        {icon}
        <View>
          <Text style={{color: '#F6F4F4', fontWeight: 'bold', marginLeft: 10}}>
            {title}
          </Text>
          <Text style={{color: '#F6F4F4', marginLeft: 10}}>{message}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
export default ToastNotification;
