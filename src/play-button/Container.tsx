import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PlayButton from './PlayButton';

export default () => {
  const [playing, setPlaying] = useState(false);
  return (
    <View style={styles.root}>
      <PlayButton playing={playing} onPress={() => setPlaying(!playing)} />
      <Text style={styles.status}>{playing ? 'Playing' : 'Paused'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginTop: 20,
  },
});
