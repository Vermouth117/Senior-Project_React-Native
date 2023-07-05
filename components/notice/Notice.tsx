
import React, { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function Notice() {

  useEffect(() => {
    requestPermissionsAsync();
    Notifications.setBadgeCountAsync(0);
  });

  return (
    <View style={styles.container}>
      <Button
        title='3秒後にプッシュ通知する'
        onPress={scheduleNotificationAsync}
      />
    </View>
  );
}

const scheduleNotificationAsync = async () => {
  // プッシュ通知を実際に送信する
  await Notifications.scheduleNotificationAsync({
    content: {
      body: '🧳旅行先が3つ溜まっています!!',
      title: '愛知県に行ってみませんか？',
      sound: 'default',
      // subtitle: 'subtitle',
      // badge: 1,
    },
    trigger: {
      seconds: 3,
    }
  });
  Notifications.setBadgeCountAsync(1);
};

const requestPermissionsAsync = async () => {
  // 現時点の通知権限の情報を取得する
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) return

  // ユーザーに通知権限を要求するポップアップを出す
  await Notifications.requestPermissionsAsync();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
