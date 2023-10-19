import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ThirdScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Third Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default ThirdScreen;
