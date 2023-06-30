
import React, { Dispatch, SetStateAction, memo, useRef, useState } from 'react';
import { StyleSheet, Dimensions, Image, Animated, PanResponder, View, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Detail from './Detail';
import { cards } from '../../data/cards';
import { Cards } from '../../data/globals';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  index: number;
  card: Cards;
  setPage: Dispatch<SetStateAction<string>>;
  setIndex: Dispatch<SetStateAction<number>>;
};

const SERVER_URL = "https://soranomix-api-server.onrender.com";

const TinderSwipe: React.FC<Props> = memo(({ index, card, setPage, setIndex }) => {

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(async () => {

            console.log("LIKE");

            const postObj: Cards = {
              ...cards[index],
            };
            postObj.images = JSON.stringify(postObj.images);
            postObj.publicTransport = JSON.stringify(postObj.publicTransport);
            postObj.car = JSON.stringify(postObj.car);
      
            const postData = await fetch(
              `${SERVER_URL}/api/favorites`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: 1, ...postObj }),
              }
            ).then((data) => data.json());
            console.log(postData);

          });
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {});
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // const [page, setPage] = useState("home");

  return (
    <View>
      {/* {page === "detail" &&
        <ScrollView>
          <Detail setPage={setPage} index={index} />
        </ScrollView>
      }
      {page === "home" && */}
        <Animated.View
          {...panResponder.panHandlers}
          key={index}
          style={[
            { transform: [
              ...position.getTranslateTransform(),
              {
                rotate: position.x.interpolate({
                  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                  outputRange: ['-10deg', '0deg', '10deg'],
                  extrapolate: 'clamp',
                }),
              },
              ] },
            styles.cardContainer,
          ]}
        >
          <Animated.View
            style={{
              transform: [{ rotate: "30deg" }],
              position: "absolute",
              top: 40,
              right: 40,
              zIndex: 1000,
              opacity: position.x.interpolate({
                inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                outputRange: [1, 0, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Icon name="arrow-undo-outline"
              style={{
                backgroundColor: "rgb(200, 70, 130)",
                color: "white",
                borderRadius: 28,
                fontSize: 35,
                padding: 10,
                overflow: "hidden",
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ rotate: "-30deg" }],
              position: "absolute",
              top: 40,
              left: 40,
              zIndex: 1000,
              opacity: position.x.interpolate({
                inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Icon name="thumbs-up-outline"
              style={{
                backgroundColor: "rgb(70, 100, 200)",
                color: "white",
                borderRadius: 28,
                fontSize: 35,
                padding: 10,
                overflow: "hidden",
              }}
            />
          </Animated.View>
          <View style={{ flex: 1 }}>
            {typeof card.images === "string"
            ? JSON.parse(card.images).map((uri: string, index: number) =>
              <Image
                key={index}
                style={styles.cardImage}
                source={{ uri: uri }}
              />)
            : card.images.map((uri: string, index: number) =>
              <Image
                key={index}
                style={styles.cardImage}
                source={{ uri: uri }}
              />
            )}
            <TouchableWithoutFeedback onPressOut={() => { setPage("detail"); setIndex(index) }}>
              <View style={styles.cardDetailContainer}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText} >{card.title}</Text>
                </View>
                <View style={styles.cardTextTokimekiContainer}>
                  <Text style={styles.cardTextAddressTitle}>
                    <Icon name="location-outline" style={styles.cardTextAddressTitle}/>
                    所在地
                  </Text>
                  <Text style={styles.cardTextPostCode}>{`〒${card.postCode}`}</Text>
                  <Text style={styles.cardTextAddress}>{card.address}</Text>
                  <Text style={styles.cardTextTokimeki}>ときめきキャッチフレーズ！？</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      {/* } */}
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    height: SCREEN_HEIGHT - 200,
    width: SCREEN_WIDTH,
    padding: 10,
    top: 115,
    position: 'absolute',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.8,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardDetailContainer: {
    height: 250,
    padding: 10,
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  cardTextContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgb(230, 230, 230)',
  },
  cardText: {
    fontSize: 28,
  },
  cardTextTokimekiContainer: {
    paddingTop: 10,
  },
  cardTextAddressTitle: {
    fontSize: 23,
    paddingBottom: 8,
    color: 'rgb(80, 80, 80)',
  },
  cardTextPostCode: {
    paddingLeft: 5,
    paddingBottom: 3,
    color: 'rgb(100, 100, 100)',
  },
  cardTextAddress: {
    fontSize: 20,
    paddingLeft: 5,
    paddingBottom: 35,
    color: 'rgb(100, 100, 100)',
  },
  cardTextTokimeki: {
    fontSize: 20,
    color: 'rgb(100, 100, 100)',
  }
});

export default TinderSwipe;
