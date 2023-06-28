
import { Dispatch, SetStateAction, memo } from 'react';
import { StyleSheet, View,  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
}

const Footer: React.FC<Props> = memo(({ setPage }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => setPage("home")}>
        <Icon name="home-outline" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="notifications-outline" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage("favorite")}>
        <Icon name="thumbs-up-outline" style={styles.footerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="person-outline" style={styles.footerIcon} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingBottom: 35,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    // zIndex: 2,
    borderTopWidth: 1,
    borderTopColor: 'rgb(230, 230, 230)',
  },
  footerIcon: {
    fontSize: 35,
    color: 'rgb(130, 130, 130)',
  },
});

export default Footer;
