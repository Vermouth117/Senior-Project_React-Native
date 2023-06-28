
import React, { memo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  index: number;
  photoUri: string;
};

const TinderSwipe: React.FC<Props> = memo(({ index, photoUri }) => {

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          // カードを右にスワイプした場合の処理
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {});
        } else if (gestureState.dx < -120) {
          // カードを左にスワイプした場合の処理
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {});
        } else {
          // カードがスワイプされずに元の位置に戻る場合の処理
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
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
        <Icon name="thumbs-down-outline"
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
      <Image
        style={styles.cardImage}
        source={{ uri: photoUri }}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    height: SCREEN_HEIGHT - 200,
    width: SCREEN_WIDTH,
    padding: 10,
    top: 115,
    position: 'absolute',
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 20,
  },
});

export default TinderSwipe;
