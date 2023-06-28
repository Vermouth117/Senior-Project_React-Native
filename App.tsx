
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Footer from './components/Footer';
import TinderSwipe from './components/TinderSwipe';

const photos = [
  { id: "1", uri: "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg" },
  { id: "2", uri: "https://anniversarys-mag.jp/img/p/pixta_44462056_M.jpg?w=730" },
  { id: "3", uri: "https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/1cal_image/public/2022-10/News-202210-laguna-01-2.jpg?itok=mHYN0LnN" },
  { id: "4", uri: "https://www.aichi-now.jp/upload/spot_images/13a8fa1f15248f16d149b3059f62be21.jpg" },
  { id: "5", uri: "https://cdn-news.asoview.com/production/note/05a9e06f-f4c9-4632-a1e5-94d55e4ab29a.jpeg" },
]

const App = () => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Icon name="search-outline" style={styles.headerIcon} />
        <TextInput placeholder="キーワード検索" style={styles.headerTextInput} />
        <Icon name="menu-outline" style={styles.headerIcon} />

      </View>
      <View style={styles.main}>
        <Text style={styles.mainText}>おすすめ終了！</Text>
        {photos.map((photo, index) => (
          <TinderSwipe key={index} index={index} photoUri={photo.uri} />
        ))}
      </View>

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    top: 50,
    zIndex: 2,
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
  },
  mainText: {
    position: 'absolute',
    marginTop: Dimensions.get('window').height / 2,
    marginHorizontal: 150,
  },
});

export default App;
