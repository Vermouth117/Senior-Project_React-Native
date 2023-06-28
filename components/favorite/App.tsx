'use client';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icons from './Icons';
import {styles} from './styles';

import {Prefecture} from './globals';
import Footer from './Footer';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
const SERVER_URL = 'https://soranomix.onrender.com';

function App(): JSX.Element {
  const [favoriteData, setFavoriteData] = useState<any>([]);
  useEffect(() => {
    async function fetchData<T>(): Promise<void> {
      // 県別いいねデータ取得
      const res: T = await fetch(`${SERVER_URL}/api/favorites`).then(data =>
        data.json(),
      );
      // const res: T = await fetch(`http://localhost:3000/api/favorites`).then((res) => res.json());
      console.log('res', res);
      setFavoriteData(res);
    }
    fetchData<Prefecture[]>();
  }, []); // 第2引数のロジック浮かんでない。
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View>
          <Text style={styles.good}>いいね一覧</Text>
        </View>
        <View style={styles.iconConteiner}>
          {favoriteData.length ? (
            <Icons favoriteData={favoriteData} />
          ) : (
            <Text style={styles.zanteitaisaku}>
              行きたい場所をいいねしよう！
            </Text>
          )}
        </View>
        <Footer />
      </View>
    </React.Fragment>
  );
}

export default App;
