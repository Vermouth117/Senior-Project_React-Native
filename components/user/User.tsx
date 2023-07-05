import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Font from "expo-font";
/**
 *  description UI reactNativeコンポーネント
 */
import { useAuthenticator } from "@aws-amplify/ui-react-native";

/**
 * サインアウトボタンコンポーネント
 * @returns {JSX}
 */
function SignOutButton() {
  const { signOut } = useAuthenticator();
  return (
    <TouchableOpacity style={styles.signOut} onPress={signOut}>
      <Text style={styles.font}>サイン{"\n"}アウト</Text>
    </TouchableOpacity>
  );
}

type Props = {
  userName: string;
  noticeSet: number;
  appToUser: Function;
};
const User: React.FC<Props> = ({ userName, noticeSet, appToUser }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [inputvalue, setInputValue] = useState("");
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "KiwiMaru-Regular": require("../../assets/fonts/KiwiMaru-Regular.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);
  if (!fontLoaded) {
    return null; // フォントが読み込まれるまで何も表示しない
  }

  return (
    <View style={styles.userContainer}>
      <View style={styles.main}>
        <View style={styles.notify}>
          <TextInput
            onChangeText={(e: any) => {
              if (!Number.isNaN(Number(e))) {
                setInputValue(e);
              }
            }}
            style={styles.input}
            value={String(inputvalue)}
            maxLength={2}
          />
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => appToUser(Number(inputvalue))}
            >
              <Text style={styles.font}>変更</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <View style={styles.face}></View>
        <Text style={styles.username}>{userName}</Text>
        <Text style={styles.username}>{noticeSet}</Text>
      </View>
      <View style={styles.list}>
        <SignOutButton />

        <View style={styles.listNotify}></View>
      </View>
    </View>
  );
};

export default User;
