import { StatusBar } from "expo-status-bar";

/**
 * リアクトネイティブで使うタグ
 */
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
/**
 * ベクターアイコンライブラリ
 */
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from "@aws-amplify/ui-react-native";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

import Footer from "./components/Footer";
import TinderSwipe from "./components/TinderSwipe";

import Appp from "./components/favorite/App";
import Apppp from "./components/favorite/spots/App";

import { cards } from "./data/cards";

const App1 = () => {
  const [page, setPage] = useState("home");

  return (
    <View style={styles.container}>
      {page === "home" && (
        <View>
          <View style={styles.header}>
            <Icon name="search-outline" style={styles.headerIcon} />
            <TextInput
              placeholder="キーワード検索"
              style={styles.headerTextInput}
            />
            <Icon name="menu-outline" style={styles.headerIcon} />
          </View>
          <View style={styles.main}>
            <Text style={styles.mainText}>おすすめ終了！</Text>
            {cards.map((card, index) => (
              <TinderSwipe key={index} index={index} card={card} />
            ))}
          </View>
        </View>
      )}

      {page === "favorite" && <Appp />}

      <Footer setPage={setPage} />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    top: 50,
    // zIndex: 2,
    borderRadius: 30,
    shadowColor: "rgb(200, 200, 200)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  headerIcon: {
    fontSize: 30,
    color: "rgb(130, 130, 130)",
  },
  headerTextInput: {
    width: "70%",
  },
  main: {
    position: "absolute",
  },
  mainText: {
    position: "absolute",
    marginTop: Dimensions.get("window").height / 2,
    marginHorizontal: 150,
  },
});

// export default withAuthenticator(App);

//FIXME cognitoゾーン

const MyAppHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View>
      <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
        とき旅
      </Text>
    </View>
  );
};

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App(user: any) {
  const MyAppHeader = () => {
    const {
      tokens: { space, fontSizes },
    } = useTheme();
    return (
      <View>
        <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
          My Header
        </Text>
      </View>
    );
  };
  return (
    <Authenticator.Provider>
      <Authenticator
        components={{
          //NOTEサインアップフィールド
          SignUp: ({ fields, ...props }) => (
            <Authenticator.SignUp
              {...props}
              fields={[
                {
                  name: "username",
                  label: "ユーザーネーム",
                  type: "default",
                  placeholder: "ユーザーネームを入力してください",
                },
                {
                  name: "nickname",
                  label: "ニックネーム",
                  type: "default",
                  placeholder: "アプリでのニックネームを入力してください",
                },
                {
                  name: "password",
                  label: "パスワード",
                  type: "default",
                  placeholder: "8文字以上のパスワードを入力してください",
                  secureTextEntry: true,
                },
                {
                  name: "email",
                  label: "email",
                  type: "default",
                  placeholder: "メールアドレスを入力してください",
                },
              ]}
            />
          ),
          //NOTEサインインフィールド
          SignIn: ({ fields, ...props }) => (
            <Authenticator.SignIn
              {...props}
              fields={[
                {
                  name: "username",
                  label: "ユーザーネーム",
                  type: "default",
                  placeholder: "ユーザーネーム",
                },

                {
                  name: "password",
                  label: "パスワード",
                  type: "default",
                  placeholder: "パスワード",
                  secureTextEntry: true,
                },
              ]}
            />
          ),
        }}
        //コンポーネンツend
        Header={MyAppHeader}
      >
        <View style={style.container}>
          <App1 />
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default App;
