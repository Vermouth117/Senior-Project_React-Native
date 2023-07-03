
import { Dispatch, SetStateAction, createContext, memo, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Notifications from 'expo-notifications';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { cards } from "./data/cards";
import { Prefecture } from './data/globals';
import TinderSwipe from "./components/home/TinderSwipe";
import Favorites from "./components/favorites/Page";
import Footer from "./components/Footer";
import Map from "./components/map/Map";
import Detail from "./components/home/Detail";
import Spots from "./components/favorites/Spots";
import Notice from "./components/notice/Notice";
import User from "./components/user/User";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const SERVER_URL = 'https://soranomix-api-server.onrender.com';
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = [
  page: string,
  setPage: Dispatch<SetStateAction<string>>,
  prefecture: string,
  setPrefecture: Dispatch<SetStateAction<string>>
];

export const MyContext = createContext<Props>(["", () => {}, "", () => {}]);

// ストレージの作成
export const storage: Storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
  // 初期化時にデータを同期するためのオプション
  sync: {},
})

const App = memo(() => {

  useEffect(() => {
    requestPermissionsAsync();
    Notifications.setBadgeCountAsync(0);

    storage.load({key: 'data'})
    .then(res => console.log("App", res))
    .catch(err => console.warn("App", err));
  }, []);

  const [noticeCount, setNoticeCount] = useState(115);   // 通知カウント設定
  const [favoriteData, setFavoriteData] = useState<Prefecture[]>([]);

  useEffect(() => {
    (async () => {
      // console.log(favoriteData);
      favoriteData.length !== 0 &&
      favoriteData.forEach(async obj => {

        obj.number >= noticeCount &&
        // プッシュ通知を実際に送信する
        await Notifications.scheduleNotificationAsync({
          content: {
            body: `🧳旅行先が${obj.number}つ溜まっています!!`,
            title: '愛知県に行ってみませんか？',
            sound: 'default',
            // subtitle: 'subtitle',
            // badge: 1,
          },
          trigger: {
            seconds: 1,
          }
        });
        Notifications.setBadgeCountAsync(1);
      })
    })();
  }, [favoriteData]);

  const scheduleNotificationAsync = async () => {
    const res = await fetch(`${SERVER_URL}/api/favorites`).then(data => data.json());
    // console.log('res', res);
    setFavoriteData(res);
  };

  const requestPermissionsAsync = async () => {
    // 現時点の通知権限の情報を取得する
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) return;

    // ユーザーに通知権限を要求するポップアップを出す
    await Notifications.requestPermissionsAsync();
  }

  const [page, setPage] = useState("home");
  const [index, setIndex] = useState(0);
  const [prefecture, setPrefecture] = useState("");

  const [inputRef, setInputRef] = useState("");
  console.log(inputRef);   // フィルターに使う予定

  return (
    <View style={styles.container}>
      <MyContext.Provider value={[page, setPage, prefecture, setPrefecture]}>

        {page === "home" &&
          <View>
            <View style={styles.header}>
              <Icon name="search-outline" style={styles.headerIcon} />
              <TextInput
                placeholder="キーワード検索"
                style={styles.headerTextInput}
                value={inputRef}
                onChangeText={(text) => setInputRef(text)}
              />
              <Icon name="menu-outline" style={styles.headerIcon} />
            </View>
            <View style={styles.main}>
              <Text style={styles.mainText}>おすすめ終了！</Text>
              {cards.map((card, index) => (
                <TinderSwipe
                  key={index}
                  index={index}
                  card={card}
                  setPage={setPage}
                  setIndex={setIndex}
                  scheduleNotificationAsync={scheduleNotificationAsync}
                />
              ))}
            </View>
          </View>
        }

        {page === "detail" &&
          <Detail page={page} setPage={setPage} index={index} />
        }

        {page === "notice" &&
          <Notice />
        }

        {page === "map" &&
          <Map />
        }

        {page === "favorites" &&
          <Favorites />
        }

        {page === "spots" &&
          <Spots setPage={setPage} prefecture={prefecture} setIndex={setIndex} />
        }

        {page === "visited" &&
          <Detail page={page} setPage={setPage} index={index} />
        }

        {page === "user" &&
          <User />
        }

        {page !== "detail" && page !== "visited" &&
          <Footer page={page} setPage={setPage} />
        }

      </MyContext.Provider>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    top: 50,
    borderRadius: 30,
    shadowColor: "rgb(200, 200, 200)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    zIndex: 1,
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
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingBottom: 100,
  },
  mainText: {
    position: "absolute",
    marginTop: Dimensions.get("window").height / 2,
    marginHorizontal: 140,
  },
});

export default App;
