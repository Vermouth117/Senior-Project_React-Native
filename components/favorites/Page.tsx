
import React, { useState, useEffect, useContext } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Icons from "./Icons";
import { Prefecture } from "../../data/globals";
import { MyContext } from "../../App";

const SERVER_URL = "https://soranomix-api-server.onrender.com";

function App(): JSX.Element {
  const [favoriteData, setFavoriteData] = useState<Prefecture[]>([]);

  const [page, setPage] = useContext(MyContext);
  const [prefecture, setPrefecture] = useContext(MyContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${SERVER_URL}/api/favorites`).then(data => data.json());
      console.log("res", res);
      setFavoriteData(res);
    })();
  }, []);

  return (
    <SafeAreaView>
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
};

const styles = StyleSheet.create({
  good: {
    top: 18,
    left: 30,
    fontSize: 30,
  },
  zanteitaisaku: {
    top: 340,
    left: 100,
  },
});

export default App;
