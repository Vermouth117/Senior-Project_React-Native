
import { Dispatch, SetStateAction, memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  setRamdomCardsChange: Dispatch<SetStateAction<boolean>>;
  setPrefectureValue: Dispatch<SetStateAction<null>>;
};

const Footer: React.FC<Props> = memo(({ page, setPage, setRamdomCardsChange, setPrefectureValue }) => {
  return (
    <View style={styles.footer}>

      <TouchableOpacity onPress={() => {
        setPage("home");
        setRamdomCardsChange(prev => !prev);
        setPrefectureValue(null);
      }} style={styles.iconContainer}>
        <Icon
          name="home-outline"
          style={[
            styles.footerIcon,
            { color: page === "home" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: page === "home" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        >
          ホーム
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPage("notice")} style={styles.iconContainer}>
        <Icon
          name="notifications-outline"
          style={[
            styles.footerIcon,
            { color: page === "notice" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: page === "notice" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        >
          お知らせ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPage("map")} style={styles.iconContainer}>
        <Icon
          name="location-outline"
          style={[
            styles.footerIcon,
            { color: page === "map" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: page === "map" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        >
          地図
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPage("favorites")} style={styles.iconContainer}>
        <Icon
          name="thumbs-up-outline"
          style={[
            styles.footerIcon,
            { color: page === "favorites" || page === "spots" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: page === "favorites" || page === "spots" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        >
          お気に入り
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPage("user")} style={styles.iconContainer}>
        <Icon
          name="person-outline"
          style={[
            styles.footerIcon,
            { color: page === "user" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        />
        <Text
          style={[
            styles.text,
            { color: page === "user" ? "#9e1b1b" : "rgb(130, 130, 130)" },
          ]}
        >
          マイページ
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingBottom: 27,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "rgb(230, 230, 230)",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 60,
  },
  footerIcon: {
    fontSize: 30,
  },
  text: {
    fontSize: 12,
    color: "black",
  },
});

export default Footer;
