import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import {Prefecture} from './globals';
import {styles} from './styles';

type Props = {favoriteData: Array<Prefecture>};

export default function Icons({favoriteData}: Props): JSX.Element {
  const icons: Array<JSX.Element> = [];

  favoriteData.forEach(dataObj => {
    let icon = (
      <TouchableOpacity
        onPress={() => {}}
        key={dataObj.name}
        style={styles.iconWrapper}>
        <View style={styles.iconWrapper}>
          <Text style={styles.number}>{dataObj.number}</Text>
          <View style={styles.imageWrapper}>
            <Image style={styles.photo} source={{uri: dataObj.imgSrc}} alt="" />
          </View>
          <Text style={styles.name}>{dataObj.name}</Text>
        </View>
      </TouchableOpacity>
    );
    icons.push(icon);
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.iconsWrapper}>{icons}</View>
      <Text>aaaaa</Text>
    </ScrollView>
  );
}
