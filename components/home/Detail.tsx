
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ScrollView } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { Svg, Polygon } from "react-native-svg";

import { cards } from "../../data/cards"; // ダミーデータ
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  index: number;
  hasVisited: boolean | null;
};

const Detail: React.FC<Props> = memo(({ page, setPage, index, hasVisited }) => {
  const [showText, setShowText] = useState(hasVisited);

  const handleButtonPress = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  const SERVER_URL = "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";

  return (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          page === "detail" ? setPage("home") : setPage("spots");
        }}
      >
        <EvilIcon name="chevron-left" style={styles.backIcon} />
      </TouchableOpacity>

      <ScrollView>
        <View style={ page === "visited" ? { paddingBottom: 80 } : { paddingBottom: 5 } }>
          {/* 行ったよラベルを表示させる */}
          {showText && (
            <View style={styles.window}>
              <Svg width={500} height={500}>
                <Polygon points="0,150 150,0 150,150" fill="rgb(158, 27, 27)" />
                <View style={styles.visitedTextContainer}>
                  <Text style={styles.visitedText}>行ったよ！      </Text>
                </View>
              </Svg>
            </View>
          )}
          <View style={styles.cardPhoto}>
            <Swiper
            showsButtons={cards[index].images.length !== 1 && true}
            autoplay={true}
            activeDotColor={"rgb(158, 27, 27)"}
            nextButton={
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 50 }}>›</Text>
            }
            prevButton={
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 50 }}>‹</Text>
            }
            >
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
            <Text style={styles.title}>{cards[index].name}</Text>

            <View style={styles.addressContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="location-outline" style={styles.icon} />所在地
              </Text>
              <Text style={styles.descriptionPostCode}>{`〒${cards[index].zip_code}`}</Text>
              <Text style={styles.descriptionText}>
                {cards[index].address}
              </Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="cash-outline" style={styles.icon} /> 料金
              </Text>
              <Text style={styles.descriptionText}>{`${cards[index].price}円`}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="time-outline" style={styles.icon} /> 営業日･時間
              </Text>
              <Text style={styles.descriptionText}>{cards[index].business}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="call-outline" style={styles.icon} /> 電話番号
              </Text>
              <Text style={styles.descriptionText}>{cards[index].phone_number}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <MaterialCommunityIcon name="alpha-p-circle-outline" style={styles.icon} /> 駐車場
              </Text>
              <Text style={styles.descriptionTextParking}>{cards[index].parking}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <MaterialCommunityIcon name="human-male-female" style={styles.icon} />トイレ
              </Text>
              <Text style={styles.descriptionText}>{cards[index].toilet}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon
                  name="information-circle-outline"
                  style={styles.icon}
                /> 定休日
              </Text>
              <Text style={styles.descriptionText}>{cards[index].closed}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="subway-outline" style={styles.icon} /> 公共交通機関でのアクセス
              </Text>
              {cards[index].public_transport.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.descriptionTextList}>{item}</Text>
              ))}
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                <Ionicon name="car-outline" style={styles.icon} /> 車でのアクセス
              </Text>
              {cards[index].car.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.descriptionTextList}>{item}</Text>
              ))}
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
          {page === "visited" && (
        <View style={styles.footer}>
          {/* 行ったよボタン */}
            <TouchableOpacity
              style={[styles.button, showText && styles.buttonPressed]}
              onPress={async () => {
                handleButtonPress()
                // await fetch(`${SERVER_URL}/api/favorites/:id`,
                //   {
                //     method: 'PATCH',
                //     headers: {
                //       'Content-Type': 'application/json',
                //     },
                //   }
                // );
              }}
            >
              <Text style={[styles.text, showText && styles.textPressed]}>
                行ったよ！
              </Text>
            </TouchableOpacity>
        </View>
          )}
    </View>
  );
});

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
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
    color: "rgb(80, 80, 80)",
  },
  window: {
    position: "absolute",
    top: 200,
    left: 250,
    zIndex: 999,
  },
  visitedTextContainer: {
    position: "absolute",
    bottom: -100,
    right: 365,
    alignItems: "center",
    transform: [{ rotate: "315deg" }],
  },
  visitedText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  descriptionTitle: {
    fontSize: 23,
    paddingBottom: 5,
    paddingLeft: 3,
    color: "rgb(80, 80, 80)",
  },
  icon: {
    fontSize: 23,
    color: 'rgb(80, 80, 80)',
  },
  descriptionPostCode: {
    paddingLeft: 5,
    paddingBottom: 3,
    color: 'rgb(100, 100, 100)',
  },
  descriptionText: {
    fontSize: 20,
    paddingLeft: 5,
    color: 'rgb(100, 100, 100)',
  },
  descriptionContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "rgb(230, 230, 230)",
  },
  descriptionTextParking: {
    fontSize: 17,
    paddingLeft: 5,
    color: 'rgb(100, 100, 100)',
  },
  descriptionTextList: {
    fontSize: 15,
    color: 'rgb(100, 100, 100)',
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(158, 27, 27, 0.1)",
    shadowColor: "#9e1b1b",
    shadowOffset: {
      width: 0.5,
      height: 0,
    },
    shadowOpacity: 0.5,
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
});

export default Detail;
