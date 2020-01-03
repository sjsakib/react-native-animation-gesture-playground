import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

const BAR_WIDTH = 15;
const BAR_HEIGHT = 40;
const BAR_SPACE = 10;
const DURATION = 200;

const DIMENSION = Math.max(BAR_HEIGHT, BAR_WIDTH * 2 + BAR_SPACE);

export default ({
  playing,
  onPress,
}: {
  playing: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) => {
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
          duration: DURATION,
        }),
        Animated.timing(rotation, {
          toValue: newToggleCount % 2,
          duration: DURATION,
          // useNativeDriver: true,
        }),
      ],
      {},
    ).start();
  }, [playing]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.root,
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
            styles.left,
            {
              borderLeftWidth: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, BAR_WIDTH + BAR_SPACE / 2],
              }),
              // width: anim.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [BAR_WIDTH, BAR_WIDTH + BAR_SPACE / 2],
              // }),
              marginRight: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [BAR_SPACE, 0],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.right,
            {
              borderRightWidth: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, BAR_WIDTH + BAR_SPACE / 2],
              }),
              // width: anim.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [BAR_WIDTH, BAR_WIDTH + BAR_SPACE / 2],
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
    width: DIMENSION,
    height: DIMENSION,
    // backgroundColor: 'green',
  },
  left: {
    width: BAR_WIDTH,
    borderBottomWidth: BAR_HEIGHT,
    borderBottomColor: 'black',
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',

    marginRight: 10,
  },
  right: {
    width: BAR_WIDTH,
    borderBottomWidth: BAR_HEIGHT,
    borderBottomColor: 'black',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
  },
});
