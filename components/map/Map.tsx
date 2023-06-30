
import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const marker = {
  title: '公園',
  discription: '遊び場',
  latlng: {
    latitude: 36.28825,
    longitude: 136.7324,
  },
};

const Map = memo(() => {

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

  return (
    <SafeAreaView style={styles.map}>
      {latitude !== 0 && longitude !== 0 && (
        <MapView
          style={styles.mapStyle}
          // 初期領域を使用してマップをレンダリングする
          initialRegion={{
            latitude: latitude,    // 緯度
            longitude: longitude,   // 軽度
            latitudeDelta: 0.3,    // 縮尺
            longitudeDelta: 0.3,   // 縮尺
          }}
        >
          <Marker
            coordinate={marker.latlng}
            // image={{uri: 'https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg'}}
            title={marker.title}
            description={marker.discription}
          />
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            // image={{uri: 'https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg'}}
            title="現在地"
          />
        </MapView>
      )}
      {latitude === 0 && <Text>ロード中・・・</Text>}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    width: '100%',
    height:  '100%',
  },
});

export default Map;
