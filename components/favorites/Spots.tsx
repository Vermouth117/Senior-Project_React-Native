
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Svg, Polygon } from "react-native-svg";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { cards } from "../../data/cards";   // ダミーデータ (YOLP API使用予定)
import { CheckBox } from "react-native-elements";

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
  prefecture: string;
  setIndex: Dispatch<SetStateAction<number>>;
  setHasVisited: Dispatch<SetStateAction<boolean>>;
};

const SERVER_URL = "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";

const Spots: React.FC<Props> = memo(({ setPage, prefecture, setIndex, setHasVisited }) => {

  const [spotsData, setSpotsData] = useState<any>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const getPrefectureFavoriteData = await fetch(`${SERVER_URL}/api/favorites/${prefecture}`).then(data => data.json());
      console.log("SpotsRes", getPrefectureFavoriteData);

      getPrefectureFavoriteData.forEach((spot: { hasVisited: boolean }) =>
        console.log("visited", spot.hasVisited)
      );
      setSpotsData(getPrefectureFavoriteData);
    })();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <EvilIcons name="chevron-left" size={40} onPress={() => setPage("favorites")} />
        <Text style={styles.title}>{prefecture}</Text>
        <CheckBox
          title="行った場所 非表示"
          checked={checked}
          onPress={() => setChecked(!checked)}
          containerStyle={styles.checkbox}
          textStyle={{ fontSize: 15, color: "gray" }}
          checkedColor="#9e1b1b"
        />
      </View>
      <SafeAreaView style={styles.main}>
        <FlatList
          data={spotsData.length !== 0 && spotsData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.wrapper}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) =>
            <TouchableOpacity
              key={item.id}
              style={styles.spotWrapper}
              onPress={() => {
                setPage("visited");
                const selectIndex = cards.findIndex(spotObj => spotObj.name === item.name);
                setIndex(selectIndex);
                setHasVisited(item.hasVisited);
                // fetchで GET したデータをstate管理でAppへ（idをパスパラで渡す）
              }}
            >
              <View style={styles.imageWrapper}>
                {item.hasVisited && (
                  <View style={styles.window}>
                    <Svg width={500} height={500}>
                      <Polygon points="0,150 150,0 150,150" fill="rgb(158, 27, 27)" />
                      <View style={styles.visitedTextContainer}>
                        <Text style={styles.visitedText}>行ったよ！</Text>
                      </View>
                    </Svg>
                  </View>
                )}
                <Image source={{ uri: item.imgSrc[0] }} style={styles.photo} />
              </View>
              <Text style={styles.price}>¥{item.price}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.access}>{item.access}</Text>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 60,
    paddingLeft: 18,
    fontSize: 30,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
  },
  title: {
    fontSize: 30,
  },
  checkbox: {
    backgroundColor: "white",
    borderColor: "white",
    padding: 0,
    paddingLeft: 80,
  },
  main: {
    marginTop: 100,
    marginBottom: 82,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    // justifyContent: "space-between",
  },
  spotWrapper: {
    flex: 1,
    margin: 5,
    height: 200,
    borderWidth: 1,
    borderColor: "white",
    // borderRadius: 15,
    overflow: "hidden",
    // position: "relative",
    // shadowColor: "#000",
    // shadowOpacity: 0.3,
  },
  price: {
    // display: "flex",
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgb(170, 170, 170)",
    // alignItems: "center",
    // justifyContent: "center",
    position: "absolute",
    bottom: 58,
    // left: 1,
  },
  imageWrapper: {
    height: 150,
    // width: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },
  window: {
    position: "absolute",
    left: 80,
    zIndex: 999,
  },
  visitedTextContainer: {
    position: "absolute",
    bottom: -128,
    right: 423,
    transform: [{ rotate: "315deg" }],
  },
  visitedText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  name: {
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    // overflow: "hidden",
  },
  access: {
    textAlign: "center",
    // width: "100%",
    // padding: "0 5%",
    // overflow: "hidden",
  },
});

export default Spots;
