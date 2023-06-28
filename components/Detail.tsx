import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";

import { cards } from "../data/cards"; // ダミーデータ
import { Cards } from "../data/globals";

const ScreenWidth = Dimensions.get("window").width;

export default function Detail() {
  // const { detail } = route.params;
  // const index = parseInt(decodeURIComponent(detail));
  // const navigation = useNavigation();

  // const localStorageControl = useCallback(() => {
  //   const savedCardList = localStorage.getItem("cardList");
  //   const restoredCardList = savedCardList ? JSON.parse(savedCardList) : null;
  //   if (
  //     !restoredCardList ||
  //     JSON.stringify(restoredCardList) === JSON.stringify([])
  //   ) {
  //     const filterArr = cards.filter((card) => card !== cards[index]);
  //     localStorage.setItem("cardList", JSON.stringify(filterArr));
  //   } else {
  //     const filterArr = restoredCardList.filter(
  //       (card: Cards) => card !== restoredCardList[index]
  //     );
  //     localStorage.setItem("cardList", JSON.stringify(filterArr));
  //   }
  // }, []);

  // const handleClickDislike = useCallback((index) => {
  //   console.log("dislike", cards[index]);
  //   localStorageControl();
  // }, []);

  // const handleClickLike = useCallback(async (index) => {
  //   console.log("like", cards[index]);
  //   localStorageControl();

  //   const postObj = {
  //     ...cards[index],
  //     images: JSON.stringify(cards[index].images),
  //     publicTransport: JSON.stringify(cards[index].publicTransport),
  //     car: JSON.stringify(cards[index].car),
  //   };

  //   const postData = await fetch(`${SERVER_URL}/api/favorites`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ user_id: 1, ...postObj }),
  //   }).then((data) => data.json());
  //   console.log(postData);
  // }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity>
          <View style={styles.backButton}>
            <EvilIcons name="chevron-left" style={styles.backIcon} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.main}>
        {/* <View>
          <MySwiper images={cards[index].images} style={styles.cardPhoto} />
        </View> */}
        <View style={styles.cardPhoto}>
          <Swiper showsButtons={false}>
            {cards[0].images.map((item, index) => (
              <View key={index}>
                <Image
                  style={{
                    width: ScreenWidth,
                    height: 220,
                  }}
                  source={{ uri: item }}
                />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.description}>
          <Text style={styles.title}>{cards[0].title}</Text>

          <Text>
            <Feather name="map-pin" style={styles.icon} />
            所在地
          </Text>
          <View>
            <Text>{`〒${cards[0].postCode}`}</Text>
            {/* <Text>
              <a
                href={`https://www.google.co.jp/maps/search/${cards[0].title}`}
              >
                {cards[0].address}
              </a>
            </Text> */}
          </View>

          <Text>
            <FontAwesome name="money" style={styles.icon} />
            料金
          </Text>
          <Text>{cards[0].price}</Text>

          <Text>
            <MaterialCommunityIcons name="alarm" style={styles.icon} />
            営業日・時間
          </Text>
          <Text>{cards[0].business}</Text>

          <Text>
            <MaterialCommunityIcons name="phone" style={styles.icon} />
            電話番号
          </Text>
          <Text>{cards[0].phoneNumber}</Text>

          <Text>
            <FontAwesome5 name="parking" style={styles.icon} />
            駐車場
          </Text>
          <Text>{cards[0].parking}</Text>

          <Text>
            <FontAwesome5 name="toilet" style={styles.icon} />
            トイレ
          </Text>
          <Text>{cards[0].toilet}</Text>

          <Text>
            <Ionicons name="information-circle-outline" style={styles.icon} />
            定休日
          </Text>
          <Text>{cards[0].closed}</Text>

          <Text>
            <FontAwesome5 name="train" style={styles.icon} />
            公共交通機関でのアクセス
          </Text>
          <FlatList
            data={cards[0].publicTransport}
            renderItem={({ item }) => <Text>{item}</Text>}
          />

          <Text>
            <MaterialCommunityIcons name="car" style={styles.icon} />
            車でのアクセス
          </Text>
          <FlatList
            data={cards[0].car}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
          {/* <View>
            <ul>
              {cards[0].car.map((root, index) => (
                <li key={index}>{root}</li>
              ))}
            </ul>
          </View> */}
        </View>
      </View>

      <View>
        <TouchableOpacity>
          <View style={styles.dislikeButton}>
            <AntDesign name="dislike2" style={styles.dislikeIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.likeButton}>
            <AntDesign name="like2" style={styles.likeIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    // バックボタンのスタイルを指定する
  },
  backIcon: {
    // バックアイコンのスタイルを指定する
  },
  main: {
    flex: 1,
  },
  cardPhoto: {
    flexDirection: "row",
    height: 270,
  },
  description: {},
  title: {
    // タイトルのスタイルを指定する
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  dislikeButton: {
    // ディスライクボタンのスタイルを指定する
  },
  dislikeIcon: {
    // ディスライクアイコンのスタイルを指定する
  },
  likeButton: {
    // ライクボタンのスタイルを指定する
  },
  likeIcon: {
    // ライクアイコンのスタイルを指定する
  },
  icon: {},
});
