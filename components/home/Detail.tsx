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
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper"; // npm install react-native-swiper が必要

import { cards } from "../../data/cards"; // ダミーデータ
import { Dispatch, SetStateAction, memo, useState } from "react";
import { Svg, Polygon } from "react-native-svg"; //npm install react-native-svg

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
  index: number;
};

const Detail: React.FC<Props> = memo(({ setPage, index }) => {
  const [showText, setShowText] = useState(false);

  const handleButtonPress = () => {
    setShowText((prevShowText) => !prevShowText);
  };
  return (
    <>
      <ScrollView style={{ zIndex: 1 }}>
        {/* <SafeAreaView> */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage("home")}
        >
          <EvilIcons name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
        {/* </SafeAreaView> */}

        <View style={styles.main}>
          <View style={styles.cardPhoto}>
            <Swiper showsButtons={false}>
              {cards[index].images.map((item, index) => (
                <View key={index}>
                  <Image
                    style={{
                      width: ScreenWidth,
                      height: 350,
                    }}
                    source={{ uri: item }}
                  />
                </View>
              ))}
            </Swiper>
          </View>

          <View style={styles.description}>
            <Text style={styles.title}>{cards[index].title}</Text>

            <View style={styles.addressContainer}>
              <Text>
                <Feather name="map-pin" style={styles.icon} />
                所在地
              </Text>
              <Text>{`〒${cards[index].postCode}`}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <FontAwesome name="money" style={styles.icon} />
                料金
              </Text>
              <Text>{cards[index].price}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <MaterialCommunityIcons name="alarm" style={styles.icon} />
                営業日・時間
              </Text>
              <Text>{cards[index].business}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <MaterialCommunityIcons name="phone" style={styles.icon} />
                電話番号
              </Text>
              <Text>{cards[index].phoneNumber}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <FontAwesome5 name="parking" style={styles.icon} />
                駐車場
              </Text>
              <Text>{cards[index].parking}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <FontAwesome5 name="toilet" style={styles.icon} />
                トイレ
              </Text>
              <Text>{cards[index].toilet}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <Ionicons
                  name="information-circle-outline"
                  style={styles.icon}
                />
                定休日
              </Text>
              <Text>{cards[index].closed}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <FontAwesome5 name="train" style={styles.icon} />
                公共交通機関でのアクセス
              </Text>
              <FlatList
                data={cards[index].publicTransport}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Text>
                <MaterialCommunityIcons name="car" style={styles.icon} />
                車でのアクセス
              </Text>
              <FlatList
                data={cards[index].car}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
        {/* 行ったよラベルを表示させる */}
        {showText === true && (
          <View style={styles.window}>
            <Svg width={500} height={500}>
              <Polygon points="0,150 150,0 150,150" fill="rgb(158, 27, 27)" />
              <View style={styles.visitedTextContainer}>
                <Text style={styles.visitedText}>行ったよ！</Text>
              </View>
            </Svg>
          </View>
        )}
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.footer}>
          {/* 行ったよボタン */}
          <TouchableOpacity
            style={[styles.button, showText && styles.buttonPressed]}
            onPress={handleButtonPress}
          >
            <Text style={[styles.text, showText && styles.textPressed]}>
              行ったよ！
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    height: 38,
    width: 38,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 45,
    left: -3,
    color: "rgb(100, 100, 100)",
  },
  main: {},
  cardPhoto: {
    // flexDirection: "row",
    height: 350,
  },
  description: {
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
  },
  addressContainer: {
    paddingVertical: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "rgb(230, 230, 230)",
  },
  descriptionContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "rgb(230, 230, 230)",
  },
  icon: {},
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 9999,
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingBottom: 27,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "rgb(230, 230, 230)",
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: "#9e1b1b",
    marginLeft: 230,
    marginTop: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "rgb(230, 230, 230)",
    borderWidth: 2,
    borderColor: "#9e1b1b",
  },

  text: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  textPressed: {
    fontSize: 13,
    color: "#9e1b1b",
    fontWeight: "bold",
  },
  visitedTextContainer: {
    position: "absolute",
    bottom: -105,
    right: 375,
    alignItems: "center",
    transform: [{ rotate: "315deg" }],
  },
  visitedText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  window: {
    position: "absolute",
    top: 200,
    left: 250,
    zIndex: 999,
  },
});

export default Detail;
