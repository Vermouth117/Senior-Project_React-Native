
import React, { useState, useContext, memo } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import Icons from "./Icons";
import { Prefecture } from "../../data/globals";
import { MyContext } from "../../App";

// const SERVER_URL = "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";

const Favorites = memo(() => {
  const [page, setPage, prefecture, setPrefecture] = useContext(MyContext);
  const [favoriteData, setFavoriteData] = useState<Prefecture[]>([{
    name: "北海道",
    imgSrc: "https://cdn-news.asoview.com/production/note/05a9e06f-f4c9-4632-a1e5-94d55e4ab29a.jpeg",
    number: 3,
  }]);

  // useEffect(() => {
  //   (async () => {
  //     const getFavoriteData = await fetch(`${SERVER_URL}/api/favorites`)
  //       .then((data) => data.json());
  //     setFavoriteData(getFavoriteData);
  //   })();
  // }, []);

  return (
    <>
      <ImageBackground
        source={require("/Users/user/Desktop/React-Native-Senior-Project/assets/homeBackImg.png")}
        style={styles.container}
        resizeMode="cover"   // 画像をコンテナに合わせて拡大/縮小する
      >
        <LottieView
          source={require("../../assets/lottie/42070-travel-is-fun.json")}
          autoPlay={true}
          style={{ position: "absolute", width: "90%", alignItems: "center", bottom: 25 }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Text style={styles.good}>お気に入り</Text>
            {favoriteData.length
            ? <Icons
                favoriteData={favoriteData}
                setPage={setPage}
                setPrefecture={setPrefecture}
              />
            : <Text style={styles.zanteitaisaku}>
                行きたい場所をいいねしよう！
              </Text>
            }
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  good: {
    top: 18,
    left: 30,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  zanteitaisaku: {
    top: 230,
    left: 110,
    fontSize: 15,
    fontWeight: "900",
    color: "white",
  },
});

export default Favorites;
