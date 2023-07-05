
import React, { useState, useEffect, useContext, memo } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Icons from "./Icons";
import { Prefecture } from "../../data/globals";
import { MyContext } from "../../App";

const SERVER_URL = "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";

const Favorites = memo(() => {

  const [page, setPage, prefecture, setPrefecture] = useContext(MyContext);
  const [favoriteData, setFavoriteData] = useState<Prefecture[]>([]);

  useEffect(() => {
    (async () => {
      const getFavoriteData = await fetch(`${SERVER_URL}/api/favorites`).then(data => data.json());
      setFavoriteData(getFavoriteData);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.good}>お気に入り</Text>
        {favoriteData.length
        ? <Icons
            favoriteData={favoriteData}
            setPage={setPage}
            setPrefecture={setPrefecture}
          />
        : <Text style={styles.zanteitaisaku}>行きたい場所をいいねしよう！</Text>
        }
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  good: {
    top: 18,
    left: 30,
    fontSize: 30,
  },
  zanteitaisaku: {
    top: 330,
    left: 110,
  },
});

export default Favorites;
