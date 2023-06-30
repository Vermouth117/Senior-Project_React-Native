
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Icons from './Icons';
import {styles} from './styles';

import {Prefecture} from '../../data/globals';
import Spots from './Spots';
import { MyContext } from '../../App';

const SERVER_URL = 'https://soranomix-api-server.onrender.com';

function App(): JSX.Element {

  const [favoriteData, setFavoriteData] = useState<any>([]);
  // const [page, setPage] = useState("favorite");
  // const [prefecture, setPrefecture] = useState("");

  const [page, setPage] = useContext(MyContext);
  const [prefecture, setPrefecture] = useContext(MyContext);

  useEffect(() => {
    async function fetchData<T>(): Promise<void> {
      // 県別いいねデータ取得
      const res: T = await fetch(`${SERVER_URL}/api/favorites`).then(data =>
        data.json(),
      );
      console.log('res', res);
      setFavoriteData(res);
    }
    fetchData<Prefecture[]>();
  }, []);

  return (
    <ScrollView>
    {/* {page === "spots" && <Spots setPage={setPage} prefecture={prefecture} />} */}
    {/* {page === "favorite" && */}
      <SafeAreaView style={styles.container}>
        <Text style={styles.good}>お気に入り</Text>
        {favoriteData.length ? (
          <Icons favoriteData={favoriteData} setPage={setPage} setPrefecture={setPrefecture} />
        ) : (
          <Text style={styles.zanteitaisaku}>
            行きたい場所をいいねしよう！
          </Text>
        )}
      </SafeAreaView>
    {/* } */}
    </ScrollView>
  );
}

export default App;
