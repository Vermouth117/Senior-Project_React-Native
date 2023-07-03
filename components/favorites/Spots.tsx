
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { cards } from "../../data/cards";   // ダミーデータ

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
  prefecture: string;
  setIndex: Dispatch<SetStateAction<number>>;
};

const Spot: React.FC<Props> = memo(({ setPage, prefecture, setIndex }) => {
  const dammyData = [
    {
      id: 1,
      name: "香嵐渓",
      imgSrc:
        "https://www.tourismtoyota.jp/upload/rspots/large/10950727826278429f9021f.jpg",
      price: 500,
      access: "車",
    },
    {
      id: 6,
      name: "名古屋城",
      imgSrc:
        "https://cdn-news.asoview.com/production/note/05a9e06f-f4c9-4632-a1e5-94d55e4ab29a.jpeg",
      price: 0,
      access: "電車",
    },
    {
      id: 42,
      name: "刈谷ハイウェイオアシス",
      imgSrc: "https://anniversarys-mag.jp/img/p/pixta_44462056_M.jpg?w=730",
      price: 0,
      access: "車",
    },
    {
      id: 78,
      name: "ラグーナ蒲郡",
      imgSrc:
        "https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/1cal_image/public/2022-10/News-202210-laguna-01-2.jpg?itok=mHYN0LnN",
      price: 0,
      access: "車",
    },
    {
      id: 79,
      name: "ラグーナ蒲郡",
      imgSrc:
        "https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/1cal_image/public/2022-10/News-202210-laguna-01-2.jpg?itok=mHYN0LnN",
      price: 0,
      access: "車",
    },
    {
      id: 108,
      name: "犬山城下町",
      imgSrc:
        "https://aichinavi.jp/upload/spot_images/a0a09a7407e66f560e2483b27911a820.jpg",
      price: 0,
      access: "車",
    },
    {
      id: 2,
      name: "香嵐渓",
      imgSrc:
        "https://www.tourismtoyota.jp/upload/rspots/large/10950727826278429f9021f.jpg",
      price: 500,
      access: "車",
    },
    {
      id: 7,
      name: "名古屋城",
      imgSrc:
        "https://cdn-news.asoview.com/production/note/05a9e06f-f4c9-4632-a1e5-94d55e4ab29a.jpeg",
      price: 0,
      access: "電車",
    },
    {
      id: 43,
      name: "刈谷ハイウェイオアシス",
      imgSrc: "https://anniversarys-mag.jp/img/p/pixta_44462056_M.jpg?w=730",
      price: 0,
      access: "車",
    },
  ];

  const SERVER_URL = "https://soranomix-api-server.onrender.com";

  const [spotsData, setSpotsData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${SERVER_URL}/api/favorites/${prefecture}`).then(data => data.json());
      console.log("res", res);
      setSpotsData(res);
    })();
  }, []);

  const renderSpotItem = (item: { id: number, name: string, imgSrc: string, price: number, access: string }) => (
    <TouchableOpacity
      style={styles.spotWrapper}
      key={item.id}
      onPress={() => {
        setPage("visited");
        const selectIndex = cards.findIndex(
          (spotObj) => spotObj.title === item.name
        );
        setIndex(selectIndex);
      }}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.imgSrc }} style={styles.photo} />
      </View>
      <Text style={styles.price}>¥{item.price}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.access}>{item.access}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.header}>
        <EvilIcons
          name="chevron-left"
          size={40}
          onPress={() => setPage("favorites")}
        />
        <Text style={styles.title}>愛知県</Text>
      </View>
      <SafeAreaView style={styles.main}>
        <FlatList
          data={dammyData}
          // data={spotsData}
          renderItem={({ item }) => renderSpotItem(item)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // 2列で表示する
          style={styles.wrapper}
          columnWrapperStyle={styles.columnWrapper}
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
  main: {
    marginTop: 100,
    marginBottom: 82,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  spotWrapper: {
    flex: 1, //1つのアイテムの横幅大きくなる
    margin: 5, // アイテム間のマージン
    height: 200,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.3,
  },
  price: {
    display: "flex",
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgb(180, 180, 180)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 55,
    left: 1,
  },
  imageWrapper: {
    height: 150,
    width: "100%",
    overflow: "hidden",
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  name: {
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    overflow: "hidden",
  },
  access: {
    textAlign: "center",
    width: "100%",
    padding: "0 5%",
    fontWeight: "700",
    overflow: "hidden",
  },
});

export default Spot;
