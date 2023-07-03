
import React, { Dispatch, SetStateAction, memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Prefecture } from '../../data/globals';
import { styles } from './styles';

type Props = {
  favoriteData: Array<Prefecture>;
  setPage: Dispatch<SetStateAction<string>>;
  setPrefecture: Dispatch<SetStateAction<string>>;
};

// const dammy = [
//   {"imgSrc": "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg", "name": "愛知県", "number": 4},
//   {"imgSrc": "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg", "name": "愛知県", "number": 4},
//   {"imgSrc": "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg", "name": "愛知県", "number": 4},
//   {"imgSrc": "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg", "name": "愛知県", "number": 4},
//   {"imgSrc": "https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg", "name": "愛知県", "number": 4},
// ]

const Icons: React.FC<Props> = memo(({ favoriteData, setPage, setPrefecture }) => {
  const icons: Array<JSX.Element> = [];

  favoriteData.forEach((dataObj, index) => {
  // dammy.forEach((dataObj, index) => {
    let icon = (
      <TouchableOpacity
        onPress={() => {
          setPrefecture(favoriteData[index].name);
          setPage("spots");
        }}
        key={dataObj.name}
        style={styles.iconWrapper}
      >
        <Text style={styles.number}>{dataObj.number}</Text>
        <View style={styles.spotContainer}>
          <View style={styles.imageWrapper}>
            <Image style={styles.photo} source={{uri: dataObj.imgSrc}} alt={`${dataObj.name}の写真`} />
          </View>
          <Text style={styles.name}>{dataObj.name}</Text>
        </View>
      </TouchableOpacity>
    );
    icons.push(icon);
  });

  return (
    <View style={styles.scrollView}>
      {icons}
    </View>
  );
});

export default Icons;
