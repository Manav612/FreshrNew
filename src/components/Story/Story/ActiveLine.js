import { Animated, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';

const ActiveLine = ({
  duration,
  isActive,
  onLayout,
  width,
  progressColor,
  bgColor,
}) => {
  const _animation = useRef(new Animated.Value(0)).current;
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  useEffect(() => {
    if (isActive) {
      Animated.timing(_animation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }
  }, [isActive]);

  return (
    <View
      style={[
        {
          backgroundColor: '#ffffff50',
          height: 4,

          flex: 1,
          marginHorizontal: 2,
          borderRadius: 5,
          marginVertical: 5,
        },
        bgColor && { backgroundColor: bgColor },
      ]}
      onLayout={onLayout}>
      <Animated.View
        style={[
          {
            width: _animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: '#fff',
            height: '100%',
            borderRadius: 1,
          },
          progressColor && { backgroundColor: progressColor },
        ]}
      />
    </View>
  );
};

export default ActiveLine;

const styles = StyleSheet.create({});
