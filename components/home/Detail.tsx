import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions, ScrollView
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from "react-native-swiper";
import { Svg, Polygon } from "react-native-svg";

import { cards } from "../../data/cards";   // ダミーデータ
import { Dispatch, SetStateAction, memo, useState } from "react";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

type Props = {
  page: string,
  setPage: Dispatch<SetStateAction<string>>,
  index: number,
}

const Detail: React.FC<Props> = memo(({ page, setPage, index }) => {

  const [showText, setShowText] = useState(false);

  const handleButtonPress = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          page === "detail"
          ? setPage("home")
          : setPage("spots");
        }}
      >
        <EvilIcons name="chevron-left" style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView>
        {/* 行ったよラベルを表示させる */}
        {showText === true && (
          <View style={styles.window}>
            <Svg width={500} height={500}>
              <Polygon points="0,150 150,0 150,150" fill="rgb(158, 27, 27)" />
              <View style={styles.visitedTextContainer}>
                <Text style={styles.visitedText}>行ったよ！   </Text>
              </View>
            </Svg>
          </View>
        )}
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
              <Text style={styles.descriptionTitle}>
                  <Icon name="location-outline" style={styles.icon}/>
                  所在地
                </Text>
                <Text>{`〒${cards[index].postCode}`}</Text>
                <Text style={styles.descriptionAddress}>{cards[index].address}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <FontAwesome name="money" style={styles.icon} />
                料金
              </Text>
              <Text>{cards[index].price}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <MaterialCommunityIcons name="alarm" style={styles.icon} />
                営業日・時間
              </Text>
              <Text>{cards[index].business}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <MaterialCommunityIcons name="phone" style={styles.icon} />
                電話番号
              </Text>
              <Text>{cards[index].phoneNumber}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <FontAwesome5 name="parking" style={styles.icon} />
                駐車場
              </Text>
              <Text>{cards[index].parking}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <FontAwesome5 name="toilet" style={styles.icon} />
                トイレ
              </Text>
              <Text>{cards[index].toilet}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicons name="information-circle-outline" style={styles.icon} />
                定休日
              </Text>
              <Text>{cards[index].closed}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <FontAwesome5 name="train" style={styles.icon} />
                公共交通機関でのアクセス
              </Text>
              <FlatList
                data={cards[index].publicTransport}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
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
    </View>
  );
});

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 55,
    left: 15,
    height: 30,
    width: 30,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
  backIcon: {
    fontSize: 35,
    left: -2,
    top: 1,
    color: 'rgb(80, 80, 80)',
  },
  main: {
    paddingBottom: 80,
  },
  cardPhoto: {
    height: 350,
  },
  description: {
    padding: 20,
  },
  title: {
    fontSize: 28,
  },
  addressContainer: {
    paddingVertical: 20,
    marginTop: 20,
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
  descriptionTitle: {
    fontSize: 23,
    paddingBottom: 8,
    color: 'rgb(80, 80, 80)',
  },
  descriptionAddress: {
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
