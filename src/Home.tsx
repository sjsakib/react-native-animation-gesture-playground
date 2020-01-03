import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from 'src/App';

interface Props {
  navigation: StackNavigationProp<StackParamList, 'PlayButton'>;
}

export default ({ navigation }: Props) => {
  return (
    <View style={styles.root}>
      <Button
        title="Animated Play button"
        onPress={() => navigation.navigate('PlayButton')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
