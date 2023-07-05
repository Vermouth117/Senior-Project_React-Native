
import React, { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { cards } from '../../data/cards';

type MapInfo = {
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
}

const Map: React.FC<Props> = memo(({ setPage, setIndex }) => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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

  const markers: MapInfo[] = cards.map(card => ({
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
          />
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
                  setIndex(index);
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
    shadowColor: 'rgb(255, 255, 255)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
  },
});

export default Map;
