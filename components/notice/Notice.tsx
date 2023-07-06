
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Button, ImageBackground } from "react-native";

import LottieView from "lottie-react-native";

export default function Notice() {

  const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsAnimationVisible(false);
  //   }, 1100);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <View style={styles.container}>

      {isAnimationVisible && (
        <LottieView
          source={require("../../assets/lottie/82445-travelers-walking-using-travelrmap-application.json")}
          autoPlay={true}
          // loop={false}
          style={{ position: "absolute", zIndex: 1, width: "90%" }}
        />
      )}

      <ImageBackground
        source={require("/Users/user/Desktop/Senior-Project_React-Native/assets/homeBackImg.png")}
        style={styles.container}
        resizeMode="cover"   // 画像をコンテナに合わせて拡大/縮小する
      >
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
