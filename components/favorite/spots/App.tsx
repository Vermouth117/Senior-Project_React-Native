import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "../../Footer";

// import { IoIosArrowBack } from "react-icons/io";
// import Link from "next/link";
// import SERVER_URL from "@/serverfile";
// import { Spot } from "@/globals";
// import "./page.css";
// import Footer from "@/components/Footer";

export default function spot() {
  //   params,
  // }: {
  //   params: { prefecture: string };
  // }): JSX.Element {
  //   const prefecture = decodeURIComponent(params.prefecture);
  //   const [spotData, setSpotData] = useState<any>([]);

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
      id: 108,
      name: "犬山城下町",
      imgSrc:
        "https://www.aichi-now.jp/upload/spot_images/13a8fa1f15248f16d149b3059f62be21.jpg",
      price: 0,
      access: "車",
    },
  ];

  // useEffect(() => {
  //   async function fetchData() {
  //     // いいねスポットデータをfetch
  //     const res = await fetch(
  //       `http://localhost:3000/api/favorites/${prefecture}`
  //     )
  //       // const res: T = await fetch(`http://localhost:3000/api/favorites/${prefecture}`)
  //       .then(
  //         (
  //           res // これローカルでいけるやつ
  //         ) => res.json()
  //       );
  //     console.log("res", res);
  //     setSpotData(res);
  //   }
  //   fetchData();
  //   // setSpotData(dammyData);
  // }, []);

  // const spots = spotData.map((dataObj: any) => (
  //   <View key={dataObj.id} style={styles.spotWrapper}>
  //     <View style={styles.imageWrapper}>
  //       <Image source={{ uri: dataObj.imgSrc }} style={styles.photo} />
  //     </View>
  //     <Text style={styles.price}>¥{dataObj.price}</Text>
  //     <Text style={styles.name}>{dataObj.name}</Text>
  //     <Text style={styles.access}>{dataObj.access}</Text>
  //   </View>
  // ));
  const renderSpotItem = ({ item }) => (
    <View style={styles.spotWrapper}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.imgSrc }} style={styles.photo} />
      </View>
      <Text style={styles.price}>¥{item.price}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.access}>{item.access}</Text>
    </View>
  );

  return (
    <>
      {/* <header>
        <Ionicons
          name="ios-arrow-back"
          size={48}
          onPress={() => navigation.goBack()}
        />
        <Text>{prefecture}</Text>
      </header> */}
      <View style={styles.header}>
        <Ionicons
          name="ios-arrow-back"
          size={40}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>愛知県</Text>
      </View>
      <ScrollView>
        <View style={styles.main}>
          <FlatList
            data={dammyData}
            renderItem={renderSpotItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // 2列で表示する
            style={styles.wrapper}
            columnWrapperStyle={styles.columnWrapper} // 列のラッパーのスタイル
          />
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingLeft: 20,
    // display: "flex"
    marginTop: 80,
  },
  title: {
    paddingLeft: 20, //矢印と愛知県の間を設ける
    paddingTop: 3, //矢印と愛知県の文字位置調整
    fontSize: 30,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    // marginBottom: "3em",
  },
  wrapper: {
    // display: "flex",
    // flexWrap: "wrap",
    // flexDirection: "row",
    paddingVertical: 10, // 上下のパディング
    paddingHorizontal: 20, // 左右のパディング
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  //各スポットのWrap
  spotWrapper: {
    flex: 1, //1つのアイテムの横幅大きくなる
    margin: 5, // アイテム間のマージン
    // display: "flex",
    height: 200,
    // width: "40%",
    // alignItems: "center",
    // flexDirection: "column",
    // borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(30, 30, 30)",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
    // textAlign: "center",
  },
  price: {
    display: "flex",
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    backgroundColor: "rgb(180, 180, 180)",
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // padding: 2,
    position: "absolute",
    bottom: 55,
    left: 1,
  },

  //画像だけのWrap
  imageWrapper: {
    height: 150,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(200, 200, 200)",
    overflow: "hidden",
  },
  photo: {
    height: "100%",
    width: "100%",
    // resizeMode: "cover",
  },
  name: {
    // width: "100%",
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    // marginTop: "1vh",
    overflow: "hidden",
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
  },
  access: {
    //仮
    textAlign: "center",
    width: "100%",
    padding: "0 5%",
    fontWeight: "700",
    // marginTop: "1vh",
    overflow: "hidden",
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
  },
});
