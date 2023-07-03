import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  good: {
    top: 25,
    left: 30,
    fontSize: 30,
  },
  zanteitaisaku: {
    top: 340,
    left: 100,
  },
  scrollView: {
    justifyContent: "space-between",
    top: 50,
    flexDirection: "row",
    flexWrap: "wrap", // 要素を自動的に折り返すためにflexWrapを追加
    paddingHorizontal: 28,
  },
  iconWrapper: {},
  number: {
    zIndex: 1,
    textAlign: "center",
    height: 30,
    width: 30,
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "rgb(255, 100, 100)",
    borderRadius: 15,
    paddingTop: 3,
    position: "absolute",
    top: 0,
    left: 130,
    overflow: "hidden",
  },
  spotContainer: {
    alignItems: "center",
  },
  imageWrapper: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 15,
  },
  name: {
    marginBottom: 25,
  },
});
