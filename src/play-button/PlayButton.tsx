import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

export default ({
  playing,
  onPress,
  color = 'black',
  size = 40,
  duration = 200,
}: {
  playing: boolean;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
  size?: number;
  duration?: number;
}) => {
  const barHeight = size;
  const barWidth = (size * 0.85) / 3;

  const [anim] = useState(new Animated.Value(0));
  const [rotation] = useState(new Animated.Value(0));

  const [toggleCount, setToggleCount] = useState(playing ? 1 : 0);

  useEffect(() => {
    const newToggleCount = toggleCount + 1;
    setToggleCount(newToggleCount);

    Animated.parallel(
      [
        Animated.timing(anim, {
          toValue: newToggleCount & 1, // 1 if odd, 0 otherwise
          duration,
        }),
        Animated.timing(rotation, {
          toValue: newToggleCount % 2,
          duration,
          // useNativeDriver: true,
        }),
      ],
      {},
    ).start();
  }, [playing]);

  const barStyle = {
    width: barWidth,
    borderBottomWidth: barHeight,
    borderBottomColor: color,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.root,
          { width: size, height: size },
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '90deg'],
                }),
              },
            ],
          },
        ]}>
        <Animated.View
          style={[
            barStyle,
            {
              borderLeftWidth: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, barWidth * 2],
              }),
              // width: anim.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [barWidth, barWidth + barWidth / 2],
              // }),
              marginRight: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [barWidth, 0],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            barStyle,
            {
              borderRightWidth: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, barWidth * 2],
              }),
              // width: anim.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [barWidth, barWidth + barWidth / 2],
              // }),
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
