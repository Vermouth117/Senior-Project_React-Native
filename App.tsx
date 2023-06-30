
import { StatusBar } from 'expo-status-bar';
import { memo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TinderSwipe from './components/home/TinderSwipe';
import Favorites from './components/favorites/Page';
import Footer from './components/Footer';
import { cards } from './data/cards';
import Map from './components/map/Map';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {

  const [page, setPage] = useState("home");

  return (
    <View style={styles.container}>

      {page === "home" &&
        <View>
          <View style={styles.header}>
            <Icon name="search-outline" style={styles.headerIcon} />
            <TextInput placeholder="キーワード検索" style={styles.headerTextInput} />
            <Icon name="menu-outline" style={styles.headerIcon} />
          </View>
          <View style={styles.main}>
            <Text style={styles.mainText}>おすすめ終了！</Text>
            {cards.map((card, index) => (
              <TinderSwipe key={index} index={index} card={card} />
            ))}
          </View>
        </View>
      }

      {page === "notice" &&
        <Map />
      }

      {page === "favorites" &&
        <Favorites />
      }

      <Footer setPage={setPage} />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    top: 50,
    borderRadius: 30,
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  headerIcon: {
    fontSize: 30,
    color: 'rgb(130, 130, 130)',
  },
  headerTextInput: {
    width: '70%',
  },
  main: {
    position: 'absolute',
    height: SCREEN_HEIGHT + 30,
    width: SCREEN_WIDTH,
    paddingBottom: 100,
  },
  mainText: {
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 2,
    marginHorizontal: 150,
  },
});

export default App;
