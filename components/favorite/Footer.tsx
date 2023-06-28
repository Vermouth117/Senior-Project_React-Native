import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {View, TouchableOpacity} from 'react-native';

import {styles} from './styles';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="home-outline" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Fontisto name="bell" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="thumbs-up-outline" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="user" style={styles.footerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
