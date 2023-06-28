
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  good: {
    top: 25,
    left: 30,
    fontSize: 30, 
  },
  zanteitaisaku: {
    top: 340,
    left: 100,
  },
  scrollView: {
    // flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    top: 50,
    flexDirection: 'row',  // 列方向に配置するためにflexDirectionを追加
    flexWrap: 'wrap',  // 要素を自動的に折り返すためにflexWrapを追加
    paddingHorizontal: 28,
  },
  iconWrapper: {
    // width: '50%',  // 幅を50%に設定して2列にする
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // flexDirection: 'column',
    // position: 'relative',
  },
  number: {
    zIndex: 1,
    textAlign: 'center',
    height: 30,
    width: 30,
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: "rgb(255, 100, 100)",
    borderRadius: 15,
    paddingTop: 3,
    position: 'absolute',
    top: 0,
    left: 130,
    overflow: 'hidden',
  },
  spotContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 15,
    // resizeMode: 'cover',
  },
  name: {
    marginBottom: 25,
  },
});
