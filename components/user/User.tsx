
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const User = () => {
  return (
    <View style={styles.userContainer}>
      <Text>User</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default User;
