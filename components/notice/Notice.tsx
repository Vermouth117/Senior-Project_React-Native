
// import { useState } from 'react';
// import { Button, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// interface NumberButtonProps {
//   text: string;
//   onPress?: (event: GestureResponderEvent) => void;
// }
// const NumberButton = (props: NumberButtonProps) => {
//   return (
//     <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
//       <Text style={styles.buttonFont}>{props.text}</Text>
//     </TouchableOpacity>
//   );
// }

// export default function App() {
//   const [isVisibleDialButtons, setIsVisibleDialButtons] = useState<boolean>(false);

//   return (
//     <View style={styles.container}>
//       {/* ダイヤルボタン */}
//       <View style={styles.dialButtonsContainer}>
//         {isVisibleDialButtons ? <>
//           <Animated.View style={styles.line} entering={FadeInDown.springify().duration(200).delay(0)}>
//             <NumberButton text="1" />
//             <NumberButton text="2" />
//             <NumberButton text="3" />
//           </Animated.View>
//           <Animated.View style={styles.line} entering={FadeInDown.springify().duration(200).delay(0)}>
//             <NumberButton text="4" />
//             <NumberButton text="5" />
//             <NumberButton text="6" />
//           </Animated.View>
//           <Animated.View style={styles.line} entering={FadeInDown.springify().duration(200).delay(0)}>
//             <NumberButton text="7" />
//             <NumberButton text="8" />
//             <NumberButton text="9" />
//           </Animated.View>
//         </> : undefined}
//       </View>
//       {/* ダイヤルボタンの表示を切り替えるボタン */}
//       <View style={styles.showDialButtonsContainer}>
//         <Button title='Show Dial' onPress={() => setIsVisibleDialButtons(!isVisibleDialButtons)} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dialButtonsContainer: {
//     flex: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 32,
//   },
//   showDialButtonsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   line: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
//   buttonContainer: {
//     width: 72,
//     height: 72,
//     borderRadius: 72,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 16,
//     marginVertical: 24,
//   },
//   buttonFont: {
//     color: '#ffffff',
//     fontSize: 20,
//   }
// });


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
