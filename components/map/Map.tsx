
import React, { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import LottieView from "lottie-react-native";

import { cards } from '../../data/cards';
import { TouchCards } from "../../data/globals";


type MapInfo = {
  id: number,
  title: string,
  discription: string,
  latlng: {
    latitude: number,
    longitude: number,
  },
  uri: string,
};

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
  setIndex: Dispatch<SetStateAction<number>>;
  appToSpot: Function;
}

const SERVER_URL = "https://o49zrrdot8.execute-api.us-east-1.amazonaws.com/tokitabi";


const Map: React.FC<Props> = memo(({ setPage, setIndex, appToSpot }) => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [favoriteAllData, setFavoriteAllData] = useState<TouchCards[]>([]);

  useEffect(() => {
    (async () => {
      const getFavoriteAllData = await fetch(`${SERVER_URL}/api/favorites/all/test`).then(data => data.json());
      setFavoriteAllData(getFavoriteAllData);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${latitude}`);
        setLatitude(latitude);
        console.log(`Longitude: ${longitude}`);
        setLongitude(longitude);
      } catch (error) {
        console.warn(`Error: ${error}`);
      }
    })();
  }, []);

  // const markers: MapInfo[] = cards.map(card => ({
  const markers: MapInfo[] = favoriteAllData.map(card => ({
    id: card.id,
    title: card.name,
    discription: ` ${card.prefecture}`,
    latlng: {
      latitude: card.latitude,
      longitude: card.longitude,
    },
    uri: card.images[0],
  }));

  return (
    <SafeAreaView style={styles.loadView}>
      {latitude !== 0 && longitude !== 0 && (
        <MapView
          style={styles.map}
          // 初期領域を使用してマップをレンダリングする
          initialRegion={{
            latitude: latitude,     // 緯度
            longitude: longitude,   // 軽度
            latitudeDelta: 0.5,     // 縮尺
            longitudeDelta: 0.5,    // 縮尺
          }}
        >
          <Marker
            title="現在地"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <LottieView
              source={require("../../assets/lottie/31371-location-pin.json")}
              autoPlay={true}
              // loop={false}
              style={{ zIndex: 1, width: 80, shadowColor: "white" }}
            />
          </Marker>
          {markers.map((marker, index) => (
            <Marker
              key={`location-${index}`}
              title={marker.title}
              description={marker.discription}
              coordinate={marker.latlng}
            >
              <TouchableOpacity
                style={{ zIndex: 1 }}
                onPress={() => {
                  setPage("fromMap");
                  // setIndex(index);
                  appToSpot(Number(marker.id));
                }}
              >
                <Image
                  source={{ uri: marker.uri }}
                  style={styles.pointerImage}
                />
                <View style={styles.pointer}/>
              </TouchableOpacity>
            </Marker>
          ))}
        </MapView>
      )}
      {latitude === 0 && <Text>ロード中・・・</Text>}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  loadView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pointerImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50 / 2,
    zIndex: 1,
  },
  pointer: {
    top: -2,
    alignSelf: 'center',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 15,
    borderTopColor: "rgb(158, 27, 27)",
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
  },
});

export default Map;
