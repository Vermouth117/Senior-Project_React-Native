
import { Dispatch, SetStateAction, memo, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  setPage: Dispatch<SetStateAction<string>>;
};

const Footer: React.FC<Props> = memo(({ setPage }) => {
  const [selectedIcon, setSelectedIcon] = useState("home");
  const handleIconPress = (page: string) => {
    setSelectedIcon(page);
    setPage(page);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => handleIconPress("home")}
        style={styles.iconContainer}
      >
        <Icon
          name="home-outline"
          style={[
            styles.footerIcon,
            {
              color: selectedIcon === "home" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color: selectedIcon === "home" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        >
          ホーム
        </Text>
      </TouchableOpacity>

      {/* お知らせボタン */}
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Icon
          name="notifications-outline"
          style={[
            styles.footerIcon,
            {
              color: selectedIcon === "" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color: selectedIcon === "" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        >
          お知らせ
        </Text>
      </TouchableOpacity>

      {/* 地図ボタン */}
      <TouchableOpacity
        onPress={() => handleIconPress("map")}
        style={styles.iconContainer}
      >
        <Icon
          name="location-outline"
          style={[
            styles.footerIcon,
            {
              color: selectedIcon === "map" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color: selectedIcon === "map" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        >
          地図
        </Text>
      </TouchableOpacity>

      {/* お気に入りボタン */}
      <TouchableOpacity
        onPress={() => handleIconPress("favorites")}
        style={styles.iconContainer}
      >
        <Icon
          name="thumbs-up-outline"
          style={[
            styles.footerIcon,
            {
              color:
                selectedIcon === "favorites" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color:
                selectedIcon === "favorites" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        >
          お気に入り
        </Text>
      </TouchableOpacity>

      {/* マイページボタン */}
      <TouchableOpacity onPress={() => {}} style={styles.iconContainer}>
        <Icon
          name="person-outline"
          style={[
            styles.footerIcon,
            {
              color: selectedIcon === "" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
          ]}
        />
        <Text
          style={[
            styles.text,
            {
              color: selectedIcon === "" ? "#9e1b1b" : "rgb(130, 130, 130)",
            },
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
