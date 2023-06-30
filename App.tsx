import { StatusBar } from "expo-status-bar";
import { Dispatch, SetStateAction, createContext, memo, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import TinderSwipe from "./components/home/TinderSwipe";
import Favorites from "./components/favorites/Page";
import Footer from "./components/Footer";
import { cards } from "./data/cards";
import Map from "./components/map/Map";
import Detail from "./components/home/Detail";
import Spots from "./components/favorites/Spots";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = [
  page: string,
  setPage: Dispatch<SetStateAction<string>>,
  prefecture: string,
  setPrefecture: Dispatch<SetStateAction<string>>
];

export const MyContext = createContext<Props>(["", () => {}, "", () => {}]);

const App = memo(() => {
  const [page, setPage] = useState("home");
  const [index, setIndex] = useState(0);
  const [prefecture, setPrefecture] = useState("");

  return (
    <View style={styles.container}>
      <MyContext.Provider value={[page, setPage, prefecture, setPrefecture]}>
        {page === "home" && (
          <View>
            <View style={styles.header}>
              <Icon name="search-outline" style={styles.headerIcon} />
              <TextInput
                placeholder="キーワード検索"
                style={styles.headerTextInput}
              />
              <Icon name="menu-outline" style={styles.headerIcon} />
            </View>
            <View style={styles.main}>
              <Text style={styles.mainText}>おすすめ終了！</Text>
              {cards.map((card, index) => (
                <TinderSwipe
                  key={index}
                  index={index}
                  card={card}
                  setPage={setPage}
                  setIndex={setIndex}
                />
              ))}
            </View>
          </View>
        )}

        {page === "detail" && <Detail setPage={setPage} index={index} />}

        {page === "map" && <Map />}

        {page === "favorites" && <Favorites />}

        {page === "spots" && (
          <Spots setPage={setPage} prefecture={prefecture} />
        )}

        {page !== "detail" && page !== "spots" && <Footer setPage={setPage} />}

        <StatusBar style="auto" />
      </MyContext.Provider>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    top: 50,
    borderRadius: 30,
    shadowColor: "rgb(200, 200, 200)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    zIndex: 1,
  },
  headerIcon: {
    fontSize: 30,
    color: "rgb(130, 130, 130)",
  },
  headerTextInput: {
    width: "70%",
  },
  main: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingBottom: 100,
  },
  mainText: {
    position: "absolute",
    marginTop: Dimensions.get("window").height / 2,
    marginHorizontal: 140,
  },
});

export default App;
