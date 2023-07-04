// ...import文とSignInScreenコンポーネントの定義...

import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";

import { styles } from "./styles";

import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react-native";
/**

/**
 * AWSライブラリ
 */
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../src/aws-exports";
import { useState } from "react";
import { ConfirmSignUp } from "../../reactNative";

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

/**
 LOG  {"label": "Username", "name": "username", "placeholder": "Enter your Username", "required": true, "testID": "authenticator__text-field__input-username", "type": "default"}
 LOG  {"label": "Password", "name": "password", "placeholder": "Enter your Password", "required": true, "testID": "authenticator__text-field__input-password", "type": "password"}
 LOG  {"label": "Email", "name": "email", "placeholder": "Enter your Email", "required": true, "testID": "authenticator__text-field__input-email", "type": "default"}
 LOG  {"label": "Nickname", "name": "nickname", "placeholder": "Enter your Nickname", "required": true, "testID": "authenticator__text-field__input-nickname", "type": "default"}
 */

// サインアップフィールドのカスタマイズ
const SignUp = (props: any): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAlphaNumeric, setIsAlphaNumeric] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const { route } = useAuthenticator((context) => [context.user]);
  const handleSignUp = async () => {
    try {
      // AWS AmplifyのAuth.signUpメソッドを使用してユーザーの登録処理を行う
      await Auth.ConfirmSignUp({
        username, // signUp時に入力したuserId
        verificationCode, // 認証コード
      });

      // 登録成功時の処理
      console.log("ユーザーの登録が成功しました");
    } catch (error) {
      // 登録失敗時の処理
      console.error("ユーザーの登録中にエラーが発生しました:", error);
    }
  };
  const isPasswordValid = (password: string) => {
    // パスワードの条件をチェック
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsAlphaNumeric(/[a-zA-Z]/.test(value) && /[0-9]/.test(value));
    setIsMinLength(value.length >= 8);
  };
  console.log();

  // ...入力フィールドのJSXを記述...
  return (
    <View style={styles.authContainer}>
      <View>
        <Text>ユーザーネーム</Text>
        <TextInput
          style={styles.input}
          placeholder={"ユーザー名を入力"}
          onChangeText={(value) => {
            console.log(username);
            setUsername(value);
          }}
        />
        <Text>ニックネーム</Text>
        <TextInput
          style={styles.input}
          placeholder={"アプリで使用する名前を入力"}
          onChangeText={(value) => {
            console.log(<Authenticator />);

            setNickname(value);
          }}
        />
        <Text>パスワード</Text>
        <TextInput
          style={styles.input}
          placeholder={"パスワードを入力"}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        {
          <View>
            <Text>英数字を使用: {isAlphaNumeric ? "OK" : "NG"}</Text>
            <Text>８文字以上: {isMinLength ? "OK" : "NG"}</Text>
          </View>
        }
        {passwordError !== "" && <Text>{passwordError}</Text>}
        <Text></Text>
        <Text>メールアドレス</Text>
        <TextInput
          style={styles.input}
          placeholder={"メールアドレスを入力"}
          onChangeText={(value) => {
            console.log(email);
            setEmail(value);
          }}
        />
      </View>
      <Button title="認証" onPress={CofirmSignUp} />
    </View>
  );
};

export default SignUp;
